import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import modulos from '../../../data/modulos';
import AtividadeProgressao from '../atividadeProgressao';

const BandaDesenhada = () => {
  const [pagina, setPagina] = useState(0);
  const [ansiedadeComum, setAnsiedadeComum] = useState('');
  const [ansiedadeSOS, setAnsiedadeSOS] = useState('');
  const [inputError, setInputError] = useState(false);

  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);

  const modulo = modulos.find((m) => m.id === moduloId);
  const atividade = modulo?.atividades.find(a => a.url === "banda-desenhada");
  const quadros = atividade?.quadros || [];

  const avancarPagina = () => {
    if (pagina === quadros.length + 1) {
      if (!ansiedadeComum.trim() || !ansiedadeSOS.trim()) {
        setInputError(true);
        return;
      }
    }

    setInputError(false);
    setPagina((prev) => prev + 1);
  };

  const retrocederPagina = () => {
    setInputError(false);
    setPagina((prev) => prev - 1);
  };

  const progresso = Math.round((pagina / (quadros.length + 2)) * 100); // +2: reflexão e conclusão

  const handleAnsiedadeComumChange = (e) => {
    setAnsiedadeComum(e.target.value);
    if (inputError && e.target.value.trim() && ansiedadeSOS.trim()) {
      setInputError(false);
    }
  };

  const handleAnsiedadeSOSChange = (e) => {
    setAnsiedadeSOS(e.target.value);
    if (inputError && e.target.value.trim() && ansiedadeComum.trim()) {
      setInputError(false);
    }
  };

  return (
    <div className="container-fluid vh-100 p-0 font-poppins">
      <Navbar />
      <div className="row h-100 m-0">
        <Sidebar />
        <div className="col px-4 py-4" style={{ backgroundColor: "#FBF9F9" }}>
          <div className="container p-5 bg-white rounded shadow-sm">
            {/* Barra de progresso com aria-label */}
            <div
              className="progress mb-4"
              style={{ height: "8px" }}
              role="progressbar"
              aria-label="Progresso da atividade"
              aria-valuenow={progresso}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="progress-bar"
                style={{ width: `${progresso}%`, backgroundColor: "#99CBC8" }}
              ></div>
            </div>

            {/* INTRODUÇÃO */}
            {pagina === 0 && (
              <div className="text-start py-4 ps-2">
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>{atividade?.titulo || "Ansiedade: Aliada ou Empecilho?"}</h2>
                <div className="row ">
                  <div className="col-md-12">
                    <p className="lead mb-3">
                      <strong>Sê muito bem-vindo ou bem-vinda à Banda Desenhada da Ansiedade: Aliada ou Empecilho?!</strong><br></br><br></br>
                      <strong>Nesta banda desenhada</strong>, vais conhecer dois tipos de ansiedade:<br></br><br></br>
                  <strong><strong>Ansiedade comum</strong></strong>, que nos ajuda a enfrentar desafios<br></br>
                   <strong><strong>Ansiedade SOS</strong></strong>, que pode atrapalhar o nosso bem-estar<br></br><br></br>

                    <p className="lead mb-3">O teu <strong>desafio</strong> é compreender a diferença entre estas duas formas de ansiedade. <br>
                    </br>Para isso, lê com atenção os quadros da banda desenhada que se seguem. </p>
                    <p className="lead mb-3">No final, <strong>escreve duas palavras</strong> que, para ti, represente:</p>
                     o que é a <strong><strong>ansiedade comum;</strong></strong><br></br>
                     o que é a <strong><strong>ansiedade SOS.</strong></strong><br></br><br></br>
                    Escreve essas duas palavras no espaço indicado.
                    </p>

                    <p className="lead mb-3">
                      <strong>Não há respostas certas ou erradas</strong> — o importante é o que <strong>tu</strong> compreendeste!
                    </p>

                    <div className="text-center">
                      <button
                        className="custom-btn-turquoise mt-3 px-4 py-2"
                        onClick={avancarPagina}
                        aria-label="Iniciar banda desenhada"
                      >
                        <i className="bi bi-play-fill me-2"></i>Vamos a isto?
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* QUADROS */}
            {pagina > 0 && pagina <= quadros.length && (
              <>
                <div className="justify-content-center d-flex">
                  <img
                    src={quadros[pagina - 1].imagem}
                    alt={`Ilustração do quadro ${pagina}`}
                    className="img-fluid mb-4"
                    style={{ maxHeight: "500px" }}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    className="custom-btn-pink"
                    onClick={retrocederPagina}
                    aria-label="Voltar para o quadro anterior"
                  >
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <button
                    className="custom-btn-turquoise"
                    onClick={avancarPagina}
                    aria-label={pagina === quadros.length ? "Ir para reflexão" : "Ir para próximo quadro"}
                  >
                    {pagina === quadros.length ? "Refletir" : "Próximo"}
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </>
            )}

            {/* REFLEXÃO */}
            {pagina === quadros.length + 1 && (
              <>
                <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>Vamos Refletir!</h4>

                {inputError && (
                  <div className="alert alert-danger mb-3" role="alert" aria-live="assertive">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Por favor, preenche os dois campos antes de avançar.
                  </div>
                )}

                <p className="lead">
                  <strong>Escreve aqui duas palavras que para ti</strong> representem o que é a ansiedade comum e a ansiedade SOS. Escreve essas duas palavras no espaço indicado. 
                  <br />
                  <strong>Não há respostas certas ou erradas</strong> — o importante é o que <strong>tu</strong> compreendeste!
                </p>

                <div className="mb-3">
                  <label htmlFor="ansiedadeComum" className="form-label lead">
                    <strong>A minha palavra para definir a ansiedade comum é:</strong>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${inputError && !ansiedadeComum.trim() ? 'is-invalid' : ''}`}
                    id="ansiedadeComum"
                    value={ansiedadeComum}
                    onChange={handleAnsiedadeComumChange}
                    placeholder="Exemplo: alerta"
                    required
                    aria-required="true"
                    aria-invalid={inputError && !ansiedadeComum.trim()}
                    aria-describedby={inputError && !ansiedadeComum.trim() ? "error-ansiedadeComum" : undefined}
                  />
                  {inputError && !ansiedadeComum.trim() && (
                    <div id="error-ansiedadeComum" className="invalid-feedback" role="alert">
                      Este campo é obrigatório.
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="ansiedadeSOS" className="form-label lead">
                    <strong>A minha palavra para definir a ansiedade SOS é:</strong>
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${inputError && !ansiedadeSOS.trim() ? 'is-invalid' : ''}`}
                    id="ansiedadeSOS"
                    value={ansiedadeSOS}
                    onChange={handleAnsiedadeSOSChange}
                    placeholder="Exemplo: paralisante"
                    required
                    aria-required="true"
                    aria-invalid={inputError && !ansiedadeSOS.trim()}
                    aria-describedby={inputError && !ansiedadeSOS.trim() ? "error-ansiedadeSOS" : undefined}
                  />
                  {inputError && !ansiedadeSOS.trim() && (
                    <div id="error-ansiedadeSOS" className="invalid-feedback" role="alert">
                      Este campo é obrigatório.
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button
                    className="custom-btn-pink"
                    onClick={retrocederPagina}
                    aria-label="Voltar para os quadros"
                  >
                    <i className="bi bi-arrow-left me-2" ></i>Anterior
                  </button>
                  <button
                    className="custom-btn-turquoise"
                    onClick={avancarPagina}
                    aria-label="Avançar para a conclusão"
                  >
                    Conclusão
                    <i className="bi bi-check-lg ms-2"></i>
                  </button>
                </div>
              </>
            )}

            {/* CONCLUSÃO */}
            {pagina === quadros.length + 2 && (
              <>
                <h4 className="fw-bold mb-4 text-start" style={{ color: "#234970" }}>
                  Conclusão da Atividade
                </h4>
                <p className="lead">
                  Espero que tenha sido um <strong>primeiro passo importante</strong> para compreenderes melhor como a <strong>ansiedade</strong> pode afetar a tua vida. <br /><br />
                  Lembra-te de que a <strong>ansiedade comum</strong> pode ser uma <strong>aliada</strong>, ajudando-nos a enfrentar desafios e a <strong>preparar</strong> para momentos difíceis.
                  <br /><br />
                  No entanto, quando a <strong>ansiedade SOS</strong> se torna intrusiva, ela pode interferir no nosso <strong>bem-estar</strong> e até prejudicar as nossas <strong>relações</strong> e <strong>atividades diárias</strong>.
                  <br /><br />
                  É importante saber <strong>distinguir</strong> quando a ansiedade está a ser <strong>útil</strong> e quando está a tornar-se um <strong>problema</strong>.
                </p>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    className="custom-btn-pink"
                    onClick={retrocederPagina}
                    aria-label="Voltar para a reflexão"
                  >
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <AtividadeProgressao
                    moduloId={moduloId}
                    atividadeIndex={0}
                    updateUserData={updateUserData}
                    aria-label="Finalizar atividade e avançar"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export default BandaDesenhada;
