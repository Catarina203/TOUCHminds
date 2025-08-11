import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import AtividadeProgressao from "../atividadeProgressao";

const AbracarMe = () => {
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
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>Abraçar-Me A Mim Mesmo/a</h2>
                <p className="mb-3 lead"><strong>Sê muito bem-vindo/a ao “Abraçar-Me A Mim Mesmo”!</strong></p>
                <p className="mb-3 lead">
                  Nesta atividade, vou convidar-te a <strong>imaginares</strong>, o melhor que conseguires, uma <strong>situação ou desafio</strong> relacionado com a <strong>ansiedade</strong> que possas estar a enfrentar neste momento ou já enfrentaste no passado.
                </p>
                <p className="mb-3 lead">
                  Convida a tua <strong>voz compassiva</strong>, aquela que é <strong>gentil</strong> e <strong>bondosa</strong>, a estar contigo nesta atividade. 
                </p>
                <p className="mb-3 lead">
                  Se, em algum momento, a tua <strong>atenção se dispersar ou desviar</strong>, lembra-te de que isso é <strong>natural</strong>, basta trazê-la <strong>gentilmente</strong> de volta para a atividade. 
                </p>
                <div className="text-center">
                  <button className="custom-btn-turquoise mt-2 px-4 py-2" onClick={avancarPagina}>
                    <i className="bi bi-play-fill me-2"></i>Vamos começar?
                  </button>
                </div>
              </div>
            )}

              {pagina === 1 && (
                <>
                  <p className="lead mb-3">
                    Ouve o áudio abaixo que te irá guiar pela atividade.
                  </p>
                              
                  <audio 
                    controls 
                    controlsList="nodownload"
                    style={{ width: "100%", maxWidth: "600px" }}
                    onPlay={() => setShowAudioWarning(false)}
                    onEnded={handleAudioEnd}
                  >
                    <source src="/audios/modulo3/abracar/abracar.mp3" type="audio/mpeg" />
                    O teu navegador não suporta a reprodução de áudio.
                  </audio>

                  {showAudioWarning && (
                    <div className="alert mb-4 text-white"
                      style={{ backgroundColor: '#99CBC8', border: 'none' }}>
                      <i className="bi bi-info-circle me-2"></i>
                      É necessário ouvir o áudio até ao fim para continuar.
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
                    <strong>Esta atividade</strong> teve como objetivo mostrar-te a importância de praticar a <strong>autocompaixão</strong>.
                  </p>
                  <p className="mb-3 lead">
                    Lembra-te de que ao praticares ser mais <strong>gentil</strong> e <strong>compreensivo</strong> contigo mesmo/a, especialmente em <strong>momentos difíceis</strong>, podes reduzir o teu <strong>autocriticismo</strong> e facilitar a <strong>aceitação das tuas emoções</strong>.
                  </p>
                  <p className="mb-3 lead">
                    A <strong>autocompaixão</strong> não significa <strong>ignorar os problemas</strong>, mas sim abordá-los com uma atitude de <strong>compreensão, aprendendo com as dificuldades</strong> sem <strong>julgamento</strong> e continuando a investir no que queremos alcançar.
                  </p>
                  <p className="mb-4 lead">
                    A prática contínua dessa forma de <strong>cuidado</strong> pode contribuir para o teu <strong>bem-estar</strong>, ajudando-te a <strong>lidar melhor com os desafios</strong> do dia a dia.
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

export default AbracarMe;
