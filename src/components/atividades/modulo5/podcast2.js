import React, { useState, useContext , useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import modulos from '../../../data/modulos';
import AtividadeProgressao from '../atividadeProgressao';

const AnsiedadeSOSPOD = () => {
  const [pagina, setPagina] = useState(0);
  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);

  const modulo = modulos.find((m) => m.id === moduloId);
  const atividade = modulo?.atividades.find(a => a.url === "podcast2");

  const [audioCompleted, setAudioCompleted] = useState([false]); 
  const [showAudioWarning, setShowAudioWarning] = useState(false);


  const avancarPagina = () => {
    if (pagina >= 1 && pagina <= 4 && !audioCompleted[pagina - 1]) {
      setShowAudioWarning(true); // mostra o aviso
      return;
    }
    setShowAudioWarning(false); // limpa aviso se válido
    setPagina((prev) => prev + 1);
  };
  const retrocederPagina = () => {
    setPagina((prev) => prev - 1);
  };


  useEffect(() => {
    setShowAudioWarning(false); // limpa o aviso sempre que muda de página

    if (pagina >= 1 && pagina <= 4) {
      const currentAudioIndex = pagina - 1;
      if (!audioCompleted[currentAudioIndex]) {
        setAudioCompleted(prev => {
          const newState = [...prev];
          newState[currentAudioIndex] = false;
          return newState;
        });
      }
    }
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
              <div className="text-start py-4">
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>
                  {atividade?.titulo || "Ansiedade SOS: Quando o Corpo Fala Mais Alto"}
                </h2>
                <p className="lead">
                  <strong>Sê muito bem-vindo ou bem-vinda ao Podcast TOUCHminds!</strong><br /><br />
                  Neste episódio, <strong>"Ansiedade SOS: Quando o Corpo Fala Mais Alto"</strong>, vamos explorar um tema que afeta muitas pessoas,
                  mas que nem sempre é falado: <strong>a ansiedade SOS</strong>.<br /><br />
                  Vamos perceber como a <strong>ansiedade pode passar de algo momentâneo para uma sensação intensa e constante</strong>, afetando o
                  nosso corpo, pensamentos e até os nossos comportamentos. <br></br><br></br>
                  Vais através de <strong>exemplos do dia a dia</strong> aprender a identificar <strong>os sinais de alerta</strong> e conhecer alguns <strong>recursos que podem ajudar a lidar com isso</strong>.<br /><br />
                  <strong>Pronto para descobrir mais sobre este tema?</strong>
                </p>
                <div className="text-center">
                  <button className="custom-btn-turquoise mt-3 px-4 py-2" onClick={avancarPagina}>
                    <i className="bi bi-play-fill me-2"></i>Vamos a isto?
                  </button>
                </div>
              </div>
            )}

            {/* ÁUDIO PAUSADO / CONTEÚDO PRINCIPAL */}
            {pagina === 1 && (
              <>
                <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>Quando o Corpo Fala Mais Alto</h4>
                <div className="text-center mb-4">
                  {/* N
                  <img
                    src="/imgs/podcast_cover.png"
                    alt="Capa do episódio"
                    className="img-fluid rounded mb-3"
                    style={{ maxWidth: "300px" }}
                  />
                  */}
                  <p>
                  </p>
                  {/* Simulação do player (podes substituir por um real depois) */}
                <audio controls style={{ width: "100%", maxWidth: "600px" }}>
                  <source src="/audios/abracar-me-a-mim-mesmo.mp3" type="audio/mpeg" />
                  O teu navegador não suporta a reprodução de áudio.
                </audio>
                {showAudioWarning && (
                  <div className="alert mb-4 text-white"
                    style={{ backgroundColor: '#99CBC8', border: 'none' }}>
                    <i className="bi bi-info-circle me-2"></i>
                    É necessário ouvir o áudio até ao fim para continuar.
                  </div>
                )}
                
                </div>


                <div className="d-flex justify-content-between">
                  <button className="custom-btn-pink" onClick={retrocederPagina}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <button className="custom-btn-turquoise" onClick={avancarPagina}>
                    Conclusão <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </>
            )}

            {/* CONCLUSÃO */}
            {pagina === 2 && (
              <>
                <h4 className="fw-bold mb-4 text-start" style={{ color: "#234970" }}>Conclusão da Atividade</h4>
                <p className="lead">
                  <strong>Chegámos ao fim deste episódio</strong>, e antes de terminarmos, quero deixar-te com uma <strong>reflexão importante: a ansiedade SOS é algo real</strong>, e por vezes pode <strong>tomar conta de nós sem aviso</strong>.<br /><br />
                  O que é fundamental é perceber que <strong>é possível entender esses sinais</strong> e começar a <strong>reagir de forma diferente</strong>.<br></br><br></br>
                  <strong>Não se trata de ignorar a ansiedade</strong> ou de a <strong>'aguentar'</strong> até ao limite. Trata-se de <strong>reconhecer quando ela aparece e procurar maneiras de lidar com ela</strong>.<br /><br />
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
