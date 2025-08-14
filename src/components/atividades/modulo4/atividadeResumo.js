import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import AtividadeProgressao from "../atividadeProgressao";
import { Modal, Button } from 'react-bootstrap';

const AtividadeResumoMudanca = () => {
  const [pagina, setPagina] = useState(0);
  const [faseEscolhida, setFaseEscolhida] = useState("");
  const [confianca, setConfianca] = useState("");
  const [fasesAbertas, setFasesAbertas] = useState([]);
  const [msgModalShow, setMsgModalShow] = useState(false);
  const [faseParaMensagem, setFaseParaMensagem] = useState("");
  const [avisoFase, setAvisoFase] = useState(false);
  const [avisoConfianca, setAvisoConfianca] = useState(false);
  

 const handlePhaseInfoClick = (faseKey) => {
  setFasesAbertas((prev) =>
    prev.includes(faseKey) ? prev.filter((k) => k !== faseKey) : [...prev, faseKey]
  );
};

  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);


  const avancarPagina = () => {
    setPagina((prev) => prev + 1);
  };

  const retrocederPagina = () => {
    setPagina((prev) => prev - 1);
  };

  const progresso = Math.round((pagina / 4) * 100);

  const fases = {
    calmaria: {
      titulo: "Calmaria",
      descricao: "O mar está calmo e, à primeira vista, nada parece urgente. Talvez haja sinais de que algo não está bem, mas ainda não são claros ou são facilmente postos de lado. Nesta fase, tal como quando olhamos para o mar sem pensar em surfar, ainda não estás totalmente decidido/a a entrar na água."
    },
    preparacao: {
      titulo: "Preparação",
      descricao: "Ao longe, começa a formar-se uma onda e percebes que talvez seja o momento de agir. Já tens consciência de que algo precisa de mudar, mas ainda ponderas se deves ou não avançar agora. É como segurar a prancha e avaliar se esta é a melhor altura para entrar no mar."
    },
    remada: {
      titulo: "Remada",
      descricao: "Decidiste entrar na água e começas a remar. Estás a dar os primeiros passos concretos para a mudança, mesmo que sejam pequenos. Tal como o surfista que avança em direção à onda, estás a ganhar impulso para aproveitar o momento certo."
    },
    surfar: {
      titulo: "Surfar a Onda",
      descricao: "Agora já estás na onda — a mudança está em movimento. Estás a aplicar novas estratégias e hábitos de forma consistente, tal como o surfista que aproveita a força da onda para avançar. É um momento activo e entusiasmante, em que cada movimento conta."
    },
    desafios: {
      titulo: "Desafios no Surf",
      descricao: "Continuas a surfar, mas o mar pode mudar — ondas mais fortes ou correntes inesperadas podem surgir. Esta fase é sobre manter as mudanças que já conquistaste, mesmo quando aparecem desafios. Tal como no surf, é preciso adaptar-te e manter o rumo para seguir em frente."
    }
  };

  const mensagemPosSelecao = {
  calmaria: {
    titulo: "Calmaria",
    texto:
      "Parece que ainda estás a decidir se mudar é para ti… o que leva a pensar que mudar pode ser uma possibilidade importante para o teu bem-estar?"
  },
  preparacao: {
    titulo: "Preparação",
    texto:
      "Parece que queres mudar, mas não sabes bem se é este o momento… o que poderá ser benéfico para ti se a mudança acontecer a curto prazo?"
  },
  remada: {
    titulo: "Remada",
    texto:
      "Parece que decidiste começar a mudar, um bocadinho de cada vez… que mudanças podes fazer agora, a curto prazo, que ainda não fizeste?"
  },
  surfar: {
    titulo: "Surfar a Onda",
    texto:
      "Parece que estás lançado na mudança… o que ainda falta fazer? Que objetivo ainda falta alcançar e como podes lá chegar?"
  },
  desafios: {
    titulo: "Desafios no Surf",
    texto:
      "Parece que a mudança já faz parte da tua vida… o que poderá desviar a tua atenção deste teu caminho?"
  }
};

