import React, { useState, useContext, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import modulos from '../../../data/modulos';
import AtividadeProgressao from '../atividadeProgressao';

const LinhaAnsiedade = () => {
  const [pagina, setPagina] = useState(0);
  const [mostrarAnsiedadeNormativa, setMostrarAnsiedadeNormativa] = useState({
    antes: false,
    durante: false,
    depois: false,
    conclusao: false
  });
  const [mostrarAnsiedadePatologica, setMostrarAnsiedadePatologica] = useState({
    antes: false,
    durante: false,
    depois: false,
    conclusao: false
  });

  const [videoStatus, setVideoStatus] = useState({
    antes: false,
    durante: false,
    depois: false,
    conclusao: false
  });

    const [videoStatusPatologica, setVideoStatusPatologica] = useState({
    antes: false,
    durante: false,
    depois: false,
    conclusao: false
  });

  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);

  const modulo = modulos.find((m) => m.id === moduloId);
  const atividade = modulo?.atividades.find(a => a.url === "linha-ansiedade");
  
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [showVideoWarning, setShowVideoWarning] = useState(false);
  const videoRef = useRef(null);
 
  const avancarPagina = () => {
  // Pág. 1 -> exige ver o vídeo inicial
  if (pagina === 1 && !videoCompleted) {
    setShowVideoWarning(true);
    return;
  }

  // Pág. 2 -> exige ter visto a conclusão da linha normativa
  if (pagina === 2 && !videoStatus.conclusao) {
    setShowVideoWarning(true);
    return;
  }

  // Pág. 3 -> exige ter visto a conclusão da linha patológica
  if (pagina === 3 && !videoStatusPatologica.conclusao) {
    setShowVideoWarning(true);
    return;
  }

  // Se passou nas condições acima, avança
  setShowVideoWarning(false);
  setPagina(prev => prev + 1);
};

  const retrocederPagina = () => setPagina((prev) => prev - 1);

  useEffect(() => {
    setShowVideoWarning(false);
    setVideoCompleted(false);
  }, [pagina]);

  const toggleAnsiedadeNormativa = (fase) => {
    setMostrarAnsiedadeNormativa(prev => {
      // Fechar todos os outros popups primeiro
      const newState = {
        antes: false,
        durante: false,
        depois: false,
        conclusao: false
      };
      
      // Alternar o estado apenas do popup clicado
      newState[fase] = !prev[fase];
      
      return newState;
    });
  };

  const toggleAnsiedadePatologica = (fase) => {
    setMostrarAnsiedadePatologica(prev => {
      // Fechar todos os outros popups primeiro
      const newState = {
        antes: false,
        durante: false,
        depois: false,
        conclusao: false
      };

      // Alternar o estado apenas do popup clicado
      newState[fase] = !prev[fase];
      
      return newState;
    });
  };

        const handleFaseClickNormativa = (fase) => {
        
          if (
            (fase === 'durante' && !videoStatus.antes) ||
            (fase === 'depois' && !videoStatus.durante) ||
            (fase === 'conclusao' && !videoStatus.depois)
          ) {
            setShowVideoWarning(true);
            return;
          }

          setShowVideoWarning(false);
          toggleAnsiedadeNormativa(fase);
        };
        const handleFaseClick = (fase) => {
      if (
        (fase === 'durante' && !videoStatusPatologica.antes) ||
        (fase === 'depois' && !videoStatusPatologica.durante) ||
        (fase === 'conclusao' && !videoStatusPatologica.depois)
      ) {
        setShowVideoWarning(true); // Mostra a mensagem
        return;
      }

      setShowVideoWarning(false); // Limpa mensagem
      toggleAnsiedadePatologica(fase); // Abre a fase
    };
    
  return (
    <div className="container-fluid vh-100 p-0 font-poppins">
      <Navbar />
      <div className="row h-100 m-0">
        <Sidebar />
        <div className="col px-4 py-4" style={{ backgroundColor: "#FBF9F9" }}>
          <div className="container-fluid vh-100 p-0 font-poppins">
            <style>
              {`
                .font-poppins, .font-poppins * {
                  font-family: 'Poppins', sans-serif !important;
                }
                .font-poppins ::placeholder {
                  font-family: 'Poppins', sans-serif !important;
                }
              `}
            </style>
            <Navbar />
            
              {/* INTRODUÇÃO */}
              {pagina === 0 && (
                <div className="text-center">
                  <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>{atividade?.titulo || "Linha da Ansiedade"}</h2>
                  <div className="row justify-content-center">
                    <div className="col-md-12">
                      <p className="lead">
                        <strong>Sê muito bem-vindo/a à Linha da Ansiedade!</strong><br></br><br></br>
                         Nesta <strong>atividade </strong>, vais explorar como a ansiedade 
                         pode aparecer nas nossas vidas com <strong>diferentes intensidade.</strong><br></br> <br></br>
                         A <strong>ansiedade</strong> é <strong>normal</strong> e <strong>útil</strong>, mas 
                         quando <strong>intensa</strong> pode tornar-se um <strong>problema</strong>. Aqui, vais observar como uma mesma situação
                          pode ser sentida como <strong>ansiedade comum</strong>, que nos ajuda a <strong>preparar</strong> para os desafios, ou como
                           <strong> ansiedade SOS</strong>, que pode prejudicar o nosso <strong>bem-estar.</strong><br></br><br></br> O objetivo é que explores as duas 
                           linhas da ansiedade, observando o que acontece <strong>antes, durante e depois</strong> de uma situação <strong> desafiadora</strong>.
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

              {/* ATIVIDADE PRINCIPAL */}
              {pagina === 1 && (
                <>
                  <div className="text-center mb-5">
                  <video
                    controls
                    controlsList="nodownload"
                    className="rounded shadow"
                    style={{
                      width: "100%",
                      maxWidth: "900px",
                      height: "auto"
                    }}
                    onPlay={() => setShowVideoWarning(false)}
                    onEnded={() => setVideoCompleted(true)}
                  >
                    <source src="/videos/modulo1/linha/linhasituacao.mp4" type="video/mp4" />
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

                  <div className="d-flex justify-content-between mt-4">
                    <button className="custom-btn-pink"  onClick={retrocederPagina}>
                      <i className="bi bi-arrow-left me-2"></i>Anterior
                    </button>

                    <button className="custom-btn-turquoise"  onClick={avancarPagina}>
                     Próximo <i className="bi bi-arrow-right me-2"></i>
                    </button>
                  </div>
                  </>
              )}

              {pagina === 2 && (
                <>
              

                  {/* LINHA DA ANSIEDADE NORMATIVA */}
                  <div className="fw-bold mb-4" style={{  color: "#234970"  }}>
                    <h5 className="text-center fw-bold" style={{ marginBottom: "20px" }}> Explora a linha de ansiedade comum, observando o que acontece ao Manuel antes, durante e depois desta situação</h5>
                    
                    <div className="position-relative mb-4">

                      <div className="position-absolute" style={{ height: "2px", backgroundColor: "#99CBC8", width: "100%", top: "50%" }}></div>
                      
                      <div className="d-flex justify-content-between position-relative">
                        <div className="text-center">
                          <button 
                            className={`btn ${mostrarAnsiedadeNormativa.antes ? 'btn-info' : 'btn-outline-info'} rounded-circle mb-2`}
                            style={{ width: "60px", height: "60px" }}
                            onClick={() => handleFaseClickNormativa('antes')}
                          >
                            <i className="bi bi-clock-history"></i>
                          </button>
                          <div className="fw-bold">Antes</div>
                        </div>
                        
                        <div className="text-center">
                          <button 
                            className={`btn ${mostrarAnsiedadeNormativa.durante ? 'btn-info' : 'btn-outline-info'} rounded-circle mb-2`}
                            style={{ width: "60px", height: "60px" }}
                            onClick={() => handleFaseClickNormativa('durante')}
                          >
                            <i className="bi bi-hourglass-split"></i>
                          </button>
                          <div className="fw-bold">Durante</div>
                        </div>
                        
                        <div className="text-center">
                          <button 
                            className={`btn ${mostrarAnsiedadeNormativa.depois ? 'btn-info' : 'btn-outline-info'} rounded-circle mb-2`}
                            style={{ width: "60px", height: "60px" }}
                            onClick={() => handleFaseClickNormativa('depois')}
                          >
                            <i className="bi bi-check2-circle"></i>
                          </button>
                          <div className="fw-bold">Depois</div>
                        </div>
                        
                        <div className="text-center">
                          <button 
                            className={`btn ${mostrarAnsiedadeNormativa.conclusao ? 'btn-info' : 'btn-outline-info'} rounded-circle mb-2`}
                            style={{ width: "60px", height: "60px" }}
                            onClick={() => handleFaseClickNormativa('conclusao')}
                          >
                            <i className="bi bi-lightbulb"></i>
                          </button>
                          <div className="fw-bold">Conclusão</div>
                        </div>
                      </div>
                    </div>

                      {showVideoWarning && (
                        <div className="alert mt-3 text-white"
                          style={{ backgroundColor: '#99CBC8', border: 'none', textAlign: 'center' }}>
                          <i className="bi bi-info-circle me-2"></i>
                          É necessário ver o vídeo até ao fim para continuar.
                        </div>
                      )}
                    
                    {mostrarAnsiedadeNormativa.antes && (
                      <div className="alert alert-info text-center">
                       <video
                         controls
                         controlsList="nodownload"
                         style={{ width: "100%", maxWidth: "800px" }}
                         onPlay={() => setShowVideoWarning(false)}
                         onEnded={() => setVideoStatus(prev => ({ ...prev, antes: true }))}
                          >
                         <source src="/videos/modulo1/linha/linhanormativaantes.mp4" type="video/mp4" />
                          O teu navegador não suporta o elemento de vídeo.
                       </video>
                       </div>
                         )}
                    
                    {mostrarAnsiedadeNormativa.durante && (
                    <div className="alert alert-info text-center">
                       <video
                       controls
                       controlsList="nodownload"
                       style={{ width: "100%", maxWidth: "800px" }}
                       onPlay={() => setShowVideoWarning(false)}
                       onEnded={() => setVideoStatus(prev => ({ ...prev, durante: true }))}
                    >
                      <source src="/videos/modulo1/linha/linhanormativadurante.mp4" type="video/mp4" />
                      O teu navegador não suporta o elemento de vídeo.
                     </video>
                     </div>
                     )}

                    {mostrarAnsiedadeNormativa.depois && (
                     <div className="alert alert-info text-center">
                       <video
                        controls
                        controlsList="nodownload"
                       style={{ width: "100%", maxWidth: "800px" }}
                       onPlay={() => setShowVideoWarning(false)}
                      onEnded={() => setVideoStatus(prev => ({ ...prev, depois: true }))}
                    >
                   <source src="/videos/modulo1/linha/linhanormativadepois.mp4" type="video/mp4" />
                   O teu navegador não suporta o elemento de vídeo.
                    </video>
                   </div>
                 )}

                    {mostrarAnsiedadeNormativa.conclusao && (
                     <div className="alert alert-info text-center">
                     <video
                     controls
                     controlsList="nodownload"
                     style={{ width: "100%", maxWidth: "800px" }}
                     onPlay={() => setShowVideoWarning(false)}
                     onEnded={() => setVideoStatus(prev => ({ ...prev, conclusao: true }))}
                   >
                   <source src="/videos/modulo1/linha/linhanormativaconclusao.mp4" type="video/mp4" />
                   O teu navegador não suporta o elemento de vídeo.
                   </video>
                   </div>
                   )}    
                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    <button className="custom-btn-pink"  onClick={retrocederPagina}>
                      <i className="bi bi-arrow-left me-2"></i>Anterior
                    </button>

                    <button
                       className="custom-btn-turquoise"
                       onClick={avancarPagina}
                       >
                       Próximo <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                  </div>
                </>
                )}

              {pagina === 3 && (
                <>
              

                  {/* LINHA DA ANSIEDADE PATOLÓGICA */}
                    <div className="fw-bold mb-4" style={{  color: "#234970"  }}>
                    <h5 className="text-center fw-bold" style={{ marginBottom: "20px" }}> Explora a linha de ansiedade SOS, observando o que acontece ao Manuel antes, durante e depois desta situação</h5>
                    
                    <div className="position-relative mb-4">

                      <div className="position-absolute" style={{ height: "2px", backgroundColor: "#dc3545", width: "100%", top: "50%" }}></div>
                      
                      <div className="d-flex justify-content-between position-relative">
                        <div className="text-center">
                          <button 
                            className={`btn ${mostrarAnsiedadePatologica.antes ? 'btn-danger' : 'btn-outline-danger'} rounded-circle mb-2`}
                            style={{ width: "60px", height: "60px" }}
                            onClick={() => handleFaseClick('antes')}
                          >
                            <i className="bi bi-clock-history"></i>
                          </button>
                          <div className="fw-bold">Antes</div>
                        </div>
                        
                        <div className="text-center">
                          <button 
                            className={`btn ${mostrarAnsiedadePatologica.durante ? 'btn-danger' : 'btn-outline-danger'} rounded-circle mb-2`}
                            style={{ width: "60px", height: "60px" }}
                            onClick={() => handleFaseClick('durante')}
                          >
                            <i className="bi bi-hourglass-split"></i>
                          </button>
                          <div className="fw-bold">Durante</div>
                        </div>
                        
                        <div className="text-center">
                          <button 
                            className={`btn ${mostrarAnsiedadePatologica.depois ? 'btn-danger' : 'btn-outline-danger'} rounded-circle mb-2`}
                            style={{ width: "60px", height: "60px" }}
                            onClick={() => handleFaseClick('depois')}
                          >
                            <i className="bi bi-check2-circle"></i>
                          </button>
                          <div className="fw-bold">Depois</div>
                        </div>
                        
                        <div className="text-center">
                          <button 
                            className={`btn ${mostrarAnsiedadePatologica.conclusao ? 'btn-danger' : 'btn-outline-danger'} rounded-circle mb-2`}
                            style={{ width: "60px", height: "60px" }}
                           onClick={() => handleFaseClick('conclusao')}
                          >
                            <i className="bi bi-lightbulb"></i>
                          </button>
                          <div className="fw-bold">Conclusão</div>
                        </div>
                      </div>
                    </div>

                    {showVideoWarning && (
                    <div className="alert mt-3 text-white"
                      style={{ backgroundColor: '#99CBC8', border: 'none', textAlign: 'center' }}>
                      <i className="bi bi-info-circle me-2"></i>
                      É necessário ver o vídeo até ao fim para continuar.
                    </div>
                  )}
                    
                    {mostrarAnsiedadePatologica.antes && (
                       <div className="alert alert-danger text-center">
                      <video
                        controls
                        controlsList="nodownload"
                       style={{ width: "100%", maxWidth: "800px" }}
                       onPlay={() => setShowVideoWarning(false)}
                       onEnded={() => setVideoStatusPatologica(prev => ({ ...prev, antes: true }))}
                        >
                        <source src="/videos/modulo1/linha/linhapatologicaantes.mp4" type="video/mp4" />
                        O teu navegador não suporta o elemento de vídeo.
                       </video>
                       </div>
                       )}
                    
                    {mostrarAnsiedadePatologica.durante && (
                      <div className="alert alert-danger text-center">
                      <video
                      controls
                      controlsList="nodownload"
                      style={{ width: "100%", maxWidth: "800px" }}
                      onPlay={() => setShowVideoWarning(false)}
                    onEnded={() => setVideoStatusPatologica(prev => ({ ...prev, durante: true }))}
                     >
                     <source src="/videos/modulo1/linha/linhapatologicadurante.mp4" type="video/mp4" />
                     O teu navegador não suporta o elemento de vídeo.
                    </video>
                    </div>
                    )}

                    {mostrarAnsiedadePatologica.depois && (
                      <div className="alert alert-danger text-center">
                     <video
                      controls
                      controlsList="nodownload"
                      style={{ width: "100%", maxWidth: "800px" }}
                      onPlay={() => setShowVideoWarning(false)}
                    onEnded={() => setVideoStatusPatologica(prev => ({ ...prev, depois: true }))}
                   >
                   <source src="/videos/modulo1/linha/linhapatologicadepois.mp4" type="video/mp4" />
                   O teu navegador não suporta o elemento de vídeo.
                     </video>
                    </div>
                    )}

                    {mostrarAnsiedadePatologica.conclusao && (
                      <div className="alert alert-danger text-center">
                    <video
                    controls
                    controlsList="nodownload"
                  style={{ width: "100%", maxWidth: "800px" }}
                  onPlay={() => setShowVideoWarning(false)}
                onEnded={() => setVideoStatusPatologica(prev => ({ ...prev, conclusao: true }))}
               >
                <source src="/videos/modulo1/linha/linhapatologicaconclusao.mp4" type="video/mp4" />
                O teu navegador não suporta o elemento de vídeo.
                </video>
              </div>
                )}
                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    <button className="custom-btn-pink" onClick={retrocederPagina}>
                      <i className="bi bi-arrow-left me-2"></i>Anterior
                    </button>

                    <button
                   className="custom-btn-turquoise"
                   onClick={avancarPagina}
                  >
                  Conclusão <i className="bi bi-arrow-right ms-2"></i>
                 </button>
                </div>

                </>
              )}
              {pagina === 4 && (
                <>
                  {/* CONCLUSÃO DA ATIVIDADE */}
                    <div className="text-center"></div>
                    <h4 className="text-center fw-bold" style={{ color: "#234970" }}>Conclusão da Atividade</h4>
                    <p className="lead">
                    Espero que esta atividade tenha ajudado a perceber como <strong>os nossos pensamentos, emoções e comportamentos</strong> influenciam a forma como enfrentamos uma situação desafiadora! <br></br><br></br>
                    Lembra-te que a ansiedade é útil e ajuda-nos a <strong>preparar</strong> para situações difíceis. <br></br><br></br>
                    No entanto, alguns <strong>comportamentos</strong>, como <strong>evitar</strong> certas situações, podem acabar por nos <strong>manter ansiosos</strong>, de tal maneira que parece que toda a nossa vida gira em torno da ansiedade. <br></br><br></br>
                    <strong>Nem todo o tipo de evitamento</strong> é problemático; às vezes, pode ser a única maneira de lidar com uma situação difícil.<br></br><br></br>
                    O importante é <strong>reconheceres</strong> quando o <strong>evitamento</strong> ajuda e quando ele se torna um <strong>problema</strong>. <br></br><br></br>
                    </p>
                  <div className="d-flex justify-content-between mt-4">
                    <button className="custom-btn-pink" onClick={retrocederPagina}>
                      <i className="bi bi-arrow-left me-2"></i>Anterior
                    </button>
                    <AtividadeProgressao
                      moduloId={moduloId}
                      atividadeIndex={1}
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

export default LinhaAnsiedade;