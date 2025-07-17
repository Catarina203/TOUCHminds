import React, { useState, useContext, useRef, useEffect} from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import modulos from '../../../data/modulos';
import AtividadeProgressao from '../atividadeProgressao';

const UnindoExperiencias = () => {
  const [pagina, setPagina] = useState(0);
  const [inputError, setInputError] = useState(false);

  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);

  const modulo = modulos.find((m) => m.id === moduloId);
  const atividade = modulo?.atividades.find(a => a.url === "unindo-experiencias");


  const [videoCompleted, setVideoCompleted] = useState(false);
  const [showVideoWarning, setShowVideoWarning] = useState(false);
  const videoRef = useRef(null);
  const avancarPagina = () => {
    if (pagina === 1 && !videoCompleted) {
      setShowVideoWarning(true); // Mostra aviso azul
      return;
    }
    setShowVideoWarning(false);
    setPagina(prev => prev + 1);
  };

  const retrocederPagina = () => {
    setPagina(prev => prev - 1);
  };

  useEffect(() => {
    setShowVideoWarning(false);
    setVideoCompleted(false);
  }, [pagina]);


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
                aria-valuemax="100">
              </div>
            </div>


            {/* INTRODUÇÃO */}
            {pagina === 0 && (
              <div className="text-start py-4">
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>{atividade?.titulo || "Ansiedade: Aliada ou Empecilho?"}</h2>
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <p className="lead">
                      <strong>Sê muito bem-vindo ou bem-vinda ao Unindo Experiências!</strong><br></br><br></br>
                      Todos nós, em alguns momentos, sentimos <strong>ansiedade</strong>, e, às vezes, parece que ela toma conta de tudo,
                      tornando-se difícil lidar com ela.<br></br><br></br> No entanto, é importante lembrar-te que <strong>não estás sozinho/a
                        nesta experiência.</strong> A ansiedade é uma <strong>emoção comum e partilhada por todos os seres humanos.</strong><br></br><br></br>
                      Este conceito de <strong>"humanidade comum"</strong> mostra-nos que as nossas dificuldades, fracassos e
                      sofrimentos não são únicos ou isolados, mas fazem parte de uma experiência <strong>universal</strong>,
                      querendo isto dizer que todos os seres humanos já sentiram ou vão sentir também dificuldades, fracassos
                      ou sofrimentos.<br></br><br></br>
                      Ao reconhecermos isso, podemos reconhecer o nosso sofrimento como algo que nos <strong>conecta aos outros</strong>,
                      em vez de nos afastar.<br></br><br></br>
                      Vais agora ouvir o que outras pessoas da tua idade têm a dizer sobre as suas próprias experiências
                      com a ansiedade.

                    </p>
                    <div className="text-center">
                      <button className="custom-btn-turquoise mt-3 px-4 py-2" onClick={avancarPagina}>
                        <i className="bi bi-play-fill me-2"></i>Vamos a isto?
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {pagina === 1 && (
              <>
                <div className="text-center mb-5">
                  <video
                    controls
                    className="rounded shadow"
                    style={{
                      width: "100%",
                      maxWidth: "900px",
                      height: "auto"
                    }}
                  >
                    <source src="/videos/modulo1/hashtag/hashtag_1.mp4" type="video/mp4" />
                    O teu navegador não suporta o elemento de vídeo.
                  </video>
                </div>

                {showVideoWarning && (
                  <div className="alert mt-3 text-white"
                    style={{ backgroundColor: '#99CBC8', border: 'none',  textAlign: 'center' }}>
                    <i className="bi bi-info-circle me-2"></i>
                    É necessário ver o vídeo até ao fim para continuar.
                  </div>
                )}


                <div className="d-flex justify-content-between mb-4">
                  <button className="custom-btn-pink" onClick={retrocederPagina}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <button
                    className="custom-btn-turquoise" onClick={avancarPagina}
                  >
                    Conclusão
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </>
            )}

            {/* CONCLUSÃO */}
            {pagina === 2 && (
              <>
                <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>Conclusão da Atividade</h4>
                <p className="lead">
                  <strong>Como viste neste vídeo, a ansiedade pode ser desafiadora, mas é importante lembrar-te que não estás
                    sozinho nesta experiência.</strong><br></br><br></br>
                  Todos enfrentamos momentos difíceis e, ao <strong>partilharmos as nossas histórias</strong>, percebemos que a <strong>ansiedade
                    é uma emoção comum a todos nós.</strong><br></br><br></br>
                  Este conceito de <strong>“humanidade comum”</strong> conecta-nos, mostrando que as nossas <strong>dificuldades e emoções</strong> fazem
                  parte da <strong>experiência universal</strong>.<br></br><br></br>
                  Ao <strong>falarmos sobre o que sentimos</strong> e ao <strong>procurarmos apoio</strong>, fortalecemos esses <strong>laços</strong> e aprendemos uns com
                  os outros.<br></br><br></br>
                  <strong>Juntos, podemos enfrentar a ansiedade e apoiar-nos mutuamente neste caminho.</strong>

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

export default UnindoExperiencias;