import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import AtividadeProgressao from "../atividadeProgressao";
import { UserContext } from "../../../App";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "bootstrap/dist/css/bootstrap.min.css";

const comportamentos = {
  procrastinacao: {
    nome: "Procrastinação",
    descricao:
      "Deixo para depois trabalhos escolares, como estudar para um teste ou preparar as apresentações orais, com receio de falhar ou de ser criticado.",
    frases: {
      mudar: [
        "Melhorar meu desempenho escolar.",
        "Reduzir o estresse antes das provas.",
        "Sentir-me mais confiante nas apresentações.",
      ],
      contraMudar: [
        "Exige mais esforço e organização.",
        "Posso sentir-me sobrecarregado no início.",
      ],
      naoMudar: [
        "Tenho mais tempo livre imediato.",
        "Evito o desconforto de enfrentar tarefas difíceis.",
      ],
      contraNaoMudar: [
        "Notas baixas podem afetar meu futuro.",
        "Sinto culpa por não cumprir minhas responsabilidades.",
      ],
    },
  },
  redesSociais: {
    nome: "Uso excessivo de redes sociais",
    descricao:
      "Passo horas no Instagram, TikTok ou outras plataformas, adiando compromissos ou evitando situações que me causam desconforto, como interações presenciais.",
    frases: {
      mudar: [
        "Ter mais tempo para atividades produtivas.",
        "Melhorar minha saúde mental.",
        "Fortalecer relacionamentos reais.",
      ],
      contraMudar: [
        "Perder atualizações dos amigos.",
        "Sentir-me desconectado das tendências.",
      ],
      naoMudar: [
        "Entretenimento fácil e acessível.",
        "Ajuda a passar o tempo quando estou entediado.",
      ],
      contraNaoMudar: [
        "Diminuição da produtividade.",
        "Aumento da ansiedade e comparação social.",
      ],
    },
  },
  isolamento: {
    nome: "Isolamento social",
    descricao:
      "Recuso convites para sair com amigos, evito festas ou encontros por receio de ser julgado ou de não saber o que dizer, preferindo ficar sozinho/a.",
    frases: {
      mudar: [
        "Desenvolver habilidades sociais.",
        "Criar memórias positivas com amigos.",
        "Sentir-me mais conectado e apoiado.",
      ],
      contraMudar: [
        "Enfrentar situações desconfortáveis.",
        "Possibilidade de rejeição ou julgamento.",
      ],
      naoMudar: [
        "Evito situações estressantes.",
        "Tenho mais tempo para mim mesmo.",
      ],
      contraNaoMudar: [
        "Sentimento de solidão aumenta.",
        "Perco oportunidades de crescimento pessoal.",
      ],
    },
  },
};

const quadrantes = [
  { id: "mudar", titulo: "Prós de mudar" },
  { id: "contraMudar", titulo: "Contras de mudar" },
  { id: "naoMudar", titulo: "Prós de não mudar" },
  { id: "contraNaoMudar", titulo: "Contras de não mudar" },
];

