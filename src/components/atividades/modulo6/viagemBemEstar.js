import React, { useState, useContext, useEffect } from "react"; // Add useEffect to imports
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import AtividadeProgressao from "../atividadeProgressao";
import { UserContext } from "../../../App";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "bootstrap/dist/css/bootstrap.min.css";

const corda = [
  {
    opcoes: [
      <>Ser ouvido/a com atenção</>,
      <>Ter alguém que não julgue o que sinto</>,
      <>Sentir que sou importante para alguém</>,
      <>Ouvir que já estou a fazer o meu melhor</>,
      <>Saber que não tenho de fazer tudo sozinho/a</>,
    ]
  },
];

const comportamentos = {
  mochila: {
    frases: [
      "Medo de ser julgado",
      "Dúvidas sobre o futuro",
      "Medo de certos objetos",
      "Dificuldade em lidar com as minhas sensações físicas",
      "Preocupação excessiva com muitas coisas",
      "Pensamentos que eu não me consigo livrar",
      "EDITABLE_1",
      "EDITABLE_2",
      "EDITABLE_3",
    ],
  },
  pote: {
    frases: [
      "Já enfrentei uma situação que era desconfortável para mim",
      "Tive coragem para pedir ajuda numa situação desconfortável",
      "Fui gentil comigo num dia difícil",
      "Fui capaz de identificar o que estava a sentir em determinado momento",
      "Fui capaz de reconhecer que existem coisas que me causam desconforto",
      "EDITABLE_1",
      "EDITABLE_2", 
      "EDITABLE_3",
    ],
  },
};


const ViagemBemEstar = () => {
  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);
  const [pagina, setPagina] = useState(0);
  const [comportamento, setComportamento] = useState(null);
  const [frasesDisponiveis, setFrasesDisponiveis] = useState([]);
  const [frasesDisponiveis2, setFrasesDisponiveis2] = useState([]);
  const [currentBehavior, setCurrentBehavior] = useState('mochila'); // MOVED INSIDE COMPONENT
  const [respostas, setRespostas] = useState({
  mochila: [],
  pote: [],  // Add this line
});
  const [showValidationError, setShowValidationError] = useState(false);
  
const [quadrantes, setQuadrantes] = useState([
  { id: "mochila", titulo: "" },
]);


  // State for custom phrases
  const [customPhrases, setCustomPhrases] = useState({
    EDITABLE_1: "",
    EDITABLE_2: "",
    EDITABLE_3: "",
  });
  const [editingPhrase, setEditingPhrase] = useState(null);
  
  // State for chair selection and emotion input
  const [cadeiraSelecionada, setCadeiraSelecionada] = useState(null);
  const [emocaoInput, setEmocaoInput] = useState("");
  const [inputError, setInputError] = useState(false);
  
  // State for the new page (page 4)
  const [ferramenta, setFerramenta] = useState("");
  const [ferramentaError, setFerramentaError] = useState(false);
    const [opcoesSelecionadas, setOpcoesSelecionadas] = useState([]);

  const [chave, setChave] = useState("");
  const [chaveError, setChaveError] = useState(false);

  const initializePhrases = (behaviorKey = 'mochila') => { // Changed default from 'procrastinacao' to 'mochila'
    const selectedBehavior = comportamentos[behaviorKey];
    if (selectedBehavior) {
      const allPhrases = selectedBehavior.frases;
      setFrasesDisponiveis(allPhrases);
      setCurrentBehavior(behaviorKey); // Update current behavior
    }
    
    setRespostas({
      mochila: [],
    });
    setShowValidationError(false);
  };

useEffect(() => {
  if (pagina === 1) {
    initializePhrases('mochila');
    setQuadrantes([{ id: "mochila", titulo: "" }]);
  } else if (pagina === 6) {
    initializePhrases('pote');
    setQuadrantes([{ id: "pote", titulo: "" }]);
    // Also reset the respostas for pote
    setRespostas(prev => ({
      ...prev,
      pote: []
    }));
  }
}, [pagina]);

  // Add the missing avancarPagina function
  const avancarPagina = () => {
    if (pagina === 0) {
      // Initialize phrases when moving to page 1
      initializePhrases();
    }
    setPagina((prev) => prev + 1);
  };

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

    // Function to handle custom phrase editing
    const handlePhraseEdit = (phraseId, newValue) => {
      setCustomPhrases(prev => ({
        ...prev,
        [phraseId]: newValue
      }));
    };

    // Function to get display text for a phrase
    const getPhraseDisplayText = (phrase) => {
      if (customPhrases[phrase] !== undefined) {
        return customPhrases[phrase] || "Clica para editar...";
      }
      return phrase;
    };

    // Function to check if a phrase is editable
    const isEditablePhrase = (phrase) => {
      return customPhrases[phrase] !== undefined;
    };



    const validateQuadrantes = () => {
      return respostas["mochila"].length > 0;
    };


    const handleProceedToReflection = () => {
      if (pagina === 1) {
        if (validateQuadrantes()) {
          setPagina(2); // Go to reflection page (page 2)
          setShowValidationError(false);
        } else {
          setShowValidationError(true);
        }
      } else if (pagina === 3) {
        if (emocaoInput.trim().length > 0) {
          setPagina(4); // Go to next page
          setInputError(false);
        } else {
          setInputError(true);
        }
      } else if (pagina === 4) {
        if (ferramenta.trim().length > 0) {
          setPagina(5); // Go to next page
          setFerramentaError(false);
        } else {
          setFerramentaError(true);
        }
      } else if (pagina === 5) {
        // Check if at least one option is selected
        if (opcoesSelecionadas.length > 0) {
          setPagina(6);
        } else {
          
        }
     } else if (pagina === 6) {
        if (respostas["pote"].length > 0) {  // Change to "pote"
          setPagina(7);
          setShowValidationError(false);
        } else {
          setShowValidationError(true);
        }
    } else if (pagina === 7) {
        if (chave.trim().length > 0) {
          
          setPagina(8); // Go to final page
          setChaveError(false);
        } else {
          setChaveError(true);
        }
      }
};


