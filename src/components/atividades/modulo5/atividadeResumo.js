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
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);

  const avancarPagina = () => {
  if (pagina >= 1 && pagina <= 4 && opcaoSelecionada === null) {
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 3000);
    return;
  }
  setPagina((prev) => prev + 1);
  setOpcaoSelecionada(null);
  setHoverIndex(null);
};

  const retrocederPagina = () => {
  setPagina((prev) => prev - 1);
  setOpcaoSelecionada(null);
  setHoverIndex(null);
  setShowWarning(false);
};
  const escolherOpcao = (index, feedback) => {
    setMensagemPopUp(feedback);
    setOpcaoSelecionada(index);
    setModalAberto(true);
    setShowWarning(false);
  };

  const [hoverIndex, setHoverIndex] = useState(null);

  const progresso = Math.round((pagina / 6) * 100);

  // Scenarios data
  const cenarios = [
    {
      titulo: "Ansiedade nos testes ou apresentações",
      imagem: "/imgs/modulo5/resumo/resumo1.png",
      descricao: (
  <>
    Imagina que estás a sentir-te <strong>extremamente ansioso/a antes de todos os testes e apresentações orais</strong>, com a ansiedade a interferir com o <strong>teu sono, a tua capacidade de concentração</strong> e até o <strong>teu desempenho nos próprios testes</strong>. Já não sabes o que podes fazer mais.
  </>
),
      feedback: (
        <>
          Quando a ansiedade afeta <strong> várias áreas da nossa vida de forma prolongada</strong>, como <strong> a concentração e o desempenho académico</strong>,<strong> procurar ajuda de um psicólogo é a melhor opção. </strong> O profissional pode fornecer <strong> ferramentas e estratégias </strong> para lidar com a ansiedade a longo prazo. Trabalhar com um psicólogo não significa deixar de procurar ajuda nos amigos, professores ou até formas de autoajuda! Podes até conversar com o teu psicólogo sobre como estas fontes te estão a ajudar.
        </>
      ),
      opcoes: [
        {
          texto: <>Procurava um psicólogo para me ajudar a lidar com a ansiedade.</>,
        },
        {
          texto: <>Conversava com um professor para obter ajuda na organização e gestão do tempo de estudo.</>,
        },
        {
          texto: <>Falava com um amigo ou com um familiar para desabafar sobre a ansiedade.</>,
        },
        {
          texto: <>Usava uma aplicação de meditação ou de relaxamento para me ajudar a lidar com a ansiedade.</>,
        }
      ]
    },
    {
      titulo: "Conflito com um amigo",
      imagem: "/imgs/modulo5/resumo/resumo2.png",
      descricao: (
  <>
    Imagina que tens um <strong> desentendimento com um amigo/a </strong> e isso está a afetar a tua relação com ele/a. <strong> Não sabes como resolver a situação </strong> e não queres perder a amizade.
      </>
),  
      feedback: (
        <>
          <strong>Falar com alguém de confiança</strong>, como um <strong>amigo próximo</strong> ou um <strong>familiar</strong>, pode ser a <strong>melhor escolha</strong> nesta situação. Essas pessoas <strong>conhecem-te bem</strong> e podem ajudar-te a <strong>ver a situação de outra forma</strong>, oferecendo <strong>conselhos</strong> ou <strong>sugestões</strong> que talvez <strong>não tivesses considerado</strong>.
        </>
      ),
      opcoes: [
        {
          texto: <>Procurava ajuda de um psicólogo para aprender a resolver o conflito.</>,
        },
        {
          texto: <>Falava com um professor sobre como lidar com o conflito.</>,
        },
        {
          texto: <>Conversava com outro amigo ou com a minha família para tentar entender melhor a situação.</>,
        },
        {
          texto: <>Procurava na internet ou assistia a vídeos sobre como lidar com conflitos.</>,
        }
      ]
    },
    {
      titulo: "Situações novas",
      imagem: "/imgs/modulo5/resumo/resumo3.png",
      descricao: (
  <>
  Imagina que sentes <strong> o coração mais rápido e a respiração acelerada em situações novas</strong>. Sabes que isso é normal e comum, e faz parte da ansiedade que todos sentimos. No entanto, <strong>gostavas de saber como lidar melhor com isso. </strong> 
  </>
  ),
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
          texto: <>Procurava um psicólogo para me ensinar algumas estratégias.</>,
        },
        {
          texto: <>Falava com um professor sobre o que sentia.</>,
        },
        {
          texto: <>Conversava com um amigo ou familiar que possa ter passado pela mesma situação e procurava conselhos.</>,
        },
        {
          texto: <>Usava uma aplicação que me ensinasse técnicas simples de respiração.</>,
        }
      ]
    },
    {
      titulo: "Pressão dos testes",
      imagem: "/imgs/modulo5/resumo/resumo4.png",
      descricao: (
  <>
  Imagina que estás a sentir-te <strong>stressado/a com os testes</strong> e queres muito tirar boas notas. Queres <strong> melhorar a gestão do teu tempo de estudo</strong>, mas não sabes como começar. 
  </>
   ),
      feedback: (
        <>
          <strong>Conversar com um professor</strong> é uma <strong>boa forma</strong> de obter <strong>conselhos práticos</strong> e <strong>realistas</strong> sobre como <strong>melhorar a tua organização</strong> e <strong>gestão do estudo</strong>. Eles podem sugerir <strong>métodos de estudo eficientes</strong> e <strong>estratégias de gestão do tempo</strong>.
        </>
      ),
      opcoes: [
        {
          texto: <>Procurava um psicólogo para me ajudar na organização e gestão do estudo.</>,
        },
        {
          texto: <>Falava com um professor para obter conselhos sobre como melhorar a gestão do estudo.</>,
        },
        {
          texto: <>Falava com os meus amigos sobre como gerem o estudo e que estratégias utilizam ou pedia ajuda a familiares para me ajudarem na gestão do estudo.</>,
        },
        {
          texto: <>Usava técnicas de gestão de estudo que se encontram na internet.</>,
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
              <div className="text-center">
                <h2 className="text-center fw-bold mb-4" style={{ color: "#234970" }}>Atividade Resumo</h2>
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <p className="lead">
                      <strong>Sê muito bem-vindo/a à atividade resumo do Módulo 5 – Reviravolta em Rede!</strong> <br></br><br></br>
                      O objetivo desta atividade é consolidar os conteúdos que exploramos ao longo do módulo.<br></br><br></br>
                      Nesta atividade, serás apresentado/a a <strong>diversas situações do dia a dia</strong>. O teu objetivo é <strong>ler cada situação e escolher</strong>, entre as opções dadas, a <strong>melhor forma de procurar ajuda</strong> nessa situação.<br></br><br></br>
                      Não quer dizer que as outras não possam ser também boas opções, mas <strong> uma delas será a que melhor responde a cada situação </strong> e o teu objetivo é <strong>encontrar essa melhor opção. </strong> <br></br>
                    </p>
                    <div className="text-center">
                      <button
                        className="custom-btn-turquoise mt-3 px-4 py-2" onClick={avancarPagina}
                      >
                        <i className="bi bi-play-fill me-2"></i>Vamos a isto?
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PÁGINAS 1-4 - CENÁRIOS QUIZ */}
            {pagina >= 1 && pagina <= 4 && (
              <div className="text-center">
                <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>
                  {cenarios[pagina - 1].titulo}
                </h4>

                {/* Descrição do cenário */}
                  <p className="lead mb-4">
                    {cenarios[pagina - 1].descricao}
                  </p>

                <div className="mb-4">
                  <img
                    src={cenarios[pagina - 1].imagem}
                    alt={`Cenário ${pagina}`}
                    className="img-fluid rounded shadow-sm"
                    style={{ width: "100%", maxWidth: "500px", height: "auto", objectFit: "cover" }}
                  />
                </div>

                <div className="mb-4">
                  <p className="fw-semibold mb-4" style={{ color: "#234970" }}>
                    Que tipo de ajuda escolherias nesta situação?
                  </p>
                </div>

                {/* Opções */}
                <div className="d-flex flex-column gap-3">
                  {cenarios[pagina - 1].opcoes.map((opcao, index) => {
                    const isSelected = opcaoSelecionada === index;
                    const isDisabled = opcaoSelecionada !== null && !isSelected;

                    return (
                      <div
                      key={index}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && !isDisabled && escolherOpcao(index, cenarios[pagina - 1].feedback)}
                      onClick={() => !isDisabled && escolherOpcao(index, cenarios[pagina - 1].feedback)}
                      onMouseEnter={() => !isDisabled && setHoverIndex(index)}
                      onMouseLeave={() => !isDisabled && setHoverIndex(null)}
                      className="p-3 rounded"
                      style={{
                        backgroundColor: isSelected ? '#99CBC8' : '#ffffff',
                        color: isSelected ? 'white' : '#234970',
                        border: '1px solid #99CBC8',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <p className="mb-0 fw-medium text-start">{opcao.texto}</p>
                    </div>
                    );
                  })}
                    {showWarning && (
                      <div className="alert alert-warning mt-3 text-center" role="alert">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        Por favor, seleciona uma opção antes de continuar.
                      </div>
                    )}

                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    className="custom-btn-pink" onClick={retrocederPagina}
                  >
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <button
                    className="custom-btn-turquoise" onClick={avancarPagina}
                  >
                    {pagina === 4 ? "Conclusão" : "Próximo"} <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            )}

            {/* PÁGINA 5 - CONCLUSÃO */}
            {pagina === 5 && (
              <>
                <h4 className="text-center fw-bold mb-4" style={{ color: "#234970" }}>
                  Conclusão da Atividade
                </h4>
                <div>
                  <p className="lead">
                    Como pudeste perceber, existem <strong>várias formas de procurar ajuda</strong>, e a <strong>escolha</strong> de qual delas é mais adequada depende da <strong>frequência</strong> e do <strong>impacto</strong> que tem na tua vida.<br></br><br></br>

                    Por vezes, a ajuda pode vir de quem está <strong>perto de ti</strong>, como <strong>amigos</strong>, <strong>família</strong> ou <strong>professores</strong>, que podem oferecer <strong>conselhos</strong> ou até mesmo algumas <strong>dicas</strong> para melhorar a situação.<br></br><br></br>

                    Noutras ocasiões, especialmente quando as coisas se tornam <strong>mais difíceis de lidar</strong>, <strong>recorrer a um profissional</strong>, como um <strong>psicólogo</strong>, pode ser <strong>fundamental</strong> para encontrar <strong>estratégias eficazes e personalizadas</strong>. E na maioria das vezes estas ajudas podem <strong> coexistir</strong>. <br></br><br></br>

                    Lembra-te que ao  <strong> procurar ajuda </strong>demonstras a tua capacidade de <strong>reconhecer o que precisas e de dar o primeiro passo para o teu bem-estar</strong>. Isso é algo valioso e corajoso, pois, por vezes, reconhecer que precisamos de ajuda é <strong>o maior e mais difícil passo.</strong> <br></br><br></br> 
                    
                    <strong>Cuida de ti</strong> com coragem e continua a <strong>valorizar o teu bem-estar</strong>!
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
          <Modal.Title className="modal-title w-100 text-center" style={{ fontWeight: "600" }}>
            A melhor escolha!
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="modal-body pt-4 ps-4 pe-4">
          <p className="lead text-start">{mensagemPopUp}</p>
        </Modal.Body>
        
        <Modal.Footer
          className="modal-footer"
                style={{
                  borderTop: "none",
                  backgroundColor: "#F5FDFC",
                  justifyContent: "center",
                }}
        >
          <Button className="custom-btn-complete"
            onClick={() => {
                setModalAberto(false);
                setPagina((prev) => prev + 1); 
                setOpcaoSelecionada(null);
                setHoverIndex(null);
              }}
            style={{
                    backgroundColor: "#234970",
                    border: "none",
                    color: "white",
                    borderRadius: "20px",
                    padding: "0.5rem 1.5rem",
                    fontWeight: "500",
                    boxShadow: "none",
                    outline: "none"
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