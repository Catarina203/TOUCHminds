import React, { useContext, useEffect, useMemo, useState } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Loading from './loading';
import { UserContext } from '../App';

// Firebase
import { db } from '../data/database';
import {
collection,
 doc,
addDoc,
getDoc,
getDocs,
query,
where,
serverTimestamp,
FieldPath,
} from 'firebase/firestore';

function fmtDate(d) {
  return new Date(d).toISOString().split('T')[0];
}

function SessoesPsicologo() {
  const { userData } = useContext(UserContext);

  // Tabs: 'agendar' | 'meus'
  const [tab, setTab] = useState('agendar');

  // ---------- Estado (Agendar) ----------
  const [range, setRange] = useState({
    from: fmtDate(new Date()),
    to: fmtDate(new Date(Date.now() + 1000 * 60 * 60 * 24 * 14)), // 14 dias
  });
  const [dias, setDias] = useState([]); // [{ data: 'YYYY-MM-DD', horas: ['HH:MM', ...] }]
  const [diaSel, setDiaSel] = useState('');
  const [horaSel, setHoraSel] = useState('');
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [msgAgendar, setMsgAgendar] = useState(null);
  const [formAgendar, setFormAgendar] = useState({ nome: '', email: '' });

  // ---------- Estado (Meus Agendamentos) ----------
  const [emailConsulta, setEmailConsulta] = useState('');
  const [resConsulta, setResConsulta] = useState(null); // { pendentes: [], confirmados: [] }
  const [loadingConsulta, setLoadingConsulta] = useState(false);
  const [msgConsulta, setMsgConsulta] = useState(null);

  // Carrega disponibilidade (coleção 'slots' com docs ID = 'YYYY-MM-DD' e campo 'hours': string[])
  useEffect(function carregarDisponibilidade() {
    let cancelado = false;

    async function run() {
      try {
        setLoadingSlots(true);

    const qSlots = query(
    slotsCol,
    where(FieldPath.documentId(), '>=', range.from),
    where(FieldPath.documentId(), '<=', range.to)
     );

        const snap = await getDocs(qSlots);
        let data = snap.docs.map((d) => ({
          data: d.id,
          horas: Array.isArray(d.data().hours) ? d.data().hours : [],
        }));

        // ordena por data asc
        data.sort((a, b) => a.data.localeCompare(b.data));

        if (!cancelado) {
          setDias(data);
          setDiaSel('');
          setHoraSel('');
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelado) setLoadingSlots(false);
      }
    }

    run();
    return () => {
      cancelado = true;
    };
  }, [range.from, range.to]);

  const horasDoDia = useMemo(
    () => dias.find((d) => d.data === diaSel)?.horas || [],
    [dias, diaSel]
  );

  if (!userData) return <Loading message="A carregar Sessões com o Psicólogo..." />;

  // ---- handlers (Agendar)
  async function submeterAgendamento(e) {
    e.preventDefault();
    setMsgAgendar(null);

    if (!formAgendar.nome || !formAgendar.email || !diaSel || !horaSel) {
      setMsgAgendar({ tipo: 'danger', texto: 'Preenche nome, e-mail, dia e hora.' });
      return;
    }

    try {
      setEnviando(true);

      // Valida que o slot ainda existe
      const slotRef = doc(db, 'slots', diaSel);
      const slotSnap = await getDoc(slotRef);
      const hours = slotSnap.exists() ? slotSnap.data().hours || [] : [];
      if (!hours.includes(horaSel)) {
        throw new Error('Esse horário já não está disponível.');
      }

      await addDoc(collection(db, 'appointments'), {
        name: formAgendar.nome,
        email: formAgendar.email,
        date: diaSel,
        hour: horaSel,
        status: 'pending', // o admin confirma depois
        createdAt: serverTimestamp(),
      });

      setMsgAgendar({
        tipo: 'success',
        texto: 'Pedido enviado! Receberás um e-mail quando for confirmado.',
      });
      setFormAgendar({ nome: '', email: '' });
      setDiaSel('');
      setHoraSel('');
    } catch (e) {
      console.error(e);
      setMsgAgendar({
        tipo: 'danger',
        texto: e.message || 'Não foi possível enviar. Tenta de novo.',
      });
    } finally {
      setEnviando(false);
    }
  }

  // ---- handlers (Meus Agendamentos)
  async function consultarAgendamentos(e) {
    e.preventDefault();
    setMsgConsulta(null);
    setResConsulta(null);

    if (!emailConsulta) {
      setMsgConsulta({ tipo: 'danger', texto: 'Introduz o teu e-mail.' });
      return;
    }

    try {
      setLoadingConsulta(true);

      // Busca todos os appointments por e-mail e filtra em memória
      const qAll = query(collection(db, 'appointments'), where('email', '==', emailConsulta));
      const snapAll = await getDocs(qAll);
      const todos = snapAll.docs.map((d) => ({ id: d.id, ...d.data() }));

      // separa e ordena por data+hora
      const toKey = (it) => `${it.date || ''}T${it.hour || ''}`;
      const pendentes = todos.filter((a) => a.status === 'pending').sort((a, b) => toKey(a).localeCompare(toKey(b)));
      const confirmados = todos.filter((a) => a.status === 'confirmed').sort((a, b) => toKey(a).localeCompare(toKey(b)));

      setResConsulta({ pendentes, confirmados });

      if (!pendentes.length && !confirmados.length) {
        setMsgConsulta({ tipo: 'info', texto: 'Sem agendamentos para este e-mail.' });
      }
    } catch (e) {
      console.error(e);
      setMsgConsulta({ tipo: 'danger', texto: 'Não foi possível carregar os teus agendamentos.' });
    } finally {
      setLoadingConsulta(false);
    }
  }

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
            <p className="text-muted">
              Aqui podes <strong>agendar</strong> a tua sessão online e <strong>ver os teus agendamentos</strong>.
            </p>

            {/* Tabs */}
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  type="button"
                  className={`nav-link ${tab === 'agendar' ? 'active' : ''}`}
                  onClick={() => setTab('agendar')}
                  role="tab"
                  aria-selected={tab === 'agendar'}
                >
                  Agendar
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  type="button"
                  className={`nav-link ${tab === 'meus' ? 'active' : ''}`}
                  onClick={() => setTab('meus')}
                  role="tab"
                  aria-selected={tab === 'meus'}
                >
                  Meus Agendamentos
                </button>
              </li>
            </ul>

            <div className="tab-content pt-3">
              {/* ----------- Tab Agendar ----------- */}
              {tab === 'agendar' && (
                <div className="tab-pane active" role="tabpanel">
                  {msgAgendar && (
                    <div className={`alert alert-${msgAgendar.tipo}`} role="alert">
                      {msgAgendar.texto}
                    </div>
                  )}

                  {/* Intervalo para navegar na disponibilidade */}
                  <div className="row g-2 mb-3">
                    <div className="col-auto">
                      <label className="form-label">De</label>
                      <input
                        type="date"
                        className="form-control"
                        value={range.from}
                        onChange={(e) => setRange((r) => ({ ...r, from: e.target.value }))}
                      />
                    </div>
                    <div className="col-auto">
                      <label className="form-label">Até</label>
                      <input
                        type="date"
                        className="form-control"
                        value={range.to}
                        onChange={(e) => setRange((r) => ({ ...r, to: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="row g-3">
                    {/* Dias */}
                    <div className="col-12 col-lg-6">
                      <label className="form-label">Dias disponíveis</label>
                      <div className="list-group" style={{ maxHeight: 320, overflowY: 'auto' }}>
                        {loadingSlots && <div className="list-group-item">A carregar…</div>}
                        {!loadingSlots && dias.length === 0 && (
                          <div className="list-group-item">Sem disponibilidade neste intervalo.</div>
                        )}
                        {!loadingSlots &&
                          dias.map((d) => (
                            <button
                              key={d.data}
                              type="button"
                              className={`list-group-item list-group-item-action ${
                                diaSel === d.data ? 'active' : ''
                              }`}
                              onClick={() => {
                                setDiaSel(d.data);
                                setHoraSel('');
                              }}
                              aria-pressed={diaSel === d.data}
                            >
                              {d.data}
                            </button>
                          ))}
                      </div>
                    </div>

                    {/* Horas */}
                    <div className="col-12 col-lg-6">
                      <label className="form-label">Horários</label>
                      <div className="d-flex flex-wrap gap-2" aria-live="polite">
                        {diaSel && horasDoDia.length === 0 && (
                          <span className="text-muted">Sem horários para este dia.</span>
                        )}
                        {horasDoDia.map((h) => (
                          <button
                            key={h}
                            type="button"
                            className={`btn ${horaSel === h ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setHoraSel(h)}
                            aria-pressed={horaSel === h}
                          >
                            {h}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  {/* Formulário nome + email */}
                  <form onSubmit={submeterAgendamento} className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label">Nome</label>
                      <input
                        className="form-control"
                        value={formAgendar.nome}
                        onChange={(e) => setFormAgendar((f) => ({ ...f, nome: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">E-mail</label>
                      <input
                        type="email"
                        className="form-control"
                        value={formAgendar.email}
                        onChange={(e) => setFormAgendar((f) => ({ ...f, email: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <button
                        className="btn btn-success"
                        type="submit"
                        disabled={enviando || !diaSel || !horaSel}
                      >
                        {enviando
                          ? 'A enviar…'
                          : `Pedir ${diaSel && horaSel ? `(${diaSel} às ${horaSel})` : 'agendamento'}`}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ----------- Tab Meus Agendamentos ----------- */}
              {tab === 'meus' && (
                <div className="tab-pane active" role="tabpanel">
                  {msgConsulta && (
                    <div className={`alert alert-${msgConsulta.tipo}`} role="alert">
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
                        onChange={(e) => setEmailConsulta(e.target.value)}
                        required
                      />
                      <button className="btn btn-primary" type="submit" disabled={loadingConsulta}>
                        {loadingConsulta ? 'A procurar…' : 'Ver'}
                      </button>
                    </div>
                  </form>

                  {resConsulta && (
                    <div className="row g-4">
                      <div className="col-12 col-lg-6">
                        <h5 className="fw-semibold" style={{ color: '#234970' }}>
                          Confirmados
                        </h5>
                        {resConsulta.confirmados?.length ? (
                          <ul className="list-group">
                            {resConsulta.confirmados.map((a) => (
                              <li
                                key={a.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                              >
                                <span>
                                  <strong>{a.date}</strong> às <strong>{a.hour}</strong>
                                </span>
                                <span className="badge bg-success">Confirmado</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-muted">Nenhum confirmado.</p>
                        )}
                      </div>

                      <div className="col-12 col-lg-6">
                        <h5 className="fw-semibold" style={{ color: '#234970' }}>
                          Pendentes
                        </h5>
                        {resConsulta.pendentes?.length ? (
                          <ul className="list-group">
                            {resConsulta.pendentes.map((a) => (
                              <li
                                key={a.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                              >
                                <span>
                                  <strong>{a.date}</strong> às <strong>{a.hour}</strong>
                                </span>
                                <span className="badge bg-warning text-dark">Aguarda confirmação</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-muted">Nenhum pendente.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default SessoesPsicologo;