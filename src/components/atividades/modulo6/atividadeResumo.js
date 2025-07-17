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

  const progresso = Math.round((pagina / 3) * 100);

  const respostasCorretas = [
    { frase: "O psicólogo ajuda a explorar sentimentos", coluna: "O que faz o psicólogo" },
    { frase: "O psicólogo ouve sem julgar", coluna: "O que faz o psicólogo" },
    { frase: "O psicólogo ajuda a encontrar estratégias", coluna: "O que faz o psicólogo" },
    { frase: "Constrói-se uma relação de confiança", coluna: "Como funciona o processo terapêutico" },
    { frase: "Identifica-se desafios", coluna: "Como funciona o processo terapêutico" },
    { frase: "Define-se objetivos para melhorar o bem-estar", coluna: "Como funciona o processo terapêutico" },
    { frase: "Aplica-se estratégias para lidar com emoções difíceis", coluna: "Como funciona o processo terapêutico" },
    { frase: "Consolida-se mudanças para manter os progressos", coluna: "Como funciona o processo terapêutico" },
    { frase: "Psicólogo da escola", coluna: "Onde procurar ajuda formal" },
    { frase: "Médico de família", coluna: "Onde procurar ajuda formal" },
    { frase: "Psicólogo de centro de saúde/hospital/clínica", coluna: "Onde procurar ajuda formal" }
  ];

  // Inicializa as colunas vazias
  const colunasIniciais = {
    "O que faz o psicólogo": [],
    "Como funciona o processo terapêutico": [],
    "Onde procurar ajuda formal": []
  };

  const [frasesEmColunas, setFrasesEmColunas] = useState(colunasIniciais);
  const [frasesDisponiveis, setFrasesDisponiveis] = useState(
    respostasCorretas.map((f, i) => ({ id: `frase-${i}`, ...f }))
  );

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Se não tiver destino ou for o mesmo lugar, não faz nada
    if (!destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)) {
      return;
    }

    // Movendo da área de frases para uma coluna
    if (source.droppableId === "frasesDisponiveis" && destination.droppableId !== "frasesDisponiveis") {
      const fraseMovida = frasesDisponiveis[source.index];

      setFrasesEmColunas(prev => ({
        ...prev,
        [destination.droppableId]: [...prev[destination.droppableId], fraseMovida]
      }));

      setFrasesDisponiveis(prev =>
        prev.filter((_, index) => index !== source.index)
      );
    }
    // Movendo de volta para a área de frases
    else if (source.droppableId !== "frasesDisponiveis" && destination.droppableId === "frasesDisponiveis") {
      const fraseMovida = frasesEmColunas[source.droppableId][source.index];

      setFrasesDisponiveis(prev => [...prev, fraseMovida]);

      setFrasesEmColunas(prev => ({
        ...prev,
        [source.droppableId]: prev[source.droppableId].filter((_, index) => index !== source.index)
      }));
    }
    // Movendo entre colunas (se quiser permitir)
    else if (source.droppableId !== "frasesDisponiveis" && destination.droppableId !== "frasesDisponiveis") {
      const fraseMovida = frasesEmColunas[source.droppableId][source.index];

      setFrasesEmColunas(prev => ({
        ...prev,
        [source.droppableId]: prev[source.droppableId].filter((_, index) => index !== source.index),
        [destination.droppableId]: [...prev[destination.droppableId], fraseMovida]
      }));
    }
  };

  // Verifica se todas as frases estão nas colunas corretas
  const todasCorretas = frasesDisponiveis.length === 0 &&
    Object.entries(frasesEmColunas).every(([coluna, frases]) =>
      frases.length > 0 && frases.every(f => f.coluna === coluna)
    );

  // Função para resetar a atividade
  const resetarAtividade = () => {
    setFrasesEmColunas(colunasIniciais);
    setFrasesDisponiveis(respostasCorretas.map((f, i) => ({ id: `frase-${i}`, ...f })));
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
              <div className="text-center py-4 ps-2">
                <h2 className="fw-bold mb-4 text-start" style={{ color: "#234970" }}>Atividade Resumo</h2>
                <p className="lead"><strong>Sê muito bem-vindo ou bem-vinda</strong> à atividade <strong>resumo do Módulo 6 – Um Novo Começo</strong>!</p>
                <p className="lead">
                  O objetivo desta atividade é <strong>consolidar os conteúdos</strong> que exploramos ao longo do módulo. Nesta atividade, vais colocar em prática o que aprendeste sobre o ajuda formal: quem pode ajudar, como acontece o processo terapêutico e onde procurar ajuda.
                  <br></br><br></br>
                  Vais <strong>encontrar frases</strong> que representam diferentes aspetos do caminho de pedir ajuda. O teu desafio é <strong>arrastá-las</strong> para a coluna certa, usando o que já sabes.
                  <br></br><br></br>
                  <strong>Estás Pronto/a?</strong>
                </p>
                <button className="custom-btn-turquoise mt-3 px-4 py-2" onClick={() => setPagina(1)}>
                  <i className="bi bi-play-fill me-2"></i>Vamos começar!
                </button>
              </div>
            )}

            {pagina === 1 && (
              <div className="py-4">
                <h2 className="fw-bold mb-4 text-center" style={{ color: "#234970" }}>Caminho de Pedir Ajuda</h2>
                <p className="text-center mb-4">Arraste cada frase para a coluna correta:</p>

                <DragDropContext onDragEnd={onDragEnd}>
                  <div className="row g-3">
                    {/* Área de frases disponíveis */}
                    <div className="col-md-12 mb-4" >
                      <div className="border rounded p-3" style={{
                        backgroundColor: "#FBF9F9",
                      }} >
                        <h5 className="mb-3">Frases para organizar</h5>
                        <Droppable droppableId="frasesDisponiveis" direction="horizontal">
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="d-flex flex-wrap gap-2 min-h-100px"
                            >
                              {frasesDisponiveis.map((frase, index) => (
                                <Draggable key={frase.id} draggableId={frase.id} index={index}>
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="bg-white border rounded p-3 cursor-grab"
                                      style={{ ...provided.draggableProps.style }}
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
                          <h5 className="text-center mb-3">{colunaNome}</h5>
                          <Droppable droppableId={colunaNome}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`min-h-200px ${frases.length === 0 ? "bg-light" : ""}`}
                              >
                                {frases.map((frase, index) => (
                                  <Draggable key={frase.id} draggableId={frase.id} index={index}>
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`bg-white border rounded p-3 mb-2 ${frase.coluna === colunaNome ? "border-success" : "border-danger"
                                          }`}
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
                    ))}
                  </div>
                </DragDropContext>

                <div className="d-flex justify-content-between mt-4">
                  <button
                    className="custom-btn-pink" onClick={() => setPagina(0)}
                  >
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>

                  <div>
                    <button
                      className="btn btn-outline-secondary me-2"
                      style={{ borderColor: "#66BFBF", color: "#66BFBF", borderRadius: "8px" }}
                      onClick={resetarAtividade}
                    >
                      <i className="bi bi-arrow-counterclockwise me-2"></i>Recomeçar
                    </button>

                    <button
                      className="custom-btn-turquoise"
                      disabled={!todasCorretas}
                      onClick={() => setPagina(2)}
                    >
                      Verificar e Continuar<i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Páginas 2 e 3 permanecem iguais */}
            {pagina === 2 && (
              <div className="py-4">
                <h2 className="fw-bold mb-4 text-center" style={{ color: "#234970" }}>Vamos refletir!</h2>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead style={{ backgroundColor: "#99CBC8", color: "white" }}>
                      <tr>
                        <th>Frase</th>
                        <th>Coluna correta</th>
                      </tr>
                    </thead>
                    <tbody>
                      {respostasCorretas.map((resposta, index) => (
                        <tr key={index}>
                          <td style={{backgroundColor: resposta.frase.trim() !== "" ? "#FBF9F9" : "white",}}>{resposta.frase}</td>
                          <td style={{backgroundColor: resposta.coluna.trim() !== "" ? "#FBF9F9" : "white",}}>{resposta.coluna}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink" onClick={() => setPagina(1)}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <button className="custom-btn-turquoise" onClick={() => setPagina(3)}>
                    Conclusão<i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            )}

            {pagina === 3 && (
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