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

  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);

  const modulo = modulos.find((m) => m.id === moduloId);
  const atividade = modulo?.atividades.find(a => a.url === "linha-ansiedade");
  
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

  return (
    <div className="container-fluid vh-100 p-0 font-poppins">
      <Navbar />
      <div className="row h-100 m-0">
        <Sidebar />
        <div className="col px-4 py-4" style={{ backgroundColor: "#FBF9F9" }}>
          <div className="container p-5 bg-white rounded shadow-sm">

            
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
                           linhas da ansiedade, observando o que acontece <strong>antes, durante e depois</strong> de uma situação  
                           <strong>desafiadora</strong>.
                      </p>
                      <div className="text-center">
                      <button className="custom-btn-turquoise mt-3 px-4 py-2" onClick={avancarPagina}>
                        <i className="bi bi-play-fill me-2"></i>Vamos começar
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
                    className="rounded shadow"
                    style={{
                      width: "100%",
                      maxWidth: "900px",
                      height: "auto"
                    }}
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
                      <i className="bi bi-arrow-right me-2"></i>Próximo
                    </button>
                  </div>
                  </>
              )}

              {pagina === 2 && (
                <>
              

                  {/* LINHA DA ANSIEDADE NORMATIVA */}
                  <div className="fw-bold mb-4" style={{  color: "#234970"  }}>
                    <h5 className="text-center">Explora a linha de ansiedade comum, observando o que acontece ao Manuel antes, durante e depois desta situação</h5>
                    
                    <div className="position-relative mb-4">

                      <div className="position-absolute" style={{ height: "2px", backgroundColor: "#99CBC8", width: "100%", top: "50%" }}></div>
                      
                      <div className="d-flex justify-content-between position-relative">
                        <div className="text-center">
                          <button 
                            className={`btn ${mostrarAnsiedadeNormativa.antes ? 'btn-info' : 'btn-outline-info'} rounded-circle mb-2`}
                            style={{ width: "60px", height: "60px" }}
                            onClick={() => toggleAnsiedadeNormativa('antes')}
                          >
                            <i className="bi bi-clock-history"></i>
                          </button>
                          <div className="fw-bold">Antes</div>
                        </div>
                        
                        <div className="text-center">
                          <button 
                            className={`btn ${mostrarAnsiedadeNormativa.durante ? 'btn-info' : 'btn-outline-info'} rounded-circle mb-2`}
                            style={{ width: "60px", height: "60px" }}
                            onClick={() => toggleAnsiedadeNormativa('durante')}
                          >
                            <i className="bi bi-hourglass-split"></i>
                          </button>
                          <div className="fw-bold">Durante</div>
                        </div>
                        
                        <div className="text-center">
                          <button 
                            className={`btn ${mostrarAnsiedadeNormativa.depois ? 'btn-info' : 'btn-outline-info'} rounded-circle mb-2`}
                            style={{ width: "60px", height: "60px" }}
                            onClick={() => toggleAnsiedadeNormativa('depois')}
                            disabled={!videoStatus.durante} 
                          >
                            <i className="bi bi-check2-circle"></i>
                          </button>
                          <div className="fw-bold">Depois</div>
                        </div>
                        
                        <div className="text-center">
                          <button 
                            className={`btn ${mostrarAnsiedadeNormativa.conclusao ? 'btn-info' : 'btn-outline-info'} rounded-circle mb-2`}
                            style={{ width: "60px", height: "60px" }}
                            onClick={() => toggleAnsiedadeNormativa('conclusao')}
                            disabled={!videoStatus.depois} 
                          >
                            <i className="bi bi-lightbulb"></i>
                          </button>
                          <div className="fw-bold">Conclusão</div>
                        </div>
                      </div>
                    </div>
                    
                    {mostrarAnsiedadeNormativa.antes && (
                      <div className="alert alert-info text-center">
                       <video
                         controls
                         style={{ width: "100%", maxWidth: "800px" }}
                         onEnded={() => setVideoStatus(prev => ({ ...prev, antes: true }))}
                          >
                         <source src="/videos/modulo1/linha/linhanormativaantes.mp4" type="video/mp4" />
                         </video>
                         </div>
                         )}
                    {showVideoWarning && (
                  <div className="alert mt-3 text-white"
                    style={{ backgroundColor: '#99CBC8', border: 'none',  textAlign: 'center' }}>
                    <i className="bi bi-info-circle me-2"></i>
                    É necessário ver o vídeo até ao fim para continuar.
                  </div>
                )}

                    {mostrarAnsiedadeNormativa.durante && (
                    <div className="alert alert-info text-center">
                       <video
                       controls
                       style={{ width: "100%", maxWidth: "800px" }}
                       onEnded={() => setVideoStatus(prev => ({ ...prev, durante: true }))}
                    >
                      <source src="/videos/modulo1/linha/linhanormativadurante.mp4" type="video/mp4" />
                     </video>
                     </div>
                     )}

                     {showVideoWarning && (
                  <div className="alert mt-3 text-white"
                    style={{ backgroundColor: '#99CBC8', border: 'none',  textAlign: 'center' }}>
                    <i className="bi bi-info-circle me-2"></i>
                    É necessário ver o vídeo até ao fim para continuar.
                  </div>
                )}
                    
                    {mostrarAnsiedadeNormativa.depois && (
                     <div className="alert alert-info text-center">
                       <video
                        controls
                       style={{ width: "100%", maxWidth: "800px" }}
                      onEnded={() => setVideoStatus(prev => ({ ...prev, depois: true }))}
                    >
                   <source src="/videos/modulo1/linha/linhanormativadepois.mp4" type="video/mp4" />
                    </video>
                   </div>
                 )}

                {showVideoWarning && (
                  <div className="alert mt-3 text-white"
                    style={{ backgroundColor: '#99CBC8', border: 'none',  textAlign: 'center' }}>
                    <i className="bi bi-info-circle me-2"></i>
                    É necessário ver o vídeo até ao fim para continuar.
                  </div>
                )}

                    {mostrarAnsiedadeNormativa.conclusao && (
                     <div className="alert alert-info text-center">
                     <video
                     controls
                     style={{ width: "100%", maxWidth: "800px" }}
                     onEnded={() => setVideoStatus(prev => ({ ...prev, conclusao: true }))}
                   >
                   <source src="/videos/modulo1/linha/linhanormativaconclusao.mp4" type="video/mp4" />
                   </video>
                   </div>
                   )}

                   {showVideoWarning && (
                  <div className="alert mt-3 text-white"
                    style={{ backgroundColor: '#99CBC8', border: 'none',  textAlign: 'center' }}>
                    <i className="bi bi-info-circle me-2"></i>
                    É necessário ver o vídeo até ao fim para continuar.
                  </div>
                )}
                  
                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    <button className="custom-btn-pink"  onClick={retrocederPagina}>
                      <i className="bi bi-arrow-left me-2"></i>Anterior
                    </button>

                    <button className="custom-btn-turquoise" onClick={avancarPagina}>
                      disabled={!videoStatus.conclusao} 

                      <i className="bi bi-arrow-right me-2"></i>Próximo
                    </button>
                  </div>
                </>
                )}

              {pagina === 3 && (
                <>
              

                  {/* LINHA DA ANSIEDADE PATOLÓGICA */}
                  <div className="mb-4 p-4 border rounded" style={{ backgroundColor: "#f8e8e8" }}>
                    <h5 className="fw-bold mb-3">LINHA DO TEMPO: ANSIEDADE PATÓLOGIA</h5>
                    
                    <div className="position-relative mb-4">

                      <div className="position-absolute" style={{ height: "2px", backgroundColor: "#dc3545", width: "100%", top: "50%" }}></div>
                      
                      <div className="d-flex justify-content-between position-relative">
                        <div className="text-center">
                          <button 
                            className={`btn ${mostrarAnsiedadePatologica.antes ? 'btn-danger' : 'btn-outline-danger'} rounded-circle mb-2`}
                            style={{ width: "60px", height: "60px" }}
                            onClick={() => toggleAnsiedadePatologica('antes')}
                          >
                            <i className="bi bi-clock-history"></i>
                          </button>
                          <div className="fw-bold">Antes</div>
                        </div>
                        
                        <div className="text-center">
                          <button 
                            className={`btn ${mostrarAnsiedadePatologica.durante ? 'btn-danger' : 'btn-outline-danger'} rounded-circle mb-2`}
                            style={{ width: "60px", height: "60px" }}
                            onClick={() => toggleAnsiedadePatologica('durante')}
                          >
                            <i className="bi bi-hourglass-split"></i>
                          </button>
                          <div className="fw-bold">Durante</div>
                        </div>
                        
                        <div className="text-center">
                          <button 
                            className={`btn ${mostrarAnsiedadePatologica.depois ? 'btn-danger' : 'btn-outline-danger'} rounded-circle mb-2`}
                            style={{ width: "60px", height: "60px" }}
                            onClick={() => toggleAnsiedadePatologica('depois')}
                          >
                            <i className="bi bi-check2-circle"></i>
                          </button>
                          <div className="fw-bold">Depois</div>
                        </div>
                        
                        <div className="text-center">
                          <button 
                            className={`btn ${mostrarAnsiedadePatologica.conclusao ? 'btn-danger' : 'btn-outline-danger'} rounded-circle mb-2`}
                            style={{ width: "60px", height: "60px" }}
                            onClick={() => toggleAnsiedadePatologica('conclusao')}
                          >
                            <i className="bi bi-lightbulb"></i>
                          </button>
                          <div className="fw-bold">Conclusão</div>
                        </div>
                      </div>
                    </div>
                    
                    {mostrarAnsiedadePatologica.antes && (
                      <div className="alert alert-danger">
                        <p className="lead">A Maria sente-se agitada, tensa, e pensa que a apresentação vai correr mal. Ela acredita que sua dificuldade em falar em público pode prejudicar o desempenho do grupo. Além disso, acredita que se vai engasgar ou ter uma "branca", esquecendo-se do que tem de dizer. Se isso acontecer, a Maria imagina que o grupo ficará irritado com ela e que todos na turma se vão rir dela. Fica tão ansiosa que não consegue dormir bem nessa noite, sempre a pensar na desgraça que será a apresentação.</p>
                      </div>
                    )}
                    
                    {mostrarAnsiedadePatologica.durante && (
                      <div className="alert alert-danger">
                        <p className="lead">Maria acorda na manhã da apresentação sentindo o coração a bater muito rápido, como se quisesse saltar do peito e um nó na garganta que a impede de engolir. O estômago está em constantes reviravoltas, como se uma tempestade estivesse dentro dela. Surgem pensamentos como: "Não vou conseguir. Vou-me engasgar de certeza e todos se vão rir de mim." Acredita que não é capaz de enfrentar esta situação e diz à mãe que não se sente bem e que é melhor não ir à escola.</p>
                      </div>
                    )}
                    
                    {mostrarAnsiedadePatologica.depois && (
                      <div className="alert alert-danger">
                        <p className="lead">A sensação de alívio é imediata. No entanto, pouco tempo depois, a Maria pensa que o facto de não ter ido à apresentação prejudicou os seus colegas de grupo, que contavam com ela. A ideia de que a professora poderá pedir que ela apresente sozinha noutra aula aparece e é ainda assustadora, intensificando a sua ansiedade. A Maria sente que faça o que fizer está sempre errado e fica a matutar que devia conseguir fazer diferente, mas parece que nunca consegue fazer a 'coisa certa'.</p>
                      </div>
                    )}
                    
                    {mostrarAnsiedadePatologica.conclusao && (
                      <div className="alert alert-danger">
                        <p className="lead">Esta situação, ilustra como a ansiedade se pode tornar debilitante e levar ao evitamento de diferentes situações. Certos comportamentos que nos levam a evitar ou fugir de emoções desconfortáveis, podem ajudar a que nossas dificuldades se mantenham. Apesar de algumas estratégias poderem parecer funcionar a curto prazo, a longo prazo o desconforto e a ansiedade mantêm-se ou tornam-se ainda maiores. Neste caso, é verdade que no imediato a Maria se sentiu aliviada por não ter feito a apresentação e por não ter de lidar com aquele desconforto. A Maria quis fugir do que antecipou ser uma situação horrível – o fazer a apresentação – mas acabou a sentir-se ansiosa na mesma, e até encontrou novos motivos para ficar ansiosa, incluindo o ter fugido desta apresentação. Quando fugimos ou evitamos muitas vezes, a nossa mente começa a utilizar automaticamente essa estratégia: "faz a mesma coisa que fizeste da última vez, mesmo que isso só signifique que te sintas melhor por um bocadinho de tempo". Depois de evitarmos ou fugirmos por algum tempo, podemos sentir que não existem outras opções e que esta é a única estratégia que vai funcionar para nós. Evitar aquilo que nos faz sentir desconfortável pode resultar num ciclo vicioso: "o ciclo do evitamento".</p>
                      </div>
                    )}
                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    <button className="custom-btn-pink" onClick={retrocederPagina}>
                      <i className="bi bi-arrow-left me-2"></i>Anterior
                    </button>

                    <button className="custom-btn-turquoise" onClick={avancarPagina}>
                      <i className="bi bi-arrow-right me-2"></i>Próximo
                    </button>
                  </div>

                </>
              )}
              {pagina === 4 && (
                <>
                  {/* CONCLUSÃO DA ATIVIDADE */}
                    <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>Conclusão da Atividade</h4>
                    <p className="lead">
                      <strong>Espero que esta atividade tenha sido um primeiro passo importante para compreenderes melhor a ansiedade!</strong> <br></br><br></br>
                      <strong>Lembra-te</strong> que a <strong>ansiedade</strong> é útil e ajuda-nos a <strong>preparar</strong> para situações difíceis. <br></br><br></br>
                      No entanto, alguns <strong>comportamentos</strong>, como <strong>evitar</strong> certas situações, podem acabar por nos <strong>manter ansiosos</strong>, de tal maneira que parece que toda a nossa 
                      vida gira em torno da ansiedade. <br></br><br></br>
                      <strong>Nem todo o tipo de evitamento</strong> é pouco útil ou problemático; às vezes, pode ser a única maneira de lidar com uma situação difícil.<br></br><br></br>
                       O importante é <strong>reconheceres</strong> quando o <strong>evitamento</strong> ajuda e quando ele se torna um <strong>problema</strong>. <br></br><br></br>
                       <strong>Aprender</strong> a reconhecer e <strong>lidar com a ansiedade</strong> é um passo importante para o teu <strong>bem-estar</strong>.
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