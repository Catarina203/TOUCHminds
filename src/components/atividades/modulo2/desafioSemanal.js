import React, { useState, useContext } from 'react';
import { UserContext } from '../../../App';

const DesafioSemanal = ({ id }) => {
  const { userData, updateUserData } = useContext(UserContext);
  const [form, setForm] = useState({
    dia: '',
    situacaoobservada: '',
    reflexaoResposta: '',
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
        situacaoobservada: '',
        reflexaoResposta: '',
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
     <div className="bg-white font-poppins">
          <style>
            {`
              .font-poppins, .font-poppins * {
                font-family: 'Poppins', sans-serif !important;
              }
              .font-poppins ::placeholder {
                font-family: 'Poppins', sans-serif !important;
              }
            `}
          </style>
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
        <b className='fw-bold'>Queria lançar-te um desafio para esta semana!</b><br /> <br /> 
        Ao longo dos próximos dias, fica <b>atento/a</b> a <b>conversas, comentários ou atitudes</b> em que percebes o <b>estigma</b> relacionado à ansiedade.<br /><br /> 
        Pode ser algo que ouças em <b>conversas</b>, vejas nas <b>redes sociais</b> ou observes em situações do teu <b>dia-a-dia</b>.<br /><br /> 
        Depois de a <b>notares</b> o que está a acontecer, convido-te a <b>refletir</b> sobre como poderias <b>intervir</b> ou <b>apoiar</b> a pessoa envolvida.<br /><br /> 
        Podes usar esta <b>tabela</b> para registares:<br /> <br /> 
        <ul style={{ marginTop: "0px" }}>
          <li><b>Situação Observada:</b> Descrição breve da situação (por exemplo , uma conversa ou um comentário feito por alguém).</li>
          <li><b>Reflexão/Resposta Empática:</b> Reflexão de como poderias responder ou agir de forma empática.</li>
        </ul>
      </div>

      <div className="table-responsive mb-4">
        <table className="table table-bordered text-center align-middle" aria-label="Formulário para registar reflexão semanal sobre ansiedade">
          <caption className="visually-hidden">Formulário para registar reflexão semanal sobre ansiedade</caption>
          <thead>
            <tr>
              {[
                "Dia",
                "Situação Observada",
                "Reflexão/Resposta Empática",
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
                    name: "situacaoobservada",
                    label: "Situação Observada",
                    placeholder: "Descreve aqui brevemente a situação",
                  },
                  {
                    name: "reflexaoResposta",
                    label: "Reflexão/Resposta Empática",
                    placeholder: "Escreve aqui a tua reflexão de como poderias responder ou agir nessa situação",
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

        <div className="mt-3 lead">
          Ao <b>tirares estes minutos para refletires</b> sobre o que aprendeste e o qual pode ser o <b>papel</b> nestas situações estarás a mudar a <b>tua perceção</b> sobre a ansiedade e a <b> diminuir o poder do estigma</b> associado a ela.<br /><br /> 
          Espero que esta semana te ajude a <b> aprender mais sobre ti e sobre o estigma </b> relacionado com a ansiedade!<br /><br /> 
          <b><b>Vamos em frente! #DesmistificarAnsiedade</b></b>
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
                  <th scope="col">Situação Observada</th>
                  <th scope="col">Reflexão/Resposta Empática</th>
                </tr>
              </thead>
              <tbody>
                {registos.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.dataCriacao}</td>
                    <td>{item.dia}</td>
                    <td>{item.situacaoobservada}</td>
                    <td>{item.reflexaoResposta}</td>
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