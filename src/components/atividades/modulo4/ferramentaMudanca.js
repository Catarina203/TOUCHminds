import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import AtividadeProgressao from "../atividadeProgressao";
import { UserContext } from "../../../App";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FerramentasMudanca = () => {
  const [pagina, setPagina] = useState(0);
  const [modalAberto, setModalAberto] = useState(null);
  const [canCloseModal, setCanCloseModal] = useState(false);
  const audioRef = useRef(null);
  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);
  const [showAudioWarning, setShowAudioWarning] = useState(false);
  const [audiosOuvidos, setAudiosOuvidos] = useState({});
const [showWarning, setShowWarning] = useState(false);

  const ferramentas = [
  { id: "lupa",    titulo: "Lupa",           audio: "/audios/modulo4/ferramentas/lupa.mp3",    imagem: "/imgs/modulo4/ferramentas/lupa.png" },
  { id: "bussola", titulo: "Bússola",        audio: "/audios/modulo4/ferramentas/bussola.mp3", imagem: "/imgs/modulo4/ferramentas/bussola.png" },
  { id: "mapa",    titulo: "Mapa",           audio: "/audios/modulo4/ferramentas/mapa.mp3",    imagem: "/imgs/modulo4/ferramentas/mapa.png" },
  { id: "ancora",  titulo: "Âncora",         audio: "/audios/modulo4/ferramentas/ancora.mp3",  imagem: "/imgs/modulo4/ferramentas/ancora.png" },
  { id: "martelo", titulo: "Martelo",        audio: "/audios/modulo4/ferramentas/martelo.mp3", imagem: "/imgs/modulo4/ferramentas/martelo.png" },
  { id: "perigo",  titulo: "Sinal de Perigo",audio: "/audios/modulo4/ferramentas/perigo.mp3",  imagem: "/imgs/modulo4/ferramentas/perigo.png" },
];

  useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  setShowAudioWarning(false);
  setCanCloseModal(false);

  const handleEnded = () => {
    setCanCloseModal(true);
    setShowAudioWarning(false);

    if (modalAberto) {
      setAudiosOuvidos(prev => ({
        ...prev,
        [modalAberto.id]: true
      }));
    }
  };

  audio.addEventListener("ended", handleEnded);
  return () => {
    audio.removeEventListener("ended", handleEnded);
  };
}, [modalAberto]);

const handleAttemptClose = () => {
  if (!canCloseModal) {
    setShowAudioWarning(true);
    // opcional: esconder o alerta automaticamente após 3s
    setTimeout(() => setShowAudioWarning(false), 3000);
    return;
  }
  fecharModal();
};

  const fecharModal = () => {
    setModalAberto(null);
    setCanCloseModal(false);
  };

  const handleAreaClick = (ferramentaId) => {
    const ferramenta = ferramentas.find(f => f.id === ferramentaId);
    if (ferramenta) {
      setModalAberto(ferramenta);
    }
  };

  const progresso = Math.round((pagina / (TOTAL_PAGINAS - 1)) * 100);

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
                style={{ width: `${progresso}%`, backgroundColor: "#99CBC8" }}
              ></div>
            </div>

            {/* PÁGINA 0: INSTRUÇÃO */}
            {pagina === 0 && (
              <div className="text-center">
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>Ferramentas de Mudança</h2>
                <p className="mb-3 lead">
                  <strong>Sê muito bem-vindo/a à atividade "Ferramentas de Mudança"!</strong>
                </p>
                <p className="mb-3 lead">
                  Nesta atividade, vamos explorar o <strong>ciclo da mudança</strong>, que nos ajuda a compreender melhor o que acontece quando lidamos com a <strong>ansiedade</strong> e outros <strong>desafios do dia a dia</strong> e sentimos que <strong>não sabemos por onde começar</strong>.
                </p>
                <p className="mb-3 lead">
                  O ciclo de mudança ajuda-nos a perceber que a <strong>evolução</strong> não acontece de uma só vez, mas sim <strong>aos poucos</strong>, com cada <strong>pequeno passo</strong> a fazer a diferença.
                </p>
                <p className="mb-3 lead">
                  Durante esta atividade, vais conhecer <strong>cinco fases importantes</strong> que fazem parte deste processo — desde o momento em que ainda <strong>não sabemos bem o que se passa</strong>, até ao momento em que conseguimos <strong>manter as mudanças que nos fazem bem</strong>.
                </p>
                <p className="mb-4 lead">
                  Para te ajudar a <strong>refletir</strong> sobre cada fase, vamos usar <strong>ferramentas simbólicas</strong> — como a <strong>lupa</strong>, a <strong>bússola</strong>, o <strong>mapa</strong>, a <strong>âncora</strong> ou o <strong>martelo</strong> — que representam <strong>atitudes ou gestos</strong> que podem ser úteis em diferentes momentos.
                </p>
                <div className="text-center">
                <button className="custom-btn-turquoise mt-2 px-4 py-2" onClick={() => setPagina(1)}>
                  Vamos a isto?
                </button>
                </div>
              </div>
            )}


