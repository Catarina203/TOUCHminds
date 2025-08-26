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
  const [showAudioMsg, setShowAudioMsg] = useState(false);
  const [showChoiceMsg, setShowChoiceMsg] = useState(false);
  const progresso = Math.round((pagina / 5) * 100);


  useEffect(() => {
   setShowAudioMsg(false);
    setShowChoiceMsg(false);

    if (pagina >= 1 && pagina <= 4) {
      const idx = pagina - 1;
     setAudioEnded((prev) => {
        const next = [...prev];
        next[idx] = false; 
        return next;
      });
      setChoice((prev) => {
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
      "Isso mostra que reconheces as tuas capacidades. Lembra-te desta experiência para te ajudar em desafios futuros.",
    "Acho que posso conseguir, mas tenho dúvidas":
      "É natural ter dúvidas. Em situações desafiantes, avançar um passo de cada vez ajuda a ganhar confiança.",
    "Tenho medo de falhar novamente":
      "O medo é comum, mas não significa que não consegues. Recorda-te de momentos em que conseguiste superar dificuldades.",
  },
  2: {
    "Se ele conseguiu, eu também posso":
      "Observar alguém a conseguir pode reforçar a tua confiança. Usa esse exemplo como evidência de que também é possível para ti.",
    "Não sei se consigo, mas posso tentar":
      "A tentativa é um passo importante. Cada experiência, mesmo que difícil, ajuda-te a aprender e a crescer.",
    "Ele conseguiu, mas sinto que não sou capaz":
      "Cada pessoa tem o seu ritmo. Foca-te nos teus próprios passos e no que podes fazer agora.",
  },
  3: {
    "Sinto que posso tentar e ter sucesso":
      "É importante reconhecer a influência do apoio dos outros. Usa essa confiança para dares os teus próprios passos.",
    "Ajuda-me, mas continuo com receio":
      "É natural sentir receio, mesmo com apoio. O essencial é avançar pouco a pouco, no teu ritmo.",
    "Não acredito em mim, mesmo com incentivo":
      "É compreensível sentir isso. Procura lembrar-te de situações em que já conseguiste enfrentar desafios — isso mostra que és capaz.",
  },
  4: {
    "Sinto-me bem e preparado/a":
      "Reconhecer que estás bem e preparado/a é importante. Podes usar isso como recurso quando enfrentares desafios novos.",
    "Sinto alguma ansiedade, mas consigo gerir":
      "A ansiedade é uma reação normal. Identificar que consegues geri-la aumenta a tua confiança.",
    "Sinto muita ansiedade e ainda tenho dúvidas":
      "É normal sentir ansiedade. A experiência ajuda-te a lidar melhor com essas situações.",
  },
};

  const handleEnded = (idx) => {
    setAudioEnded((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

  const handleChoose = (idx, value) => {
    setChoice((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });

    const page = idx + 1;
    const msg = feedbackMsgs[page]?.[value];
    if (msg) {
      alert(msg);
    }
  };

  const canProceed = () => {
    if (pagina >= 1 && pagina <= 4) {
      const idx = pagina - 1;
      const okAudio = audioEnded[idx];
      const okChoice = !!choice[idx];
      setShowAudioMsg(!okAudio);
      setShowChoiceMsg(okAudio && !okChoice);
      return okAudio && okChoice;
    }
    return true;
  };

  const avancarPagina = () => {
    if (!canProceed()) return;
    setPagina((p) => p + 1);
  };

  const retrocederPagina = () => setPagina((p) => p - 1);

  const PageHeader = ({ titulo }) => (
    <h4 className="fw-bold mb-4 text-start" style={{ color: "#234970" }}>
      {titulo}
    </h4>
  );

 const titles = {
  1: "Lembra-te de um desafio que superaste",
  2: "Inspirar-te com o exemplo de alguém",
  3: "Quando alguém acredita em ti",
  4: "O que o teu Corpo te diz antes dos desafios",
};

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
              <div className="text-center fw-bold mb-4">
                <PageHeader titulo={`${titles[pagina]} — Áudio ${pagina} de 4`} />
                
                <p className="lead">
                  Ouve o áudio e completa a atividade a seguir.
                </p>

                {/* Player de VÍDEO com download desativado */}
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
                    onEnded={() => handleEnded(pagina - 1)}
                    style={{ width: "100%" }}
                  >  
                  O teu navegador não suporta a reprodução de áudio.
                  </audio>
                </div>

                {/* Mensagens de bloqueio */}
                {showAudioMsg && (
                      <div className="alert mb-4 text-white" style={{ backgroundColor: "#99CBC8" }}>
                      <i className="bi bi-info-circle me-2"></i>
                        É necessário ouvir o áudio até ao fim para continuar.
                    </div>
                    )}
                {showChoiceMsg && (
                 <div className="alert alert-warning mt-3 text-center" role="alert">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        Por favor, seleciona uma opção antes de continuar.
                      </div>
                )}

                {/* Atividade (só ativa depois do vídeo terminar) */}
                <div className={`border rounded p-3 ${audioEnded[pagina - 1] ? "" : "opacity-50 pe-none"}`}>
                  {/* Pergunta por página */}
                  {pagina === 1 && (
                    <>
                      <p className="mb-2">
                        <strong>
          Depois de veres o vídeo: ao lembrares-te de uma situação em que sentiste ansiedade ou medo de falhar e em que acabaste por dar a volta, como avalias agora a tua capacidade de o conseguir outra vez?
                        </strong>
                      </p>
                      <div className="d-flex flex-wrap">
                        {optionsByPage[1].map((op) => (
                          <button
                            key={op}
                            className={`btn btn-sm me-2 mb-2 ${choice[0] === op ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => handleChoose(0, op)}
                          >
                            {op}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {pagina === 2 && (
                    <>
                      <p className="mb-2">
                        <strong>
            Depois de veres o vídeo: ao lembrares-te de alguém que viste a ultrapassar um desafio que também te parecia difícil, o que é que esse exemplo te faz acreditar sobre a tua própria capacidade?
                        </strong>
                      </p>
                      <div className="d-flex flex-wrap">
                        {optionsByPage[2].map((op) => (
                          <button
                            key={op}
                            className={`btn btn-sm me-2 mb-2 ${choice[1] === op ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => handleChoose(1, op)}
                          >
                            {op}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {pagina === 3 && (
                    <>
                      <p className="mb-2">
                        <strong>
          Depois de veres o vídeo: pensa numa situação em que alguém acreditou em ti. Como te sentiste ao ouvir essas palavras e o que isso te leva a pensar sobre tentares algo novo?
                        </strong>
                      </p>
                      <div className="d-flex flex-wrap">
                        {optionsByPage[3].map((op) => (
                          <button
                            key={op}
                            className={`btn btn-sm me-2 mb-2 ${choice[2] === op ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => handleChoose(2, op)}
                          >
                            {op}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {pagina === 4 && (
                    <>
                      <p className="mb-2">
                        <strong>
          Depois de veres o vídeo: lembra-te de quando sentiste, no corpo e na mente, que ia correr bem e que serias capaz. Neste momento, qual destas frases descreve melhor como te sentes?
                        </strong>
                      </p>
                      <div className="d-flex flex-wrap">
                        {optionsByPage[4].map((op) => (
                          <button
                            key={op}
                            className={`btn btn-sm me-2 mb-2 ${choice[3] === op ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => handleChoose(3, op)}
                          >
                            {op}
                          </button>
                        ))}
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
              </div>
            )}

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