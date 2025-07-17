import React, { useState, useContext } from 'react';
import { UserContext } from '../../../App';

const AtividadeSemanal2 = () => {
  const { userData, updateUserData } = useContext(UserContext);

  const [form, setForm] = useState(() => {
    const ultimoRegisto = userData.modulos?.modulo2?.desafioSemanal?.slice(-1)[0];
    const module2Form = {};
    for (let i = 1; i <= 7; i++) {
      module2Form[`situacao_${i}`] = ultimoRegisto?.[`situacao_${i}`] || '';
      module2Form[`reflexao_${i}`] = ultimoRegisto?.[`reflexao_${i}`] || '';
    }
    return module2Form;
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    const hasContent = Object.values(form).some(val => val.trim() !== '');
    if (!hasContent) {
      setFeedback('Por favor, preenche pelo menos uma situação.');
      return;
    }

    const novoRegisto = {
      ...form,
      dataCriacao: new Date().toLocaleString('pt-PT'),
    };

    try {
      setLoading(true);
      setFeedback('');

      const modulosAtualizados = {
        ...userData.modulos,
        modulo2: {
          ...userData.modulos.modulo2,
          desafioSemanal: [novoRegisto], // <-- apenas 1 registo
        },
      };

      await updateUserData({ ...userData, modulos: modulosAtualizados });
      setFeedback('Registo adicionado com sucesso!');


    } catch (error) {
      setFeedback('Erro ao guardar. Tenta novamente.');
    } finally {
      setLoading(false);
    }
  };

  const registos = userData.modulos?.modulo2?.desafioSemanal || [];

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
        <b className='fw-bold'>Queria lançar-te um desafio para esta semana!</b><br /> <br /> 
        Ao longo dos próximos dias, fica <b>atento/a</b> a <b>conversas, comentários ou atitudes</b> em que percebes um <b>mito</b> ou <b>estigma</b> relacionado à ansiedade.<br /><br /> 
        Pode ser algo que ouças em <b>conversas</b>, vejas nas <b>redes sociais</b> ou observes em situações do teu <b>dia-a-dia</b>.<br /><br /> 
        Depois de a <b>notares</b>, convido-te a <b>refletir</b> sobre como poderias <b>intervir</b> ou <b>apoiar</b> a pessoa envolvida e podes <b>registar</b> aqui ou simplesmente refletires sobre isso.<br /><br /> 
        Podes usar esta <b>tabela</b> para registares:<br /> <br /> 
        <ul style={{ marginTop: "0px" }}>
          <li><b>Situação Observada:</b> Descrição breve da situação, como uma conversa ou um comentário feito por alguém.</li>
          <li><b>Reflexão/Resposta Empática:</b> Reflete como poderias responder ou agir de forma empática.</li>
        </ul>
      </div>

      <div className="table-responsive mb-4">
        <table className="table table-bordered text-center align-middle">
          <thead>
            <tr>
              <th
                className="text-center align-middle"
                style={{ backgroundColor: "#E7C8C2", color: "#234970" }}
              >
                Situação
              </th>
              <th
                className="text-center align-middle"
                style={{ backgroundColor: "#E7C8C2", color: "#234970" }}
              >
                Situação Observada
              </th>
              <th
                className="text-center align-middle"
                style={{ backgroundColor: "#E7C8C2", color: "#234970" }}
              >
                Reflexão/Resposta Empática
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <tr key={num}>
                <td style={{ backgroundColor: "white", color: "black", fontWeight: "bold" }}>
                  Situação {num}
                </td>
                <td>
                  <textarea
                    name={`situacao_${num}`}
                    value={form[`situacao_${num}`] || ''}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Descrição breve da situação..."
                    rows={2}
                    style={{ resize: 'vertical' }}
                  />
                </td>
                <td>
                  <textarea
                    name={`reflexao_${num}`}
                    value={form[`reflexao_${num}`] || ''}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Reflexão/Resposta..."
                    rows={2}
                    style={{ resize: 'vertical' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>



        <div className="mt-3 lead">
          Ao <b>tirares estes minutos para refletir</b> sobre o que aprendeste com essas <b>observações</b>, estarás a mudar a tua <b>perceção</b> sobre a ansiedade e o <b>estigma</b> associado a ela.<br /><br /> 
          <b>Espero que esta semana te ajude a aprender mais sobre ti!</b><br /><br /> 
          <b><b>Vamos em frente! #DesmistificarAnsiedade</b></b>
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
        <div
          className={`alert ${feedback.includes("sucesso") ? "alert-success" : "alert-danger"} mt-3`}
        >
          {feedback}
        </div>
      )}

    </div>
  );
};

export default AtividadeSemanal2;