const imagemFase = {
  calmaria: "/imgs/modulo4/resumo/calmaria.png",
  preparacao: "/imgs/modulo4/resumo/preparacao.png",
  remada: "/imgs/modulo4/resumo/remada.png",
  surfar: "/imgs/modulo4/resumo/surfar.png",
  desafios: "/imgs/modulo4/resumo/desafios.png",
};

  const configuracaoConfianca = {
  calmaria: {
    instrucao:
      "Como está a tua confiança para enfrentares esta fase de calmaria antes da mudança? Como te sentes em relação à tua capacidade de agir quando for o momento?",
    niveis: {
      alta: "Estou confiante de que existe algo que tem mesmo de ser mudado.",
      moderada: "Sinto que algo tem de ser mudado, mas ainda não sei bem o quê nem como.",
      baixa: "Talvez haja algo a mudar, mas nem saberia como começar."
    }
  },
  preparacao: {
    instrucao:
      "Como está a tua confiança para te preparares para a mudança, agora que a onda se começa a formar? Como te sentes em relação à tua capacidade de dar os primeiros passos?",
    niveis: {
      alta: "Sei exatamente o que preciso mudar e já estou a dar pequenos passos para começar.",
      moderada: "Já começo a perceber o que preciso mudar e tenho algumas ideias de como agir.",
      baixa: "Acho que já sei o que preciso mudar, mas ainda não tenho a certeza do que fazer primeiro."
    }
  },
  remada: {
    instrucao:
      "Como está a tua confiança para continuares a remar em direção à onda? Como te sentes em relação à tua capacidade de manter o esforço necessário para chegar lá?",
    niveis: {
      alta: "Estou totalmente dedicado/a e a trabalhar de forma consistente para alcançar a mudança.",
      moderada: "Já estou a agir e a sentir algum progresso, mesmo que ainda haja muito a fazer.",
      baixa: "Comecei a tentar, mas ainda sinto que não estou a fazer o suficiente para mudar."
    }
  },
  surfar: {
    instrucao:
      "Como está a tua confiança para surfares esta fase ativa da mudança? Como te sentes em relação à tua capacidade de a viver e acompanhar o seu ritmo?",
    niveis: {
      alta: "Estou a viver a mudança com confiança e a aproveitar plenamente esta fase.",
      moderada: "Estou a acompanhar o ritmo da mudança e a agir conforme as situações surgem.",
      baixa: "Estou a passar pela mudança, mas ainda não me sinto totalmente seguro/a nela."
    }
  },
  desafios: {
    instrucao:
      "Como está a tua confiança para ultrapassares os desafios que surgem enquanto continuas a surfar? Como te sentes em relação à tua capacidade de lidar com as dificuldades e seguir em frente?",
    niveis: {
      alta: "Mesmo com os desafios, estou determinado/a a avançar e a superar cada obstáculo.",
      moderada: "Os desafios estão presentes, mas estou a encontrar formas de me adaptar.",
      baixa: "As dificuldades estão a abalar-me e sinto que posso não conseguir continuar."
    }
  }
};

 const handleFaseSelect = (fase) => {
  setFaseEscolhida(fase);
  setFaseParaMensagem(fase);
  setMsgModalShow(true);   
  setAvisoFase(false);     
};

  const handleConfiancaSelect = (nivel) => {
    setConfianca(nivel);
  };

