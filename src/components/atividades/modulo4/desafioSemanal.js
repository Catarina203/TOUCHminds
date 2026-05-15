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
      estrategiasanteriores: '',
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
        estrategiasanteriores: '',
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
        Podes usar esta <b>tabela</b> para registares.
        <br /><br /> 
      </div>

      {/* TABELA */}
      <div className="table-responsive mb-4">
        <table className="table table-bordered text-center align-middle">

          <thead>
            <tr>
              {[
                "Dilema",
                "Prós de Não Mudar",
                "Contras de Não Mudar",
                "Prós de Mudar",
                "Contras de Mudar",
                "Estratégias Anteriores",
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
                {[
                  {
                    name: "dilema",
                    label: "Dilema",
                    placeholder: "Escreve aqui o dilema ou a decisão",
                  },
                  {
                    name: "prosnaomudar",
                    label: "Prós de Não Mudar",
                    placeholder: "Escreve aqui os prós de não mudar",
                  },
                  {
                    name: "contrasnaomudar",
                    label: "Contras de Não Mudar",
                    placeholder: "Escreve aqui os contras de não mudar",
                  },
                  {
                    name: "prosMudar",
                    label: "Prós de Mudar",
                    placeholder: "Escreve aqui os prós de mudar",
                  },
                  {
                    name: "contrasMudar",
                    label: "Contras de Mudar",
                    placeholder: "Escreve aqui os contras de mudar",
                  },
                  {
                    name: "estrategiasanteriores",
                    label: "Estratégias Anteriores",
                    placeholder: "Escreve aqui estratégias anteriores",
                  },
                ].map(({ name, label, placeholder }) => (
                  <td key={name}>
                    <label htmlFor={`input-${name}`} className="visually-hidden">
                      {label}
                    </label>
                    <textarea
                      id={`input-${name}`}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      className="form-control"
                      rows={3}
                      style={{ resize: 'vertical' }}
                      aria-required="true"
                      aria-describedby={feedbackType === 'error' && form[name].trim() === '' ? `error-${name}` : undefined}
                      aria-invalid={feedbackType === 'error' && form[name].trim() === '' ? 'true' : 'false'}
                      placeholder={placeholder}
                    />
                    {feedbackType === 'error' && form[name].trim() === '' && (
                      <div id={`error-${name}`} className="invalid-feedback d-block" role="alert">
                        Por favor, preenche este campo.
                      </div>
                    )}
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
          <h5 className="mt-5">Registos Anteriores:</h5>

          <div className="table-responsive">
            <table className="table table-bordered text-center align-middle">
              <thead>
                <tr>
                  <th>Data do Registo</th>
                  <th>Dilema</th>
                  <th>Prós de Não Mudar</th>
                  <th>Contras de Não Mudar</th>
                  <th>Prós de Mudar</th>
                  <th>Contras de Mudar</th>
                  <th>Estratégias Anteriores</th>
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
                    <td>{r.estrategiasanteriores}</td>
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