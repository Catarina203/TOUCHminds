import React, { useState, useContext, useEffect, useMemo } from 'react';
import { UserContext } from '../../../App';

const AtividadeSemanal2 = () => {
  const { userData, updateUserData } = useContext(UserContext);

  const modulos = userData?.modulos || {};
  const modulo2 = modulos.modulo2 || {};
  const desafioSemanal = Array.isArray(modulo2.desafioSemanal) ? modulo2.desafioSemanal : [];

  const migrateOldShapeToArray = (entry) => {
    if (!entry) return [];
    if (Array.isArray(entry.situacoes)) return entry.situacoes;

    const pares = [];
    for (let i = 1; i <= 50; i++) {
      const d = entry[`dia_${i}`];
      const s = entry[`situacao_${i}`];
      const r = entry[`reflexao_${i}`];
      if ((d && d.trim() !== '') || (s && s.trim() !== '') || (r && r.trim() !== '')) {
        pares.push({ dia: d || '', situacao: s || '', reflexao: r || '' });
      }
    }
    return pares;
  };

  const initialSituacoes = useMemo(() => {
    const ultimo = desafioSemanal.slice(-1)[0];
    const arr = migrateOldShapeToArray(ultimo);
    return arr.length > 0 ? arr : [{ dia: '', situacao: '', reflexao: '' }];
  }, [desafioSemanal]);

  const [situacoes, setSituacoes] = useState(initialSituacoes);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setSituacoes(initialSituacoes);
  }, [initialSituacoes]);

  const handleChange = (index, field, value) => {
    setSituacoes((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addLinha = () => {
    setSituacoes((prev) => [...prev, { dia: '', situacao: '', reflexao: '' }]);
  };

  const removeLinha = (index) => {
    setSituacoes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const hasContent = situacoes.some(
      (s) =>
        (s.dia && s.dia.trim() !== '') ||
        (s.situacao && s.situacao.trim() !== '') ||
        (s.reflexao && s.reflexao.trim() !== '')
    );

    if (!hasContent) {
      setFeedback('Por favor, preenche pelo menos uma situação.');
      return;
    }

    const situacoesFiltradas = situacoes.filter(
      (s) =>
        (s.dia && s.dia.trim() !== '') ||
        (s.situacao && s.situacao.trim() !== '') ||
        (s.reflexao && s.reflexao.trim() !== '')
    );

    const entradaExistente = desafioSemanal[0];
    const dataCriacao = entradaExistente?.dataCriacao || new Date().toLocaleString('pt-PT');

    const novoRegisto = {
      situacoes: situacoesFiltradas,
      dataCriacao,
      ultimaAtualizacao: new Date().toLocaleString('pt-PT'),
    };

    try {
      setLoading(true);
      setFeedback('');

      const modulosAtualizados = {
        ...modulos,
        modulo2: {
          ...modulo2,
          desafioSemanal: [novoRegisto],
        },
      };

      await updateUserData({ ...userData, modulos: modulosAtualizados });
      setFeedback('Registo adicionado com sucesso!');
    } catch (e) {
      setFeedback('Erro ao guardar. Tenta novamente.');
    } finally {
      setLoading(false);
    }
  };

  const entradaAtual = desafioSemanal[0] || null;
  const temRegisto = !!entradaAtual;

  return (
    <div className="bg-white">
      <h4 className="mb-4" style={{ color: "#99CBC8" }}>
        <span
          style={{
            borderBottom: "3px solid #99CBC8",
            display: "inline-block",
            paddingBottom: "2px",
          }}
        >
          Desafio Semanal
        </span>
      </h4>

      <div className="mb-4 lead">
        <b className="fw-bold">Queria lançar-te um desafio para esta semana!</b><br /><br />
        Ao longo dos próximos dias, fica <b>atento/a</b> a <b>conversas, comentários ou atitudes</b> em que percebes o <b>estigma</b> relacionado à ansiedade.<br /><br />
        Pode ser algo que ouças em <b>conversas</b>, vejas nas <b>redes sociais</b> ou observes em situações do teu <b>dia-a-dia</b>.<br /><br />
        Depois de <b>notares</b> o que está a acontecer, convido-te a <b>refletir</b> sobre como poderias <b>intervir</b> ou <b>apoiar</b> a pessoa envolvida.<br /><br />
        Podes usar esta <b>tabela</b> para registares:
        <ul>
          <li><b>Dia:</b> Escreve aqui o dia da semana.</li>
          <li><b>Situação Observada:</b> Descrição breve da situação.</li>
          <li><b>Reflexão/Resposta Empática:</b> Como poderias responder ou agir de forma empática.</li>
        </ul>
      </div>

      <div className="table-responsive mb-2">
        <table className="table table-bordered text-center align-middle">
          <thead>
            <tr>
              <th style={{ backgroundColor: "#E7C8C2", color: "#234970" }}>Dia</th>
              <th style={{ backgroundColor: "#E7C8C2", color: "#234970" }}>Situação Observada</th>
              <th style={{ backgroundColor: "#E7C8C2", color: "#234970" }}>Reflexão/Resposta Empática</th>
              <th style={{ backgroundColor: "#E7C8C2", color: "#234970", width: 120 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {situacoes.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Escreve aqui o dia da semana"
                    value={item.dia}
                    onChange={(e) => handleChange(idx, 'dia', e.target.value)}
                  />
                </td>
                <td>
                  <textarea
                    className="form-control"
                    placeholder="Descreve aqui brevemente a situação"
                    rows={2}
                    style={{ resize: 'vertical' }}
                    value={item.situacao}
                    onChange={(e) => handleChange(idx, 'situacao', e.target.value)}
                  />
                </td>
                <td>
                  <textarea
                    className="form-control"
                    placeholder="Escreve aqui a tua reflexão de como poderias responder ou agir nessa situação"
                    rows={2}
                    style={{ resize: 'vertical' }}
                    value={item.reflexao}
                    onChange={(e) => handleChange(idx, 'reflexao', e.target.value)}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeLinha(idx)}
                    disabled={situacoes.length === 1}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={addLinha}
          >
            + Adicionar situação
          </button>
        </div>

        <div className="mt-3 lead">
          Ao <b>tirares estes minutos para refletires</b> sobre o que aprendeste e qual pode ser o teu <b>papel</b> nestas situações, estarás a reduzir o <b>estigma</b> e a fortalecer a <b>empatia</b>.<br /><br />
          <b>Vamos em frente! #DesmistificarAnsiedade</b>
          <p>Até para a semana!</p>
        </div>
      </div>

      <div className="mt-3 text-start">
        <button
          onClick={handleSave}
          className="btn"
          style={{
            backgroundColor: "#66BFBF",
            color: "white",
            fontWeight: "600",
            borderRadius: "8px",
            fontSize: "1.05rem",
          }}
          disabled={loading}
        >
          {loading ? (
            <div className="d-flex align-items-center justify-content-center">
              <div className="spinner-border spinner-border-sm me-2" role="status">
                <span className="visually-hidden">A processar...</span>
              </div>
              A processar...
            </div>
          ) : (
            "Guardar alterações"
          )}
        </button>
      </div>

      {feedback && (
        <div className={`alert ${feedback.includes("sucesso") ? "alert-success" : "alert-danger"} mt-3`}>
          {feedback}
        </div>
      )}

      {temRegisto && Array.isArray(entradaAtual.situacoes) && entradaAtual.situacoes.length > 0 && (
        <>
          <h5 className="mt-5">Registo atual (único):</h5>
          <p className="text-muted mb-2">
            Criado em: {entradaAtual.dataCriacao} {entradaAtual.ultimaAtualizacao ? `• Última atualização: ${entradaAtual.ultimaAtualizacao}` : ''}
          </p>
          <div className="table-responsive">
            <table className="table table-bordered text-center align-middle">
              <thead>
                <tr>
                  <th>Dia</th>
                  <th>Situação Observada</th>
                  <th>Reflexão/Resposta Empática</th>
                </tr>
              </thead>
              <tbody>
                {entradaAtual.situacoes.map((s, i) => (
                  <tr key={i}>
                    <td>{s.dia}</td>
                    <td>{s.situacao}</td>
                    <td>{s.reflexao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AtividadeSemanal2;