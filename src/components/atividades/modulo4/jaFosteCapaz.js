import React, { useState, useContext, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import AtividadeProgressao from "../atividadeProgressao";

const JaFosteCapaz = () => {
  const [pagina, setPagina] = useState(0);
  const [audioCompleted, setAudioCompleted] = useState([false, false, false, false]); // Para controlar se cada áudio foi ouvido
  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);
  const audioRefs = useRef([]);

  const avancarPagina = () => {
    if (pagina >= 1 && pagina <= 4 && !audioCompleted[pagina - 1]) {
      setShowAudioWarning(true); // mostra o aviso
      return;
    }
    setShowAudioWarning(false); // limpa aviso se válido
    setPagina((prev) => prev + 1);
  };

  // Estado para controlar se o aviso de áudio deve ser mostrado
  const [showAudioWarning, setShowAudioWarning] = useState(false);

  const retrocederPagina = () => {
    setPagina((prev) => prev - 1);
  };

  const progresso = Math.round((pagina / 5) * 100); // 0-5 páginas

  // Função para controlar quando o áudio termina
  const handleAudioEnded = (audioIndex) => {
    setAudioCompleted(prev => {
      const newState = [...prev];
      newState[audioIndex] = true;
      return newState;
    });
  };

  // Reset do estado do áudio quando a página muda
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

  const canAdvance = (currentPage) => {
    if (currentPage >= 1 && currentPage <= 4) {
      return audioCompleted[currentPage - 1];
    }
    return true;
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
                role="progressbar"
                style={{ width: `${progresso}%`, backgroundColor: "#99CBC8" }}
                aria-valuenow={progresso}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>

            {/* PÁGINA 0 - INTRODUÇÃO */}
            {pagina === 0 && (
              <div className="text-start py-4">
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>
                  Já Foste Capaz!
                </h2>
                <p className="lead mb-3">
                  Sê muito <strong>bem-vindo</strong> ou <strong>bem-vinda</strong> à atividade <strong>"Já Foste Capaz"</strong>!
                </p>
                <p className="mb-3 lead">
                  Nesta <strong>atividade</strong> vais ter a oportunidade de <strong>parar um pouco</strong> e <strong>refletir</strong> sobre <strong>situações</strong> em que ultrapassaste <strong>dificuldades</strong>, mesmo quando parecia <strong>difícil</strong>.
                </p>
                <p className="mb-3 lead">
                  A ideia é ajudares-te a ti próprio/a a <strong>reconhecer</strong> tudo o que já foste <strong>capaz</strong> de fazer, mesmo em momentos de <strong>dúvida</strong> ou <strong>ansiedade</strong>.
                </p>
                <p className="mb-3 lead">
                  Ao longo da atividade, vais <strong>lembrar-te</strong> de <strong>experiências tuas</strong>, de <strong>outras pessoas</strong> que te <strong>inspiraram</strong> e do <strong>impacto</strong> que o <strong>apoio dos outros</strong> pode ter em ti.
                </p>
                <p className="mb-4 lead">
                  Quando estiveres <strong>pronto/a</strong>, começa a <strong>explorar</strong> — esta <strong>viagem é sobre ti</strong>. <strong>Ouve os áudios que se seguem</strong>, que te irão guiar nesta reflexão.
                </p>
                <div className="text-center">
                  <button className="custom-btn-turquoise mt-2 px-4 py-2" onClick={avancarPagina}>
                    <i className="bi bi-play-fill me-2"></i> Vamos a isto?
                  </button>
                </div>
              </div>
            )}

            {/* PÁGINAS 1-4 - ÁUDIOS */}
            {pagina >= 1 && pagina <= 4 && (
              <div className="text-center py-4">
                <h4 className="fw-bold mb-4 text-start" style={{ color: "#234970" }}>
                  Áudio {pagina} de 4
                </h4>
                <p className="lead mb-4">
                  Ouve com atenção este áudio que te vai guiar na reflexão.
                </p>

                <div className="mb-4">
                  <audio
                    ref={el => audioRefs.current[pagina - 1] = el}
                    controls
                    style={{ width: "100%", maxWidth: "600px" }}
                    onEnded={() => handleAudioEnded(pagina - 1)}
                  >
                    <source src={`/audios/ja-foste-capaz-${pagina}.mp3`} type="audio/mpeg" />
                    O teu navegador não suporta a reprodução de áudio.
                  </audio>
                </div>

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

                  <button
                    className="custom-btn-turquoise"
                    onClick={avancarPagina}
                  >
                    {pagina === 4 ? 'Conclusão' : 'Próximo'}
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            )}

            {/* PÁGINA 5 - CONCLUSÃO */}
            {pagina === 5 && (
              <>
                <h4 className="fw-bold mb-4 text-start" style={{ color: "#234970" }}>Conclusão da Atividade</h4>
                <p className="mb-3">
                  Com esta <strong>atividade</strong> pudeste perceber que a nossa <strong>confiança</strong> em ser capaz de <strong>enfrentar</strong> e <strong>superar desafios</strong> vem da <strong>crença</strong> de que conseguimos realizar o que nos propomos.
                </p>
                <p className="mb-3 lead">
                  As <strong>experiências passadas</strong>, especialmente as em que <strong>superamos dificuldades</strong>, ajudam-nos a perceber que somos <strong>capazes</strong> de lidar com <strong>situações difíceis</strong>.
                </p>
                <p className="mb-3 lead">
                  Além disso, ver <strong>outras pessoas</strong> a conseguirem o que parecia <strong>impossível</strong> pode nos fazer <strong>acreditar</strong> que também somos capazes.
                </p>
                <p className="mb-3 lead">
                  O <strong>apoio</strong> de quem acredita em nós, como <strong>professores</strong> ou <strong>familiares</strong>, aumenta essa confiança.
                </p>
                <p className="mb-3 lead">
                  A maneira como lidamos com a <strong>ansiedade</strong>, como as <strong>mãos a suar</strong> ou o <strong>coração acelerado</strong>, também influencia como nos vemos.
                </p>
                <p className="mb-4 lead">
                  Quando conseguimos <strong>continuar</strong> apesar destas <strong>sensações físicas</strong>, estamos a demonstrar que somos capazes de <strong>enfrentar desafios</strong>.
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