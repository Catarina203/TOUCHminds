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
  const [faseDetalhes, setFaseDetalhes] = useState("");
  const [pros, setPros] = useState("");
  const [contras, setContras] = useState("");
  const [confianca, setConfianca] = useState("");
  const [confiancaDetalhes, setConfiancaDetalhes] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [imagemModal, setImagemModal] = useState(null);
  const [tituloModal, setTituloModal] = useState('');
  
  // New state for phase modals
  const [phaseModalShow, setPhaseModalShow] = useState(false);
  const [selectedPhaseData, setSelectedPhaseData] = useState(null);

  const handleConfiancaClick = (key) => {
    const nivel = niveisConfianca[key];
    setImagemModal(nivel.imagem);
    setTituloModal(nivel.titulo);
    setModalShow(true);
  };

  // New function to handle phase button clicks (show modal with info)
  const handlePhaseInfoClick = (faseKey) => {
    setSelectedPhaseData(fases[faseKey]);
    setPhaseModalShow(true);
  };

  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);

  const avancarPagina = () => {
    setPagina((prev) => prev + 1);
  };

  const retrocederPagina = () => {
    setPagina((prev) => prev - 1);
  };

  const progresso = Math.round((pagina / 5) * 100);

  const fases = {
    calmaria: {
      titulo: "Calmaria",
      imagem: "/imgs/modulo4/resumo/image034.png",
      descricao: "Nesta fase, ainda não sentes uma necessidade urgente de mudar. É como estar no mar calmo, onde tudo parece estar bem como está. Pode ser que ainda não tenhas identificado claramente o que queres mudar ou que não sintas que é o momento certo."
    },
    preparacao: {
      titulo: "Preparação",
      imagem: "/imgs/modulo4/resumo/image036.png",
      descricao: "Aqui já identificaste o que queres mudar e estás a preparar-te mentalmente. É como quando vês as ondas a formar-se ao longe e começas a ajustar a tua posição na prancha, preparando-te para remar."
    },
    remada: {
      titulo: "Remada",
      imagem: "/imgs/modulo4/resumo/image038.png",
      descricao: "Esta é a fase da ação! Começaste a fazer pequenas mudanças e estás ativamente a trabalhar em direção ao teu objetivo. É como remar com força para apanhar a onda - exige energia e determinação."
    },
    surfar: {
      titulo: "Surfar a Onda",
      imagem: "/imgs/modulo4/resumo/image040.png",
      descricao: "Estás no meio da mudança e sentes que tens controlo sobre o processo. É como quando consegues apanhar a onda perfeitamente e sentes a adrenalina de estar em equilíbrio, a deslizar sobre a água."
    },
    desafios: {
      titulo: "Desafios no Surf",
      imagem: "/imgs/modulo4/resumo/image042.png",
      descricao: "Às vezes a mudança traz dificuldades inesperadas ou sentes que estás a perder o controlo. É como quando a onda te derruba e tens de decidir se voltas a tentar ou se sais da água por um momento."
    }
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

  const handleFaseClick = (fase) => {
    setFaseDetalhes(fases[fase].descricao);
  };

  const handleFaseSelect = (fase) => {
    setFaseEscolhida(fase);
    setFaseDetalhes("");
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
        return pros.trim() !== "" && contras.trim() !== "";
      case 4:
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
              <div className="text-start py-4">
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>
                  Atividade Resumo
                </h2>
                <p className="lead mb-3">
                  Sê muito <strong>bem-vindo</strong> ou <strong>bem-vinda</strong> à atividade <strong>resumo do Módulo 4 – O Poder da Mudança</strong>!
                </p>
                <p className="mb-3 lead">
                  O <strong>objetivo</strong> desta atividade é <strong>consolidar</strong> os <strong>conteúdos</strong> que explorámos ao longo do <strong>módulo</strong>.
                </p>
                <p className="mb-3 lead">
                  A <strong>mudança</strong> é como <strong>surfar uma onda</strong>: há momentos de <strong>calmaria</strong>, mas também há <strong>desafios</strong>.
                </p>
                <p className="mb-3 lead">
                  Às vezes estamos <strong>prontos</strong> para apanhar a <strong>onda</strong> e, noutras, ela acaba por nos <strong>derrubar</strong>.
                </p>
                <p className="mb-3 lead">
                  Usando esta <strong>metáfora</strong>, vais criar o teu próprio <strong>percurso de mudança</strong>.
                </p>
                <p className="mb-4 lead">
                  Pensa na <strong>mudança</strong> que gostarias de fazer e como a <strong>metáfora da onda</strong> pode ajudar-te a <strong>refletir</strong> sobre este <strong>processo</strong>.
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
              <div className="text-center py-4">
                <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>
                  A Metáfora da Onda
                </h4>
                <div className="mb-4">
                  <img
                    src="/imgs/modulo4/resumo/resumo1.png"
                    alt="Metáfora da onda da mudança"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                  />
                </div>

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
              <div className="py-4">
                <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>
                  Em que fase da onda te encontras?
                </h4>
                <p className="mb-4">
                  A <strong>mudança é como surfar uma onda</strong>, e cada fase é um <strong>momento específico</strong> no processo de mudança. Lembra-te que o ciclo de mudança tem <strong>cinco fases</strong> e tu já deste um grande passo, porque já identificaste o que queres mudar. Em que fase da <strong>onda da mudança te encontras</strong>? Carrega nas <strong>áreas da imagem</strong> para saber mais <strong>sobre cada fase</strong> e no final <strong>seleciona a fase que achas que te encontras</strong>.
                </p>

                <div className="text-center mb-4">
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img 
                      src="/imgs/modulo4/resumo/fases.png" 
                      alt="Fases da Onda da Mudança" 
                      style={{ 
                        maxWidth: "600px", 
                        width: "100%", 
                        height: "auto",
                        display: 'block'
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

                

                {/* Phase Modal */}
                <Modal show={phaseModalShow} onHide={() => setPhaseModalShow(false)} centered size="lg">
                  <Modal.Header
                    closeButton
                    style={{
                      backgroundColor: "#99CBC8",
                      borderBottom: "none",
                      color: "#fff",
                    }}
                  >
                    <Modal.Title style={{ fontWeight: "600" }}>
                      {selectedPhaseData?.titulo}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="text-center">
                    <img
                      src={selectedPhaseData?.imagem}
                      alt={selectedPhaseData?.titulo}
                      className="img-fluid mb-3"
                      style={{ maxHeight: '400px', objectFit: 'contain' }}
                    />
                  </Modal.Body>
                  <Modal.Footer
                    style={{
                      borderTop: "none",
                      backgroundColor: "#F5FDFC",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        // Find the phase key that matches the selected phase data
                        const phaseKey = Object.entries(fases).find(([key, data]) => 
                          data.titulo === selectedPhaseData?.titulo
                        )?.[0];
                        
                        if (phaseKey) {
                          handleFaseSelect(phaseKey); // Select the phase
                        }
                        setPhaseModalShow(false); // Close the modal
                      }}
                      style={{
                        backgroundColor: "#234970",
                        borderColor: "#234970",
                        color: "white",
                        borderRadius: "20px",
                        padding: "0.5rem 1.5rem",
                        fontWeight: "500",
                      }}
                    >
                      Próximo
                    </button>
                  </Modal.Footer>
                </Modal>

                {faseDetalhes && (
                  <div className="alert alert-info" style={{ backgroundColor: '#e8f4f3', borderColor: '#99CBC8' }}>
                    <h6 className="fw-bold mb-2" style={{ color: "#234970" }}>
                      {Object.entries(fases).find(([key]) => faseDetalhes === fases[key].descricao)?.[1]?.titulo}
                    </h6>
                    <p className="mb-0">{faseDetalhes}</p>
                  </div>
                )}

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

            {/* Rest of your pages remain the same... */}
            {/* PÁGINA 3 - PRÓS E CONTRAS */}
            {pagina === 3 && (
              <div className="py-4">
                <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>
                  Prós e Contras da Mudança
                </h4>
                <p className="mb-4">
                  Agora, vamos olhar para o que te <strong>atrai na ideia de mudar</strong> e o que te <strong>deixa mais receoso</strong>. A metáfora da onda pode ajudar-te a visualizar esses prós e contras. <strong>Escreve nos espaços abaixo</strong>:
                </p>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-bold">
                      <i className="bi bi-plus-circle text-success me-2"></i>
                      Prós (o que te atrai na mudança) *
                    </label>
                    <textarea
                      className="form-control"
                      rows="6"
                      placeholder="Escreve os teus prós aqui"
                      value={pros}
                      onChange={(e) => setPros(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-bold">
                      <i className="bi bi-dash-circle text-warning me-2"></i>
                      Contras (o que te deixa receoso sobre a mudança) *
                    </label>
                    <textarea
                      className="form-control"
                      rows="6"
                      placeholder="Escreve os teus contras aqui"
                      value={contras}
                      onChange={(e) => setContras(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                {!canAdvanceFromPage(3) && (
                  <div className="alert alert-warning">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    É obrigatório preencher ambos os campos para continuar.
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
                    Próximo
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            )}

            {/* PÁGINA 4 - NÍVEL DE CONFIANÇA */}
            {pagina === 4 && (
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

                {!canAdvanceFromPage(4) && (
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
                    disabled={!canAdvanceFromPage(4)}
                  >
                    Conclusão
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            )}

            {/* PÁGINA 5 - CONCLUSÃO */}
            {pagina === 5 && (
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