import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import AtividadeProgressao from "../atividadeProgressao";

const PodcastTouchminds = () => {
  const [pagina, setPagina] = useState(0);
  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);
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
              ></div>
            </div>

            {/* PÁGINA 0 - INTRODUÇÃO */}
            {pagina === 0 && (

              <div className="text-center py-4">
                <h2 className="fw-bold mb-4 text-start" style={{ color: "#234970" }}>
                  Podcast TOUCHminds
                </h2>
                <p className="lead mb-3">
                  <strong>Episódio: “O Peso Do Silêncio – Estigma, Ansiedade E Histórias Que Precisam De Ser Ouvidas”</strong>.
                </p>
                <p className="lead mb-3">
                  <strong>Sê muito bem-vindo ou bem-vinda ao Podcast TOUCHminds!</strong>
                </p>
                <p className="lead mb-3">
                  Nesta atividade, vamos ouvir um episódio do podcast <strong>TOUCHminds</strong> (podcast criado para a intervenção <strong>TOUCHminds</strong>).
                </p>
                <p className="lead mb-4">
                  O episódio chama-se <strong>“O Peso do Silêncio”</strong> e traz <strong>cinco histórias reais</strong> de jovens e adultos que viveram de perto com a <strong>ansiedade</strong>.
                </p>
                <p className="lead mb-4">
                  Vais perceber como, muitas vezes, o que impede alguém de procurar ajuda não é a <strong>ansiedade em si… mas sim o medo do julgamento,
                    da rejeição, daquilo que os outros vão pensar</strong> — ou seja, o <strong>estigma</strong>.
                </p>
                <p className="lead mb-4">
                  Ao ouvires estas histórias, vais poder <strong>refletir sobre a tua própria experiência ou a de quem está à tua volta</strong>.
                </p>
                <button className="custom-btn-turquoise mt-2 px-4 py-2" onClick={avancarPagina}>
                  <i className="bi bi-play-fill me-2"></i> Vamos a isto?
                </button>
              </div>
            )}

            {/* PÁGINA 1 */}
            {pagina === 1 && (
              <div className="text-center py-4">
                <h4 className="fw-bold mb-4 text-start" style={{ color: "#234970" }}>
                  Episódio: O Peso do Silêncio
                </h4>
                <p className="lead mb-3">
                  Ouve com atenção as histórias reais sobre ansiedade, estigma e o silêncio que muitos vivem em silêncio.
                </p>

                <audio controls style={{ width: "100%", maxWidth: "600px" }}>
                  <source src="/audios/o-peso-do-silencio.mp3" type="audio/mpeg" />
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
                  <button className="custom-btn-turquoise" onClick={avancarPagina}>
                    Conclusão
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            )}


            {/* PÁGINA 2 - CONCLUSÃO */}
            {pagina === 2 && (
              <>
                <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>
                  Conclusão da Atividade
                </h4>
                <p className="lead mb-3">
                  <strong>Chegamos ao fim deste episódio</strong>, e fica uma reflexão importante.
                </p>
                <p className="lead mb-3">
                  O <strong>estigma associado à ansiedade</strong> é uma realidade presente na vida de muitas pessoas, criando <strong>barreiras difíceis de superar</strong>,
                  como o <strong>medo de ser julgado</strong> e a <strong>vergonha de pedir ajuda</strong>.
                </p>
                <p className="lead mb-3">
                  Esse medo, muitas vezes, leva ao <strong>isolamento</strong>, intensificando a sensação de que é necessário enfrentar a ansiedade sozinho.
                  Mas a verdade é que, quando <strong>não se fala sobre o que se sente</strong>, o <strong>sofrimento só tende a crescer</strong>.
                </p>
                <p className="lead mb-3">
                  A <strong>ansiedade não é um sinal de fraqueza</strong>; é uma <strong>resposta natural do corpo</strong>, e todos passam por momentos em que ela se torna mais intensa.
                </p>
                <p className="lead mb-4">
                  Ao <strong>falar abertamente sobre a ansiedade</strong>, <strong>desmistifica-se o tema</strong> e cria-se um ambiente onde as pessoas se sentem mais à vontade para <strong>partilhar as suas
                    experiências sem medo de serem julgadas</strong>.
                </p>
                <p className="lead mb-3">
                  Através da <strong>partilha de histórias e vivências</strong>, é possível <strong>quebrar preconceitos</strong>, promover <strong>empatia</strong> e cultivar uma comunidade mais <strong>solidária e acolhedora</strong>.
                </p>
                <p className="lead mb-3">
                  <strong>Lembra-te</strong>: isso <strong>não só ajuda a diminuir o estigma</strong>, mas também <strong>contribui para o bem-estar de todos</strong>.
                </p>

                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink" onClick={retrocederPagina}>
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

export default PodcastTouchminds;
