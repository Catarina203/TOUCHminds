import React, { useState, useContext , useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import AtividadeProgressao from '../atividadeProgressao';

const AnsiedadeSOSPOD = () => {
  const [pagina, setPagina] = useState(0);
  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);
  const [audioCompleted, setAudioCompleted] = useState(false); 
  const [showAudioWarning, setShowAudioWarning] = useState(false);

    const avancarPagina = () => {
      if (pagina === 1 && !audioCompleted) {
      setShowAudioWarning(true);
      return;
        }
      setShowAudioWarning(false); // limpa o aviso se válido
      setPagina((prev) => prev + 1);
    };
  const retrocederPagina = () => {
    setPagina((prev) => prev - 1);
  };


  useEffect(() => {
         setShowAudioWarning(false); // limpa o aviso sempre que muda de página
       }, [pagina]);
 
   const progresso = Math.round((pagina / 2) * 100); // 0 - Instrução, 1 - Audio, 2 - Conclusão
 

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
              />
            </div>

            {/* INTRODUÇÃO */}
            {pagina === 0 && (
              <div className="text-center">
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>
                  Podcast TOUCHminds
                </h2>
                <p className="lead">
                  <strong>Sê muito bem-vindo/a ao Podcast TOUCHminds!</strong><br /><br />
                  Nesta atividade, vamos ouvir um episódio do podcast <strong>TOUCHminds</strong> (podcast criado para a intervenção TOUCHminds).
                  O episódio chama-se <strong>"Ansiedade SOS: Quando o Corpo Fala Mais Alto"</strong> e explorar um tema que afeta muitas pessoas,
                  mas que nem sempre é falado: <strong>a ansiedade SOS</strong>.<br /><br />
                  Vais perceber como a <strong>ansiedade pode passar de algo momentâneo para uma sensação intensa e constante</strong>, afetando o
                  nosso corpo, pensamentos e até os nossos comportamentos. <br></br><br></br>
                  Vais olhar para <strong>exemplos do dia a dia</strong> para aprender a identificar <strong>os sinais de alerta</strong> e conhecer alguns <strong>recursos que podem ajudar a lidar com isso</strong>.<br /><br />
                </p>
                <div className="text-center">
                  <button className="custom-btn-turquoise mt-3 px-4 py-2" onClick={avancarPagina}>
                    <i className="bi bi-play-fill me-2"></i>Vamos a isto?
                  </button>
                </div>
              </div>
            )}

             {pagina === 1 && (
                <>
                  <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>
                    Episódio: Ansiedade SOS - Quando o Corpo Fala Mais Alto
                  </h4>

                  <div className="text-center">
                    <p className="lead mb-3">Ouve este episódio com atenção.</p>

                    <audio
                      controls
                      controlsList="nodownload"
                      style={{ width: "100%", maxWidth: "600px" }}
                      onPlay={() => setShowAudioWarning(false)}
                      onEnded={() => setAudioCompleted(true)}
                    >
                      <source
                        src="/audios/modulo5/podcast/Corpo-Fala-Mais-Alto.mp3"
                        type="audio/mpeg"
                      />
                      O teu navegador não suporta a reprodução de áudio.
                    </audio>

                    {showAudioWarning && (
                      <div
                        className="alert mb-4 text-white"
                        style={{ backgroundColor: "#99CBC8", border: "none" }}
                      >
                        <i className="bi bi-info-circle me-2"></i>
                        É necessário ouvir o áudio até ao fim para continuar.
                      </div>
                    )}

                    <div className="d-flex justify-content-between mt-4">
                      <button className="custom-btn-pink" onClick={retrocederPagina}>
                        <i className="bi bi-arrow-left me-2"></i>Anterior
                      </button>
                      <button className="custom-btn-turquoise" onClick={avancarPagina}>
                        Conclusão <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                </>
              )}

            {/* CONCLUSÃO */}
            {pagina === 2 && (
              <>
                <h4 className="text-center fw-bold" style={{ color: "#234970" }}>Conclusão da Atividade</h4>
                <p className="lead">
                  <strong>Chegámos ao fim deste episódio</strong>, e antes de terminarmos, quero deixar-te com uma <strong>reflexão importante: a ansiedade SOS é algo real</strong>, e por vezes pode <strong>tomar conta de nós sem aviso prévio</strong>.<br /><br />
                  O que é fundamental é <strong> estar atento aos sinais e começar a (re)agir de forma diferente </strong>.<br></br><br></br>
                  <strong>Não se trata de ignorar a ansiedade</strong> ou de a <strong>'aguentar'</strong> até ao limite. Trata-se de <strong>reconhecer quando ela aparece e procurar maneiras de lidar com ela na nossa vida </strong>.<br /><br />
                  <strong>Lembra-te</strong> que <strong>a ansiedade não precisa de ser um bicho-papão</strong>.
                </p>
                <div className="d-flex justify-content-between mt-4">
                  <button className="btn btn-outline-secondary" style={{
                    backgroundColor: "#E7C8C2",
                    color: "white",
                    borderRadius: "8px",
                    fontSize: "1.05rem",
                    border: "none"
                  }} onClick={retrocederPagina}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <AtividadeProgressao
                    moduloId={moduloId}
                    atividadeIndex={0}
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

export default AnsiedadeSOSPOD;
