import React, { useContext, useEffect, useMemo, useState } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Loading from './loading';
import { UserContext } from '../App';

import { db } from '../database/database';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  runTransaction,
} from 'firebase/firestore';

// ---------- Utils ----------
function fmtDate(d) { return new Date(d).toISOString().split('T')[0]; }
function toDateParts(iso) { const [y,m,d]=iso.split('-').map(Number); return new Date(y, m-1, d); }
function isPastDate(iso) { const t=new Date(); const today=new Date(t.getFullYear(),t.getMonth(),t.getDate()); return toDateParts(iso)<today; }
function isWeekend(iso) { const wd=toDateParts(iso).getDay(); return wd===0||wd===6; }
const pad = (n)=>String(n).padStart(2,'0');
const mins = (hhmm)=>{ const [h,m]=hhmm.split(':').map(Number); return h*60+m; };
const hhmm = (m)=>`${pad(Math.floor(m/60))}:${pad(m%60)}`;
const genSlots=(start,end,step)=>{ const out=[]; for(let t=mins(start); t+step<=mins(end); t+=step) out.push(hhmm(t)); return out; };
const mergeBlocks=(blocks)=>{ const a=[...blocks].sort((x,y)=>mins(x.start)-mins(y.start)); const r=[]; for(const b of a){ if(!r.length) r.push({...b}); else { const L=r[r.length-1]; if(mins(b.start)<=mins(L.end)){ if(mins(b.end)>mins(L.end)) L.end=b.end; } else r.push({...b}); } } return r; };
const slotsFromBlocks=(blocks,step)=>mergeBlocks(blocks).flatMap(b=>genSlots(b.start,b.end,step));

// >>>> A TUA URL e TOKEN <<<<
const APPSCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzrRBsfi9K2SedKi0AKMvi6yVFP0uztzACN0qBvbgI_FFkz0DhrrkFBjLw8rBgPOVo/exec';
const TOKEN_PARTILHADO = 'Dor de Cabeça';

