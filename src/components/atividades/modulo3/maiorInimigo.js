import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import AtividadeProgressao from "../atividadeProgressao";

const MaiorInimigo = () => {
  const [pagina, setPagina] = useState(0);
  const [audioEnded, setAudioEnded] = useState(false);
  const [showAudioWarning, setShowAudioWarning] = useState(false);
  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);
  

  const avancarPagina = () => setPagina((prev) => prev + 1);
  const retrocederPagina = () => setPagina((prev) => prev - 1);

  const handleAudioEnd = () => {
    setAudioEnded(true);
    setShowAudioWarning(false);
  };

  const handleAvancarComVerificacao = () => {
    if (!audioEnded) {
      setShowAudioWarning(true);
      return;
    }
    avancarPagina();
  };

  const progresso = Math.round((pagina / 2) * 100);

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
                aria-valuemax="100"
              ></div>
            </div>

            {pagina === 0 && (
              <div className="text-center">
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>O Nosso Maior Inimigo</h2>
                <p className="mb-3 lead">
                  <strong>Sê muito bem-vindo/a ao "O Nosso Maior Inimigo"!</strong>
                </p>
                <p className="mb-3 lead">
                  Nesta atividade, vou convidar-te a fazer um <strong>exercício de imaginação</strong> que te ajudará a perceber melhor como é que a tua <strong>voz crítica</strong> se manifesta e como isso te pode <strong>afetar</strong>.
                </p>
                <p className="mb-3 lead">
                  Vou pedir-te que recordes uma <strong>situação específica</strong>, que tenha acontecido recentemente, em que sentiste que foste <strong>crítico contigo mesmo/a</strong>.
                </p>
                <p className="mb-3 lead">
                  Lembra-te de que as <strong>imagens</strong> que vais criar na tua mente <strong>não precisam de ser nítidas</strong> como uma fotografia. E, se a tua <strong>mente se distrair</strong>, o que é completamente normal, basta <strong>trazê-la gentilmente de volta</strong> para a atividade.
                </p>
                <div className="text-center">
                  <button className="custom-btn-turquoise mt-2 px-4 py-2" onClick={avancarPagina}>
                    <i className="bi bi-play-fill me-2"></i>Vamos a isto?
                  </button>
                </div>
              </div>
            )}

                {pagina === 1 && (
                 <>
                    <h4 className="text-center fw-bold mb-3" style={{ color: "#234970" }}>
                    O Nosso Maior Inimigo
                    </h4>
                    <p className="lead mb-3">
                      Ouve o áudio abaixo que te irá guiar pela atividade.
                    </p>
                                
                      <div className="text-center">
                        <audio 
                          controls 
                          controlsList="nodownload"
                          style={{ width: "100%", maxWidth: "600px" }}
                          onPlay={() => setShowAudioWarning(false)}
                          onEnded={handleAudioEnd}
                        >
                          <source src="/audios/modulo3/maiorinimigo/maiorinimigo.mp3" type="audio/mpeg" />
                          O teu navegador não suporta a reprodução de áudio.
                        </audio>
                      </div>

                    {showAudioWarning && (
                      <div className="text-center">
                        <div 
                          className="alert d-inline-block mb-4 text-white"
                          style={{ backgroundColor: '#99CBC8', border: 'none' }}
                        >
                          <i className="bi bi-info-circle me-2"></i>
                          É necessário ouvir o áudio até ao fim para continuar.
                        </div>
                      </div>
                    )}

                    <div className="d-flex justify-content-between mt-4">
                      <button className="custom-btn-pink" onClick={retrocederPagina}>
                        <i className="bi bi-arrow-left me-2"></i>Anterior
                      </button>
                      <button className="custom-btn-turquoise" onClick={handleAvancarComVerificacao}>
                        Conclusão
                        <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </>
                )}

            {pagina === 2 && (
                <>
                  <h4 className="text-center fw-bold" style={{ color: "#234970" }}>
                    Conclusão da Atividade
                  </h4>

                <p className="mb-3 lead">
                  <strong>Este momento</strong> serviu para te ajudar a <strong>reconhecer</strong> a forma como falas contigo próprio/a em <strong>situações difíceis</strong>.
                </p>
                <p className="mb-3 lead">
                  Ao refletires sobre a tua <strong>voz crítica</strong>, percebeste que, muitas vezes, nós somos <strong>excessivamente duros</strong> connosco na tentativa de nos <strong>motivarmos a melhorar</strong>.
                </p>
                <p className="mb-3 lead">
                  Embora a <strong>intenção</strong> por trás dessa crítica seja de nos ajudar a <strong>evitar erros</strong>, o <strong>impacto emocional</strong> que ela nos causa pode ser <strong>negativo</strong>, alimentando emoções de <strong>raiva</strong>, <strong>ansiedade</strong> e <strong>frustração</strong> e até desmotivação; em vez de tentarmos fazer melhor, a vontade é de desistir.
                </p>
                <p className="mb-4 lead">
                  Se não usamos esse <strong>discurso tão severo</strong> com os outros, <strong>por que o fazemos connosco</strong>?
                </p>


                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink" onClick={retrocederPagina}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <AtividadeProgressao
                    moduloId={moduloId}
                    atividadeIndex={1}
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

export default MaiorInimigo;