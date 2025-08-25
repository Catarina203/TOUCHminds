import React, { useState, useContext, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import AtividadeProgressao from "../atividadeProgressao";

const JaFosteCapaz = () => {
  const [pagina, setPagina] = useState(0);
  const [audioCompleted, setAudioCompleted] = useState([false, false, false, false]);
  const [showAudioWarning, setShowAudioWarning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);   
  const [saveError, setSaveError] = useState(null);  

  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);
  const audioRefs = useRef([]);

  const persistProgress = async (override = {}) => {
    if (typeof updateUserData !== "function") return;
    try {
      setIsSaving(true);
      setSaveError(null);
      await updateUserData({
        moduloId,
        atividadeKey: "ja_foste_capaz",
        progresso: {
          pagina,
          audioCompleted,
          ...override,
        },
      });
    } catch (error) {
      console.error("Erro ao guardar progresso:", error);
      setSaveError("Erro a guardar. Tenta novamente mais tarde.");
    } finally {
      setIsSaving(false);
    }
  };

  const avancarPagina = () => {
    if (pagina >= 1 && pagina <= 4 && !audioCompleted[pagina - 1]) {
      setShowAudioWarning(true);
      return;
    }
    setShowAudioWarning(false);
    const novaPagina = pagina + 1;
    setPagina(novaPagina);
    persistProgress({ pagina: novaPagina });
  };

  const retrocederPagina = () => {
    const novaPagina = Math.max(0, pagina - 1);
    setPagina(novaPagina);
    persistProgress({ pagina: novaPagina });
  };

  const handleAudioEnded = (audioIndex) => {
    const newAudioState = [...audioCompleted];
    newAudioState[audioIndex] = true;
    setAudioCompleted(newAudioState);
    persistProgress({ audioCompleted: newAudioState });
  };

  const progresso = Math.round((pagina / 5) * 100);

  return (
    <div className="container-fluid vh-100 p-0 font-poppins">
      <Navbar />
      <div className="row h-100 m-0">
        <Sidebar />
        <div className="col px-4 py-4" style={{ backgroundColor: "#FBF9F9" }}>
          <div className="container p-5 bg-white rounded shadow-sm">

            {/* 🔹 Barra de progresso com estado de gravação */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="progress" style={{ height: "8px", width: "75%" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progresso}%`, backgroundColor: "#99CBC8" }}
                  aria-valuenow={progresso}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="ms-3" style={{ minWidth: 120, textAlign: "right" }}>
                {isSaving && <small className="text-muted">a guardar…</small>}
                {!isSaving && !saveError && <small className="text-success">guardado</small>}
                {saveError && <small className="text-warning">{saveError}</small>}
              </div>
            </div>

            {/* PÁGINA 0 - INTRODUÇÃO */}
            {pagina === 0 && (
              <div className="text-center">
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>
                  Já Foste Capaz!
                </h2>
                <p className="lead">
                  Sê muito bem-vindo/a à atividade <strong>"Já Foste Capaz"</strong>!
                </p>
                <p className="lead">
                  Nesta atividade, vais ter a oportunidade de <strong>parar um pouco</strong> e <strong>refletir</strong> sobre <strong>situações</strong> em que ultrapassaste <strong>dificuldades</strong>, mesmo quando parecia <strong>difícil</strong>.
                </p>
                <p className="lead">
                  A ideia é ajudares-te a ti próprio/a a <strong>reconhecer</strong> tudo o que já foste <strong>capaz</strong> de fazer, mesmo em momentos de <strong>dúvida</strong> ou <strong>ansiedade</strong>.
                </p>
                <p className="lead">
                  Ao longo da atividade, vais <strong>lembrar-te</strong> de <strong>experiências tuas</strong>, de <strong>outras pessoas</strong> que te <strong>inspiraram</strong> e do <strong>impacto</strong> que o <strong>apoio dos outros</strong> já teve em ti e nas tuas conquistas.
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
                    ref={(el) => (audioRefs.current[pagina - 1] = el)}
                    controls
                    style={{ width: "100%", maxWidth: "600px" }}
                    onEnded={() => handleAudioEnded(pagina - 1)}
                  >
                    <source src={`/audios/ja-foste-capaz-${pagina}.mp3`} type="audio/mpeg" />
                    O teu navegador não suporta a reprodução de áudio.
                  </audio>
                </div>

                {showAudioWarning && (
                  <div className="alert mb-4 text-white" style={{ backgroundColor: "#99CBC8", border: "none" }}>
                    <i className="bi bi-info-circle me-2"></i>
                    É necessário ouvir o áudio até ao fim para continuar.
                  </div>
                )}

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
                <h4 className="text-center fw-bold mb-4" style={{ color: "#234970" }}>Conclusão da Atividade</h4>
                <p className="lead">
                  Com esta atividade pudeste perceber que a nossa <strong>confiança</strong> em ser capaz de <strong>enfrentar</strong> e <strong>superar desafios</strong> vem da <strong>crença</strong> de que conseguimos realizar o que nos propomos.
                </p>
                <p className="lead">
                  As <strong>experiências passadas</strong>, especialmente as em que <strong>superamos dificuldades</strong>, ajudam-nos a perceber que somos <strong>capazes</strong> de lidar com <strong>situações difíceis</strong>.
                </p>
                <p className="lead">
                  Além disso, ver <strong>outras pessoas</strong> a conseguirem o que parecia <strong>impossível</strong> pode nos fazer <strong>acreditar</strong> que também somos capazes.
                </p>
                <p className="lead">
                  O <strong>apoio</strong> de quem acredita em nós, como <strong> amigos, professores</strong> ou <strong>familiares</strong>, aumenta essa confiança.
                </p>
                <p className="lead">
                  Quando estamos <strong>bem-dispostos e com energia</strong>, isso nota-se também no <strong> nosso corpo </strong> e ajuda a sentirmo-nos mais confiantes para enfrentar os desafios.
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