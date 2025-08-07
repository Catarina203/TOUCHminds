import React, { useState, useContext, useRef, useEffect} from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import modulos from '../../../data/modulos';
import AtividadeProgressao from '../atividadeProgressao';

const UnindoExperiencias = () => {
  const [pagina, setPagina] = useState(0);
  const [inputError, setInputError] = useState(false);

  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);

  const modulo = modulos.find((m) => m.id === moduloId);
  const atividade = modulo?.atividades.find(a => a.url === "unindo-experiencias");


  const [videoCompleted, setVideoCompleted] = useState(false);
  const [showVideoWarning, setShowVideoWarning] = useState(false);
  const videoRef = useRef(null);
  const avancarPagina = () => {
    if (pagina === 1 && !videoCompleted) {
      setShowVideoWarning(true); // Mostra aviso azul
      return;
    }
    setShowVideoWarning(false);
    setPagina(prev => prev + 1);
  };

  const retrocederPagina = () => {
    setPagina(prev => prev - 1);
  };

  useEffect(() => {
    setShowVideoWarning(false);
    setVideoCompleted(false);
  }, [pagina]);


  const progresso = Math.round((pagina / 3) * 100);

const [pensamento, setPensamento] = useState("");
const [sensacao, setSensacao] = useState("");
const [comportamento, setComportamento] = useState("");


  return (
    <div className="container-fluid vh-100 p-0 font-poppins">
      <Navbar />
      <div className="row h-100 m-0">
        <Sidebar />
        <div className="col px-4 py-4" style={{ backgroundColor: "#FBF9F9" }}>
          <div className="container p-5 bg-white rounded shadow-sm">
            <div className="progress mb-4" style={{ height: "8px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progresso}%`, backgroundColor: "#99CBC8" }}
                aria-valuenow={progresso}
                aria-valuemin="0"
                aria-valuemax="100">
              </div>
            </div>


            {/* INTRODUÇÃO */}
            {pagina === 0 && (
              <div className="text-center">
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>{atividade?.titulo || "Ansiedade: Aliada ou Empecilho?"}</h2>
                <div className="row ">
                  <div className="col-md-12">
                    <p className="lead mb-3">
                      <strong>Sê muito bem-vindo/a ao Unindo Experiências!</strong><br></br><br></br>
                      Todos nós, em alguns momentos, sentimos <strong>ansiedade</strong>, e, às vezes, parece que ela toma conta de tudo,
                      tornando-se difícil lidar com ela.<br></br><br></br> No entanto, é importante lembrar-te que <strong>não estás sozinho/a
                      nesta experiência.</strong> A ansiedade é uma <strong>emoção comum e partilhada por todos os seres humanos.</strong><br></br><br></br>
                      Este conceito de <strong>"humanidade comum"</strong> mostra-nos que as nossas dificuldades, fracassos e
                      sofrimento não são únicos ou isolados, mas fazem parte de uma experiência <strong>universal.</strong><br></br><br></br>
                      Reconhecer que o nosso sofrimento é algo que nos <strong>conecta aos outros</strong>,
                      e não algo que nos afasta.<br></br><br></br>
                      No <strong>vídeo</strong> que se segue vais poder ouvir o que outras pessoas próximas da tua idade têm a dizer sobre as suas experiências com a <strong>ansiedade</strong>.<br></br>
                    
                    </p>
                    <div className="text-center">
                      <button className="custom-btn-turquoise mt-3 px-4 py-2" onClick={avancarPagina}>
                        <i className="bi bi-play-fill me-2"></i>Vamos a isto?
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Video */}
            {pagina === 1 && (
              <>
                <div className="text-center mb-5">
                  <video
                    controls
                    className="rounded shadow"
                    style={{
                      width: "100%",
                      maxWidth: "900px",
                      height: "auto"
                    }}
                    onEnded={() => setVideoCompleted(true)}
                  >
                    <source src="/videos/modulo1/unindo/unindoexperiencias.mp4" type="video/mp4" />
                    O teu navegador não suporta o elemento de vídeo.
                  </video>
                </div>

                {showVideoWarning && (
                  <div className="alert mt-3 text-white"
                    style={{ backgroundColor: '#99CBC8', border: 'none',  textAlign: 'center' }}>
                    <i className="bi bi-info-circle me-2"></i>
                    É necessário ver o vídeo até ao fim para continuar.
                  </div>
                )}


                <div className="d-flex justify-content-between mb-4">
                  <button className="custom-btn-pink" onClick={retrocederPagina}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <button
                    className="custom-btn-turquoise" onClick={avancarPagina}
                  >
                    Refletir
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </>
            )}


             {/* REFLEXÃO */}
              {pagina === 2 && (
                <>
                  <h4 className="text-center fw-bold" style={{ color: "#234970" }}>Vamos Refletir!</h4>

                  {inputError && (
                    <div className="alert alert-danger mb-3" role="alert" aria-live="assertive">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      Por favor, preenche todos os campos antes de avançar.
                    </div>
                  )}

                  <div className="row">
                    <div className="col-md-12">
                      <p className="lead mb-3">
                        Os jovens que acabaste de ouvir partilharam que, apesar de viverem situações de ansiedade muito diferentes, <strong>os seus pensamentos, sensações e comportamentos eram bastante semelhantes.</strong><br />
                        <strong>Observa agora a tabela abaixo</strong>, que resume o que eles disseram:
                      </p>
                    </div>
                  </div>

                        <div className="table-responsive font-poppins">
                          <table className="table align-middle text-center" style={{ borderCollapse: "collapse" }}>
                            <thead style={{ backgroundColor: "#99CBC8" }}>
                              <tr>
                                <th style={{ backgroundColor: "#E7C8C2", color: "#234970" }} >Pensamentos</th>
                                <th style={{ backgroundColor: "#E7C8C2", color: "#234970" }}>Sensações Físicas</th>
                                <th style={{ backgroundColor: "#E7C8C2", color: "#234970" }}>Comportamentos</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                ["Não vou conseguir fazer", "Borboletas na barriga", "Lembrar-me de todo o trabalho que já fiz"],
                                ["Vou fazer as coisas mal", "Músculos presos", "Respirar fundo"],
                                ["Não vou conseguir atingir os meus objetivos", "Dor no peito", "Prestar atenção ao que está ao meu redor"],
                                ["Duvidar de mim mesma/o", "Respiração mais acelerada", "Dar a mão a alguém"],
                                ["Não vou ser capaz", "Dificuldade em movimentar", "Enfrentar a situação"],
                                ["Pensar no que pode correr mal, em vez do que pode correr bem", "Coração acelerar", "Procurar conforto nos amigos/familiares"],
                                ["", "Formigueiro nos joelhos", ""],
                                ["", "Sensação de aperto no peito", ""],
                                ["", "Ficar mais cansado/a", ""],
                              ].map((row, index) => (
                                <tr
                                  key={index}
                                  style={{
                                    backgroundColor: "#66BFBF",
                                    color: "white",
                                  }}
                                >
                                  {row.map((cell, i) => (
                                    <td key={i} style={{ backgroundColor: "#99CBC8"}}>{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                  <div className="row">
                    <div className="col-md-12">
                      <p className="lead mb-3">
                        E tu? Já pensaste em como costumas <strong>reagir</strong> quando estás ansioso/a? <strong>Reflete sobre as tuas próprias experiências:</strong> o que costumas pensar, sentir e como costumas agir nessas situações?
                        <br /><br />
                        Escreve <strong>o pensamento, a sensação física e o comportamento</strong> mais frequente quando estás <strong>numa situação de ansiedade</strong>. Escreve no espaço abaixo indicado.
                      </p>
                    </div>

                    {/* Campo Pensamento */}
                    <div className="mb-3">
                      <label htmlFor="pensamento" className="form-label lead">
                        <strong>O meu pensamento mais frequente numa situação de ansiedade é:</strong>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${inputError && !pensamento.trim() ? 'is-invalid' : ''}`}
                        id="pensamento"
                        value={pensamento}
                        onChange={(e) => setPensamento(e.target.value)}
                        placeholder="Escreve aqui o teu pensamento"
                        required
                        aria-required="true"
                        aria-invalid={inputError && !pensamento.trim()}
                        aria-describedby={inputError && !pensamento.trim() ? "error-pensamento" : undefined}
                      />
                      {inputError && !pensamento.trim() && (
                        <div id="error-pensamento" className="invalid-feedback" role="alert">
                          Este campo é obrigatório.
                        </div>
                      )}
                    </div>

                    {/* Campo Sensação */}
                    <div className="mb-3">
                      <label htmlFor="sensacao" className="form-label lead">
                        <strong>A minha sensação física mais frequente numa situação de ansiedade é:</strong>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${inputError && !sensacao.trim() ? 'is-invalid' : ''}`}
                        id="sensacao"
                        value={sensacao}
                        onChange={(e) => setSensacao(e.target.value)}
                        placeholder="Escreve aqui a tua sensação física"
                        required
                        aria-required="true"
                        aria-invalid={inputError && !sensacao.trim()}
                        aria-describedby={inputError && !sensacao.trim() ? "error-sensacao" : undefined}
                      />
                      {inputError && !sensacao.trim() && (
                        <div id="error-sensacao" className="invalid-feedback" role="alert">
                          Este campo é obrigatório.
                        </div>
                      )}
                    </div>

                    {/* Campo Comportamento */}
                    <div className="mb-4">
                      <label htmlFor="comportamento" className="form-label lead">
                        <strong>O meu comportamento mais frequente numa situação de ansiedade é:</strong>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${inputError && !comportamento.trim() ? 'is-invalid' : ''}`}
                        id="comportamento"
                        value={comportamento}
                        onChange={(e) => setComportamento(e.target.value)}
                        placeholder="Escreve aqui o teu comportamento"
                        required
                        aria-required="true"
                        aria-invalid={inputError && !comportamento.trim()}
                        aria-describedby={inputError && !comportamento.trim() ? "error-comportamento" : undefined}
                      />
                      {inputError && !comportamento.trim() && (
                        <div id="error-comportamento" className="invalid-feedback" role="alert">
                          Este campo é obrigatório.
                        </div>
                      )}
                    </div>

                    {/* Botões */}
                    <div className="d-flex justify-content-between mt-4">
                      <button
                        className="custom-btn-pink"
                        onClick={retrocederPagina}
                        aria-label="Voltar para o vídeo"
                      >
                        <i className="bi bi-arrow-left me-2"></i>Anterior
                      </button>
                      <button
                        className="custom-btn-turquoise"
                        onClick={() => {
                          if (!pensamento.trim() || !sensacao.trim() || !comportamento.trim()) {
                            setInputError(true);
                            return;
                          }
                          setInputError(false);
                          avancarPagina();
                        }}
                        aria-label="Avançar para a conclusão"
                      >
                        Conclusão
                        <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                </>
              )}
            {/* CONCLUSÃO */}
            {pagina === 3 && (
              <>
                 <div className="text-center"></div>
                <h4 className="text-center fw-bold" style={{ color: "#234970" }}>
                  Conclusão da Atividade
                </h4>
                <p className="lead">
                  <strong>Como viste neste vídeo, a ansiedade pode ser desafiadora, mas é importante lembrar-te que não estás
                    sozinho/a nesta experiência.</strong><br></br><br></br>
                  Todos enfrentamos momentos difíceis e, ao <strong>partilharmos as nossas histórias</strong>, percebemos que a <strong>ansiedade
                    é uma emoção comum a todos nós.</strong><br></br><br></br>
                  Este conceito de <strong>“humanidade comum”</strong> conecta-nos, mostrando que as nossas <strong>dificuldades e emoções</strong> fazem
                  parte da <strong>experiência universal</strong>.<br></br><br></br>
                  Ao <strong>falarmos sobre o que sentimos</strong> e ao <strong>procurarmos apoio</strong>, fortalecemos esses <strong>laços</strong> e aprendemos uns com
                  os outros.<br></br><br></br>
                  <strong>Juntos, podemos enfrentar a ansiedade e apoiar-nos mutuamente neste caminho.</strong>

                </p>
                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink" onClick={retrocederPagina}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <AtividadeProgressao
                    moduloId={moduloId}
                    atividadeIndex={2}
                    updateUserData={updateUserData}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnindoExperiencias;