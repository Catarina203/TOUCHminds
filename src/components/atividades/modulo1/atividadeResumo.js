import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import modulos from '../../../data/modulos';
import AtividadeProgressao from '../atividadeProgressao';

const AtividadeResumo = () => {
  const [pagina, setPagina] = useState(0);
  const [hashtags, setHashtags] = useState(Array(12).fill(""));
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [userChoices, setUserChoices] = useState({
    0: null, // Chegada ao Clube
    1: null, // Durante a primeira atividade
    2: null  // Após a atividade
  });

  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);

  const modulo = modulos.find((m) => m.id === moduloId);
  const atividade = modulo?.atividades.find(a => a.url === "atividade-resumo");

  useEffect(() => {
    setShowWarning(false);
  }, [pagina]);

  const avancarPagina = () => {
    if (pagina >= 2 && pagina <= 4) {
      const questionIndex = pagina - 2;
      if (!userChoices[questionIndex]) {
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000); 
        return;
      }
    }
    setPagina((prev) => prev + 1);
  };

  const [hoverIndex, setHoverIndex] = useState(null); 

  const retrocederPagina = () => setPagina((prev) => prev - 1);

  const progresso = Math.round((pagina / 7) * 100);

  const handleHashtagChange = (index, value) => {
    const newHashtags = [...hashtags];
    newHashtags[index] = value;
    setHashtags(newHashtags);
  };

  const handleOptionClick = ( option, questionIndex) => {
    setModalContent(option);
    setShowModal(true);
    setSelectedOption(option.text.substring(0, 20)); 

    setUserChoices(prev => {
      const newChoices = {
        ...prev,
        [questionIndex]: option
      };
      return newChoices;
    });

    if (showWarning) {
      setShowWarning(false);
    }
  };

 const closeModal = () => {
  setShowModal(false);
  setPagina((prev) => prev + 1);
};

  const quizPages = [
    {
      title: "Chegada ao Clube",
      description: "A Sara vê os outros colegas a conversar em pequenos grupos e sente-se dividida entre aproximar-se ou ficar ali sozinha.", 
      questionImage: "/imgs/modulo1/resumo/resumo_1.png",
      options: [
        {
          text: "Aproximava-me do grupo e iniciava uma conversa, mesmo sentindo algum desconforto.",
          feedback: "A Sara respira fundo e, com o coração acelerado, aproxima-se de um grupo que está a falar sobre o teatro. No início, a voz sai um pouco trémula, mas aos poucos vai-se sentindo mais confortável. Os outros colegas sorriem e fazem perguntas, o que a faz sentir-se mais integrada. A ansiedade começa a diminuir conforme vai participando na conversa.",
          summary: "Sara decide aproximar-se de um grupo e inicia uma conversa. Com o tempo, sente-se mais confortável.",
          summaryImage: "/imgs/modulo1/resumo/resumo_4_1.png"
        },
        {
          text: "Ficava próxima da porta, a observar os outros antes de decidir onde me sentar.",
          feedback: "A Sara opta por não se apressar. Fica encostada à parede, observando e ouvindo as conversas, tentando perceber o ambiente antes de se juntar a alguém. Isso permite-lhe acalmar-se um pouco, mas também a faz sentir-se mais distante dos colegas que já estão a socializar.",
          summary: "Sara fica próxima da porta, observando. Sente-se mais calma, mas um pouco distante dos colegas.",
          summaryImage: "/imgs/modulo1/resumo/resumo_4_2.png"
        },
        {
          text: "Ficava num canto, a fingir que estava no telemóvel para parecer ocupada.",
          feedback: "A Sara pega no telemóvel e finge estar a enviar mensagens, evitando olhar para os colegas. Isso diminui temporariamente a ansiedade, mas não a ajuda a integrar-se no grupo. Conforme os minutos passam, começa a sentir-se mais isolada, como se estivesse a perder a oportunidade de se relacionar com os outros.",
          summary: "Sara finge estar ocupada no telemóvel, o que diminui a ansiedade temporariamente, mas faz sentir-se mais isolada.",
          summaryImage: "/imgs/modulo1/resumo/resumo_4_3.png"
        }
      ]
    },
    {
      title: "Durante a Primeira Atividade",
      description: "A primeira atividade do clube de teatro é uma improvisação no palco. A Sara é chamada para participar e sente o coração a bater ainda mais rápido.",
      questionImage: "/imgs/modulo1/resumo/resumo_2.png",
      options: [
        {
          text: "Aceitava o desafio e participava, mesmo com a voz um pouco trémula.",
          feedback: "Com a respiração acelerada, a Sara decide tentar. Sobe ao palco com as mãos a tremer e começa a improvisar. No início, sente-se inquieta, mas à medida que continua, nota que os colegas estão a prestar atenção com curiosidade e não com julgamento. A ansiedade começa a diminuir à medida que se envolve mais com a atividade.",
          summary: "Sara aceita o desafio da improvisação. No início, está ansiosa, mas à medida que continua a ansiedade diminui.",
          summaryImage: "/imgs/modulo1/resumo/resumo_4_4.png"
        },
        {
          text: "Sugeria começar com uma parte mais pequena e deixava a improvisação completa para outra pessoa.",
          feedback: "A Sara sente que não está preparada para fazer uma improvisação longa e decide sugerir que o papel seja dividido. Participa num pequeno segmento, o que reduz a ansiedade, mas também a impede que se envolva totalmente na atividade, deixando alguma ansiedade presente.",
          summary: "Sara sugere uma intervenção mais pequena. Participa um pouco, reduzindo a pressão, mas não se envolve totalmente, deixando alguma ansiedade presente.",
          summaryImage: "/imgs/modulo1/resumo/resumo_4_5.png"
        },
        {
          text: "Recusava educadamente, dizendo que preferia observar os outros por enquanto.",
          feedback: "A Sara diz ao professor que não se sente pronta para participar e pede para observar. Sente um alívio momentâneo, mas à medida que vê os outros a participar, surge um sentimento de culpa por não ter tentado, o que faz com que a ansiedade e a frustração aumentem ligeiramente.",
          summary: "Sara recusa participar e prefere observar. Sente alívio momentâneo, mas depois sente culpa e frustração por não ter tentado.",
          summaryImage: "/imgs/modulo1/resumo/resumo_4_6.png"
        }
      ]
    },
    {
      title: "Após a Primeira Atividade",
      description: "O encontro do clube termina, e alguns colegas sugerem ensaiar juntos fora do clube para se preparem para o próximo encontro. A Sara sente uma mistura de ansiedade, alívio, e vontade de se aproximar dos colegas.",
      questionImage: "/imgs/modulo1/resumo/resumo_3.png",
      options: [
        {
          text: "Aceitava e combinava ensaiar com eles." ,
          feedback: "Apesar da ansiedade, a Sara decide aceitar o convite. Durante o ensaio, começa a sentir-se mais à vontade, fazendo novas amizades e percebendo que os outros também têm os seus momentos de ansiedade. A ansiedade diminui e sente-se mais integrada.",
          summary: "Sara aceita ensaiar com os colegas. Aos poucos, faz amizades e sente-se mais à vontade e integrada no grupo.",
          summaryImage: "/imgs/modulo1/resumo/resumo_4_7.png"
        },
        {
          text: "Dizia que estava com um pouco de pressa, mas que ia tentar aparecer no próximo ensaio.",
          feedback: "A Sara agradece o convite, mas diz que tem de ficar para uma próxima porque agora precisa de ir para casa. Embora mantenha uma porta aberta para futuras interações, sente que perdeu uma oportunidade de se aproximar do grupo, e a ansiedade por não ter participado permanece.",
          summary: "Sara agradece, mas diz que está ocupada e promete tentar na próxima vez. Sente que perdeu uma oportunidade de aproximar dos colegas.",
          summaryImage: "/imgs/modulo1/resumo/resumo_4_8.png"
        },
        {
          text: "Recusava e ia para casa rapidamente." ,
          feedback: "A Sara diz que não vai poder e sai rapidamente, sentindo um alívio imediato por não ter de interagir mais naquele dia. No entanto, ao chegar a casa, fica com a sensação de que se afastou ainda mais do grupo e teme que a próxima aula seja ainda mais desafiante.",
          summary: "Sara recusa e vai para casa rapidamente, sentindo alívio imediato. No entanto, depois, sente que se afastou ainda mais do grupo.",
          summaryImage: "/imgs/modulo1/resumo/resumo_4_9.png"
        }
      ]
    }
  ];

  // Modal component
  const Modal = ({ show, onClose, content }) => {
    if (!show) return null;

    return (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
         }}
                >
              <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                        
              <div
                className="modal-header"
                style={{
                  backgroundColor: "#99CBC8",
                  borderBottom: "none",
                  color: "#fff",
                }}
              >
                <h5
                      className="modal-title w-100 text-center"
                      style={{ fontWeight: "600" }}
                    >
                     Impacto da tua escolha! 
                    </h5>
                <button
                  type="button"
                  className="btn-close"
                  style={{ filter: "invert(1)" }}
                  aria-label="Close"
                  onClick={onClose}
                ></button>
                </div>
          
              <div className="modal-body pt-4 ps-4 pe-4">
                <p className="lead text-start">{content.feedback}</p>
                </div>
              
              <div
                className="modal-footer"
                style={{
                  borderTop: "none",
                  backgroundColor: "#F5FDFC",
                  justifyContent: "center",
                }}
              >
               <button
                  type="button"
                  onClick={onClose}
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
                  {pagina === 4 ? 'Resumo' : 'Próximo'}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
  };


  return (
    <div className="container-fluid vh-100 p-0 font-poppins">
      <Navbar />
      <div className="row h-100 m-0">
        <Sidebar />
        <div className="col px-4 py-4" style={{ backgroundColor: "#FBF9F9" }}>
          <div className="container p-5 bg-white rounded shadow-sm">
            <style>{`
              .font-poppins, 
              .font-poppins * {
                font-family: 'Poppins', sans-serif !important;
              }

              .font-poppins input::placeholder,
              .font-poppins textarea::placeholder {
                font-family: 'Poppins', sans-serif !important;
              }
            `}</style>
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


            {/* INTRODUÇÃO */}
            {pagina === 0 && (
              <div className="text-center">
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>{atividade?.titulo || "Ansiedade: Aliada ou Empecilho?"}</h2>
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <p className="lead">
                      <strong>Sê muito bem-vindo/a à atividade resumo do Módulo 1</strong> – <strong>"Ansiedade NÃO é Bicho Papão!"</strong>. <br></br><br></br> 
                      O <strong>objetivo</strong> desta atividade é <strong>consolidar</strong> os conteúdos que explorámos ao longo do módulo. <br></br><br></br>
                      Imagina que <strong>és tu</strong> que estás na situação que te vou apresentar, e <strong>seleciona</strong> a opção que melhor representa a forma
                      como te irias <strong>comportar</strong> nessa situação.<br></br><br></br>
                      Cada escolha representará um <strong>comportamento</strong> e influenciará como a personagem lida com a ansiedade e se relaciona com os outros.<br></br><br></br>
                      Esta atividade é uma oportunidade para <strong>refletires</strong> sobre como os teus <strong>comportamentos e escolhas</strong> podem moldar as tuas <strong>experiências</strong> em momentos de ansiedade e em interações sociais.
                    </p>
                    <div className="text-center">
                      <button className="custom-btn-turquoise mt-3 px-4 py-2" onClick={avancarPagina}>
                        <i className="bi bi-play-fill me-2"></i>Vamos a isto?
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

           {pagina === 1 && (
            <div className="text-center">
              <h4 className="text-center fw-bold mb-4" style={{ color: "#234970" }}>
                O Primeiro Dia no Clube de Teatro
              </h4>

              <p className="lead">
                A Sara está a participar no primeiro dia do clube de teatro. Sente-se ansiosa por estar num ambiente novo,
                sem conhecer ninguém, e preocupada com a possibilidade de ter de falar em público. Ao entrar na sala,
                sente o coração acelerado e as mãos suadas, com pensamentos como: "Será que vou fazer amigos?
                E se me enganar durante as atividades?".
              </p>

              <img
                src="/imgs/modulo1/resumo/resumo_0.png"
                alt="O Primeiro Dia no Clube de Teatro"
                className="img-fluid mb-4"
                style={{
                      width: "100%",        
                      maxWidth: "500px",    
                      height: "auto",       
                      objectFit: "cover",   
                    }}
                    />

              <div className="d-flex justify-content-between">
                <button className="custom-btn-pink" onClick={retrocederPagina}>
                  <i className="bi bi-arrow-left me-2"></i>Anterior
                </button>
                <button className="custom-btn-turquoise" onClick={avancarPagina}>
                  Próximo<i className="bi bi-arrow-right ms-2"></i>
                </button>
              </div>
            </div>
          )}

            {pagina >= 2 && pagina <= 4 && (
                    <>
                   <h4 className="text-center fw-bold" style={{ color: "#234970" }}>
                    {quizPages[pagina - 2].title}
                  </h4>

                  <p className="lead mb-4">
                    {quizPages[pagina - 2].description || "Imagina-te nesta situação... O que farias?"}
                  </p>

                    <p className="fw-semibold mb-4" style={{ color: "#234970" }}>
                      Imagina que tu és a Sara nesta situação. O que farias? Escolhe apenas uma das seguintes opções:
                    </p>

                  <div className="text-center mb-4">
                    <img
                    src={quizPages[pagina - 2].questionImage}
                    alt={`Imagem da pergunta ${pagina - 1}`}
                    className="img-fluid"
                    style={{
                      width: "100%",        
                      maxWidth: "500px",    
                      height: "auto",       
                      objectFit: "cover",   
                    }}
                    />
                  </div>

                  <div className="d-flex flex-column gap-3">
                    {quizPages[pagina - 2].options.map((option, index) => {
                      const isSelected =
                        userChoices[pagina - 2] &&
                        userChoices[pagina - 2].text === option.text;

                      return (
                        <div
                          key={index}
                          onClick={() => handleOptionClick(option, pagina - 2)}
                          className="p-3 rounded"
                          style={{
                            backgroundColor: isSelected ? '#99CBC8' : '#ffffff',
                            color: isSelected ? 'white' : '#234970',
                            border: '1px solid #99CBC8',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <p className="mb-0 fw-medium">{option.text}</p>
                        </div>
                      );
                    })}
                  </div>

                  {showWarning && (
                    <div className="alert alert-warning mt-3 text-center" role="alert">
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      Por favor, seleciona uma opção antes de continuar.
                    </div>
                  )}

                  <div className="d-flex justify-content-between mt-4">
                    <button className="custom-btn-pink" onClick={retrocederPagina}>
                      <i className="bi bi-arrow-left me-2"></i>Anterior
                    </button>
                      {pagina === 4 ? (
                        <button className="custom-btn-turquoise" onClick={avancarPagina}>
                          Resumo<i className="bi bi-arrow-right ms-2"></i>
                        </button>
                      ) : (
                        <button className="custom-btn-turquoise" onClick={avancarPagina}>
                          Próximo<i className="bi bi-arrow-right ms-2"></i>
                        </button>
                      )}
                    </div>
                    </>
                  )}

            {pagina === 5 && (
              <>
                <h4 className="text-center fw-bold" style={{ color: "#234970" }}>Tabela Resumo</h4>
                <div className="table-responsive">
                  <table
                      className="table align-middle text-center"
                      style={{
                        borderCollapse: "collapse",
                        backgroundColor: "#fff"
                      }}
                    >
                    <thead>
                    <tr>
                      <th style={{
                        width: "20%",
                        backgroundColor: "#E7C8C2",
                        color: "#234970",
                        fontWeight: "bold",
                        border: "1px solid #99CBC8",
                        textAlign: "center"
                      }}>
                        Cenário
                      </th>
                      <th style={{
                        width: "26.6%",
                        backgroundColor: "#E7C8C2",
                        color: "#234970",
                        fontWeight: "bold",
                        border: "1px solid #99CBC8",
                        textAlign: "center"
                      }}>
                        Opção A
                      </th>
                      <th style={{
                        width: "26.6%",
                        backgroundColor: "#E7C8C2",
                        color: "#234970",
                        fontWeight: "bold",
                        border: "1px solid #99CBC8",
                        textAlign: "center"
                      }}>
                        Opção B
                      </th>
                      <th style={{
                        width: "26.6%",
                        backgroundColor: "#E7C8C2",
                        color: "#234970",
                        fontWeight: "bold",
                        border: "1px solid #99CBC8",
                        textAlign: "center"
                      }}>
                        Opção C
                      </th>
                    </tr>
                  </thead>
                    
                    <tbody>
                      {quizPages.map((page, idx) => (
                        <tr key={idx}>
                          <td
                            style={{
                              backgroundColor: "#E7C8C2", // Aplica o fundo rosa claro
                              color: "#234970",
                              fontWeight: "bold",
                              border: "1px solid #99CBC8",
                              verticalAlign: "middle",
                              textAlign: "center",
                            }}
                          >
                            {page.title}
                          </td>
                          {page.options.map((option, optIdx) => {
                            const isSelected = userChoices[idx] && userChoices[idx].text === option.text;

                            return (
                              <td
                                key={optIdx}
                                style={{
                                  backgroundColor: "white",
                                  color: "#234970",
                                  border: "1px solid #99CBC8",
                                  verticalAlign: "middle",
                                  textAlign: "left",
                                  padding: "8px",
                                }}
                              >
                                {isSelected && (
                                  <div
                                    style={{
                                      textDecoration: "underline",
                                      fontWeight: "bold",
                                      marginBottom: "5px",
                                      textAlign: "center",
                                      color: "#234970",
                                    }}
                                  >
                                    A tua escolha:
                                  </div>
                                )}
                                {option.summaryImage && (
                                   <img
                                    src={option.summaryImage}
                                    alt="Impacto da tua escolha!"
                                    style={{
                                      width: "280px",      
                                      height: "auto",     
                                      objectFit: "contain",
                                      display: "block",
                                      margin: "0 auto 8px",
                                    }}
                                  />
                                )}
                                {option.summary}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-between">
                  <button className="custom-btn-pink" onClick={retrocederPagina}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <button className="custom-btn-turquoise" onClick={avancarPagina}>
                    Conclusão<i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </>
            )}

            {pagina === 6 && (
              <>
                <h4 className="text-center fw-bold mb-4"style={{ color: "#234970" }}>Conclusão da Atividade</h4>
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <p className="lead">
                      Assim como a Sara, <strong>todos nós</strong> tomamos decisões todos os dias que <strong>moldam</strong> as nossas experiências e as nossas interações com os outros. <br /><br /> 
                      Mesmo quando estamos ansiosos, as <strong>escolhas</strong> que fazemos têm impacto, tanto em nós como nos outros. <br /><br />
                      <strong>Evitar</strong> uma situação pode aliviar momentaneamente, mas a longo prazo torna mais difícil enfrentá-la. <br /><br />
                      <strong>Enfrentar</strong> o desconforto, embora seja difícil no momento, pode não só ajudar-nos a criar relações novas, como também a <strong>reduzir a ansiedade</strong> ao longo do tempo. <br /><br />
                      Ao enfrentar os desafios e praticar novas formas de agir, poderás <strong>fortalecer</strong> as tuas relações e <strong>melhorar</strong> a forma como te vês e te sentes contigo mesmo/a. <br /><br />
                      </p>

                    <div className="d-flex justify-content-between mt-4">
                      <button className="custom-btn-pink" onClick={retrocederPagina}>
                        <i className="bi bi-arrow-left me-2"></i>Anterior
                      </button>
                      <AtividadeProgressao
                        moduloId={moduloId}
                        atividadeIndex={4}
                        updateUserData={updateUserData}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onClose={closeModal}
        content={modalContent}
      />
    </div>
  );
};

export default AtividadeResumo;