export default function SessoesPsicologo() {
  const { userData } = useContext(UserContext);

  // Tabs
  const [tab, setTab] = useState('agendar');

  // Estado (Agendar)
  const [diaSel, setDiaSel] = useState(fmtDate(new Date()));
  const [horas, setHoras] = useState([]);
  const [horaSel, setHoraSel] = useState('');
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [msgAgendar, setMsgAgendar] = useState(null);
  const [formAgendar, setFormAgendar] = useState({ nome: '', email: '' });

  // Estado (Meus Agendamentos)
  const [emailConsulta, setEmailConsulta] = useState('');
  const [listaAgendamentos, setListaAgendamentos] = useState(null);
  const [loadingConsulta, setLoadingConsulta] = useState(false);
  const [msgConsulta, setMsgConsulta] = useState(null);

  // ---- REAGENDAR ----
  const [showReagendar, setShowReagendar] = useState(false);
  const [reservaReagendar, setReservaReagendar] = useState(null); // {id,name,email,date,hour}
  const [novoDia, setNovoDia] = useState(fmtDate(new Date()));
  const [horasReagendar, setHorasReagendar] = useState([]);
  const [novaHora, setNovaHora] = useState('');
  const [loadingReagendar, setLoadingReagendar] = useState(false);
  const [msgReagendar, setMsgReagendar] = useState(null);

  // Config e feriados
  const [config, setConfig] = useState({
    weekdays: [1,2,3,4,5],
    morning: { start: '09:00', end: '12:30' },
    afternoon: { start: '14:00', end: '19:30' },
    slotMinutes: 30,
  });
  const [feriados, setFeriados] = useState(new Set());

  useEffect(() => {
    let cancel=false;
    (async () => {
      try {
        const username = await getDoc(doc(db, "alunos", userData.uid, "codigoParticipante"));
        const cfg = await getDoc(doc(db,'settings','schedule'));
        if(!cancel && cfg.exists()) setConfig(c=>({ ...c, ...cfg.data() }));
        const hol = await getDoc(doc(db,'holidays','pt'));
        if(!cancel && hol.exists() && Array.isArray(hol.data().dates)) setFeriados(new Set(hol.data().dates));
      } catch {}
    })();
    return ()=>{ cancel=true; };
  }, []);

  const minDate = useMemo(()=>fmtDate(new Date()), []);

  // Carrega disponibilidade do dia
  useEffect(() => {
    let cancel=false;
    (async () => {
      try {
        setLoadingSlots(true); setMsgAgendar(null); setHoraSel(''); setHoras([]);
        if (!diaSel) return;
        if (isPastDate(diaSel)) { setMsgAgendar({tipo:'info',texto:'Não é possível marcar em datas passadas.'}); return; }
        if (isWeekend(diaSel)) { setMsgAgendar({tipo:'info',texto:'Apenas dias úteis (segunda a sexta).'}); return; }
        if (feriados.has(diaSel)) { setMsgAgendar({tipo:'info',texto:'Feriado — sem horários disponíveis.'}); return; }

        const ovSnap = await getDoc(doc(db,'schedule_overrides',diaSel));
        const ov = ovSnap.exists()? ovSnap.data(): null;
        if (ov?.closed) { setMsgAgendar({tipo:'info',texto:'Não há sessões neste dia.'}); return; }

        let blocks = [
          ...(config.morning?[config.morning]:[]),
          ...(config.afternoon?[config.afternoon]:[]),
        ];
        if (Array.isArray(ov?.extraBlocks)) blocks=[...blocks, ...ov.extraBlocks];
        if (Array.isArray(ov?.removedBlocks) && ov.removedBlocks.length){
          const rem = mergeBlocks(ov.removedBlocks); const nb=[];
          for(const b of blocks){
            let curr=[{...b}];
            for(const r of rem){
              const next=[];
              for(const seg of curr){
                const s1=mins(seg.start), e1=mins(seg.end), s2=mins(r.start), e2=mins(r.end);
                if(e1<=s2 || e2<=s1) next.push(seg);
                else { if(s1<s2) next.push({start:hhmm(s1), end:hhmm(s2)}); if(e2<e1) next.push({start:hhmm(e2), end:hhmm(e1)}); }
              }
              curr=next;
            }
            nb.push(...curr);
          }
          blocks=nb;
        }

        let slots = slotsFromBlocks(blocks, config.slotMinutes||30);
        if (Array.isArray(ov?.blockedSlots)) {
          const blocked=new Set(ov.blockedSlots);
          slots = slots.filter(s=>!blocked.has(s));
        }

        const snapDay = await getDocs(query(collection(db,'appointments'), where('date','==',diaSel)));
        const booked=new Set(snapDay.docs.map(d=>d.data().hour));
        const livres=slots.filter(s=>!booked.has(s));

        if (!cancel){
          setHoras(livres);
          if (!livres.length) setMsgAgendar({tipo:'info',texto:'Este dia não tem horários disponíveis.'});
        }
      } catch (e) {
        if (!cancel) setMsgAgendar({tipo:'danger',texto:'Falha ao carregar disponibilidade do dia.'});
      } finally {
        if (!cancel) setLoadingSlots(false);
      }
    })();
    return ()=>{ cancel=true; };
  }, [diaSel, config, feriados]);


  // -------- Submeter Agendamento (grava e envia e-mails) --------
  async function submeterAgendamento(e) {
    e.preventDefault();
    setMsgAgendar(null);

    if (!formAgendar.nome || !formAgendar.email || !diaSel || !horaSel) {
      setMsgAgendar({ tipo: 'danger', texto: 'Preenche nome, e-mail, dia e hora.' });
      return;
    }
    if (isPastDate(diaSel) || isWeekend(diaSel) || feriados.has(diaSel)) {
      setMsgAgendar({ tipo: 'danger', texto: 'Dia indisponível para marcação.' });
      return;
    }

    try {
      setEnviando(true);

      const apptId = `${diaSel}_${horaSel}`;
      const apptRef = doc(db, 'appointments', apptId);

      await runTransaction(db, async (tx) => {
        const existing = await tx.get(apptRef);
        if (existing.exists()) throw new Error('Esse horário acabou de ser reservado por outra pessoa.');
        tx.set(apptRef, {
          name: formAgendar.nome,
          email: formAgendar.email,
          date: diaSel,
          hour: horaSel,
          status: 'confirmed',
          createdAt: serverTimestamp(),
        });
      });

      // E-mail + calendário (Apps Script)
      try {
        await fetch(APPSCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: TOKEN_PARTILHADO,
            type: 'create', // <<< importante para o Apps Script
            name: formAgendar.nome,
            email: formAgendar.email,
            date: diaSel,
            hour: horaSel,
          }),
        });
      } catch (err) {
        console.warn('Falha ao chamar o Apps Script:', err);
      }

      setMsgAgendar({ tipo: 'success', texto: 'Sessão confirmada! Enviámos um e-mail com os detalhes.' });
      setFormAgendar({ nome: '', email: '' });
      setHoraSel('');
      setLoadingSlots(true);
      setDiaSel((d) => d);
    } catch (e) {
      console.error(e);
      setMsgAgendar({ tipo: 'danger', texto: e.message || 'Não foi possível marcar. Tenta de novo.' });
    } finally {
      setEnviando(false);
    }
  }

  // -------- Consultar Agendamentos --------
  async function consultarAgendamentos(e){
    e.preventDefault();
    setMsgConsulta(null); setListaAgendamentos(null);
    if (!emailConsulta){ setMsgConsulta({tipo:'danger',texto:'Introduz o teu e-mail.'}); return; }
    try{
      setLoadingConsulta(true);
      const snapAll = await getDocs(query(collection(db,'appointments'), where('email','==',emailConsulta)));
      const todos = snapAll.docs.map(d=>({ id:d.id, ...d.data() }))
        .sort((a,b)=>`${a.date||''}T${a.hour||''}`.localeCompare(`${b.date||''}T${b.hour||''}`));
      setListaAgendamentos(todos);
      if (!todos.length) setMsgConsulta({tipo:'info',texto:'Sem marcações para este e-mail.'});
    }catch{
      setMsgConsulta({tipo:'danger',texto:'Não foi possível carregar as tuas marcações.'});
    }finally{ setLoadingConsulta(false); }
  }

  // --------- REAGENDAR ---------
  function abrirReagendar(agendamento) {
    setReservaReagendar(agendamento);
    setNovoDia(agendamento.date);
    setNovaHora('');
    setMsgReagendar(null);
    setShowReagendar(true);
  }

  async function getSlotsLivresParaDia(dia) {
    if (isPastDate(dia) || isWeekend(dia) || feriados.has(dia)) return [];
    const ovSnap = await getDoc(doc(db,'schedule_overrides',dia));
    const ov = ovSnap.exists() ? ovSnap.data() : null;
    if (ov?.closed) return [];

    let blocks = [
      ...(config.morning ? [config.morning] : []),
      ...(config.afternoon ? [config.afternoon] : []),
    ];
    if (Array.isArray(ov?.extraBlocks)) blocks=[...blocks, ...ov.extraBlocks];
    if (Array.isArray(ov?.removedBlocks) && ov.removedBlocks.length){
      const rem = mergeBlocks(ov.removedBlocks); const nb=[];
      for(const b of blocks){
        let curr=[{...b}];
        for(const r of rem){
          const next=[];
          for(const seg of curr){
            const s1=mins(seg.start), e1=mins(seg.end), s2=mins(r.start), e2=mins(r.end);
            if(e1<=s2 || e2<=s1) next.push(seg);
            else { if(s1<s2) next.push({start:hhmm(s1), end:hhmm(s2)}); if(e2<e1) next.push({start:hhmm(e2), end:hhmm(e1)}); }
          }
          curr=next;
        }
        nb.push(...curr);
      }
      blocks=nb;
    }

    let slots = slotsFromBlocks(blocks, config.slotMinutes||30);
    if (Array.isArray(ov?.blockedSlots)) {
      const blocked=new Set(ov.blockedSlots);
      slots = slots.filter(s=>!blocked.has(s));
    }
    const snapDay = await getDocs(query(collection(db,'appointments'), where('date','==',dia)));
    const booked=new Set(snapDay.docs.map(d=>d.data().hour));
    return slots.filter(s=>!booked.has(s));
  }

  useEffect(() => {
    if (!showReagendar) return;
    let cancel=false;
    (async ()=>{
      setLoadingReagendar(true); setMsgReagendar(null); setNovaHora(''); setHorasReagendar([]);
      const livres = await getSlotsLivresParaDia(novoDia);
      if (!cancel) setHorasReagendar(livres);
      setLoadingReagendar(false);
    })();
    return ()=>{ cancel=true; };
  }, [showReagendar, novoDia, config, feriados]);

  async function reagendarAgendamento() {
    if (!reservaReagendar || !novoDia || !novaHora) {
      setMsgReagendar({ tipo:'danger', texto:'Seleciona um dia e hora válidos.' });
      return;
    }
    if (isPastDate(novoDia) || isWeekend(novoDia) || feriados.has(novoDia)) {
      setMsgReagendar({ tipo:'danger', texto:'Dia indisponível para reagendar.' });
      return;
    }

    try {
      setLoadingReagendar(true);
      const oldRef = doc(db, 'appointments', reservaReagendar.id);
      const newId  = `${novoDia}_${novaHora}`;
      const newRef = doc(db, 'appointments', newId);

      await runTransaction(db, async (tx) => {
        const dest = await tx.get(newRef);
        if (dest.exists()) throw new Error('Este horário acabou de ser reservado.');
        const src = await tx.get(oldRef);
        if (!src.exists()) throw new Error('A reserva original já não existe.');

        const data = src.data();
        tx.set(newRef, {
          ...data,
          date: novoDia,
          hour: novaHora,
          previous: { id: reservaReagendar.id, date: data.date, hour: data.hour },
          createdAt: serverTimestamp(),
        });
        tx.delete(oldRef);
      });

      // E-mail + atualizar evento de calendário (Apps Script)
      try {
        await fetch(APPSCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: TOKEN_PARTILHADO,
            type: 'reschedule',
            name: reservaReagendar.name,
            email: reservaReagendar.email,
            oldDate: reservaReagendar.date,
            oldHour: reservaReagendar.hour,
            newDate: novoDia,
            newHour: novaHora,
          }),
        });
      } catch (err) {
        console.warn('Falha ao notificar reagendamento:', err);
      }

      setShowReagendar(false);
      setMsgConsulta({ tipo:'success', texto:`Reagendado para ${novoDia} às ${novaHora}.` });
      await consultarAgendamentos(new Event('submit', { cancelable: true }));
      if (diaSel === novoDia || diaSel === reservaReagendar.date) setDiaSel(d=>d);
    } catch (e) {
      setMsgReagendar({ tipo:'danger', texto: e.message || 'Não foi possível reagendar.' });
    } finally {
      setLoadingReagendar(false);
    }
  }

   if (!userData) return <Loading message="A carregar Sessões com o Psicólogo..." />;

  // -------- UI --------
  return (
    <div className="container-fluid vh-100 p-0">
      <Navbar />
      <div className="row h-100 m-0">
        <Sidebar />
        <main className="col px-4 py-4" style={{ backgroundColor: '#FBF9F9' }}>
          <div className="container p-4 bg-white rounded shadow-sm">
            <h2 className="mb-3 fw-semibold" style={{ color: '#99CBC8' }}>
              Sessões com o Psicólogo
            </h2>
         <p className="text-muted" style={{ fontSize: '1rem' }}>
          Aqui podes agendar as tuas sessões e ver as tuas marcações.
        </p>

            {/* Tabs */}
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                      type="button"
                      className="nav-link fw-semibold"
                      onClick={()=>setTab('agendar')}
                      role="tab"
                      aria-selected={tab==='agendar'}
                      style={tab==='agendar'
                        ? { backgroundColor:'#99CBC8', color:'#fff', borderRadius:'6px 6px 0 0', padding:'10px 18px', border:'none' }
                        : { backgroundColor:'transparent', color:'#234970', padding:'10px 18px', border:'none' }}
                    >
                      Agendar
                    </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                    type="button"
                    className="nav-link fw-semibold"
                    onClick={()=>setTab('meus')}
                    role="tab"
                    aria-selected={tab==='meus'}
                    style={tab==='meus'
                      ? { backgroundColor:'#99CBC8', color:'#fff', borderRadius:'6px 6px 0 0', padding:'10px 18px', border:'none' }
                      : { backgroundColor:'transparent', color:'#234970', padding:'10px 18px', border:'none' }}
                  >
                    As minhas marcações
                  </button>
              </li>
            </ul>

            <div className="tab-content pt-3">
              {/* ------- Agendar ------- */}
              {tab==='agendar' && (
                <div className="tab-pane active" role="tabpanel">
                  {msgAgendar && (
                      <div
                        className="alert"
                        role="alert"
                        style={
                          msgAgendar.tipo==='success'
                            ? { background:'#FBF9F9', color:'#99CBC8', border:'none' }
                            : msgAgendar.tipo==='info'
                              ? { background:'#fbf9f9', color:'#234970', border:'none' }
                              : { background:'#fbf9f9', color:'#c72c41', border:'none' }
                        }
                      >
                        {msgAgendar.texto}
                      </div>
                    )}

                  {/* Dia */}
                  <div className="row g-2 mb-3">
                    <div className="col-auto">
                      <label className="form-label">Dia</label>
                      <input
                        type="date"
                        className="form-control"
                        value={diaSel}
                        min={minDate}
                        onChange={e=>setDiaSel(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Horários */}
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Horário{username}</label>
                      <div className="d-flex flex-wrap gap-2" aria-live="polite">
                        {loadingSlots && <span className="text-muted">A carregar…</span>}
                        {!loadingSlots && !horas.length && <span className="text-muted">Sem horários para este dia.</span>}
                        {horas.map(h=>(
                         <button
                              key={h}
                              type="button"
                              onClick={()=>setHoraSel(h)}
                              aria-pressed={horaSel===h}
                              style={horaSel===h
                                ? { background:'#99CBC8', color:'#fff', border:'1.5px solid #99CBC8', borderRadius:8, padding:'6px 10px' }
                                : { background:'transparent', color:'#99CBC8', border:'1.5px solid #99CBC8', borderRadius:8, padding:'6px 10px' }
                              }
                            >
                              {h}
                            </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  {/* Formulário */}
                  
                  <form onSubmit={submeterAgendamento} className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label">Nome</label>
                      <input
                        className="form-control"
                        value={formAgendar.nome}
                        onChange={e=>setFormAgendar(f=>({...f, nome:e.target.value}))}
                        required
                        disabled={!horaSel}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">E-mail</label>
                      <input
                        type="email"
                        className="form-control"
                        value={formAgendar.email}
                        onChange={e=>setFormAgendar(f=>({...f, email:e.target.value}))}
                        required
                        disabled={!horaSel}
                      />
                    </div>
                    
                    <div className="col-12">
                      <button
                            type="submit"
                            disabled={enviando||!diaSel||!horaSel}
                            style={{
                              backgroundColor:'#99CBC8',
                              color:'#fff',
                              border:'none',
                              fontWeight:600,
                              padding:'8px 18px',
                              borderRadius:8,
                              opacity:(enviando||!diaSel||!horaSel)?0.7:1,
                              cursor:(enviando||!diaSel||!horaSel)?'not-allowed':'pointer'
                            }}
                          >
                        {enviando ? 'A marcar…' : `Marcar${diaSel && horaSel ? ` (${diaSel} às ${horaSel})` : ''}`}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ------- Meus Agendamentos ------- */}
              {tab==='meus' && (
                <div className="tab-pane active" role="tabpanel">
                  {msgConsulta && (
                        <div
                          className="alert"
                          role="alert"
                          style={
                            msgConsulta.tipo==='success'
                              ? { background:'#FBF9F9', color:'#99CBC8', border:'none'  }
                              : msgConsulta.tipo==='info'
                                ? { background:'#fbf9f9', color:'#234970', border:'none' }
                                : { background:'#fbf9f9', color:'#c72c41', border:'none'}
                          }
                        >
                          {msgConsulta.texto}
                        </div>
                      )}

                  <form onSubmit={consultarAgendamentos} className="mb-3">
                    <label className="form-label">O teu e-mail</label>
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="teuemail@exemplo.com"
                        value={emailConsulta}
                        onChange={e=>setEmailConsulta(e.target.value)}
                        required
                      />
                      <button
                              type="submit"
                              disabled={loadingConsulta}
                              style={{
                                backgroundColor:'#99CBC8',
                                color:'#fff',
                                border:'none',
                                fontWeight:600,
                                padding:'8px 18px',
                                borderRadius:8,
                                opacity:loadingConsulta?0.7:1,
                                cursor:loadingConsulta?'not-allowed':'pointer'
                              }}
                            >
                        {loadingConsulta?'A procurar…':'Ver'}
                      </button>
                    </div>
                  </form>

                  {listaAgendamentos && (
                    <div className="row g-4">
                      <div className="col-12">
                        <h5 className="fw-semibold" style={{ color: '#234970' }}>As minhas sessões</h5>
                        {listaAgendamentos.length ? (
                          <ul className="list-group">
                            {listaAgendamentos.map(a=>(
                              <li key={a.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <span><strong>{a.date}</strong> às <strong>{a.hour}</strong></span>
                                <div className="d-flex gap-2">
                                      <span
                                        className="align-self-center"
                                        style={{ background:'#99CBC8', color:'#fff', borderRadius:12, padding:'4px 10px', fontSize:12 }}
                                      >
                                        Confirmado
                                      </span>
                                      <button
                                        onClick={()=>abrirReagendar(a)}
                                        style={{
                                          border:'2px solid #99CBC8',
                                          color:'#99CBC8',
                                          background:'transparent',
                                          fontWeight:600,
                                          borderRadius:8,
                                          padding:'4px 12px'
                                        }}
                                      >
                                        Reagendar
                                      </button>
                                    </div>
                              </li>
                            ))}
                          </ul>
                        ) : (<p className="text-muted">Sem sessões.</p>)}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ---- Modal Reagendar ---- */}
         {showReagendar && (
                  <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background:'rgba(0,0,0,0.35)' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-content">

                        <div className="modal-header">
                          <h5 className="modal-title" style={{ color: '#234970', fontWeight: 700 }}>
                            Reagendar sessão
                          </h5>
                          <button type="button" className="btn-close" aria-label="Fechar" onClick={()=>setShowReagendar(false)} />
                        </div>
                     {/* Body */}
                          <div className="modal-body">
                            {msgReagendar && (
                              <div
                                className="alert"
                                role="alert"
                                style={
                                  msgReagendar.tipo==='success'
                                    ? { background:'#FBF9F9', color:'#99CBC8', border:'none' }
                                    : msgReagendar.tipo==='info'
                                      ? { background:'#fbf9f9', color:'#234970', border:'none' }
                                      : { background:'#fbf9f9', color:'#c72c41', border:'none' }
                                }
                              >
                                {msgReagendar.texto}
                              </div>
                            )}

                            <div className="mb-3">
                              <label className="form-label">Novo dia</label>
                              <input
                                type="date"
                                className="form-control"
                                value={novoDia}
                                min={minDate}
                                onChange={e=>setNovoDia(e.target.value)}
                              />
                            </div>

                            <div className="mb-2">
                              <label className="form-label">Nova hora</label>
                              <div className="d-flex flex-wrap gap-2">
                                {loadingReagendar && <span className="text-muted">A carregar…</span>}
                                {!loadingReagendar && horasReagendar.length===0 && (
                                  <span className="text-muted">Sem horários livres neste dia.</span>
                                )}
                                {horasReagendar.map(h=>(
                                  <button
                                    key={h}
                                    type="button"
                                    onClick={()=>setNovaHora(h)}
                                    style={novaHora===h
                                      ? { background:'#99CBC8', color:'#fff', border:'1.5px solid #99CBC8', borderRadius:8, padding:'6px 10px' }
                                      : { background:'transparent', color:'#99CBC8', border:'1.5px solid #99CBC8', borderRadius:8, padding:'6px 10px' }
                                    }
                                  >
                                    {h}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="modal-footer">
                            <button
                              onClick={()=>setShowReagendar(false)}
                              style={{
                                background:'#FBF9F9',
                                color:'#234970',
                                border:'none',
                                borderRadius:8,
                                padding:'8px 16px',
                                fontWeight:600
                              }}
                            >
                              Fechar
                            </button>

                            <button
                              onClick={reagendarAgendamento}
                              disabled={!novaHora || loadingReagendar}
                              style={{
                                background:'#99CBC8',
                                color:'#fff',
                                border:'none',
                                borderRadius:8,
                                padding:'8px 16px',
                                fontWeight:600,
                                opacity:(!novaHora||loadingReagendar)?0.7:1,
                                cursor:(!novaHora||loadingReagendar)?'not-allowed':'pointer'
                              }}
                            >
                              {loadingReagendar ? 'A reagendar…' : 'Confirmar'}
                            </button>
                          </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}