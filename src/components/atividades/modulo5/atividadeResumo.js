import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import AtividadeProgressao from "../atividadeProgressao";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AtividadeResumoRede = () => {
  const [pagina, setPagina] = useState(0);
  const [modalAberto, setModalAberto] = useState(false);
  const [mensagemPopUp, setMensagemPopUp] = useState("");
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);

  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);

  const avancarPagina = () => {
    setPagina((prev) => prev + 1);
    setMostrarOpcoes(false);
    setOpcaoSelecionada(null);
  };

  const retrocederPagina = () => {
    setPagina((prev) => prev - 1);
    setMostrarOpcoes(false);
    setOpcaoSelecionada(null);
  };

  const escolherOpcao = (index, feedback) => {
    setMensagemPopUp(feedback);
    setOpcaoSelecionada(index);
    setModalAberto(true);
  };

  const [hoverIndex, setHoverIndex] = useState(null);

  const progresso = Math.round((pagina / 6) * 100);

  // Scenarios data
  const cenarios = [
    {
      titulo: "Situação 1: Ansiedade antes de uma apresentação",
      imagem: "/imgs/modulo5/resumo/resumo1.png",
      feedback: (
        <>
          Quando a <strong>ansiedade</strong> afeta tanto o <strong>sono</strong> quanto a <strong>concentração</strong> de forma <strong>prolongada</strong>, <strong>procurar ajuda de um psicólogo</strong> é a <strong>melhor opção</strong>. O <strong>profissional</strong> pode fornecer <strong>ferramentas</strong> e <strong>estratégias</strong> para <strong>lidar com a ansiedade a longo prazo</strong>.
        </>
      ),
      opcoes: [
        {
          texto: <><b>Ajuda Formal:</b> "Procuravas um psicólogo para te ajudar a lidar com a ansiedade."</>,
        },
        {
          texto: <><b>Ajuda Semiformal:</b> "Conversavas com um professor para obteres ajuda na organização e gestão do tempo de estudo."</>,
        },
        {
          texto: <><b>Ajuda Informal:</b> "Falavas com um amigo ou com um familiar para desabafares sobre a ansiedade."</>,
        },
        {
          texto: <><b>Autoajuda:</b> "Usavas uma aplicação de meditação ou de relaxamento para te ajudar a lidares com a ansiedade."</>,
        }
      ]
    },
    {
      titulo: "Situação 2: Conflito familiar persistente",
      imagem: "/imgs/modulo5/resumo/resumo2.png",
      feedback: (
        <>
          <strong>Falar com alguém de confiança</strong>, como um <strong>amigo próximo</strong> ou um <strong>familiar</strong>, pode ser a <strong>melhor escolha</strong> nesta situação. Essas pessoas <strong>conhecem-te bem</strong> e podem ajudar-te a <strong>ver a situação de outra forma</strong>, oferecendo <strong>conselhos</strong> ou <strong>sugestões</strong> que talvez <strong>não tivesses considerado</strong>.
        </>
      ),
      opcoes: [
        {
          texto: <><b>Ajuda Formal:</b> "Procuravas ajuda de um psicólogo para aprenderes a resolver o conflito."</>,
        },
        {
          texto: <><b>Ajuda Semiformal:</b> "Falavas com um professor sobre como lidar com o conflito."</>,
        },
        {
          texto: <><b>Ajuda Informal:</b> "Conversavas com outro amigo ou com a tua família para tentares entender melhor a situação."</>,
        },
        {
          texto: <><b>Autoajuda:</b> "Lias artigos ou assistir a vídeos sobre como lidar com conflitos."</>,
        }
      ]
    },
    {
      titulo: "Situação 3: Dificuldades académicas",
      imagem: "/imgs/modulo5/resumo/resumo3.png",
      feedback: (
        <>
          As <strong>sensações</strong> como o <strong>aumento da frequência cardíaca</strong> e a <strong>respiração acelerada</strong> são <strong>respostas naturais do corpo à ansiedade</strong> e são bastante comuns em momentos de <strong>stress</strong>.
          <br /><br />
          Nessas situações, <strong>utilizar uma aplicação de meditação</strong> ou <strong>técnicas de respiração</strong> pode ser uma <strong>boa opção</strong>. Essas <strong>ferramentas</strong> podem ser um <strong>excelente complemento</strong> a outras formas de ajuda, como a <strong>ajuda de amigos e familiares</strong>, <strong>professores</strong> ou de <strong>psicólogos</strong>.
          <br /><br />
          No entanto, é fundamental <strong>escolher aplicações de meditação que sejam seguras</strong> e <strong>comprovadamente eficazes</strong>, preferencialmente aquelas <strong>recomendadas por especialistas na área</strong>. Isso garante que o uso dessas ferramentas seja <strong>realmente benéfico</strong> e contribua para o teu <strong>bem-estar</strong>.
        </>
      ),
      opcoes: [
        {
          texto: <><b>Ajuda Formal:</b> "Procuravas um psicólogo para te ensinar algumas estratégias."</>,
        },
        {
          texto: <><b>Ajuda Semiformal:</b> "Falavas com um professor sobre o que sentes."</>,
        },
        {
          texto: <><b>Ajuda Informal:</b> "Conversavas com um amigo ou familiar que possa ter passado pela mesma situação e procuravas conselhos."</>,
        },
        {
          texto: <><b>Autoajuda:</b> "Usavas uma aplicação que te ensine técnicas simples de respiração."</>,
        }
      ]
    },
    {
      titulo: "Situação 4: Sentimentos de tristeza profunda",
      imagem: "/imgs/modulo5/resumo/resumo4.png",
      feedback: (
        <>
          <strong>Conversar com um professor</strong> é uma <strong>boa forma</strong> de obter <strong>conselhos práticos</strong> e <strong>realistas</strong> sobre como <strong>melhorar a tua organização</strong> e <strong>gestão do estudo</strong>. Eles podem sugerir <strong>métodos de estudo eficientes</strong> e <strong>estratégias de gestão do tempo</strong>.
        </>
      ),
      opcoes: [
        {
          texto: <><b>Ajuda Formal:</b> "Procuravas um psicólogo para te ajudar na organização e gestão do estudo."</>,
        },
        {
          texto: <><b>Ajuda Semiformal:</b> "Falavas com um professor para obteres conselhos sobre como melhorar a gestão do estudo."</>,
        },
        {
          texto: <><b>Ajuda Informal:</b> "Falavas com os teus amigos sobre como gerem o estudo e que estratégias utilizam ou pedias ajuda a familiares para te ajudarem na gestão do estudo."</>,
        },
        {
          texto: <><b>Autoajuda:</b> "Usavas técnicas de gestão de estudo que encontraste na internet."</>,
        }
      ]
    }
  ];

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
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>Atividade Resumo</h2>
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <p className="lead">
                      <strong>Sê muito bem-vindo ou bem-vinda à atividade resumo do Módulo 5</strong> – <strong>Reviravolta em Rede!</strong>
                      O <strong>objetivo</strong> desta atividade é <strong>consolidar os conteúdos</strong> que exploramos ao longo do módulo.<br></br><br></br>
                      Como já vimos, quando <strong>precisamos de ajuda</strong>, temos várias opções disponíveis. Podes contar com a <strong>ajuda de amigos, familiares ou professores</strong>, procurar <strong>ajuda de profissionais</strong> ou até recorrer a <strong>ferramentas de autoajuda</strong>.<br></br><br></br>
                      Vamos explorar alguns <strong>exemplos</strong> para perceber <strong>quando é mais adequado escolher cada tipo de ajuda</strong>!<br></br><br></br>
                      Nesta atividade, serás apresentado a <strong>diversas situações do dia a dia</strong>. O teu objetivo é <strong>ler cada situação e escolher</strong>, entre as opções dadas, a <strong>melhor forma de procurar ajuda</strong> nessa situação.<br></br><br></br>
                      Ao fazeres a tua escolha, vais receber um <strong>feedback imediato</strong> que te ajudará a compreender qual a <strong>melhor opção para cada caso</strong>.<br></br>
                    </p>
                    <div className="text-center">
                      <button
                        className="custom-btn-turquoise mt-3 px-4 py-2" onClick={avancarPagina}
                      >
                        <i className="bi bi-play-fill me-2"></i>Vamos a isto!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PÁGINAS 1-4 - CENÁRIOS QUIZ */}
            {pagina >= 1 && pagina <= 4 && (
              <div className="text-center py-4">
                <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>
                  {cenarios[pagina - 1].titulo}
                </h4>

                <div className="mb-4">
                  <img
                    src={cenarios[pagina - 1].imagem}
                    alt={`Cenário ${pagina}`}
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                  />
                </div>

                <div className="mb-4">
                  <p className="fw-bold" style={{ color: "#234970" }}>
                    Que tipo de ajuda escolherias nesta situação?
                  </p>
                </div>

                {/* Opções */}
                <div className="d-flex flex-column gap-3 mb-4">
                  {cenarios[pagina - 1].opcoes.map((opcao, index) => {
                    const isSelected = opcaoSelecionada === index;
                    const isDisabled = opcaoSelecionada !== null && !isSelected;
                    const isHovered = hoverIndex === index;

                    return (
                      <div
                        key={index}
                        onClick={() => !isDisabled && escolherOpcao(index, cenarios[pagina - 1].feedback)}
                        onMouseEnter={() => !isDisabled && setHoverIndex(index)}
                        onMouseLeave={() => !isDisabled && setHoverIndex(null)}
                        className="p-3 text-start"
                        style={{
                          backgroundColor: isSelected
                            ? '#99CBC8'
                            : isHovered
                              ? '#5AAAA5'
                              : '#ffffff',
                          color: isSelected
                            ? 'white'
                            : isHovered
                              ? 'white'
                              : '#000000', // texto preto por defeito
                          border: isSelected
                            ? '1px solid #99CBC8'
                            : isHovered
                              ? '1px solid #5AAAA5'
                              : '1px solid #99CBC8',
                          borderRadius: '10px',
                          cursor: isDisabled ? 'default' : 'pointer',
                          fontWeight: isSelected ? '200' : 'normal',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {opcao.texto}
                      </div>
                    );
                  })}
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    className="custom-btn-pink" onClick={retrocederPagina}
                  >
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <button
                    className="custom-btn-turquoise" onClick={avancarPagina}
                    disabled={opcaoSelecionada === null}
                  >
                    {pagina === 4 ? "Conclusão" : "Próximo"} <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            )}

            {/* PÁGINA 5 - CONCLUSÃO */}
            {pagina === 5 && (
              <>
                <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>
                  Conclusão da Atividade
                </h4>
                <div>
                  <p className="lead">
                    Como pudeste perceber, existem <strong>várias formas de procurar ajuda</strong>, e a <strong>escolha</strong> de qual delas é mais adequada depende da <strong>frequência</strong> e do <strong>impacto</strong> que tem na tua vida.<br></br><br></br>

                    Por vezes, a ajuda pode vir de quem está <strong>perto de ti</strong>, como <strong>amigos</strong>, <strong>família</strong> ou <strong>professores</strong>, que podem oferecer <strong>conselhos</strong> ou até mesmo algumas <strong>dicas</strong> para melhorar a situação.<br></br><br></br>

                    Noutras ocasiões, especialmente quando as coisas se tornam <strong>mais difíceis de lidar</strong>, <strong>recorrer a um profissional</strong>, como um <strong>psicólogo</strong>, pode ser <strong>fundamental</strong> para encontrar <strong>estratégias eficazes e personalizadas</strong>.<br></br><br></br>

                    O mais importante é que, ao <strong>procurar ajuda</strong>, demonstraste a tua <strong>capacidade de reconhecer o que precisas</strong> e de dar o <strong>primeiro passo para o teu bem-estar</strong>. Isso é algo <strong>valioso</strong>, pois, por vezes, <strong>reconhecer que precisamos de ajuda</strong> é o <strong>maior e mais difícil passo</strong>.<br></br><br></br>

                    <strong>Lembra-te</strong> de que <strong>procurar ajuda não é sinal de fraqueza</strong>, mas de <strong>coragem</strong>.
                    <br></br><br></br>
                    <strong>Cuida de ti</strong> e continua a <strong>valorizar o teu bem-estar</strong>!

                  </p>
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button
                    className="custom-btn-pink" onClick={retrocederPagina}
                  >
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <AtividadeProgressao
                    moduloId={moduloId}
                    atividadeIndex={2}
                    updateUserData={updateUserData}
                  />
                </div>
              </>
            )}

          </div>
        </div>
      </div>

      {/* Modal for feedback */}
      <Modal show={modalAberto} onHide={() => setModalAberto(false)} centered>
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#99CBC8",
            borderBottom: "none",
            color: "#fff",
          }}
        >
          <Modal.Title style={{ fontWeight: "600" }}>
            Resultado da tua escolha
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-start">
          {mensagemPopUp}
        </Modal.Body>
        <Modal.Footer
          style={{
            borderTop: "none",
            backgroundColor: "#F5FDFC",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Button className="custom-btn-complete"
            onClick={() => {
              setModalAberto(false);
            }}
            style={{
              backgroundColor: "#234970",
              borderColor: "#234970",
              borderRadius: "20px",
              padding: "0.5rem 1.5rem",
              fontWeight: "500",
            }}
          >
            Próximo
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AtividadeResumoRede;