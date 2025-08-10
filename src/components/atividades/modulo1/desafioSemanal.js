import React, { useState, useContext } from 'react';
import { UserContext } from '../../../App';

const DesafioSemanal = ({ id }) => {
  const { userData, updateUserData } = useContext(UserContext);
  const [form, setForm] = useState({
    dia: '',
    situacao: '',
    comoMeSenti: '',
    pensamentos: '',
    comoLidei: '',
    funcionou: '',
  });
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState(''); // 'success' ou 'error'

  const handleChange = (e) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });

  // Se havia erro e o campo deixou de estar vazio, apaga a mensagem
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
        dia: '',
        situacao: '',
        comoMeSenti: '',
        pensamentos: '',
        comoLidei: '',
        funcionou: '',
      });
    } catch (error) {
      setFeedbackMessage('Erro ao guardar. Tenta novamente.');
      setFeedbackType('error');
    } finally {
      setLoading(false);
    }
  };

  // Obtém os registos guardados
const chaveModulo = `modulo${String(id)}`;
const registos = userData?.modulos?.[chaveModulo]?.desafioSemanal ?? [];

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
          <div className='mb-4 lead'>
      <p >
        <b className='fw-bold'>Queria lançar-te um desafio para esta semana! </b> <br /> 
        <br />Ao longo dos próximos dias, sempre que sentires <b>ansiedade</b> em alguma situação, convido-te a <b>refletir</b> sobre a tua experiência.
        <br /><br /> 
        A ideia é que <b>reflitas como te sentes</b>, o que <b>pensas</b> e como te <b>comportas</b> nessa situação.
        <br /><br /> 
        Podes usar esta <b>tabela</b> para registares.
      </p>
      <ul style={{ marginTop: "0px" }}>
        <li><b>Situação:</b>  Regista a situação que te deixou ansioso/a.</li>
        <li><b>Como me senti?:</b>  Descreve as sensações físicas que sentiste (por exemplo, suor, coração acelerado).</li>
        <li><b>Pensamentos que surgiram?:</b>  Anota os pensamentos que te passaram pela cabeça naquele momento.</li>
        <li><b>Como agi na situação?:</b>  Descreve o que fizeste para lidar com a ansiedade.</li>
        <li><b>Funcionou?:</b>  Avalia se o que fizeste te aproximou ou te afastou dos teus objetivos, daquilo que queres ser ou das outras pessoas.</li>
      </ul>
      </div>

      <div className="table-responsive mb-4">
        <table className="table table-bordered text-center align-middle" aria-label="Formulário para registar reflexão semanal sobre ansiedade">
          <caption className="visually-hidden">Formulário para registar reflexão semanal sobre ansiedade</caption>
          <thead>
            <tr>
              {[
                "Dia",
                "Situação",
                "Como me senti?",
                "Que pensamentos surgiram?",
                "Como lidei com a situação?",
                "O que funcionou?",
              ].map((title) => (
                <th
                  key={title}
                  className="text-center align-middle"
                  style={{ backgroundColor: "#E7C8C2", color: "#234970" }}
                  scope="col"
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
                    name: "dia",
                    label: "Dia",
                    placeholder: "Escreve aqui o dia da semana",
                  },
                  {
                    name: "situacao",
                    label: "Situação",
                    placeholder: "Descreve aqui brevemente a situação",
                  },
                  {
                    name: "comoMeSenti",
                    label: "Como me senti?",
                    placeholder: "Escreve aqui que sensações físicas sentiste naquele momento",
                  },
                  {
                    name: "pensamentos",
                    label: "Que pensamentos surgiram?",
                    placeholder: "Escreve aqui o que pensaste naquele momento",
                  },
                  {
                    name: "comoLidei",
                    label: "Como lidei com a situação?",
                    placeholder: "Escreve aqui o que fizeste naquele momento",
                  },
                  {
                    name: "funcionou",
                    label: "O que funcionou?",
                    placeholder: "Escreve aqui se aquilo que fizeste te aproximou ou afastou dos teus objetivos",
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
              <div className="lead mb-4">
        <p>
         Ao <b>refletires</b> sobre a tua <b>experiência de ansiedade</b>, estarás a dar um passo importante para <b>compreender</b> e <b>lidar</b> de forma que traga mais <b>bem-estar e significado à tua vida</b>.
        </p>
        <p>Espero que esta semana te ajude a <b>aprender mais sobre ti</b> e sobre a tua <b>experiência da ansiedade!</b></p>
        <p><b><b>Vamos em frente! #SemBichoPapão</b></b></p>
        <p>Até para a semana!</p>
      </div>
      </div>

      <div className="mt-3 text-start">
        <button
          onClick={handleAdd}
          className="btn"
          style={{
            backgroundColor: "#66BFBF",
            color: "white",
            fontWeight: "600",
            borderRadius: "8px",
            fontSize: "1.05rem",
          }}
          disabled={loading}
          aria-busy={loading}
          aria-live="polite"
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

      {feedbackMessage && (
        <div
          className={`alert ${feedbackType === 'success' ? 'alert-success' : 'alert-danger'} mt-3`}
          role="alert"
          aria-live="assertive"
        >
          {feedbackType === 'error' && <i className="bi bi-exclamation-triangle me-2"></i>}
          {feedbackMessage}
        </div>
      )}

      {registos.length > 0 && (
        <>
          <h5 className="mt-5">Registos anteriores:</h5>
          <div className="table-responsive">
            <table
              className="table table-bordered text-center align-middle"
              aria-label="Registos anteriores do desafio semanal"
            >
              <caption className="visually-hidden">Tabela de registos anteriores do desafio semanal</caption>
              <thead>
                <tr>
                  <th scope="col">Data</th>
                  <th scope="col">Dia</th>
                  <th scope="col">Situação</th>
                  <th scope="col">Como me senti?</th>
                  <th scope="col">Pensamentos</th>
                  <th scope="col">Como lidei?</th>
                  <th scope="col">Funcionou?</th>
                </tr>
              </thead>
              <tbody>
                {registos.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.dataCriacao}</td>
                    <td>{item.dia}</td>
                    <td>{item.situacao}</td>
                    <td>{item.comoMeSenti}</td>
                    <td>{item.pensamentos}</td>
                    <td>{item.comoLidei}</td>
                    <td>{item.funcionou}</td>
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
