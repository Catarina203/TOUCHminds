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
        "Maior produtividade e sensação de realização.",
        "Redução da ansiedade relacionado a prazos apertados.",
        "Mais tempo livre para lazer e outras atividades.",
      ],
      contraMudar: [
        "Esforço necessário para criar uma rotina e disciplina.",
        "Dificuldade em começar a tarefa.",
        "Possível frustração se demorar a ver os resultados da mudança.",
      ],
      naoMudar: [
        "Evitar o desconforto de ter de mudar hábitos",
        "Manter o conforto de continuar com a rotina atual.",
        "Tempo para fazer as coisas ao próprio ritmo, mesmo que isso signifique adiar tarefas.",
      ],
      contraNaoMudar: [
        "Culpa e ansiedade constante por não cumprir prazos.",
        "Possíveis impactos negativos na escola.",
        "Perda de oportunidades e impacto na autoestima.",
      ],
    },
  },
  redesSociais: {
    nome: "Uso excessivo de redes sociais",
    descricao:
      "Passo horas no Instagram, TikTok ou outras plataformas, adiando compromissos ou evitando situações que me causam desconforto, como interagir com outras pessoas face a face. ",
    frases: {
      mudar: [
        "Mais tempo para atividades produtivas e para a estar com amigos e familiares.",
        "Redução da ansiedade e da comparação com outros.",
        "Melhor qualidade do sono e maior foco nos estudos.",
      ],
      contraMudar: [
        "Dificuldade em resistir à tentação de usar as redes sociais.",
        "Sensação de isolamento social, caso os amigos usem redes sociais para se comunicar.",
        "Perda de entretenimento e de momentos de descontração.",
      ],
      naoMudar: [
        "Continuação do contacto fácil e constante com amigos e novidades.",
        "Acesso a conteúdos que interessam e a entretenimento rápido.",
        "Sensação de pertencer a um grupo social online.",
      ],
      contraNaoMudar: [
        "Redução da produtividade e tempo mal aproveitado.",
        "Comparações negativas com outros e sentimento de não ser tão bom como eles.",
        "Impacto no bem-estar e possíveis problemas de sono.",
      ],
    },
  },
  isolamento: {
    nome: "Isolamento social",
    descricao:
      "Recuso convites para sair com amigos, evito festas ou encontros por receio de ser julgado ou de não saber o que dizer.",
    frases: {
      mudar: [
        "Maior desenvolvimento de competências sociais e autoconfiança.",
        "Novas oportunidades de fazer amigos e participar em atividades.",
        "Melhoria no bem-estar e diminuição da sensação de isolamento.",
      ],
      contraMudar: [
        "Medo de situações sociais e de sair da zona de conforto.",
        "Possível ansiedade em interações novas.",
        "Esforço necessário para iniciar e manter novas amizades.",
      ],
      naoMudar: [
        "Evitar o desconforto de situações sociais.",
        "Sentir-se seguro na zona de conforto.",
       "Menos ansiedade relacionada com encontros e interações.",
      ],
      contraNaoMudar: [
        "Sensação de solidão e isolamento social.",
        "Perda de experiências enriquecedoras e momentos divertidos.",
        "Impacto no bem-estar a longo prazo.",
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
  const [mostrarFeedback, setMostrarFeedback] = useState(true);

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
      return "Embora a mudança de comportamento tenha muitos benefícios, os desafios, como a resistência inicial e a necessidade de adaptação, podem ser significativos. Considera trabalhar em pequenos passos e encontrar estratégias que tornem a mudança mais fácil. Isso significa que, se decidires avançar, pode ser útil abordar a mudança de forma gradual e planeada"; 
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
                <h2 className="text-center fw-bold mb-4" style={{ color: "#234970" }}>Balança Virtual</h2>
                <p className="mb-3 lead"><strong>Sê muito bem-vindo/a à atividade da Balança Virtual!</strong></p>
                <p className="mb-3 lead">Esta atividade vai ajudar-te a <strong>refletir</strong> de forma interativasobre os <strong>prós e contras de mudar comportamentos</strong>.</p>
                <p className="mb-3 lead">Seleciona um <strong>comportamento </strong> dos exemplos a seguir, aquele que mais se <strong> aproxima da tua experiência </strong> e que faz mais sentido para ti neste <strong> momento da tua vida</strong> , e que <strong> gostarias de mudar</strong>. </p>
                <p className="mb-3 lead">Lembra-te de que a <strong>escolha é tua</strong>, e o objetivo é entender melhor as implicações de <strong>mudar ou de não mudar </strong>esse comportamento. </p>
                <div className="text-center">
                  <button className="custom-btn-turquoise mt-2 px-4 py-2" onClick={() => setPagina(1)}>
                    <i className="bi bi-play-fill me-2"></i>Vamos a isto?</button>
                </div>
              </>
            )}

            {pagina === 1 && (
                <>
                  <h4 className="text-center fw-bold mb-4" style={{ color: "#234970" }}>
                    Qual o comportamento que queres mudar?
                  </h4>
                  <p className="lead">
                    <strong>Começa por escolher um comportamento</strong> dos exemplos
                    apresentados em seguida que queiras <strong>mudar</strong>. Escolhe o
                    comportamento que se aproxima mais da tua <strong>experiência</strong>,
                    ou seja, aquele que <strong>faça mais sentido para ti</strong>.
                  </p>

                  <div className="d-flex flex-column gap-3">
                    {Object.entries(comportamentos).map(([key, obj]) => {
                      const isSelected = comportamento === key;
                      return (
                       <div
                          key={key}
                          onClick={() => {
                            setComportamento(key);
                            if (showValidationError) setShowValidationError(false);
                          }}
                          className="p-3 rounded"
                          style={{
                            backgroundColor: isSelected ? "#99CBC8" : "#ffffff",
                            border: "1px solid #99CBC8",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {/* Título muda de cor */}
                          <p
                            className="mb-1 fw-bold"
                            style={{ color: isSelected ? "white" : "#234970" }}
                          >
                            {obj.nome}
                          </p>

                          {/* Descrição fica sempre preta */}
                          <p className="mb-0 small" style={{ color: "#000000" }}>
                            {obj.descricao}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* ALERTA */}
                  {showValidationError && (
                    <div className="alert alert-warning mt-3 text-center" role="alert">
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      Por favor, seleciona um comportamento antes de continuar.
                    </div>
                  )}

                  {/* BOTÕES */}
                  <div className="d-flex justify-content-between mt-4">
                    <button className="custom-btn-pink" onClick={() => setPagina(0)}>
                      <i className="bi bi-arrow-left me-2"></i>Anterior
                    </button>
                    <button
                      className="custom-btn-turquoise"
                      onClick={() => {
                        if (comportamento) {
                          iniciarFrases(comportamento);
                        } else {
                          setShowValidationError(true);
                        }
                      }}
                    >
                      Próximo<i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  </div>
                </>
              )}


            {pagina === 2 && (
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <>
                    <div className="text-center"></div>
                     <h4 className="text-center fw-bold" style={{ color: "#234970" }}>Vamos Refletir!</h4>
                      {/* INSTRUÇÕES */}
                    
                        <p className="lead">
                          Agora que escolheste o <strong>comportamento</strong> que queres mudar, reflete sobre os <strong>prós</strong> e os <strong>contras</strong> dessa mudança.
                          A tabela está dividida em quatro <strong>quadrantes</strong>, e o teu objetivo é arrastares as <strong>frases</strong> que achas que se aplicam a cada um:
                        </p>
                        <ul className="lead">
                          <li><strong>Prós de mudar:</strong> Benefícios que podes ganhar ao mudar este comportamento, como melhorar o teu bem-estar, facilitar as tuas relações ou alcançar os teus objetivos.</li>
                          <li><strong>Contras de mudar:</strong> Desafios ou dificuldades que podes enfrentar ao tentar mudar, como o esforço necessário ou o desconforto inicial.</li>
                          <li><strong>Prós de não mudar:</strong> Vantagens de continuar como estás, como sentir-te confortável ou evitar situações difíceis.</li>
                          <li><strong>Contras de não mudar:</strong> Desvantagens de manter este comportamento, como sentimentos de frustração, impacto nas relações ou perda de oportunidades.</li>
                        </ul>
                        <p className="lead">
                          Explora a lista de opções apresentada a seguir e <strong>seleciona as frases</strong> que mais se aplicam a ti em cada quadrante. Podes <strong>escolher quantas frases</strong> quiseres e atribuí-las ao quadrante que achas mais adequado.
                        </p>
                     

                     {/* ALERTA (igual ao da página 1, simplificado) */}
                        {showValidationError && (
                          <div className="alert alert-warning mt-3 text-center" role="alert">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            Por favor, coloca pelo menos uma frase em cada quadrante antes de continuar.
                          </div>
                        )}

                        {/* FRASES DISPONÍVEIS */}
                            <Droppable droppableId="frasesDisponiveis" direction="horizontal">
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className="d-flex flex-wrap gap-2 mb-4"
                                >
                                  {frasesDisponiveis.map((frase, index) => (
                                    <Draggable key={frase} draggableId={frase} index={index}>
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className="badge text-white p-2"
                                          style={{
                                            backgroundColor: "#99CBC8",
                                            userSelect: "none",       // 🔹 evita highlight
                                            ...provided.draggableProps.style, // 🔹 MUITO IMPORTANTE
                                          }}
                                          title="Arrasta esta frase para um quadrante"
                                        >
                                          {frase}
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>


                       {/* QUADRANTES */}
                        <div className="row">
                          {quadrantes.map((q) => (
                            <div className="col-md-6 mb-3" key={q.id}>
                              <div
                                className="p-3 rounded h-100"
                                style={{
                                  backgroundColor: "#ffffff",
                                  color: "#234970",
                                  border: "1px solid #99CBC8",
                                  transition: "all 0.3s ease",
                                }}
                              >
                                <h6 className="mb-3 fw-bold text-center">{q.titulo}</h6>

                                <Droppable droppableId={q.id}>
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.droppableProps}
                                      className="border rounded p-2"
                                      style={{
                                        minHeight: "120px",
                                        backgroundColor: "#fbf9f9",
                                        borderColor: "#e9ecef",
                                      }}
                                    >
                                      {respostas[q.id].map((frase, index) => (
                                        <Draggable key={frase} draggableId={frase} index={index}>
                                          {(provided) => (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              className="badge text-white p-2 mb-2"
                                              style={{ backgroundColor: "#99cbc8" }}
                                            >
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
                            </div>
                          ))}
                        </div>

                      {/* BOTÕES */}
                      <div className="d-flex justify-content-between mt-4">
                        <button className="custom-btn-pink" onClick={() => setPagina(1)}>
                          <i className="bi bi-arrow-left me-2"></i>Anterior
                        </button>
                        <button className="custom-btn-turquoise" onClick={handleProceedToReflection}>
                          Refletir<i className="bi bi-arrow-right ms-2"></i>
                        </button>
                      </div>
                    </>
                  </DragDropContext>
                )}

           {pagina === 3 && (
                <>
                  <h5 className="text-center fw-bold mb-4" style={{ color: "#234970" }}>
                    Vamos refletir!
                  </h5>
                  <p className="lead">
                    <strong>Agora</strong> que adicionaste os <strong>prós</strong> e <strong>contras</strong> de <strong>mudar</strong> e de <strong>não mudar</strong> o comportamento, podes ver os <strong>resultados</strong> na <strong>balança</strong>.
                    O <strong>sistema</strong> calculou automaticamente a <strong>soma das frases</strong> que colocaste de cada lado e gerou-te um <strong>feedback personalizado</strong> baseado no que escolheste.
                    Podes observar qual lado da balança está mais <strong>pesado</strong>: se o lado de <strong>mudar</strong>; se o <strong>lado de não mudar</strong>.
                    Lê o <strong>feedback</strong> que recebeste e <strong>reflete</strong> sobre a tua <strong>situação atual</strong>.
                  </p>

              {/* IMAGEM MAIOR */}
                <div className="text-center mb-4">
                  <div
                    style={{
                      width: "100%",       // ocupa toda a largura disponível
                      maxWidth: "500px",   // limite máximo de largura
                      margin: "0 auto",    // centraliza horizontalmente
                    }}
                  >
                    {renderImage()}
                  </div>
                </div>
                 {/* FEEDBACK NUMA CAIXA ESTILIZADA (sem botão, sem título) */}
                  {renderFeedback() && (
                    <div
                      className="alert mb-4"
                      style={{
                        backgroundColor: "#e8f4f3",   // fundo suave
                        borderColor: "#99CBC8",       // borda verde água
                      }}
                    >
                      <p
                        className="lead mb-0"
                        style={{
                          color: "#234970",
                          fontSize: "1.1rem",
                          fontWeight: "500",
                          lineHeight: "1.6",
                        }}
                      >
                        {renderFeedback()}
                      </p>
                    </div>
                  )}
                  {/* BOTÕES */}
                  <div className="d-flex justify-content-between mt-4">
                    <button className="custom-btn-pink" onClick={() => setPagina(2)}>
                      <i className="bi bi-arrow-left me-2"></i>Anterior
                    </button>
                    <button className="custom-btn-turquoise" onClick={() => setPagina(4)}>
                      Conclusão<i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  </div>
                </>
              )}

            {pagina === 4 && (
              <>
                <h4 className="text-center fw-bold mb-4" style={{ color: "#234970" }}>Conclusão da Atividade</h4>
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