const handleOpcaoToggle = (index) => {
  setOpcoesSelecionadas(prev => {
    if (prev.includes(index)) {
      // Remove if already selected
      return prev.filter(i => i !== index);
    } else {
      // Add if not selected
      return [...prev, index];
    }
  });
};




    // Custom component for rendering draggable phrases
    const DraggablePhrase = ({ phrase, index, isDragging }) => {
      const isEditable = isEditablePhrase(phrase);
      const displayText = getPhraseDisplayText(phrase);
      const isEmpty = isEditable && !customPhrases[phrase];

      if (isEditable && editingPhrase === phrase) {
        return (
          <div className="badge bg-secondary p-2" style={{ minWidth: '150px' }}>
            <input
              type="text"
              value={customPhrases[phrase]}
              onChange={(e) => handlePhraseEdit(phrase, e.target.value)}
              onBlur={() => setEditingPhrase(null)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setEditingPhrase(null);
                }
              }}
              className="form-control form-control-sm"
              placeholder="Escreve aqui..."
              autoFocus
              style={{ border: 'none', background: 'transparent', color: 'white', fontSize: 'inherit' }}
            />
          </div>
        );
      }

      return (
        <div 
          className={`badge bg-secondary p-2`}
          style={{ 
            minWidth: '120px', 
            cursor: isEditable ? 'pointer' : 'grab',
            opacity: isEmpty ? 0.7 : 1
          }}
          onClick={isEditable ? () => setEditingPhrase(phrase) : undefined}
        >
          {isEmpty && <i className="bi bi-pencil me-1"></i>}
          {displayText}
          {isEditable && !isEmpty && <i className="bi bi-pencil ms-1"></i>}
        </div>
      );
    };

    const progresso = Math.round((pagina / 8) * 100);

    return (
      <div className="container-fluid vh-100 p-0 font-poppins">
        <style>
          {`
            .selectable-img {
              cursor: pointer;
              transition: all 0.3s ease;
              border: 3px solid transparent;
              border-radius: 12px;
              padding: 8px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            
            .selectable-img:hover {
              transform: scale(1.05);
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
              border-color: #99CBC8;
            }
            
            .selectable-img.selected {
              border-color: #99CBC8;
              background-color: rgba(153, 203, 200, 0.1);
              transform: scale(1.05);
              box-shadow: 0 4px 16px rgba(153, 203, 200, 0.4);
            }
            
            .selectable-img.selected::after {
              content: '✓';
              position: absolute;
              top: 8px;
              right: 8px;
              background: #99CBC8;
              color: white;
              border-radius: 50%;
              width: 24px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-weight: bold;
            }
            
            .chair-selection-container {
              position: relative;
              display: inline-block;
            }
          `}
        </style>
        
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
              
              {/* PAGE 0 - Introduction */}
              {pagina === 0 && (
                <>
                  <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>Viagem Ao Bem-Estar</h2>
                  <p className="mb-3 lead"><strong>Sê muito bem-vindo ou bem-vinda à Viagem ao Bem-Estar!</strong></p>
                  <p className="mb-3 lead">Imagina que estás a embarcar numa <strong>viagem para o teu bem-estar</strong>.</p>
                  <p className="mb-3 lead">Durante o percurso, vais encontrar <strong>objetos que representam as várias etapas</strong> que acontecem quando existe um <strong>acompanhamento psicológico</strong>.</p>

                  <p className="mb-3 lead">O objetivo desta atividade é <strong>aprender sobre as fases do processo terapêutico</strong>, utilizando <strong>objetos simbólicos</strong> que representam cada etapa.</p>

                  <div className="text-center">
                    <button className="custom-btn-turquoise mt-2 px-4 py-2" onClick={avancarPagina}>
                      <i className="bi bi-play-fill me-2"></i>Vamos a isto?</button>
                  </div>
                </>
              )}

              {/* PAGE 1 - Mochila (Backpack) */}
              {pagina === 1 && (
                <>
                  <div>
                    <p className="mb-3 lead">
                      A <strong>mochila</strong> é o <strong>primeiro objeto</strong> desta viagem. Representa o momento em que a pessoa 
                      <strong>reconhece que precisa de ajuda</strong> e começa a preparar o que vai levar consigo nesta viagem. 
                      É nela que são colocadas as <strong>preocupações, emoções, medos e dúvidas</strong>. 
                      Nesta fase inicial, começa-se a construir um <strong>espaço seguro</strong>, onde é possível 
                      <strong>partilhar o que se sente sem medo de julgamento</strong>. 
                      A <strong>mochila</strong> simboliza esse <strong>primeiro passo corajoso</strong>: 
                      o reconhecimento de que há experiências que merecem ser cuidadas — e que 
                      <strong>não precisam de ser carregadas sozinho/a</strong>.
                    </p>

                    <p className="mb-3 lead text-center"><strong>O que colocarias na tua mochila?</strong></p>

                    <p className="mb-3 lead">
                      <strong>Arrasta os itens</strong> que te fazem sentido para dentro da tua mochila. 
                      <strong>Podes personalizar</strong> se achares que faz mais sentido de acordo com a tua experiência.
                    </p>
                    
                    <div className="alert alert-info mb-3" style={{ backgroundColor: "#FBF9F9" , border: "1px solid #99cbc8" }}>
                      <i className="bi bi-info-circle me-2"></i>
                      <strong>Dica:</strong> Clica nas opções com ícone de lápis para as personalizar com as tuas próprias palavras!
                    </div>
                  </div>
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <>
                      {showValidationError && (
                        <div className="alert alert-warning mb-3">
                          <strong>Atenção!</strong> Precisas de colocar pelo menos uma frase na mochila antes de prosseguir.
                        </div>
                      )}

                      <Droppable droppableId="frasesDisponiveis" direction="horizontal">
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.droppableProps} className="d-flex flex-wrap gap-2 mb-4">
                            {frasesDisponiveis.map((frase, index) => (
                              <Draggable key={frase} draggableId={frase} index={index}>
                                {(provided, snapshot) => (
                                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <DraggablePhrase phrase={frase} index={index} isDragging={snapshot.isDragging} />
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
                          <div className="col-md-12  mb-3" key={q.id}>
                            <div className="text-center mb-3">
                              <h5 className="mt-2">Arrasta os itens para a mochila:</h5>
                            </div>
                            <Droppable droppableId={q.id}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className="position-relative"
                                  style={{ minHeight: '400px' }}
                                >
                                  {/* Background image - you can replace this path */}
                                  <img 
                                    src="/imgs/modulo6/viagem/mochila.png" 
                                    alt="Mochila"
                                    className="img-fluid w-100"
                                    style={{ 
                                      maxHeight: '400px',
                                      objectFit: 'contain',
                                      opacity: 0.9
                                    }}
                                  />
                                  
                                  {/* Droppable overlay area */}
                                <div 
                                  className={`position-absolute d-flex flex-wrap align-content-start justify-content-center p-3 ${showValidationError && respostas[q.id].length === 0 ? "border border-warning rounded" : ""}`}
                                  style={{ 
                                    backgroundColor: 'transparent',
                                    top: '15%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '60%',
                                    height: '70%',
                                    maxWidth: '400px',
                                    maxHeight: '280px',
                                    overflowY: 'auto',
                                    overflowX: 'hidden',
                                    minHeight: '120px'
                                  }}
                                >

                                    {respostas[q.id].length === 0 && (
                                      <div className="text-center text-muted">
                                        <div className="bg-white bg-opacity-25 p-3 rounded">
                                          <i className="bi bi-arrow-up-circle me-2"></i>
                                          Arrasta os itens para aqui
                                        </div>
                                      </div>
                                    )}
                                    {respostas[q.id].map((frase, index) => (
                                      <Draggable key={frase} draggableId={frase} index={index}>
                                        {(provided, snapshot) => (
                                          <div 
                                            ref={provided.innerRef} 
                                            {...provided.draggableProps} 
                                            {...provided.dragHandleProps} 
                                            className="mb-2 me-2"
                                            style={{
                                              ...provided.draggableProps.style,
                                              position: snapshot.isDragging ? 'fixed' : 'relative'
                                            }}
                                          >
                                            <DraggablePhrase phrase={frase} index={index} isDragging={snapshot.isDragging} />
                                          </div>
                                        )}
                                      </Draggable>
                                    ))}
                                    {provided.placeholder}
                                  </div>
                                </div>
                              )}
                            </Droppable>
                          </div>
                        ))}
                      </div>
                      <div className="d-flex justify-content-between mt-4">
                        <button className="custom-btn-pink" onClick={() => setPagina(0)}><i className="bi bi-arrow-left me-2"></i>Anterior</button>
                        <button className="custom-btn-turquoise" onClick={handleProceedToReflection}>Próximo<i className="bi bi-arrow-right ms-2"></i></button>
                      </div>
                    </>
                  </DragDropContext>
                </>
              )}

              {/* PAGE 2 - Cadeira (Chair) */}
              {pagina === 2 && (
                <>
                <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>
                                    Objetos
                                </h4>
                  <p className="mb-3 lead">
                    A <strong>cadeira</strong> é o <strong>segundo objeto</strong> desta viagem. Representa o momento em que a pessoa encontra um espaço para 
                    <strong> parar, sentar-se e partilhar o que está a sentir</strong>. 
                    É na cadeira que começa a ser construída uma <strong>ligação de confiança com o psicólogo</strong>, 
                    através da <strong>escuta ativa, aceitação e validação</strong>. 
                    Este é o lugar onde se pode falar com verdade, num ambiente seguro, sem medo de julgamento. 
                    A cadeira simboliza o início de uma <strong>relação terapêutica</strong>, onde o que é dito é valorizado e respeitado. 
                    É neste espaço que a pessoa começa a perceber que <strong>não está sozinha</strong> e que há alguém disponível para 
                    <strong> ouvir com empatia</strong>. Assim, a cadeira marca uma nova etapa da viagem: 
                    o momento de se sentir <strong>ouvido/a, compreendido/a e acompanhado/a</strong>, com tempo e espaço para 
                    <strong> ser verdadeiramente quem se é</strong>.
                  </p>

                  <p className="mb-3 lead text-center"><strong>Que cadeira é que escolhias neste momento para te sentares?</strong></p>
                  <p className="mb-3 lead text-center"><strong>Escolhe uma</strong> das imagens em baixo.</p>

                  <div className="row text-center">
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num} className="col-6 col-md-3 mb-3">
                        <div className="chair-selection-container">
                          <img
                            src={`/imgs/modulo6/viagem/cadeira${num}.png`}
                            alt={`Cadeira ${num}`}
                            className={`img-fluid selectable-img ${cadeiraSelecionada === num ? 'selected' : ''}`}
                            onClick={() => setCadeiraSelecionada(num)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    <button className="custom-btn-pink" onClick={() => setPagina(1)}>
                      <i className="bi bi-arrow-left me-2"></i>Anterior
                    </button>
                    <button 
                      className={`custom-btn-turquoise ${!cadeiraSelecionada ? 'opacity-50' : ''}`}
                      onClick={() => cadeiraSelecionada && setPagina(3)}
                      disabled={!cadeiraSelecionada}
                      style={{ cursor: cadeiraSelecionada ? 'pointer' : 'not-allowed' }}
                    >
                      Próximo<i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  </div>
                </>
              )}

              {/* PAGE 3 - Espelho (Mirror) */}
              {pagina === 3 && (
                <>
                <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>
                                    Objetos
                                </h4>
                  <p className="mb-3 lead">
                    O <strong>espelho</strong> é o <strong>terceiro objeto</strong> desta viagem. Representa o momento em que a pessoa começa a 
                    <strong>olhar para dentro de si</strong> e a <strong>refletir sobre o que sente</strong>. 
                    Neste ponto do percurso, as <strong>emoções</strong> ganham espaço para ser reconhecidas e compreendidas. 
                    Muitas vezes, elas podem parecer <strong>confusas</strong>, intensas ou difíceis de nomear — mas, com o apoio do psicólogo, 
                    torna-se possível <strong>ver com mais clareza</strong> o que se passa no interior. 
                    O espelho simboliza o processo de <strong>autoconhecimento</strong>: uma oportunidade para 
                    <strong>observar sem julgamentos, aceitar o que se sente e dar sentido à experiência emocional</strong>. 
                    É como se, ao olhar para esse espelho simbólico, a pessoa começasse a ver-se com 
                    <strong>mais empatia, mais entendimento e mais verdade</strong>. 
                    É mais um passo importante nesta viagem: <strong>reconhecer quem se é e o que se sente</strong>, sem medo do reflexo.
                  </p>

                  <p className="mb-3 lead text-center">
                    <strong>Se estivesses a olhar para este espelho agora, que emoção está mais presente na tua vida e gostarias de compreender melhor?</strong>
                  </p>

                  <div className="text-center my-4">
                    <img 
                      src="/imgs/modulo6/viagem/espelho.png" 
                      alt="Espelho desenhado à mão" 
                      className="mx-auto mb-3" 
                      style={{ maxWidth: '400px', height: 'auto' }}
                    />
                    <div className="mx-auto" style={{ maxWidth: "600px" }}>
                      <input
                        type="text"
                        className={`form-control ${inputError ? 'is-invalid' : ''}`}
                        style={{
                          border: '1px solid #99CBC8',
                          borderRadius: '12px',
                          padding: '12px 20px',
                          fontSize: '16px'
                        }}
                        placeholder="Escrever aqui uma emoção que está mais presente na tua vida"
                        value={emocaoInput}
                        onChange={(e) => {
                          setEmocaoInput(e.target.value);
                          if (inputError) setInputError(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "," || e.key === "Tab") {
                            e.preventDefault();
                            setInputError(true);
                          }
                        }}
                        aria-label="Emoção"
                        required
                      />
                      {inputError && (
                        <div className="text-danger mt-2">
                          <small>Por favor, escreve uma emoção para continuar.</small>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    <button className="custom-btn-pink" onClick={() => setPagina(2)}>
                      <i className="bi bi-arrow-left me-2"></i>Anterior
                    </button>
                    <button 
                      className={`custom-btn-turquoise ${!emocaoInput.trim() ? 'opacity-50' : ''}`}
                      onClick={handleProceedToReflection}
                      disabled={!emocaoInput.trim()}
                      style={{ cursor: emocaoInput.trim() ? 'pointer' : 'not-allowed' }}
                    >
                      Próximo<i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  </div>
                </>
              )}

              {/* PAGE 4 - Caixa de Ferramentas (Toolbox) - NEW PAGE */}
              {pagina === 4 && (
                <>
                <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>
                                    Objetos
                                </h4>
                  <p className="mb-3 lead">
                    A <strong>lâmpada</strong> é o <strong>quarto objeto</strong> desta viagem. Representa o momento em que a pessoa começa a 
                    <strong>ganhar clareza sobre os seus desafios</strong> e a <strong>compreender melhor o que sente</strong>. 
                    À medida que o processo terapêutico avança, começam a surgir <strong>novas perspetivas</strong> e 
                    <strong>formas de lidar com as emoções</strong>. A lâmpada simboliza essa <strong>luz</strong> que se vai acendendo pouco a pouco, 
                    iluminando partes que antes pareciam confusas ou difíceis de entender. 
                    É como se, ao acender essa lâmpada simbólica, a pessoa começasse a 
                    <strong>ver com mais nitidez o caminho que está a percorrer</strong>, percebendo quais são as 
                    <strong>estratégias que pode usar</strong> para enfrentar os desafios do dia a dia. 
                    Este é um momento de <strong>clareza</strong>, de <strong>aprendizagem</strong> e de <strong>esperança</strong>. 
                    Um passo importante na viagem ao bem-estar, onde começa a fazer-se 
                    <strong>luz sobre o que antes estava às escuras</strong>.
                  </p>

                  <p className="mb-3 lead text-center">
                    <strong>Há algo que começa a fazer mais sentido para ti?</strong>
                  </p>

                  <div className="text-center my-4">
                    <img 
                      src="/imgs/modulo6/viagem/luz.png" 
                      alt="Caixa de ferramentas desenhada à mão" 
                      className="mx-auto mb-3" 
                      style={{ maxWidth: '400px', height: 'auto' }}
                    />
                    <div className="mx-auto" style={{ maxWidth: "600px" }}>
                      <input
                        type="text"
                        className={`form-control ${ferramentaError ? 'is-invalid' : ''}`}
                        style={{
                          border: '1px solid #99CBC8',
                          borderRadius: '12px',
                          padding: '12px 20px',
                          fontSize: '16px'
                        }}
                        placeholder="Escreve aqui algo que agora compreendes melhor do que à um tempo a atrás, pode ser uma emoção, medo, dificuldade"
                        value={ferramenta}
                        onChange={(e) => {
                          setFerramenta(e.target.value);
                          if (ferramentaError) setFerramentaError(false);
                        }}
                        aria-label="Ferramenta ou estratégia"
                        required
                      />
                      {ferramentaError && (
                        <div className="text-danger mt-2">
                          <small>Por favor, escreve algo para continuar.</small>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    <button className="custom-btn-pink" onClick={() => setPagina(3)}>
                      <i className="bi bi-arrow-left me-2"></i>Anterior
                    </button>
                    <button 
                      className={`custom-btn-turquoise ${!ferramenta.trim() ? 'opacity-50' : ''}`}
                      onClick={handleProceedToReflection}
                      disabled={!ferramenta.trim()}
                      style={{ cursor: ferramenta.trim() ? 'pointer' : 'not-allowed' }}
                    >
                      Próximo<i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  </div>
                </>
              )}
              {/* PAGE 5 - Caixa de Ferramentas (Toolbox) - NEW PAGE */}
              {pagina === 5 && (
                <>
                                <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>
                                    Objetos
                                </h4>

                              
                                <p className="mb-3 lead">
                                  A <strong>corda</strong> é o <strong>quinto objeto</strong> desta viagem. Representa a <strong>ligação de confiança</strong> que se vai construindo 
                                  ao longo do caminho entre a pessoa e o psicólogo. Nesta etapa da viagem, a pessoa já percorreu algum trajeto e começa a perceber 
                                  que não o faz sozinha. A corda simboliza esse <strong>apoio contínuo</strong>, que está presente mesmo quando surgem obstáculos ou dúvidas. 
                                  É como se essa corda unisse a pessoa ao psicólogo e a tudo aquilo que foi aprendendo ao longo do percurso — uma forma de se 
                                  <strong>manter ligada</strong> às estratégias, às descobertas e ao espaço seguro que foi sendo criado. 
                                  À medida que a viagem continua, essa ligação torna-se mais forte. 
                                  A corda mostra que, mesmo quando o caminho é difícil, 
                                  <strong>há sempre algo (ou alguém) que segura, apoia e dá confiança para continuar</strong>.
                                </p>

                                <p className="mb-3 lead text-center">
                                  <strong>Imagina que esta corda representa aquilo que te segura quando te sentes que vais cair. O que te ajudaria a continuar?</strong>
                                </p>

                                <p className="mb-3 lead text-center">
                                  Escolhe <strong>as opções</strong> que achas que te ajudariam a continuares.
                                </p>

                                <div className="text-center my-4">
                                  <img 
                                    src="/imgs/modulo6/viagem/corda.png" 
                                    alt="Corda" 
                                    className="mx-auto mb-3" 
                                    style={{ maxWidth: '400px', height: 'auto' }}
                                  />
                                </div>


                                <div className="d-flex flex-column gap-3">
                                  {corda[0].opcoes.map((opcao, index) => {
                                    const isSelected = opcoesSelecionadas.includes(index);
                                    return (
                                      <div
                                        key={index}
                                        onClick={() => handleOpcaoToggle(index)}
                                        className={`btn ${isSelected ? 'btn-primary' : 'btn-outline-secondary'} text-start p-3`}
                                        style={{
                                          backgroundColor: isSelected ? '#99CBC8' : '#fff',
                                          color: isSelected ? 'white' : '#234970',
                                          border: `1px solid #99CBC8`,
                                          borderRadius: '12px',
                                          transition: 'all 0.3s ease',
                                          cursor: 'pointer'
                                        }}
                                      >
                                        {/* Optional: Add a checkmark or indicator for selected items */}
                                        {isSelected && <i className="bi bi-check-circle me-2"></i>}
                                        {opcao}
                                      </div>
                                    );
                                  })}
                                </div>

                                <div className="d-flex justify-content-between mt-4">
                                  <button className="custom-btn-pink" onClick={() => setPagina(3)}>
                                    <i className="bi bi-arrow-left me-2"></i>Anterior
                                  </button>
                                  <button 
                                    className={`custom-btn-turquoise ${opcoesSelecionadas.length === 0 ? 'opacity-50' : ''}`}
                                    onClick={handleProceedToReflection}
                                    disabled={opcoesSelecionadas.length === 0}
                                    style={{ cursor: opcoesSelecionadas.length > 0 ? 'pointer' : 'not-allowed' }}
                                  >
                                    Próximo<i className="bi bi-arrow-right ms-2"></i>
                                  </button>
                                </div>
                  
                            </>
              )}
            {/* PAGE 6 - Caixa de Ferramentas (Toolbox) - NEW PAGE */}
            {pagina === 6 && (
              <>
              <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>
                                    Objetos
                                </h4>
                
                  <div>
                    <p className="mb-3 lead">
                      O <strong>pote</strong> é o <strong>sexto objeto</strong> desta viagem. Representa a <strong>resiliência</strong> e o valor de 
                      <strong>tudo aquilo que foi sendo aprendido e conquistado ao longo do caminho</strong>. 
                      Nesta fase da viagem, a pessoa já passou por momentos de descoberta, desafio e crescimento. 
                      O pote simboliza o espaço onde são <strong>guardadas as pequenas vitórias</strong>, os <strong>avanços pessoais</strong>, 
                      e as <strong>estratégias que começaram a fazer sentido</strong>. 
                      É como se, ao longo do percurso, a pessoa fosse recolhendo elementos importantes — 
                      como formas de lidar com a ansiedade, maneiras de ver uma situação com mais clareza ou até momentos 
                      em que se sentiu verdadeiramente compreendida. Tudo isso é cuidadosamente colocado neste pote simbólico.
                      Mesmo que surjam novos desafios, o pote está lá, cheio de recursos que ajudam a 
                      <strong>recordar a força que foi construída</strong> e a 
                      <strong>usar o que já se aprendeu para seguir em frente com mais confiança</strong>. 
                      Este objeto marca um momento de <strong>valorização</strong>, de reconhecer que 
                      <strong>o caminho percorrido tem frutos</strong>, e que <strong>cada passo importa</strong>.
                    </p>

                    <p className="mb-3 lead text-center">
                      <strong>O que aprendeste sobre ti que merecia ser guardado num pote especial?</strong>
                    </p>

                    <p className="mb-3 lead text-center">
                      <strong>Arrasta os itens</strong> que te fazem sentido para dentro do pote. 
                      <strong>Podes personalizar</strong> se achares que faz mais sentido de acordo com a tua experiência.
                    </p>
                    
                    <div className="alert alert-info mb-3"  style={{ backgroundColor: "#FBF9F9" , border: "1px solid #99cbc8" }}>
                      <i className="bi bi-info-circle me-2"></i>
                      <strong>Dica:</strong> Clica nas opções com ícone de lápis para as personalizar com as tuas próprias palavras!
                    </div>
                  </div>
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <>
                      {showValidationError && (
                        <div className="alert alert-warning mb-3">
                          <strong>Atenção!</strong> Precisas de colocar pelo menos um recurso no pote antes de prosseguir.
                        </div>
                      )}
                      
                      <Droppable droppableId="frasesDisponiveis" direction="horizontal">
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.droppableProps} className="d-flex flex-wrap gap-2 mb-4">
                            {frasesDisponiveis.map((frase, index) => (
                              <Draggable key={frase} draggableId={frase} index={index}>
                                {(provided, snapshot) => (
                                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <DraggablePhrase phrase={frase} index={index} isDragging={snapshot.isDragging} />
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
                          <div className="col-md-12 mb-3" key={q.id}>
                            <div className="text-center mb-3">
                              <h5 className="mt-2">Arrasta os recursos para o pote:</h5>
                            </div>
                            <Droppable droppableId={q.id}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className="position-relative"
                                  style={{ minHeight: '400px' }}
                                >
                                  <img 
                                    src="/imgs/modulo6/viagem/jarro.png" 
                                    alt="pote"
                                    className="img-fluid w-100"
                                    style={{ 
                                      maxHeight: '500px',
                                      objectFit: 'contain',
                                      opacity: 0.9,
                                      zIndex: 1

                                    }}
                                  />
                                  
                                  <div 
                                    className={`position-absolute d-flex flex-wrap align-content-start justify-content-center p-3 ${showValidationError && respostas[q.id].length === 0 ? "border border-warning rounded" : ""}`}
                                    style={{ 
                                      backgroundColor: 'transparent',
                                      top: '15%',
                                      left: '50%',
                                      transform: 'translateX(-50%)',
                                      width: '60%',
                                      height: '70%',
                                      maxWidth: '500px',
                                      maxHeight: '280px',
                                      overflowY: 'auto',
                                      overflowX: 'hidden',
                                      minHeight: '120px',
                                      zIndex: 2,  

                                    }}
                                  >
                                    {respostas[q.id].length === 0 && (
                                      <div className="text-center text-muted">
                                        <div className="bg-white bg-opacity-25 p-3 rounded">
                                          <i className="bi bi-arrow-up-circle me-2"></i>
                                          Arrasta os recursos para aqui
                                        </div>
                                      </div>
                                    )}
                                    {respostas[q.id].map((frase, index) => (
                                      <Draggable key={frase} draggableId={frase} index={index}>
                                        {(provided, snapshot) => (
                                          <div 
                                            ref={provided.innerRef} 
                                            {...provided.draggableProps} 
                                            {...provided.dragHandleProps} 
                                            className="mb-2 me-2"
                                            style={{
                                              ...provided.draggableProps.style,
                                              position: snapshot.isDragging ? 'fixed' : 'relative'
                                            }}
                                          >
                                            <DraggablePhrase phrase={frase} index={index} isDragging={snapshot.isDragging} />
                                          </div>
                                        )}
                                      </Draggable>
                                    ))}
                                    {provided.placeholder}
                                  </div>
                                </div>
                              )}
                            </Droppable>
                          </div>
                        ))}
                      </div>
                      
                      <div className="d-flex justify-content-between mt-4">
                        <button className="custom-btn-pink" onClick={() => setPagina(5)}><i className="bi bi-arrow-left me-2"></i>Anterior</button>
                        <button className="custom-btn-turquoise" onClick={handleProceedToReflection}>Próximo<i className="bi bi-arrow-right ms-2"></i></button>
                      </div>
                    </>
                  </DragDropContext>
                
              </>
            )}
{/* PAGE 7 - Caixa de Ferramentas (Toolbox) - NEW PAGE */}
            {pagina === 7 && (
              <>
                <p className="mb-3 lead">
                  A <strong>lâmpaada</strong> é o <strong>quarto objeto</strong> desta viagem. Representa o momento em que a pessoa começa a 
                  <strong>ganhar clareza sobre os seus desafios</strong> e a <strong>compreender melhor o que sente</strong>. 
                  À medida que o processo terapêutico avança, começam a surgir <strong>novas perspetivas</strong> e 
                  <strong>formas de lidar com as emoções</strong>. A lâmpada simboliza essa <strong>luz</strong> que se vai acendendo pouco a pouco, 
                  iluminando partes que antes pareciam confusas ou difíceis de entender. 
                  É como se, ao acender essa lâmpada simbólica, a pessoa começasse a 
                  <strong>ver com mais nitidez o caminho que está a percorrer</strong>, percebendo quais são as 
                  <strong>estratégias que pode usar</strong> para enfrentar os desafios do dia a dia. 
                  Este é um momento de <strong>clareza</strong>, de <strong>aprendizagem</strong> e de <strong>esperança</strong>. 
                  Um passo importante na viagem ao bem-estar, onde começa a fazer-se 
                  <strong>luz sobre o que antes estava às escuras</strong>.
                </p>

                <p className="mb-3 lead text-center">
                  <strong>Há algo que começa a fazer mais sentido para ti?</strong>
                </p>

                <div className="text-center my-4">
                  <img 
                    src="/imgs/modulo6/viagem/chave.png" 
                    alt="chave desenhada à mão" 
                    className="mx-auto mb-3" 
                    style={{ maxWidth: '400px', height: 'auto' }}
                  />
                  <div className="mx-auto" style={{ maxWidth: "600px" }}>
                    <input
                      type="text"
                      className={`form-control ${chaveError ? 'is-invalid' : ''}`}
                      style={{
                        border: '1px solid #99CBC8',
                        borderRadius: '12px',
                        padding: '12px 20px',
                        fontSize: '16px'
                      }}
                      placeholder="Escreve aqui o que mudanças farias se tivesses essa chave"
                      value={chave}
                      onChange={(e) => {
                        setChave(e.target.value);
                        if (chaveError) setChaveError(false);
                      }}
                      aria-label="Ferramenta ou estratégia"
                      required
                    />
                    {chaveError && (
                      <div className="text-danger mt-2">
                        <small>Por favor, escreve algo para continuar.</small>
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink" onClick={() => setPagina(6)}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <button 
                    className={`custom-btn-turquoise ${!chave.trim() ? 'opacity-50' : ''}`}
                    onClick={handleProceedToReflection}
                    disabled={!chave.trim()}
                    style={{ cursor: chave.trim() ? 'pointer' : 'not-allowed' }}
                  >
                    Próximo<i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </>
            )}
            {/* PAGE 5 - Final Page */}
            {pagina === 8 && (
              <>
                <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>
                                    Conclusão
                                </h4>                
                <div>
              <p className="mb-3 lead">
                Ao longo desta atividade, foram apresentados <strong>sete objetos simbólicos</strong>, cada um representando uma <strong>etapa da viagem ao bem-estar</strong> – uma caminhada que reflete o percurso de quem passa pelo processo terapêutico.
              </p>

             <ul className="mb-3 lead list-disc list-inside">
              <li>
                <strong>Mochila</strong> – O espaço seguro onde são colocadas <strong>preocupações e dificuldades</strong>, reconhecendo que, numa relação terapêutica, é possível <strong>ser genuíno/a e vulnerável sem julgamento</strong>.
              </li>
              <br></br>
              <li>
                <strong>Cadeira</strong> – O lugar da <strong>escuta empática</strong>, onde se constrói <strong>confiança</strong> e se encontra <strong>acolhimento para partilhar o que se sente</strong>.
              </li>
                            <br></br>

              <li>
                <strong>Espelho</strong> – O símbolo da <strong>autorreflexão</strong>, que permite olhar para as emoções com mais <strong>clareza e compreensão</strong>.
              </li>
                            <br></br>

              <li>
                <strong>Lâmpada</strong> – A luz que ilumina os <strong>desafios</strong>, revelando <strong>novas estratégias e caminhos</strong>.
              </li>
                            <br></br>

              <li>
                <strong>Corda</strong> – A <strong>ligação de apoio contínuo</strong> entre a pessoa e o psicólogo, que oferece <strong>suporte e segurança</strong> ao longo do caminho.
              </li>
                            <br></br>

              <li>
                <strong>Pote</strong> – A <strong>reserva de resiliência</strong>, onde se guardam conquistas, estratégias e vitórias, mesmo perante novos obstáculos.
              </li>
                            <br></br>

              <li>
                <strong>Chave</strong> – A <strong>liberdade e autonomia</strong> que se ganham ao longo da viagem, abrindo portas para um <strong>futuro mais confiante e preparado</strong>.
              </li>
            </ul>


              <p className="mb-3 lead">
                Cada símbolo representa um <strong>passo essencial</strong> na viagem terapêutica: desde <strong>acolher e partilhar</strong>, passando por <strong>refletir</strong>, <strong>compreender e fortalecer</strong>, até chegar à <strong>autonomia</strong>.
              </p>

              <p className="mb-3 lead">
                O processo terapêutico é um <strong>caminho de descoberta interior</strong>, onde, com o <strong>apoio de um psicólogo</strong>, se aprende a compreender melhor as emoções e a <strong>transformar os desafios em oportunidades de crescimento</strong>.
              </p>

              <p className="mb-3 lead">
                No final desta viagem, percebe-se que <strong>pedir ajuda é um ato de coragem</strong>, e que, com o tempo, é possível <strong>avançar com mais clareza, confiança e equilíbrio</strong> para enfrentar o que vier pela frente.
              </p>
            </div>
            <div className="d-flex justify-content-between mt-4">
                                    <button className="custom-btn-pink" onClick={() => setPagina(7)}>
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

export default ViagemBemEstar;