const BalancaVirtual = () => {
  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);
  const [pagina, setPagina] = useState(0);
  const [comportamento, setComportamento] = useState(null);
  const [frasesDisponiveis, setFrasesDisponiveis] = useState([]);
  const [respostas, setRespostas] = useState({
    mudar: [],
    contraMudar: [],
    naoMudar: [],
    contraNaoMudar: [],
  });
  const [showValidationError, setShowValidationError] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    // Clear validation error when user interacts
    if (showValidationError) {
      setShowValidationError(false);
    }

    if (source.droppableId === "frasesDisponiveis") {
      setFrasesDisponiveis((prev) => prev.filter((f) => f !== draggableId));
      setRespostas((prev) => ({
        ...prev,
        [destination.droppableId]: [...prev[destination.droppableId], draggableId],
      }));
    } else if (source.droppableId !== destination.droppableId) {
      const frase = respostas[source.droppableId].find((f) => f === draggableId);
      setRespostas((prev) => ({
        ...prev,
        [source.droppableId]: prev[source.droppableId].filter((f) => f !== frase),
        [destination.droppableId]: [...prev[destination.droppableId], frase],
      }));
    }
  };

  const avaliar = () => {
    const totalMudar = respostas.mudar.length + respostas.contraNaoMudar.length;
    const totalNaoMudar = respostas.naoMudar.length + respostas.contraMudar.length;
    if (totalMudar > totalNaoMudar) return 1;
    if (totalNaoMudar > totalMudar) return -1;
    return 0;
  };

  const validateQuadrantes = () => {
    return quadrantes.every(quadrante => respostas[quadrante.id].length > 0);
  };

  const handleProceedToReflection = () => {
    if (validateQuadrantes()) {
      setPagina(3);
      setShowValidationError(false);
    } else {
      setShowValidationError(true);
    }
  };

  const renderImage = () => {
    const resultado = avaliar();
    if (resultado > 0) {
      return (
        <div className="text-center mb-4">
          <img src="/imgs/modulo4/balanca/mudar.png" alt="Balança inclinada para mudar" className="img-fluid" style={{ maxHeight: '200px' }} />
        </div>
      );
    } else if (resultado < 0) {
      return (
        <div className="text-center mb-4">
          <img src="/imgs/modulo4/balanca/naomudar.png" alt="Balança inclinada para não mudar" className="img-fluid" style={{ maxHeight: '200px' }} />
        </div>
      );
    } else {
      return (
        <div className="text-center mb-4">
          <img src="/imgs/modulo4/balanca/empate.png" alt="Balança equilibrada" className="img-fluid" style={{ maxHeight: '200px' }} />
        </div>
      );
    }
  };

  const renderFeedback = () => {
    const resultado = avaliar();
    if (resultado > 0) {
      return "Os benefícios de mudar o comportamento que escolheste superam os desafios iniciais. Implementar essa mudança pode trazer uma melhoria significativa para o teu bem-estar. Com um plano bem estruturado e o teu empenho, estás no caminho certo para alcançar resultados positivos e duradouros.";
    } else if (resultado < 0) {
      return "Embora a mudança de comportamento tenha muitos benefícios, os desafios, como a resistência inicial e a necessidade de adaptação, podem ser significativos. Considera trabalhar em pequenos passos e encontrar estratégias que tornem a mudança mais fácil. Isso significa que, se decidires avançar, pode ser útil abordar a mudança de forma gradual e planeada.";
    } else {
      return "Os prós e contras estão equilibrados, o que significa que mudar o comportamento pode ser uma boa opção, mas é fundamental ter um plano para lidar com os desafios que podem surgir. Pensa em estratégias específicas para enfrentar os obstáculos e tornar a mudança mais viável e vantajosa.";
    }
  };

  const iniciarFrases = (key) => {
    setComportamento(key);
    const todas = [].concat(...Object.values(comportamentos[key].frases));
    setFrasesDisponiveis(todas);
    setRespostas({
      mudar: [],
      contraMudar: [],
      naoMudar: [],
      contraNaoMudar: [],
    });
    setShowValidationError(false);
    setPagina(2);
  };

  const getEmptyQuadrantes = () => {
    return quadrantes.filter(quadrante => respostas[quadrante.id].length === 0);
  };
  const progresso = Math.round((pagina / 4) * 100);

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
            {pagina === 0 && (
              <>
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>Balança Virtual</h2>
                <p className="mb-3 lead"><strong>Sê muito bem-vindo ou bem-vinda à atividade da Balança Virtual!</strong></p>
                <p className="mb-3 lead">Esta atividade vai ajudar-te a <strong>refletir de forma interativa</strong> sobre os <strong>prós e contras de mudar comportamentos</strong>.</p>
                <p className="mb-3 lead">Para começar, seleciona um <strong>comportamento</strong> dos exemplos a seguir que gostarias de <strong>mudar</strong>. Escolhe aquele que mais se aproxima da tua <strong>experiência</strong> e que faz mais <strong>sentido para ti neste momento da tua vida</strong>.</p>
                <p className="mb-3 lead">Lembra-te de que a <strong>escolha é tua</strong>, e o objetivo é <strong>entender melhor as implicações de mudar ou de não mudar esse comportamento</strong>. </p>
                <div className="text-center">
                  <button className="custom-btn-turquoise mt-2 px-4 py-2" onClick={() => setPagina(1)}>
                    <i className="bi bi-play-fill me-2"></i>Vamos a isto?</button>
                </div>
              </>
            )}

            {pagina === 1 && (
              <>
                <p className="lead"><strong>Começa por escolher um comportamento</strong> dos exemplos apresentados em seguida que queiras <strong>mudar</strong>.
                  Escolhe o comportamento que se aproxima mais da tua <strong>experiência</strong>, ou seja, aquele que <strong>faça mais sentido para ti</strong>.
                </p>
                {Object.entries(comportamentos).map(([key, obj]) => (
                  <div key={key} className="mb-3">
                    <button
                      className="btn w-100 text-start"
                      onClick={() => iniciarFrases(key)}
                      style={{
                        border: '1px solid #99CBC8',
                        color: '#000000',
                        backgroundColor: 'transparent',
                        borderRadius: '12px',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#5AAAA5'; e.currentTarget.style.color = 'white'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'black'; }}
                    >
                      <strong>{obj.nome}</strong>
                      <div className="text-muted small">{obj.descricao}</div>
                    </button>
                  </div>
                ))}
                <button className="custom-btn-pink mt-3" onClick={() => setPagina(0)}>
                  <i className="bi bi-arrow-left me-2"></i>Anterior
                </button>
              </>
            )}

            {pagina === 2 && (
              <DragDropContext onDragEnd={handleDragEnd}>
                <>
                  <p className="lead">Agora que escolheste o <strong>comportamento</strong> que queres mudar, reflete sobre os <strong>prós</strong> e os <strong>contras</strong> dessa mudança.
                    A <strong>balança</strong> está dividida em quatro <strong>quadrantes</strong>, e o teu objetivo é arrastares as <strong>frases</strong> que achas que se aplicam a cada um</p>
                  <p className="text-muted small mb-3">
                    Para prosseguir, deves colocar pelo menos uma frase em cada um dos quatro quadrantes.
                  </p>

                  {showValidationError && (
                    <div className="alert alert-warning mb-3">
                      <strong>Atenção!</strong> Precisas de colocar pelo menos uma frase em cada quadrante antes de prosseguir.
                      {getEmptyQuadrantes().length > 0 && (
                        <div className="mt-2">
                          <small>Quadrantes em falta: {getEmptyQuadrantes().map(q => q.titulo).join(", ")}</small>
                        </div>
                      )}
                    </div>
                  )}

                  <Droppable droppableId="frasesDisponiveis" direction="horizontal">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps} className="d-flex flex-wrap gap-2 mb-4">
                        {frasesDisponiveis.map((frase, index) => (
                          <Draggable key={frase} draggableId={frase} index={index}>
                            {(provided) => (
                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="badge bg-secondary p-2">
                                {frase}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <div className="row">
                    {quadrantes.map((q) => (
                      <div className="col-md-6 mb-3" key={q.id}>
                        <h6 className={showValidationError && respostas[q.id].length === 0 ? "text-warning" : ""}>
                          {q.titulo}
                          {showValidationError && respostas[q.id].length === 0 && (
                            <small className="text-warning ms-2">⚠️ Precisa de pelo menos uma frase</small>
                          )}
                        </h6>
                        <Droppable droppableId={q.id}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={`min-vh-25 border rounded p-2 ${showValidationError && respostas[q.id].length === 0 ? "border-warning" : "" }`} style={{ backgroundColor: '#fbf9f9'}}
                            >
                              {respostas[q.id].map((frase, index) => (
                                <Draggable key={frase} draggableId={frase} index={index}>
                                  {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="badge  text-white p-2 mb-2" style={{backgroundColor:'#99cbc8'}}>
                                      {frase}
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                    <button className="custom-btn-pink" onClick={() => setPagina(1)}><i className="bi bi-arrow-left me-2"></i>Anterior</button>
                    <button className="custom-btn-turquoise" onClick={handleProceedToReflection}>Refletir<i className="bi bi-arrow-right ms-2"></i></button>
                  </div>
                </>
              </DragDropContext>
            )}

            {pagina === 3 && (
              <>
                <h5 className="fw-bold mb-3 text-start" style={{ color: "#234970" }}>Vamos refletir!</h5>
                <p className="lead">
                  <strong>Agora</strong> que adicionaste os <strong>prós</strong> e <strong>contras</strong> de <strong>mudar</strong> e de <strong>não mudar</strong> o comportamento, podes ver os <strong>resultados</strong> na <strong>balança</strong>.
                  O <strong>sistema</strong> calculou automaticamente a <strong>soma das frases</strong> que colocaste de cada lado e gerou-te um <strong>feedback personalizado</strong> baseado no que escolheste.
                  Podes observar qual lado da balança está mais <strong>pesado</strong>: se o lado de <strong>mudar</strong>; se o <strong>lado de não mudar</strong>.
                  Lê o <strong>feedback</strong> que recebeste e <strong>reflete</strong> sobre a tua <strong>situação atual</strong>.
                </p>
                {renderImage()}
                <p className="mt-4 fw-semibold">{renderFeedback()}</p>
                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink" onClick={() => setPagina(2)}><i className="bi bi-arrow-left me-2"></i>Anterior</button>
                  <button className="custom-btn-turquoise" onClick={() => setPagina(4)}>Conclusão<i className="bi bi-arrow-right ms-2"></i></button>
                </div>
              </>
            )}

            {pagina === 4 && (
              <>
                <h4 className="fw-bold mb-4 text-start" style={{ color: "#234970" }}>Conclusão da Atividade</h4>
                <p className="mb-3 lead">Ao longo desta <strong>atividade</strong>, exploraste formas de pensar sobre a <strong>mudança de comportamento</strong>.</p>
                <p className="mb-3 lead">
                  Lembra-te da importância de usar a <strong>estratégia</strong> de pensar nos <strong>prós e contras</strong>,
                  tanto de <strong>mudar</strong> quanto de <strong>não mudar</strong>, nas situações <strong>do dia-a-dia</strong>.
                </p>
                <p className="mb-3 lead">
                  Sempre que te deparares com a necessidade de tomar uma <strong>decisão</strong> sobre a <strong>mudança</strong> de um <strong>comportamento</strong>,
                  faz uma <strong>pausa</strong> e <strong>reflete</strong> sobre os <strong>contras e os prós de mudar</strong>, assim como os <strong>prós e contras de não mudar</strong> e manter o <strong>comportamento atual</strong>.
                </p>
                <p className="mb-3 lead">
                  Esta <strong>abordagem</strong> vai ajudar-te a ter uma <strong>perspetiva mais clara</strong> e <strong>equilibrada</strong>,
                  permitindo-te fazer <strong>escolhas mais conscientes</strong> e que promovam o teu <strong>bem-estar</strong>.
                </p>
                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink" onClick={() => setPagina(3)}><i className="bi bi-arrow-left me-2"></i>Anterior</button>
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

export default BalancaVirtual;