const canAdvanceFromPage = (currentPage) => {
  switch (currentPage) {
    case 3:
      return confianca !== "";
    default:
      return true;
  }
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
              <div className="text-center">
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>
                  Atividade Resumo
                </h2>
                <p className="lead mb-3">
                 <strong> Sê muito bem-vindo/a à atividade resumo do Módulo 4 – O Poder da Mudança</strong>!
                </p>
                <p className="mb-3 lead">
                  O objetivo desta atividade é <strong>consolidar os conteúdos</strong> que explorámos ao longo do módulo.
                </p>
                <p className="mb-3 lead">
                  A mudança é como <strong>surfar uma onda</strong>: há momentos de <strong>calmaria</strong>, mas também há <strong>desafios</strong>.
                </p>
                <p className="mb-3 lead">
                  Às vezes estamos prontos para apanhar a onda e, noutras, ela acaba por nos derrubar.
                </p>
                <p className="mb-3 lead">
                  Usando esta <strong>metáfora</strong>, vais criar o teu próprio <strong>percurso de mudança</strong>.
                </p>
                <p className="mb-4 lead">
                  Pensa na <strong>mudança</strong> que gostarias de fazer e como a <strong>metáfora da onda</strong> pode ajudar-te a <strong>refletir</strong> sobre este processo.
                </p>
                <div className="text-center">
                  <button className="custom-btn-turquoise mt-2 px-4 py-2" onClick={avancarPagina}>
                    <i className="bi bi-play-fill me-2"></i> Vamos a isto?
                  </button>
                </div>
              </div>
            )}

            {/* PÁGINA 1 - IMAGEM */}
            {pagina === 1 && (
                <div className="text-center"> 
                <h4 className="text-center fw-bold mb-4"style={{ color: "#234970" }}>
                  A Metáfora da Onda
                   </h4>

                   <p className="lead">
               <strong>Qual é a mudança que queres surfar?</strong> Pensa num <strong>comportamento ou situação </strong>que desejas mudar.
              </p>
            
                  <img
                    src="/imgs/modulo4/resumo/resumo1.png"
                    alt="Metáfora da onda da mudança"
                    className="img-fluid mb-4"
                   style={{
                      width: "100%",        
                      maxWidth: "500px",    
                      height: "auto",       
                      objectFit: "cover",   
                    }}
                    />
          
                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink" onClick={retrocederPagina}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <button className="custom-btn-turquoise" onClick={avancarPagina}>
                    Próximo
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            )}

            {/* PÁGINA 2 - ESCOLHA DA FASE */}
            {pagina === 2 && (
              <div className="text-center">
                <h4 className="text-center fw-bold mb-4" style={{ color: "#234970" }}>
                  Em que fase da onda te encontras?
                </h4>
                <p className="lead">
                A mudança é como <strong> surfar uma onda</strong>: cada fase representa um momento diferente neste processo. 
                O ciclo de mudança tem cinco fases e tu já deste um passo importante — <strong>identificar o que queres mudar</strong>. 
                Agora, <strong>observa </strong>as fases da onda e <strong> identifica </strong> qual delas descreve melhor o ponto em que estás. 
                <strong> Carrega nos círculos</strong> para saber mais sobre cada fase e, no final, <strong> seleciona </strong> aquela em que sentes que te encontras:
                </p>

                <div className="text-center mb-4">
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img 
                      src="/imgs/modulo4/resumo/fases.png" 
                      alt="Fases da Onda da Mudança" 
                       style={{
                      width: "100%",        
                      maxWidth: "500px",    
                      height: "auto",       
                      objectFit: "cover",   
                    }}
                    />
                    
                    {/* Modified invisible clickable buttons - now open modals */}
                    <button
                      onClick={() => handlePhaseInfoClick('calmaria')}
                      style={{
                        position: 'absolute',
                        top: '27%',
                        left: '4%',
                        width: '28%',
                        height: '33%',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        zIndex: 10
                      }}
                      aria-label="Ver informações sobre Calmaria"
                    />
                    
                    <button
                      onClick={() => handlePhaseInfoClick('preparacao')}
                      style={{
                        position: 'absolute',
                        top: '4%',
                        left: '35%',
                        width: '30%',
                        height: '34%',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        zIndex: 10
                      }}
                      aria-label="Ver informações sobre Preparação"
                    />
                    
                    <button
                      onClick={() => handlePhaseInfoClick('remada')}
                      style={{
                        position: 'absolute',
                        top: '25%',
                        left: '66%',
                        width: '32%',
                        height: '35%',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        zIndex: 10
                      }}
                      aria-label="Ver informações sobre Remada"
                    />
                    
                    <button
                      onClick={() => handlePhaseInfoClick('surfar')}
                      style={{
                        position: 'absolute',
                        top: '61%',
                        left: '55%',
                        width: '33%',
                        height: '35%',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        zIndex: 10
                      }}
                      aria-label="Ver informações sobre Surfar a Onda"
                    />
                    
                    <button
                      onClick={() => handlePhaseInfoClick('desafios')}
                      style={{
                        position: 'absolute',
                        top: '62%',
                        left: '15%',
                        width: '33%',
                        height: '35%',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        zIndex: 10
                      }}
                      aria-label="Ver informações sobre Desafios no Surf"
                    />
                  </div>
                </div>


               {fasesAbertas.length > 0 && (
                  <div className="text-start">
                    {fasesAbertas.map((key) => (
                      <div
                        key={key}
                        className="alert alert-info mb-3"
                        style={{ backgroundColor: '#e8f4f3', borderColor: '#99CBC8' }}
                      >
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="fw-bold mb-4" style={{ color: "#234970" }}>
                              {fases[key].titulo}
                            </h6>
                            <p className="lead">{fases[key].descricao}</p>
                          </div>
                          <button
                              type="button"
                              className="btn btn-sm btn-primary"
                              style={{
                                backgroundColor: "#234970", // azul personalizado
                                borderColor: "#234970"
                              }}
                              onClick={() => setFasesAbertas((prev) => prev.filter((k) => k !== key))}
                              aria-label={`Fechar texto de ${fases[key].titulo}`}
                            >
                              Fechar
                            </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                  <Modal
                        show={msgModalShow}
                        onHide={() => {
                          setMsgModalShow(false);
                        }}
                        centered
                        size="lg"
                      >
                        <Modal.Header closeButton style={{ backgroundColor: "#99CBC8", borderBottom: "none", color: "#fff" }}>
                          <Modal.Title className="w-100 text-center" style={{ fontWeight: 600 }}>
                            {faseParaMensagem ? mensagemPosSelecao[faseParaMensagem].titulo : ""}
                          </Modal.Title>
                        </Modal.Header>

                    <Modal.Body className="text-center">
                      {faseParaMensagem && (
                        <>
                          <img
                            src={imagemFase[faseParaMensagem]}
                            alt={mensagemPosSelecao[faseParaMensagem].titulo}
                            className="img-fluid mb-3"
                            style={{ maxHeight: "320px", objectFit: "contain" }}
                          />
                          <p className="lead">
                            {mensagemPosSelecao[faseParaMensagem].texto}
                          </p>
                        </>
                      )}
                    </Modal.Body>

                    <Modal.Footer style={{ borderTop: "none", backgroundColor: "#F5FDFC", justifyContent: "center" }}>
                      <Button
                        type="button"
                        onClick={() => {
                          setMsgModalShow(false); // fecha a modal
                          avancarPagina();        // e AVANÇA para a página 3
                        }}
                        style={{
                          backgroundColor: "#234970",
                          borderColor: "#234970",
                          borderRadius: "8px",
                          padding: "0.5rem 1.5rem",
                          fontWeight: 500,
                        }}
                      >
                        Próximo
                      </Button>
                    </Modal.Footer>
                  </Modal>


                <div className="lead">
                  <h6 className="fw-bold mb-4" style={{ color: "#234970" }}>
                    Seleciona a tua fase
                  </h6>
                  <div className="row">
                    {Object.entries(fases).map(([key, f]) => (
                      <div key={key} className="lead">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="fase-radio"
                            id={`fase-radio-${key}`}
                            checked={faseEscolhida === key}
                            onChange={() => handleFaseSelect(key)}
                          />
                          <label className="form-check-label" htmlFor={`fase-radio-${key}`}>
                            {f.titulo}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  </div>

              {avisoFase && (
                  <div className="alert alert-warning mt-3">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Por favor, seleciona uma fase antes de continuar.
                  </div>
                )}

                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink" onClick={retrocederPagina}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
            <button
                    className="custom-btn-turquoise"
                    type="button"
                    onClick={() => {
                      if (!faseEscolhida) {
                        setAvisoFase(true); 
                      }
                      setAvisoFase(false);
                      setMsgModalShow(true); 
                    }}
                  >
                    Próximo
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            )}

           {pagina === 3 && (
                <div className="text-center">
                  <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>
                    O teu nível de confiança
                  </h4>

                  <p className="lead">
                    {configuracaoConfianca[faseEscolhida]?.instrucao ||
                      "Como está a tua confiança para lidar com esta mudança? Escolhe a frase que melhor te representa."}
                  </p>

                  {avisoConfianca && (
                      <div className="alert alert-warning mt-3">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        Por favor, seleciona a frase que melhor representa o teu nível de confiança para continuar.
                      </div>
                    )}


                {/* Frases */}
                      <div className="d-flex flex-column gap-3">
                        {Object.entries(configuracaoConfianca[faseEscolhida]?.niveis || {}).map(([key, frase]) => {
                          const isSelected = confianca === key;
                          return (
                            <div
                              key={key}
                              onClick={() => {
                                setConfianca(key);
                                setAvisoConfianca(false); 
                              }}
                              className="p-3 rounded"
                              style={{
                                backgroundColor: isSelected ? '#99CBC8' : '#ffffff',
                                color: isSelected ? 'white' : '#234970',
                                border: '1px solid #99CBC8',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                              }}
                            >
                              <p className="mb-0 fw-medium">{frase}</p>
                            </div>
                          );
                        })}
                      </div>

                      <div className="d-flex justify-content-between mt-4">
                        <button className="custom-btn-pink" onClick={retrocederPagina}>
                          <i className="bi bi-arrow-left me-2"></i>Anterior
                        </button>
                        <button
                          className="custom-btn-turquoise"
                          onClick={() => {
                            if (!confianca) {
                              setAvisoConfianca(true);  
                              return;
                            }
                            setAvisoConfianca(false);
                            avancarPagina();            
                          }}
                        >
                          Conclusão
                          <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                      </div>
                    </div>
                  )}

            {/* PÁGINA 4 - CONCLUSÃO */}
            {pagina === 4 && (
              <>
                <h4 className="text-center fw-bold mb-4" style={{ color: "#234970" }}>Conclusão da Atividade</h4>
                <p className="mb-3 lead">
                  <strong>Refletir sobre o teu percurso de mudança</strong> mudança é como parar por um instante em cima da prancha e observar o mar à tua volta. 
                </p>
                <p className="mb-3 lead">
                  Tal como no surf, a mudança pede <strong> prática, paciência, coragem e determinação </strong>. 
                </p>
                <p className="mb-3 lead">
                  Ao longo deste caminho, identificaste o que queres <strong>mudar, pensaste nos desafios e reconheceste o teu próprio nível de confiança. </strong> 
                </p>
                <p className="mb-3 lead">
                  E lembraste-te que, mesmo quando o mar fica agitado, podes ajustar a tua posição e seguir em frente. 
                </p>
                <p className="mb-3 lead">
                 No surf — e na vida — o mais importante não é <strong> nunca cair</strong>, mas sim voltar a <strong>levantar e remar de novo</strong> em direção à próxima onda. 
                </p>
                <p className="mb-3 lead">
                  Guarda esta <strong>metáfora contigo</strong> e lembra-te: <strong>estás sempre em movimento</strong>, e <strong>cada tentativa é uma oportunidade para aprender</strong>.
                </p>
                <p className="mb-3 lead">
                  <strong>Continua a surfar a tua onda, ao teu ritmo – porque ela é só tua.</strong>
                </p>

                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink" onClick={retrocederPagina}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <AtividadeProgressao
                    moduloId={moduloId}
                    atividadeIndex={3}
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

export default AtividadeResumoMudanca;