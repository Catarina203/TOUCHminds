import React, { useState, useContext } from 'react';
import { UserContext } from '../../../App';

const DesafioSemanal5 = ({ id }) => {
  const { userData, updateUserData } = useContext(UserContext);

  const [form, setForm] = useState({
    situacao: '',
    fonteAjuda: '',
    motivo: '',
  });

  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    if (feedbackType === 'error' && value.trim() !== '') {
      setFeedbackMessage('');
      setFeedbackType('');
    }
  };

  const handleAdd = async () => {
    if (Object.values(form).some((val) => val.trim() === '')) {
      setFeedbackMessage('Por favor, preenche todos os campos.');
      setFeedbackType('error');
      return;
    }

    const novoRegisto = {
      ...form,
      dataCriacao: new Date().toLocaleString('pt-PT'),
    };

    try {
      setLoading(true);
      setFeedbackMessage('');
      setFeedbackType('');

      const chaveModulo = `modulo${String(id)}`;
      const modulosSafe = userData?.modulos ?? {};
      const atual = modulosSafe[chaveModulo] ?? {};

      const modulosAtualizados = {
        ...modulosSafe,
        [chaveModulo]: {
          ...atual,
          desafioSemanal: [
            ...(atual.desafioSemanal ?? []),
            novoRegisto,
          ],
        },
      };

      await updateUserData({
        ...(userData ?? {}),
        modulos: modulosAtualizados,
      });

      setFeedbackMessage('Registo adicionado com sucesso!');
      setFeedbackType('success');

      setForm({
        situacao: '',
        fonteAjuda: '',
        motivo: '',
      });

    } catch (error) {
      setFeedbackMessage('Erro ao guardar. Tenta novamente.');
      setFeedbackType('error');
    } finally {
      setLoading(false);
    }
  };

  const chaveModulo = `modulo${String(id)}`;
  const registos =
    userData?.modulos?.[chaveModulo]?.desafioSemanal ?? [];

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
        <p className="mb-3 fw-bold">
          Queria lançar-te um desafio para esta semana!
        </p>

        <p className="mb-3">
          Identifica uma <strong>situação durante esta semana</strong> em que sintas <strong>desconforto</strong> ou <strong>dificuldade em lidar com ela</strong>,
          e em que habitualmente <strong>não recorres a nenhuma fonte de ajuda</strong>, nem nessa situação nem em outras similares.
        </p>

        <p className="mb-3">
          Tenta <strong>refletir</strong> sobre qual das <strong>fontes de ajuda</strong> de que falámos neste módulo <strong>seria mais útil recorreres</strong> nesta situação ou em outras similares.
        </p>

        <p className="mb-3">
          Este desafio tem como objetivo <strong>ajudar-te a identificar e avaliar as opções de ajuda disponíveis</strong>.
        </p>

        <p className="mb-4">
          Lembra-te de que <strong>reconhecer que precisas de ajuda</strong> é um <strong>passo importante para cuidar de ti mesmo/a</strong>.
        </p>

        Podes usar esta <b>tabela</b> para registares:
        <br /><br />
      </div>

      {/* TABELA */}
      <div className="table-responsive mb-4">
        <table className="table table-bordered text-center align-middle">

          <thead>
            <tr>
              {[
                "Situação",
                "Fonte de Ajuda",
                "Motivo da Escolha",
              ].map((title) => (
                <th
                  key={title}
                  style={{
                    backgroundColor: "#E7C8C2",
                    color: "#234970",
                  }}
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>

              {/* SITUAÇÃO */}
              <td>
                <label
                  htmlFor="input-situacao"
                  className="visually-hidden"
                >
                  Situação
                </label>

                <textarea
                  id="input-situacao"
                  name="situacao"
                  value={form.situacao}
                  onChange={handleChange}
                  className="form-control"
                  rows={3}
                  style={{ resize: 'vertical' }}
                  placeholder="Descreve a situação aqui"
                />
              </td>

              {/* FONTE DE AJUDA */}
              <td>
                <label
                  htmlFor="input-fonteAjuda"
                  className="visually-hidden"
                >
                  Fonte de Ajuda
                </label>

                <select
                  id="input-fonteAjuda"
                  name="fonteAjuda"
                  value={form.fonteAjuda}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Seleciona</option>
                  <option value="Formal">Formal</option>
                  <option value="Semiformal">Semiformal</option>
                  <option value="Informal">Informal</option>
                  <option value="Autoajuda">Autoajuda</option>
                </select>
              </td>

              {/* MOTIVO */}
              <td>
                <label
                  htmlFor="input-motivo"
                  className="visually-hidden"
                >
                  Motivo da Escolha
                </label>

                <textarea
                  id="input-motivo"
                  name="motivo"
                  value={form.motivo}
                  onChange={handleChange}
                  className="form-control"
                  rows={3}
                  style={{ resize: 'vertical' }}
                  placeholder="Descreve aqui porque escolheste esta fonte de ajuda"
                />
              </td>

            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-4 lead">
        <p className="fw-bold">
          Vamos em frente! #ReviravoltaEmRede
        </p>

        <p>Até para a Semana!</p>
      </div>

      {/* BOTÃO */}
      <button
        onClick={handleAdd}
        className="btn"
        disabled={loading}
        style={{
          backgroundColor: "#66BFBF",
          color: "white",
          fontWeight: "600",
          borderRadius: "8px",
        }}
      >
        {loading ? "A guardar..." : "Guardar alterações"}
      </button>

      {/* FEEDBACK */}
      {feedbackMessage && (
        <div
          className={`alert ${
            feedbackType === 'success'
              ? 'alert-success'
              : 'alert-danger'
          } mt-3`}
        >
          {feedbackMessage}
        </div>
      )}

      {/* REGISTOS */}
      {registos.length > 0 && (
        <>
          <h5 className="mt-5">
            Registos Anteriores:
          </h5>

          <div className="table-responsive">
            <table className="table table-bordered text-center align-middle">

              <thead>
                <tr>
                  <th>Data do Registo</th>
                  <th>Situação</th>
                  <th>Fonte de Ajuda</th>
                  <th>Motivo da Escolha</th>
                </tr>
              </thead>

              <tbody>
                {registos.map((r, i) => (
                  <tr key={i}>
                    <td>{r.dataCriacao}</td>
                    <td>{r.situacao}</td>
                    <td>{r.fonteAjuda}</td>
                    <td>{r.motivo}</td>
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

export default DesafioSemanal5;

