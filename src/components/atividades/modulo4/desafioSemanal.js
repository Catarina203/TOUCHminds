import React, { useState, useContext } from 'react';
import { UserContext } from '../../../App';

const DesafioSemanal = ({ id }) => {
  const { userData, updateUserData } = useContext(UserContext);

  const [form, setForm] = useState({
      dilema: '',
      prosnaomudar: '',
      contrasnaomudar: '',
      prosMudar: '',
      contrasMudar: '',
      estrategiasPassadas: '',
});

  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (feedbackType === 'error' && value.trim() !== '') {
      setFeedbackMessage('');
      setFeedbackType('');
    }
  };

  const handleAdd = async () => {
    if (Object.values(form).some(val => val.trim() === '')) {
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

      await updateUserData({ ...(userData ?? {}), modulos: modulosAtualizados });

      setFeedbackMessage('Registo adicionado com sucesso!');
      setFeedbackType('success');

      setForm({
        dilema: '',
        prosnaomudar: '',
        contrasnaomudar: '',
        prosMudar: '',
        contrasMudar: '',
        estrategiasPassadas: '',
      });

    } catch (error) {
      setFeedbackMessage('Erro ao guardar. Tenta novamente.');
      setFeedbackType('error');
    } finally {
      setLoading(false);
    }
  };

  const chaveModulo = `modulo${String(id)}`;
  const registos = userData?.modulos?.[chaveModulo]?.desafioSemanal ?? [];

  return (
    <div className="bg-white">

      {/* TÍTULO */}
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

      {/* TEXTO (igual ao teu) */}
      <div className="mb-4 lead">

        <b className='fw-bold'>Queria lançar-te um desafio para esta semana!</b>
        <br /><br />

        Ao longo dos próximos dias, quando te encontrares perante <strong>uma decisão ou dilema </strong>— seja algo pequeno ou mais importante — faz uma pausa antes de agir.
        Este é o momento para <strong> observar, sem pressa e sem te julgares.</strong>

        <br /><br />

         <br /><br /> 
        Podes usar esta <b>tabela</b> para registares:

        Quando isso acontecer, convida-te a fazer o seguinte:
        <br /><br />

        <strong>Pergunta-te, sem julgar:</strong>

        <ul style={{ marginTop: "10px" }}>
          <li> Se continuar como estou, quais são os <strong> prós? </strong> E quais são os <strong>contras?</strong></li>
          <li> Se fizer algo novo ou diferente, quais são os <strong> prós? </strong> E quais são os <strong>contras?</strong></li>
        </ul>

        <p>
          <strong>Lembra-te de uma vez em que enfrentaste algo semelhante e conseguiste</strong>.
        </p>

        <ul>
          <li>Que<strong> estratégias </strong>usaste nessa altura?</li>
          <li>O que <strong> fizeste </strong>dessa vez que podes aplicar agora?</li>
        </ul>
      </div>

      {/* TABELA */}
      <div className="table-responsive mb-4">
        <table className="table table-bordered text-center align-middle">

          <thead>
            <tr>
              {[
                "Dilema",
                "Prós não mudar",
                "Contras não mudar",
                "Prós mudar",
                "Contras mudar",
                "Estratégias passadas",
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
              {Object.keys(form).map((name) => (
                <td key={name}>
                  <textarea
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    className="form-control"
                    rows={3}
                    placeholder="Escreve aqui..."
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* TEXTO FINAL (QUE FALTAVA) */}
      <div className="mb-4 lead">

        <p>
          Não é preciso chegar sempre à <strong>“decisão perfeita”.</strong> O objetivo é treinar o
          <strong> olhar para ti próprio/a, reconhecer que já tens recursos e abrir espaço para escolhas mais conscientes.</strong>
        </p>

        <p className="fw-bold">
          Vamos em frente! #OPoderdaMudança
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
        <div className={`alert ${feedbackType === 'success' ? 'alert-success' : 'alert-danger'} mt-3`}>
          {feedbackMessage}
        </div>
      )}

      {/* REGISTOS */}
      {registos.length > 0 && (
        <>
          <h5 className="mt-5">Registos anteriores:</h5>

          <div className="table-responsive">
            <table className="table table-bordered text-center align-middle">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Dilema</th>
                  <th>Prós não mudar</th>
                  <th>Contras não mudar</th>
                  <th>Prós mudar</th>
                  <th>Contras mudar</th>
                  <th>Estratégias passadas</th>
                </tr>
              </thead>

              <tbody>
                {registos.map((r, i) => (
                  <tr key={i}>
                    <td>{r.dataCriacao}</td>
                    <td>{r.dilema}</td>
                    <td>{r.prosnaomudar}</td>
                    <td>{r.contrasnaomudar}</td>
                    <td>{r.prosMudar}</td>
                    <td>{r.contrasMudar}</td>
                    <td>{r.estrategiasPassadas}</td>
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

export default DesafioSemanal;