{/* PÁGINA 1: FERRAMENTAS COM INVISIBLE BUTTONS */}
          {pagina === 1 && (
            <div className="text-center">
              <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>Explora as Ferramentas</h4>
              <p>Clica em todas as ferramentas para saberes mais.</p>
              
              <div className="d-flex justify-content-center mt-4">
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img 
                    src="/imgs/modulo4/ferramentas/ferramentas.png" 
                    alt="Ferramentas de Mudança" 
                    style={{ 
                      maxWidth: "600px", 
                      width: "100%", 
                      height: "auto",
                      display: 'block'
                    }}
                  />
                  
                  {/* Invisible clickable buttons overlaid on image */}
                  <button
                    onClick={() => handleAreaClick('lupa')}
                    style={{
                      position: 'absolute',
                      top: '18%',      // Adjust based on your image
                      left: '11%',     // Adjust based on your image
                      width: '29%',   // Adjust based on your image
                      height: '28%',  // Adjust based on your image
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                    aria-label="Lupa"
                  />
                  
                  <button
                    onClick={() => handleAreaClick('bussola')}
                    style={{
                      position: 'absolute',
                      top: '18%',
                      right: '35%',
                      width: '27%',
                      height: '28%',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                    aria-label="Bússola"
                  />
                  
                  <button
                    onClick={() => handleAreaClick('mapa')}
                    style={{
                      position: 'absolute',
                      top: '47%',
                      right: '29%',
                      width: '25%',
                      height: '24%',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                    aria-label="Mapa"
                  />
                  
                  <button
                    onClick={() => handleAreaClick('ancora')}
                    style={{
                      position: 'absolute',
                      top: '59%',
                      right: '50%',
                      width: '23%',
                      height: '25%',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                    aria-label="Âncora"
                  />
                  
                  <button
                    onClick={() => handleAreaClick('martelo')}
                    style={{
                      position: 'absolute',
                      top: '47%',
                      left: '8%',
                      width: '24%',
                      height: '24%',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                    aria-label="Martelo"
                  />
                  
                  <button
                    onClick={() => handleAreaClick('perigo')}
                    style={{
                      position: 'absolute',
                      bottom: '32%',
                      right: '2%',
                      width: '27%',
                      height: '25%',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                    aria-label="Sinal de Perigo"
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between mt-4">
                <button
                  className="custom-btn-turquoise"
                  onClick={() => {
                    const totalOuvidos = Object.keys(audiosOuvidos).length;
                    if (totalOuvidos < ferramentas.length) {
                      setShowWarning(true);
                      setTimeout(() => setShowWarning(false), 3000); // esconde aviso após 3s
                    } else {
                      setShowWarning(false);
                      setPagina(2);
                    }
                  }}
                >
                  Conclusão <i className="bi bi-arrow-right ms-2"></i>
                </button>

               {showWarning && (
              <div className="alert alert-warning mt-3 text-center" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Por favor, carrega em todas as ferramentas antes de continuar.
              </div>
            )}
              </div>
            </div>
          )}

            {/* PÁGINA 2: CONCLUSÃO */}
            {pagina === 2 && (
              <>
                <h4 className="text-center fw-bold mb-4" style={{ color: "#234970" }}>Conclusão da Atividade</h4>
                <p className="mb-3 lead">
                  <strong>Agora que exploraste o ciclo da mudança</strong> e experimentaste cada uma das <strong>ferramentas simbólicas</strong>, é importante parares um pouco e pensares no que levas desta <strong>viagem</strong>.
                </p>
                <p className="mb-3 lead">
                  Percebeste que <strong>mudar não acontece de um dia para o outro</strong> — é um <strong>processo</strong>. Um <strong>caminho</strong> com momentos de <strong>dúvida</strong>, <strong>reflexão</strong>, <strong>pequenas vitórias</strong> e, por vezes, <strong>tropeços</strong>.
                </p>
                <p className="mb-3 lead">
                  Cada fase do ciclo tem o seu <strong>valor</strong>, e <strong>não há uma forma "certa"</strong> de passar por elas. O mais importante é ires <strong>prestando atenção ao que sentes</strong>, ao que <strong>precisas</strong> e ao que <strong>te faz bem</strong>.
                </p>
                <p className="mb-3 lead">
                  Tal como usaste a <strong>lupa</strong> para observar mais de perto, a <strong>bússola</strong> para refletir sobre o caminho, o <strong>mapa</strong> para planear, o <strong>martelo</strong> para agir, a <strong>âncora</strong> para manter, e caso precises podes recorrer à <strong>borracha</strong> para reajustar, lembra-te: <strong>todas estas ferramentas estão sempre contigo</strong>.
                </p>
                <p className="mb-3 lead"><strong>Podes usá-las quando precisares.</strong></p>
                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink" onClick={() => setPagina(1)}>
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

           {/* MODAL DE ÁUDIO */}
              <Modal show={!!modalAberto} centered backdrop="static" onHide={handleAttemptClose} keyboard>
                <Modal.Header
                  closeButton
                  className="w-100 d-flex justify-content-center"
                  style={{ borderBottom: "none" }} // opcional, remove a linha inferior do header
                >
                  <Modal.Title
                    style={{
                      color: "#234970", // <- MUDA AQUI A COR DO TÍTULO
                      fontWeight: "bold",
                      textAlign: "center",
                      width: "100%",
                      fontSize: "1.5rem" // aumenta o tamanho, se quiseres
                    }}
                  >
                    {modalAberto?.titulo}
                  </Modal.Title>
                </Modal.Header>

                <Modal.Body className="text-center">
                  {showAudioWarning && (
                    <div
                      className="alert mb-4 text-white"
                      role="alert"
                      aria-live="assertive"
                      style={{ backgroundColor: '#99CBC8', border: 'none' }}
                    >
                      <i className="bi bi-info-circle me-2"></i>
                      É necessário ouvir o áudio até ao fim para continuar.
                    </div>
                  )}

                  {modalAberto?.imagem && (
                    <img
                      src={modalAberto.imagem}
                      alt={modalAberto.titulo}
                      style={{
                        maxWidth: "100%",
                        width: "420px",
                        height: "auto",
                        borderRadius: "12px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        marginBottom: "16px",
                        objectFit: "contain"
                      }}
                      loading="eager"
                    />
                  )}

                  <audio ref={audioRef} controls autoPlay style={{ width: "100%" }}>
                    <source src={modalAberto?.audio} type="audio/mpeg" />
                    O teu navegador não suporta a reprodução de áudio.
                  </audio>
                </Modal.Body>

                <Modal.Footer>
                  <button className="btn btn-success" onClick={handleAttemptClose}>
                    Fechar
                  </button>
                </Modal.Footer>
              </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FerramentasMudanca;