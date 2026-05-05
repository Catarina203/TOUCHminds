import React, { useState } from 'react';

const DesafioSemanal = () => {
  const [form, setForm] = useState({
    dilema: "",
    prosContinuar: "",
    contrasContinuar: "",
    prosMudar: "",
    contrasMudar: "",
    estrategiasPassadas: "",
  });

  const [registos, setRegistos] = useState([]);
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (feedback) setFeedback("");
  };

  const handleAdd = () => {
    if (Object.values(form).some((v) => v.trim() === "")) {
      setFeedback("Por favor, preenche todos os campos.");
      return;
    }

    const novoRegisto = {
      ...form,
      data: new Date().toLocaleString("pt-PT"),
    };

    setRegistos([novoRegisto, ...registos]);

    setForm({
      dilema: "",
      prosContinuar: "",
      contrasContinuar: "",
      prosMudar: "",
      contrasMudar: "",
      estrategiasPassadas: "",
    });
  };

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
          Ao longo dos próximos dias, quando te encontrares perante <strong>uma decisão ou dilema </strong>— seja algo pequeno ou mais importante — faz uma pausa antes de agir. 
          Este é o momento para <strong> observar, sem pressa e sem te julgares.</strong>
        </p>

        <p className="mb-3">
          Quando isso acontecer, convida-te a fazer o seguinte: <br></br><br></br>
          <strong>Pergunta-te, sem julgar:</strong><br></br><br></br>
        </p>

        <ul style={{ marginTop: "0px" }}>
          <li> Se continuar como estou, quais são os <strong> prós? </strong> E quais são os <strong>contras?</strong></li>
          <li> Se fizer algo novo ou diferente, quais são os <strong> prós? </strong> E quais são os <strong>contras?</strong></li>
        </ul>

        <p className="mb-3">
          <strong>Lembra-te de uma vez em que enfrentaste algo semelhante e conseguiste</strong>.
        </p>

        <ul>
          <li>Que<strong> estratégias </strong>usaste nessa altura?</li>
          <li>O que <strong> fizeste </strong>dessa vez que podes aplicar agora?</li>
          <li>Podes usar esta <b>tabela</b> para registares.</li>
        </ul>

        {/* TABELA DE INPUT */}
        <div className="table-responsive mb-4">
          <table className="table table-bordered text-center align-middle">
            <thead>
              <tr>
                <th>Dilema</th>
                <th>Prós continuar</th>
                <th>Contras continuar</th>
                <th>Prós mudar</th>
                <th>Contras mudar</th>
                <th>Estratégias passadas</th>
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

        {feedback && (
          <div className="alert alert-danger" role="alert">
            {feedback}
          </div>
        )}

        <button
          onClick={handleAdd}
          className="btn"
          style={{
            backgroundColor: "#66BFBF",
            color: "white",
            fontWeight: "600",
            borderRadius: "8px",
          }}
        >
          Guardar registo
        </button>

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
                    <th>Prós continuar</th>
                    <th>Contras continuar</th>
                    <th>Prós mudar</th>
                    <th>Contras mudar</th>
                    <th>Estratégias passadas</th>
                  </tr>
                </thead>

                <tbody>
                  {registos.map((r, i) => (
                    <tr key={i}>
                      <td>{r.data}</td>
                      <td>{r.dilema}</td>
                      <td>{r.prosContinuar}</td>
                      <td>{r.contrasContinuar}</td>
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

        <p className="mb-3">
          Não é preciso chegar sempre à <strong>“decisão perfeita”. </strong> O objetivo é treinar o  <strong>olhar para ti próprio/a, reconhecer que já tens recursos e abrir espaço para escolhas mais conscientes. </strong>.
        </p>

        <p className="fw-bold">Vamos em frente! #OPoderdaMudança</p>
        <p>Até para a Semana!</p>

      </div>
    </div>
  );
};

export default DesafioSemanal;