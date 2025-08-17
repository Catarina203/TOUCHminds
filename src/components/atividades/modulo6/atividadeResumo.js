import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import AtividadeProgressao from '../atividadeProgressao';

const AtividadeResumo6 = () => {
  const [pagina, setPagina] = useState(0);
  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);

  const progresso = Math.round((pagina / 2) * 100);

// Dados com corretos e distratores
const respostasEsperadas = {
  "O que faz o psicólogo": {
    corretos: [
      "Ajuda a compreender emoções",
      "Não julga o que sentimos",
      "Ajuda a encontrares soluções",
    ],
    distratores: [
      "Diz sempre o que temos de fazer",
      "Prescreve medicação",
      "É só para casos muito graves",
    ],
  },
  "Como funciona o processo terapêutico": {
    corretos: [
      "Cria-se uma relação de confiança",
      "Identifica-se desafios",
      "Define-se objetivos para melhorar o bem-estar",
      "Aplica-se estratégias para lidar com emoções difíceis",
      "Consolida-se mudanças para manter os progressos",
    ],
    distratores: [
      "É igual para toda a gente",
      "Resolve-se em 2 ou 3 sessões",
      "Fala-se só do passado",
    ],
  },
  "Onde procurar ajuda formal": {
    corretos: [
      "Psicólogo da escola",
      "Médico de família",
      "Psicólogo de centro de saúde/ hospital/clínica",
    ],
    distratores: [
      "Apenas amigos e família",
      "Influencers nas redes sociais",
    ],
  },
};

// Pool inicial: corretos + distratores
const todasFrases = Object.entries(respostasEsperadas).flatMap(
  ([coluna, { corretos, distratores }]) =>
    [...corretos, ...distratores].map((frase, i) => ({
      id: `${coluna}-${i}-${frase}`,
      frase,
      // Se for correto: guarda a coluna correta; se for distrator: null
      colunaCorreta: corretos.includes(frase) ? coluna : null,
    }))
);

// Estado inicial das colunas
const colunasIniciais = {
  "O que faz o psicólogo": [],
  "Como funciona o processo terapêutico": [],
  "Onde procurar ajuda formal": [],
};

const [frasesEmColunas, setFrasesEmColunas] = useState(colunasIniciais);
const [frasesDisponiveis, setFrasesDisponiveis] = useState(todasFrases);

const onDragEnd = (result) => {
  const { source, destination } = result;
  if (!destination) return;

  // Mesma posição → nada a fazer
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) return;

  // De "disponíveis" → para uma coluna
  if (source.droppableId === "frasesDisponiveis" && destination.droppableId !== "frasesDisponiveis") {
    const fraseMovida = frasesDisponiveis[source.index];
    setFrasesEmColunas(prev => ({
      ...prev,
      [destination.droppableId]: [...prev[destination.droppableId], fraseMovida],
    }));
    setFrasesDisponiveis(prev => prev.filter((_, i) => i !== source.index));
    return;
  }

  // De uma coluna → para "disponíveis"
  if (source.droppableId !== "frasesDisponiveis" && destination.droppableId === "frasesDisponiveis") {
    const fraseMovida = frasesEmColunas[source.droppableId][source.index];
    setFrasesDisponiveis(prev => [...prev, fraseMovida]);
    setFrasesEmColunas(prev => ({
      ...prev,
      [source.droppableId]: prev[source.droppableId].filter((_, i) => i !== source.index),
    }));
    return;
  }

  // Entre colunas
  if (source.droppableId !== "frasesDisponiveis" && destination.droppableId !== "frasesDisponiveis") {
    const fraseMovida = frasesEmColunas[source.droppableId][source.index];
    setFrasesEmColunas(prev => ({
      ...prev,
      [source.droppableId]: prev[source.droppableId].filter((_, i) => i !== source.index),
      [destination.droppableId]: [...prev[destination.droppableId], fraseMovida],
    }));
  }
};

 const totalCorretas = Object.values(respostasEsperadas)
  .reduce((sum, g) => sum + g.corretos.length, 0);

const placedCorrectCount = Object.entries(frasesEmColunas)
  .reduce((sum, [coluna, frases]) => sum + frases.filter(f => f.colunaCorreta === coluna).length, 0);

const hasWrongPlaced = Object.entries(frasesEmColunas)
  .some(([coluna, frases]) =>
    frases.some(f =>
      // distrator colocado (colunaCorreta === null) OU correto na coluna errada
      f.colunaCorreta === null || (f.colunaCorreta && f.colunaCorreta !== coluna)
    )
  );

