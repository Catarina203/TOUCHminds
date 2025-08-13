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
  const [confiancaDetalhes, setConfiancaDetalhes] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [imagemModal, setImagemModal] = useState(null);
  const [tituloModal, setTituloModal] = useState('');
  const [fasesAbertas, setFasesAbertas] = useState([]);
  const [msgModalShow, setMsgModalShow] = useState(false);
  const [faseParaMensagem, setFaseParaMensagem] = useState("");
  

  const handleConfiancaClick = (key) => {
    const nivel = niveisConfianca[key];
    setImagemModal(nivel.imagem);
    setTituloModal(nivel.titulo);
    setModalShow(true);
  };

 const handlePhaseInfoClick = (faseKey) => {
  setFasesAbertas((prev) =>
    prev.includes(faseKey) ? prev.filter((k) => k !== faseKey) : [...prev, faseKey]
  );
};

  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);

  const abrirMensagemDaFase = () => {
  if (!faseEscolhida) return;
  setFaseParaMensagem(faseEscolhida);
  setMsgModalShow(true);
};


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

  const niveisConfianca = {
    alta: {
      titulo: "Confiança Alta",
      imagem: "/imgs/modulo4/resumo/image044.png",
      descricao: "Sentes-te preparado(a) e confiante para enfrentar os desafios da mudança. Como um surfista experiente, acreditas que tens as competências necessárias para navegar pelas ondas que vêm aí."
    },
    moderada: {
      titulo: "Confiança Moderada",
      imagem: "/imgs/modulo4/resumo/image046.png",
      descricao: "Tens alguma confiança, mas também algumas dúvidas. É como um surfista que já apanhou algumas ondas, mas ainda sente um friozinho na barriga antes de entrar na água."
    },
    baixa: {
      titulo: "Confiança Baixa",
      imagem: "/imgs/modulo4/resumo/image048.png",
      descricao: "Sentes-te inseguro(a) sobre a tua capacidade de lidar com a mudança. É como um surfista iniciante que olha para as ondas grandes e se pergunta se conseguirá mesmo fazê-lo."
    }
  };

  const handleFaseSelect = (fase) => {
    setFaseEscolhida(fase);
  };

  const handleConfiancaSelect = (nivel) => {
    setConfianca(nivel);
    setConfiancaDetalhes("");
  };

  const canAdvanceFromPage = (currentPage) => {
    switch (currentPage) {
      case 2:
        return faseEscolhida !== "";
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
               <strong>Qual é a mudança que queres surfar?</strong> Pensa de forma simples num <strong>comportamento ou situação </strong>que desejas mudar.
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
                O ciclo de mudança tem cinco fases e tu já deste um passo importante — <strong>identificar o que queres mudar.</strong> 
                Agora, <strong>observa </strong>as fases da onda e <strong> identifica </strong> qual delas descreve melhor o ponto em que estás.
                Carrega nos círculos para saber mais sobre cada fase e, no final, <strong> seleciona </strong> aquela em que sentes que te encontras:
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
                            <h6 className="fw-bold mb-2" style={{ color: "#234970" }}>
                              {fases[key].titulo}
                            </h6>
                            <p className="mb-0">{fases[key].descricao}</p>
                          </div>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
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

                  <Modal show={msgModalShow} onHide={() => setMsgModalShow(false)} centered size="lg">
                    <Modal.Header
                      closeButton
                      style={{ backgroundColor: "#99CBC8", borderBottom: "none", color: "#fff" }}
                    >
                      <Modal.Title style={{ fontWeight: 600 }}>
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
                          <p className="lead text-start mb-0">
                            {mensagemPosSelecao[faseParaMensagem].texto}
                          </p>
                        </>
                      )}
                    </Modal.Body>

                    <Modal.Footer
                      style={{ borderTop: "none", backgroundColor: "#F5FDFC", justifyContent: "center" }}
                    >
                      <Button
                        onClick={() => setMsgModalShow(false)}
                        style={{
                          backgroundColor: "#234970",
                          borderColor: "#234970",
                          borderRadius: "8px",
                          padding: "0.5rem 1.5rem",
                          fontWeight: 500,
                        }}
                      >
                        Fechar
                      </Button>
                    </Modal.Footer>
                  </Modal>


                <div className="mt-3 text-start">
                  <h6 className="fw-bold mb-2" style={{ color: "#234970" }}>
                    Seleciona a tua fase
                  </h6>
                  <div className="row">
                    {Object.entries(fases).map(([key, f]) => (
                      <div key={key} className="col-12 mb-2">
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
                  <div className="text-start mt-2">
                    <Button
                      onClick={abrirMensagemDaFase}
                      disabled={!faseEscolhida}
                      style={{
                        backgroundColor: "#234970",
                        borderColor: "#234970",
                        borderRadius: "8px",
                        padding: "0.5rem 1rem",
                        fontWeight: 500,
                      }}
                    >
                      Ver mensagem para esta fase
                    </Button>
                  </div>


                {!canAdvanceFromPage(2) && (
                  <div className="alert alert-warning">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    É obrigatório selecionar uma fase para continuar.
                  </div>
                )}

                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink" onClick={retrocederPagina}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <button
                    className="custom-btn-turquoise"
                    onClick={avancarPagina}
                    disabled={!canAdvanceFromPage(2)}
                  >
                    Próximo
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            )}

            {/* PÁGINA 3 - NÍVEL DE CONFIANÇA */}
            {pagina === 3 && (
              <div className="py-4">
                <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>
                  O teu nível de confiança
                </h4>
                <p className="mb-4">
                  Como está <strong>a tua confiança na capacidade</strong> de surfares a onda da mudança? Como te <strong>sentes em relação à tua confiança</strong> para lidar com ela? Escolhe uma das seguintes opções:
                </p>

                <div className="row mb-4">
                  {Object.entries(niveisConfianca).map(([key, nivel]) => {
                    const isSelected = confianca === key;

                    return (
                      <div key={key} className="col-12 mb-3">
                        <div
                          className={`card`}
                          style={{
                            border: `1px solid #99CBC8`,
                            boxShadow: isSelected ? '0 0 8px rgba(153,203,200,0.7)' : 'none',
                          }}
                        >
                          <div className="card-body d-flex align-items-center justify-content-between flex-wrap">
                            <div className="d-flex align-items-center flex-grow-1 me-3">
                              <button
                                className="btn btn-outline-info me-3 info-btn"
                                onClick={() => handleConfiancaClick(key)}
                                aria-label={`Informação sobre ${nivel.titulo}`}
                                type="button"
                                style={{ borderColor: '#99CBC8', color: '#99CBC8' }}
                              >
                                <i className="bi bi-info-circle"></i>
                              </button>
                              <h6 className="fw-bold mb-0">{nivel.titulo}</h6>
                            </div>

                            <div className="form-check mb-0">
                              <input
                                className="form-check-input custom-radio"
                                type="radio"
                                name="confianca"
                                id={`confianca-${key}`}
                                checked={isSelected}
                                onChange={() => handleConfiancaSelect(key)}
                                style={{ cursor: 'pointer' }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`confianca-${key}`}
                                style={{ color: 'black', cursor: 'pointer' }}
                              >
                                Selecionar
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Confidence Modal */}
                <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
                  <Modal.Header
                    closeButton
                    style={{
                      backgroundColor: "#99CBC8",
                      borderBottom: "none",
                      color: "#fff",
                    }}
                  >
                    <Modal.Title style={{ fontWeight: "600" }}>
                      {tituloModal}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="text-center">
                    <img
                      src={imagemModal}
                      alt={tituloModal}
                      className="img-fluid"
                      style={{ maxHeight: '300px', objectFit: 'contain' }}
                    />
                  </Modal.Body>
                  <Modal.Footer
                    style={{
                      borderTop: "none",
                      backgroundColor: "#F5FDFC",
                      justifyContent: "center",
                    }}
                  >
                    <Button className="custom-btn-complete"
                      onClick={() => {
                        setModalShow(false);
                      }}
                      style={{
                        backgroundColor: "#234970",
                        borderColor: "#234970",
                        borderRadius: "8px",
                        padding: "0.5rem 1.5rem",
                        fontWeight: "500",
                      }}
                    >
                      Fechar
                    </Button>
                  </Modal.Footer>
                </Modal>

                {confiancaDetalhes && (
                  <div className="alert alert-info" style={{ backgroundColor: '#fbf9f9', border: '1px solid #dee2e6' }}>
                    <p className="mb-0" style={{ color: 'black' }}>{confiancaDetalhes}</p>
                  </div>
                )}

                {!canAdvanceFromPage(3) && (
                  <div className="alert alert-warning">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    É obrigatório selecionar um nível de confiança para continuar.
                  </div>
                )}

                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink" onClick={retrocederPagina}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <button
                    className="custom-btn-turquoise"
                    onClick={avancarPagina}
                    disabled={!canAdvanceFromPage(3)}
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
                <h4 className="fw-bold mb-4 text-start" style={{ color: "#234970" }}>Conclusão da Atividade</h4>
                <p className="mb-3 lead">
                  <strong>Refletir sobre o teu percurso de mudança</strong> é um passo importante – é como <strong>parar por um momento em cima da prancha</strong> e <strong>olhar para o mar à tua volta</strong>.
                </p>
                <p className="mb-3 lead">
                  A <strong>mudança</strong>, tal como <strong>surfar uma onda</strong>, exige <strong>equilíbrio</strong>, <strong>prática</strong>, <strong>paciência</strong> e <strong>coragem</strong>.
                </p>
                <p className="mb-3 lead">
                  Houve momentos em que <strong>identificaste o que queres mudar</strong>, <strong>pensaste nos desafios</strong> e <strong>reconheceste o teu próprio nível de confiança</strong>.
                </p>
                <p className="mb-3 lead">
                  Lembraste-te que, mesmo quando o <strong>mar está agitado</strong>, tens a capacidade de <strong>ajustar a tua posição</strong> e <strong>continuar</strong>.
                </p>
                <p className="mb-3 lead">
                  O importante <strong>não é nunca cair</strong>, mas <strong>saber levantar-te e remar de novo</strong>.
                </p>
                <p className="mb-3 lead">
                  Guarda esta <strong>metáfora contigo</strong> e lembra-te: <strong>estás sempre em movimento</strong>, e <strong>cada tentativa é uma oportunidade para aprender</strong>.
                </p>
                <p className="mb-4 text-center fw-bold" style={{ color: "#234970" }}>
                  Continua a surfar a tua onda, ao teu ritmo – ela é só tua.
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