import React, { useState, useContext, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import AtividadeProgressao from "../atividadeProgressao";

const JaFosteCapaz = () => {
  const [pagina, setPagina] = useState(0);
  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);
  const [audioEnded, setAudioEnded] = useState([false, false, false, false]);
  const [choice, setChoice] = useState([null, null, null, null]);
  const audioRefs = useRef([]);
  const [triedNext, setTriedNext] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ feedback: "" });
  const handleAudioPlay = () => setTriedNext(false);
  const progresso = Math.round((pagina / 5) * 100);


  useEffect(() => {
  setTriedNext(false); // limpa os avisos ao entrar na página

  if (pagina >= 1 && pagina <= 4) {
    const idx = pagina - 1;
    setAudioEnded(prev => {
      const next = [...prev];
      next[idx] = false;
      return next;
    });
    setChoice(prev => {
      const next = [...prev];
      next[idx] = null;
      return next;
    });
  }
}, [pagina]);



  const audioSources = [
    null, 
    "/audios/modulo4/jafostecapaz/ja-foste-capaz-1.mp3",
    "/audios/modulo4/jafostecapaz/ja-foste-capaz-2.mp3",
    "/audios/modulo4/jafostecapaz/ja-foste-capaz-3.mp3",
    "/audios/modulo4/jafostecapaz/ja-foste-capaz-4.mp3",
  ];


  const optionsByPage = {
    1: [
      "Confio totalmente que consigo",
      "Acho que posso conseguir, mas tenho dúvidas",
      "Tenho medo de falhar novamente",
    ],
    2: [
      "Se ele conseguiu, eu também posso",
      "Não sei se consigo, mas posso tentar",
      "Ele conseguiu, mas sinto que não sou capaz",
    ],
    3: [
      "Sinto que posso tentar e ter sucesso",
      "Ajuda-me, mas continuo com receio",
      "Não acredito em mim, mesmo com incentivo",
    ],
    4: [
      "Sinto-me bem e preparado/a",
      "Sinto alguma ansiedade, mas consigo gerir",
      "Sinto muita ansiedade e ainda tenho dúvidas",
    ],
  };

  
  const feedbackMsgs = {
  1: {
    "Confio totalmente que consigo": 
      "Muito bem! Isso mostra que tens consciência das tuas capacidades. Lembra-te desta confiança quando precisares de enfrentar novos desafios.",

    "Acho que posso conseguir, mas tenho dúvidas": 
      "Ter dúvidas é normal. O importante é dar um passo de cada vez e ir ganhando confiança.",

    "Tenho medo de falhar novamente": 
      "Sentir medo é natural, mas isso não significa que não consigas. Recorda-te de situações em que já superaste dificuldades — isso mostra que és capaz."
  },

  2: {
    "Se ele conseguiu, eu também posso": 
      "Ver alguém a conseguir pode aumentar a tua confiança. Usa esse exemplo como prova de que também é possível para ti.",

    "Não sei se consigo, mas posso tentar": 
      "O mais importante é tentar. Cada tentativa, mesmo que difícil, ajuda-te a aprender e a evoluir.",

    "Ele conseguiu, mas sinto que não sou capaz": 
      "Cada pessoa tem o seu ritmo. O mais importante é concentrares-te nos teus próprios passos e no que podes fazer agora."
  },

  3: {
    "Sinto que posso tentar e ter sucesso": 
      "Ótimo! Reconhecer o apoio que recebes e acreditar em ti dá-te mais força para avançares e alcançares os teus objetivos.",

    "Ajuda-me, mas continuo com receio": 
      "É normal sentir receio, mesmo com apoio. O essencial é avançar no teu ritmo e passo a passo.",

    "Não acredito em mim, mesmo com incentivo": 
      "É natural sentir isso às vezes. Lembra-te de momentos em que já enfrentaste desafios e conseguiste superá-los — isso mostra que tens capacidade."
  },

  4: {
    "Sinto-me bem e preparado/a": 
      "Muito bem! Reconhecer que estás preparado/a é importante. Podes usar essa confiança como recurso para enfrentar novos desafios.",

    "Sinto alguma ansiedade, mas consigo gerir": 
      "Sentir alguma ansiedade é normal. O mais importante é saberes que consegues lidar com ela e continuar a avançar.",

    "Sinto muita ansiedade e ainda tenho dúvidas": 
      "Está tudo bem sentir ansiedade. Identificá-la é o primeiro passo. Com o tempo, vais ganhar mais segurança."
  }
}

  const handleEnded = (idx) => {
    setAudioEnded((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

const handleChoose = (idx, value) => {
  setTriedNext(false); // limpa avisos assim que escolhe
  setChoice(prev => {
    const next = [...prev];
    next[idx] = value;
    return next;
  });
  const page = idx + 1;
  const msg = feedbackMsgs[page]?.[value];
  if (msg) {
    setModalContent({ feedback: msg });
    setShowModal(true);
  }
};

const canProceed = () => {
  if (pagina >= 1 && pagina <= 4) {
    const idx = pagina - 1;
    const okAudio = audioEnded[idx];
    const okChoice = !!choice[idx];
    if (!(okAudio && okChoice)) setTriedNext(true); // mostra avisos
    return okAudio && okChoice;
  }
  return true;
};

  const avancarPagina = () => {
    if (!canProceed()) return;
    setPagina((p) => p + 1);
  };

  const retrocederPagina = () => setPagina((p) => p - 1);

 const titles = {
  1: "Lembra-te de um desafio que superaste",
  2: "Inspirar-te com o exemplo de alguém",
  3: "Quando alguém acredita em ti",
  4: "O que o teu Corpo te diz antes dos desafios",
};

          // Modal component (igual ao teu, mas com onNext no botão primário)
        const Modal = ({ show, onClose, onNext, content, nextLabel }) => {
          if (!show) return null;

          return (
            <div
              className="modal fade show"
              style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                  <div
                    className="modal-header"
                    style={{ backgroundColor: "#99CBC8", borderBottom: "none", color: "#fff" }}
                  >
                    <h5 className="modal-title w-100 text-center" style={{ fontWeight: 600 }}>
                      Feedback da tua escolha!
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      style={{ filter: "invert(1)" }}
                      aria-label="Close"
                      onClick={onClose}
                    />
                  </div>

                  <div className="modal-body pt-4 ps-4 pe-4">
                    <p className="lead text-start">{content.feedback}</p>
                  </div>

                  <div
                    className="modal-footer"
                    style={{ borderTop: "none", backgroundColor: "#F5FDFC", justifyContent: "center" }}
                  >
                    <button
                      type="button"
                      onClick={onNext} // <-- AVANÇA AO CLICAR "Próximo"
                      style={{
                        backgroundColor: "#234970",
                        border: "none",
                        color: "white",
                        borderRadius: "20px",
                        padding: "0.5rem 1.5rem",
                        fontWeight: 500,
                        boxShadow: "none",
                        outline: "none",
                      }}
                    >
                      {nextLabel}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        };

const idxAtual = pagina - 1;
const needAudioMsg =
triedNext && pagina >= 1 && pagina <= 4 && !audioEnded[idxAtual];
const needChoiceMsg =
triedNext && pagina >= 1 && pagina <= 4 && audioEnded[idxAtual] && !choice[idxAtual];

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

            {/* PÁGINA 0 - INTRODUÇÃO */}
            {pagina === 0 && (
              <div className="text-center">
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>
                  Já Foste Capaz!
                </h2>
                <p className="lead">
                  Sê muito bem-vindo/a à atividade <strong>“Já Foste Capaz”</strong>. 
                </p>
                <p className="lead">
                  Nesta atividade, vais ter a oportunidade de parar um pouco e refletir sobre situações em que <strong> ultrapassaste dificuldades</strong>, mesmo quando parecia difícil.
                </p>
                <p className="lead">
                A ideia é ajudares-te a ti próprio/a a  <strong> reconhecer tudo o que já foste capaz de fazer  </strong> , mesmo em momentos de dúvida ou ansiedade. 
                </p>
                 <p className="lead">
                  Ao longo da atividade, vais lembrar-te de <strong> experiências tuas, de outras pessoas que te inspiraram e do impacto que o apoio dos outros </strong>  já teve em ti e nas tuas conquistas. 
                 </p>
                <div className="text-center">
                  <button className="custom-btn-turquoise mt-2 px-4 py-2" onClick={avancarPagina}>
                    <i className="bi bi-play-fill me-2"></i> Vamos a isto?
                  </button>
                </div>
              </div>
            )}


           {/* PÁGINAS 1–4 */}
            {pagina >= 1 && pagina <= 4 && (
              <>
                <h4 className="text-center fw-bold" style={{ color: "#234970" }}>
                  {titles[pagina]}
                </h4>

                <p className="lead mb-4">
                  Ouve o áudio e completa a atividade a seguir.
                </p>

                {/* Player de áudio */}
                <div className="mb-3">
                  <audio
                    ref={(el) => { if (el) audioRefs.current[pagina - 1] = el; }}
                    src={audioSources[pagina]}
                    controls
                    playsInline
                    controlsList="nodownload noplaybackrate noremoteplayback"
                    disablePictureInPicture
                    preload="none"
                    onContextMenu={(e) => e.preventDefault()}
                    onPlay={handleAudioPlay} 
                    onEnded={() => handleEnded(pagina - 1)}
                    style={{ width: "100%" }}
                  >
                    O teu navegador não suporta a reprodução de áudio.
                  </audio>
                </div>

                {/* Mensagens de bloqueio */}
                {needAudioMsg && (
                  <div className="alert mt-3 text-white"
                    style={{ backgroundColor: '#99CBC8', border: 'none', textAlign: 'center' }}>
                    <i className="bi bi-info-circle me-2"></i>
                    É necessário ouvir o áudio até ao fim para continuar.
                  </div>
                )}

                {needChoiceMsg && (
                  <div className="alert alert-warning mt-3 text-center" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Por favor, seleciona uma opção antes de continuar.
                  </div>
                )}

                {/* Atividade (ativa só depois do áudio) */}
                <div className={`border rounded p-4 ${audioEnded[pagina - 1] ? "" : "opacity-50 pe-none"}`}>
                  {/* Página 1 */}
                  {pagina === 1 && (
                    <>
                      <p className="text-center fw-bold mb-4" style={{ color: "#234970" }}>
                        Ao lembrares-te de uma situação em que sentiste ansiedade ou medo de falhar e em que acabaste por dar a volta, como avalias agora a tua capacidade de o conseguir outra vez?
                      </p>
                      <div className="d-flex flex-column gap-3 text-start">
                        {optionsByPage[1].map((op, index) => {
                          const isSelected = choice[0] === op;
                          return (
                            <div
                              key={index}
                              onClick={() => handleChoose(0, op)}
                              className="p-3 rounded"
                              style={{
                                backgroundColor: isSelected ? "#99CBC8" : "#ffffff",
                                color: isSelected ? "white" : "#234970",
                                border: "1px solid #99CBC8",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                              }}
                            >
                              <p className="mb-0 fw-medium">{op}</p>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* Página 2 */}
                  {pagina === 2 && (
                    <>
                      <p className="text-center fw-bold mb-4" style={{ color: "#234970" }}>
                        Ao lembrares-te de alguém que viste a ultrapassar um desafio que também te parecia difícil, o que é que esse exemplo te faz acreditar sobre a tua própria capacidade?
                      </p>
                      <div className="d-flex flex-column gap-3 text-start">
                        {optionsByPage[2].map((op, index) => {
                          const isSelected = choice[1] === op;
                          return (
                            <div
                              key={index}
                              onClick={() => handleChoose(1, op)}
                              className="p-3 rounded"
                              style={{
                                backgroundColor: isSelected ? "#99CBC8" : "#ffffff",
                                color: isSelected ? "white" : "#234970",
                                border: "1px solid #99CBC8",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                              }}
                            >
                              <p className="mb-0 fw-medium">{op}</p>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* Página 3 */}
                  {pagina === 3 && (
                    <>
                      <p className="text-center fw-bold mb-4" style={{ color: "#234970" }}>
                        Ao lembrares-te de uma situação em que alguém acreditou em ti. Como te sentiste ao ouvir essas palavras e o que isso te leva a pensar sobre tentares algo novo?
                      </p>
                      <div className="d-flex flex-column gap-3 text-start">
                        {optionsByPage[3].map((op, index) => {
                          const isSelected = choice[2] === op;
                          return (
                            <div
                              key={index}
                              onClick={() => handleChoose(2, op)}
                              className="p-3 rounded"
                              style={{
                                backgroundColor: isSelected ? "#99CBC8" : "#ffffff",
                                color: isSelected ? "white" : "#234970",
                                border: "1px solid #99CBC8",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                              }}
                            >
                              <p className="mb-0 fw-medium">{op}</p>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* Página 4 */}
                  {pagina === 4 && (
                    <>
                      <p className="text-center fw-bold mb-4" style={{ color: "#234970" }}>
                        Ao lembrares-te de uma situação em que sentiste, no corpo e na mente, que ia correr bem e que serias capaz, qual destas frases descreve melhor como te sentes neste momento?
                      </p>
                      <div className="d-flex flex-column gap-3 text-start">
                        {optionsByPage[4].map((op, index) => {
                          const isSelected = choice[3] === op;
                          return (
                            <div
                              key={index}
                              onClick={() => handleChoose(3, op)}
                              className="p-3 rounded"
                              style={{
                                backgroundColor: isSelected ? "#99CBC8" : "#ffffff",
                                color: isSelected ? "white" : "#234970",
                                border: "1px solid #99CBC8",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                              }}
                            >
                              <p className="mb-0 fw-medium">{op}</p>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>

                {/* Navegação */}
                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink" onClick={retrocederPagina}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <button className="custom-btn-turquoise" onClick={avancarPagina}>
                    {pagina === 4 ? "Conclusão" : "Próximo"}
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </>
            )}

              <Modal
                  show={showModal}
                  onClose={() => {
                    // X apenas fecha o modal
                    setShowModal(false);
                  }}
                  onNext={() => {
                    // "Próximo" fecha e AVANÇA de página
                    setShowModal(false);
                    // usa a tua função de navegação (respeita as regras/gating que já tens)
                    avancarPagina();
                  }}
                  content={modalContent}
                  nextLabel={pagina === 4 ? "Conclusão" : "Próximo"}
                />


            {/* PÁGINA 5 - CONCLUSÃO */}
            {pagina === 5 && (
              <>
                <h4 className="text-center fw-bold mb-4" style={{ color: "#234970" }}>
                  Conclusão da Atividade
                </h4>
                <p className="lead">
                 Com esta atividade pudeste perceber que a nossa confiança em ser capaz de enfrentar e <strong> superar desafios vem da crença de que conseguimos realizar aquilo a que nos propomos </strong>. 
                </p>
                 <p className="lead">
                  As experiências passadas, especialmente aquelas em que superamos dificuldades,  <strong> ajudam-nos a perceber que somos capazes de lidar com situações difíceis </strong>.
                 </p>
                 <p className="lead">
                  Além disso,  <strong> ver outras pessoas a conseguirem o que parecia impossível </strong> pode nos fazer acreditar que também somos capazes. 
                  <p className="lead">
                    <strong> O apoio de quem acredita em nós, como amigos </strong> , professores ou familiares, aumenta essa confiança. 
                  </p>
                  <p className="lead">
                    Quando estamos <strong> bem-dispostos e com energia </strong>, isso nota-se também no nosso corpo e ajuda a sentirmo-nos mais confiantes para enfrentar os desafios.
                  </p>
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

export default JaFosteCapaz;