const todasCorretas = placedCorrectCount === totalCorretas && !hasWrongPlaced;

  // Função para resetar a atividade
  const resetarAtividade = () => {
    setFrasesEmColunas(colunasIniciais);
    setFrasesDisponiveis(todasFrases);
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

            {pagina === 0 && (
              <div className="text-center">
                <h2 className="text-center fw-bold mb-4" style={{ color: "#234970" }}>Atividade Resumo</h2>
                <p className="lead"><strong>Sê muito bem-vindo/a à atividade resumo do Módulo 6 – Um Novo Começo</strong>!</p>
                <p className="lead">
                  O objetivo desta atividade é <strong>consolidar os conteúdos</strong> que exploramos ao longo do módulo. Nesta atividade, vais colocar em prática o que aprendeste sobre o ajuda formal: quem pode ajudar, como acontece o processo terapêutico e onde procurar ajuda.
                  <br></br><br></br>
                  Vais <strong>encontrar frases</strong> que representam diferentes aspetos do caminho de pedir ajuda. O teu desafio é <strong>arrastá-las</strong> para a coluna certa.
                  <br></br><br></br>
                </p>
                <button className="custom-btn-turquoise mt-3 px-4 py-2" onClick={() => setPagina(1)}>
                  <i className="bi bi-play-fill me-2"></i>Vamos a isto?
                </button>
              </div>
            )}

            {pagina === 1 && (
                    <div className="text-center">
                    <h2 className="text-center fw-bold mb-4" style={{ color: "#234970" }}>
                     Caminho de Pedir Ajuda
                      </h2>
                      <p className="lead">
                      Arrasta as frases para a coluna correta. <strong>Algumas são distratores</strong> — se as arrastares, aparecerão a vermelho.
                      </p>

                          <DragDropContext onDragEnd={onDragEnd}>
                            <div className="row g-3">
                              {/* Área de frases disponíveis */}
                              <div className="col-12 mb-3">
                                <div className="border rounded p-3" style={{ backgroundColor: "#FBF9F9" }}>
                                  <h5 className="mb-3 text-center">Frases para organizar</h5>
                                  <Droppable droppableId="frasesDisponiveis" direction="horizontal">
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="d-flex flex-wrap gap-2"
                                      >
                                        {frasesDisponiveis.map((frase, index) => (
                                          <Draggable key={frase.id} draggableId={frase.id} index={index}>
                                            {(provided) => (
                                              <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="badge text-white p-2"
                                                style={{
                                                  backgroundColor: "#99CBC8",
                                                  userSelect: "none",
                                                  ...provided.draggableProps.style,
                                                }}
                                                title="Arrasta esta frase para uma coluna"
                                              >
                                                {frase.frase}
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

                              {/* Colunas de destino */}
                              {Object.entries(frasesEmColunas).map(([colunaNome, frases]) => (
                                <div className="col-md-4" key={colunaNome}>
                                  <div className="border rounded p-3 h-100" style={{ backgroundColor: "#FBF9F9" }}>
                                    <h5 className="text-center mb-3 fw-bold">{colunaNome}</h5>
                                    <Droppable droppableId={colunaNome}>
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.droppableProps}
                                          className="min-h-200px"
                                        >
                                          {frases.map((frase, index) => {
                                            const isCorrect = frase.colunaCorreta === colunaNome;           // correto na coluna certa
                                            const isWrong =
                                              (frase.colunaCorreta && frase.colunaCorreta !== colunaNome) || // correto na coluna errada
                                              frase.colunaCorreta === null;                                  // distrator colocado

                                            return (
                                              <Draggable key={frase.id} draggableId={frase.id} index={index}>
                                                {(provided) => (
                                                  <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="p-2 mb-2 rounded text-white"
                                                    style={{
                                                      backgroundColor: isCorrect ? "#28a745" : isWrong ? "#dc3545" : "#99CBC8",
                                                      userSelect: "none",
                                                      ...provided.draggableProps.style,
                                                    }}
                                                  >
                                                    {frase.frase}
                                                  </div>
                                                )}
                                              </Draggable>
                                            );
                                          })}
                                          {provided.placeholder}
                                        </div>
                                      )}
                                    </Droppable>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </DragDropContext>

                          {/* Botões */}
                          <div className="d-flex justify-content-between mt-4">
                                        <button className="custom-btn-pink" onClick={() => setPagina(1)}>
                                          <i className="bi bi-arrow-left me-2"></i>Anterior
                                        </button>

                            {/* Conclusão: só aparece quando está tudo certo */}
                            {todasCorretas ? (
                              <AtividadeProgressao
                                moduloId={moduloId}
                                atividadeIndex={3}
                                updateUserData={updateUserData}
                              />
                            ) : (
                              <button className="custom-btn-turquoise" disabled>
                                Concluir<i className="bi bi-arrow-right ms-2"></i>
                              </button>
                            )}
                          </div>
                        </div>
                      )}

            {pagina === 2 && (
              <div className="text-center py-4">
                <h4 className="fw-bold mb-4 text-start" style={{ color: "#234970" }}>Conclusão da Atividade</h4>
                <p className="lead">Nesta atividade, resumiste o que aprendeste neste módulo sobre o caminho de pedir ajuda.<br></br><br></br>
                  Descobriste <strong>que o psicólogo não traz respostas feitas</strong>, mas pode ajudar-te a compreender melhor o que estás a sentir e a encontrar, contigo, o caminho mais certo.<br></br><br></br>
                  Percebeste <strong>que o processo terapêutico tem etapas</strong> — começa com confiança, passa por desafios, estratégias e pequenas conquistas que fazem a diferença.<br></br><br></br>
                  E aprendeste também <strong>que não estás sozinho/a</strong>: há lugares, pessoas e profissionais disponíveis quando precisamos de ajuda. Lembra-te: procurar ajuda não é sinal de fraqueza — é um passo corajoso.<br></br><br></br>
                  Pode não ser fácil, mas agora <strong>sabes que há um caminho</strong>. E que ele começa com o simples <strong>gesto de pedir ajuda</strong>.<br></br><br></br>
                </p>
                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink" onClick={() => setPagina(2)}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <AtividadeProgressao
                    moduloId={moduloId}
                    atividadeIndex={3}
                    updateUserData={updateUserData}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtividadeResumo6;