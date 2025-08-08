import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import modulos from '../../../data/modulos';
import AtividadeProgressao from '../atividadeProgressao';
import { Modal, Button } from 'react-bootstrap';

const AtividadeResumoModulo2 = () => {
    const { id: moduloId } = useParams();
    const { updateUserData } = useContext(UserContext);
    const [pagina, setPagina] = useState(0);
    const [mensagemPopUp, setMensagemPopUp] = useState("");
    const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [showWarning, setShowWarning] = useState(false);
    const modulo = modulos.find((m) => m.id === moduloId);
    const atividade = modulo?.atividades.find(a => a.url === "atividade-resumo");

    const cenarios = [
        {
            imagemBase: "/imgs/modulo2/resumo/resumo2_1.png",
            imagemMao: "/imgs/modulo2/resumo/resumo2_1_mao.png",
            opcoes: [
                <> Ignorava ou afastava-me da pessoa.</>,
                <>Aproximava-me e oferecia companhia.</>
            ],
            explicacao: (
            <>
            O estigma pode levar as pessoas a isolarem-se, acreditando que não são capazes ou que não merecem receber amizade e apoio. É fundamental mostrarmos empatia e compreensão. Ao apoiar alguém que lida com dificuldades resultantes da ansiedade, estás a ajudar a combater o estigma e a criar um ambiente seguro e acolhedor
            </>
            )
        },
        {
            imagemBase: "/imgs/modulo2/resumo/resumo2_2.png",
            imagemMao: "/imgs/modulo2/resumo/resumo2_2_mao.png",
            opcoes: [
                <>Concordava com os comentários.</>,
                <>Escutava, defendia e mostrava que entendia o lado do colega.</>
            ],
            explicacao: (
                <>
                Olhares de julgamento podem intensificar a sensação de vergonha nas pessoas que lida com dificuldades resultantes da ansiedade. Responder com empatia e compreensão ajuda a reduzir o estigma e fortalece as relações com as outras pessoas.
                </>
            )
        },
        {
            imagemBase: "/imgs/modulo2/resumo/resumo2_3.png",
            imagemMao: "/imgs/modulo2/resumo/resumo2_3_mao.png",
            opcoes: [
                <>Ria, comentava com colegas, não leva a apresentação a sério.</>,
                <>Encorajava, sorria de forma acolhedora, apoiava verbalmente.</>
            ],
            explicacao: (
                <>
                    O estigma pode fazer com que situações que já são desafiadoras se tornem ainda mais difíceis. O medo do julgamento pode aumentar a ansiedade, fazendo com que a pessoa se sinta ainda mais insegura. Ao oferecer empatia, com palavras de incentivo ou compreensão, ajudamos a criar um ambiente onde todos se sintam confortáveis para se expressar e participar.
                    </>
            )
        },
        {
            imagemBase: "/imgs/modulo2/resumo/resumo2_4.png",
            imagemMao: "/imgs/modulo2/resumo/resumo2_4_mao.png",
            opcoes: [
                <>Ignorava o que está a acontecer, fazia scroll, ou até concordava com os comentários.</>,
                <>Denunciava os comentários e lembrava-lhe que não está sozinho e que há pessoas que se importam com ele.</>
            ],
            explicacao: (
                <>
                O estigma nas redes sociais pode amplificar o isolamento. Comentários negativos podem fazer com que uma pessoa se sinta ainda mais sozinha nas suas dificuldades. Todos devemos sentir-nos seguros para partilhar as nossas experiências, sem medo de sermos julgados ou ridicularizados — seja presencialmente ou através de um ecrã.
                </>
            )

        }
    ];

   const avancar = () => {
        // Bloqueia avanço se não tiver escolhido opção nas páginas de cenários
        if (pagina > 0 && pagina <= cenarios.length && opcaoSelecionada === null) {
            setShowWarning(true);
            setTimeout(() => setShowWarning(false), 3000);
            return;
        }

        setPagina(prev => prev + 1);
        setMostrarOpcoes(false);
        setOpcaoSelecionada(null);
        };

    const retroceder = () => {
        setPagina(prev => prev - 1);
        setMostrarOpcoes(false);
        setOpcaoSelecionada(null);
    };

    const escolherOpcao = (index) => {
        const explicacao = cenarios[pagina - 1].explicacao;
        setMensagemPopUp(explicacao);
        setOpcaoSelecionada(index);
        setModalShow(true);
    };



    const progresso = Math.round((pagina / (cenarios.length + 1)) * 100);

    return (
        <div className="container-fluid vh-100 p-0 font-poppins">
            <Navbar />
            <div className="row h-100 m-0">
                <Sidebar />
                <div className="col px-4 py-4" style={{ backgroundColor: "#FBF9F9" }}>
                    <div className="container p-5 bg-white rounded shadow-sm text-center">
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
                            <>
                            <div className="text-center"></div>
                            <h4 className="text-center fw-bold" style={{ color: "#234970" }}> {atividade?.titulo || "Atividade Resumo"}
                            </h4>
                                <p className="lead">
                                    <strong>Sê muito bem-vindo/a à atividade resumo do Módulo 2 – 'Desmistificar a Ansiedade!'</strong>
                                    <br /><br />
                                    O objetivo desta atividade é <strong>consolidar os conteúdos que explorámos ao longo do módulo</strong>.
                                    <br /><br />
                                    Encontrarás diferentes <strong>cenários</strong> que mostram como o <strong>estigma pode ter impacto nas pessoas</strong>.
                                    <br /><br />
                                    Em cada cenário, vais ver <strong>balões de fala</strong> com comentários <strong>estigmatizantes</strong> dirigidos a adolescentes.
                                    <br /><br />
                                    O teu desafio é clicar no ícone e escolher como reagir: <strong>reforçar o estigma</strong> ou <strong>responder com empatia</strong> a cada um dos cenários.
                                    <br /><br />
                                    Cada escolha será seguida de uma explicação que te ajudará a refletir sobre o impacto das tuas escolhas.
                                    <br /><br />
                                </p>
                                <button className="custom-btn-turquoise mt-3 px-4 py-2" onClick={() => setPagina(1)}>
                                    <i className="bi bi-play-fill me-2"></i>Vamos a isto?
                                </button>
                            </>
                        )}

                        {pagina > 0 && pagina <= cenarios.length && (
                            <>
                                <div className="text-center"></div>
                                <h4 className="text-center fw-bold" style={{ color: "#234970" }}>
                                Vê a imagem com atenção e carrega no ícone. Imagina que estás lá a ver tudo — como reagirias ao ver alguém a ser alvo desses comentários?
                                </h4>

                                <div className="d-flex flex-column align-items-center mb-4" style={{ width: "100%" }}>
                                    {/* Imagem principal (topo) */}
                                    <img
                                        src={cenarios[pagina - 1].imagemBase}
                                        alt={`Cenário ${pagina}`}
                                        className="img-fluid"
                                        style={{
                                            maxWidth: "100%",
                                            objectFit: "contain",
                                            borderTopLeftRadius: "1rem",
                                            borderTopRightRadius: "1rem",
                                            borderBottomLeftRadius: 0,
                                            borderBottomRightRadius: 0,
                                        }}
                                    />

                                    {/* Imagem da mão (base) */}
                                    <img
                                        src={cenarios[pagina - 1].imagemMao}
                                        alt="Ícone da mão"
                                        onClick={() => setMostrarOpcoes(true)}
                                        className="img-fluid"
                                        style={{
                                            maxWidth: "100%",
                                            objectFit: "contain",
                                            borderTopLeftRadius: 0,
                                            borderTopRightRadius: 0,
                                            borderBottomLeftRadius: "1rem",
                                            borderBottomRightRadius: "1rem",
                                            cursor: "pointer"
                                        }}
                                    />
                                </div>

                                {mostrarOpcoes && (
                                    <div className="d-flex flex-column gap-3">
                                        {cenarios[pagina - 1].opcoes.map((opcao, index) => {
                                            const isSelected = opcaoSelecionada === index;
                                            const isHovered = hoverIndex === index;
                                            return (
                                                <div
                                                    key={index}
                                                    onClick={() => escolherOpcao(index)}
                                                    onMouseEnter={() => setHoverIndex(index)}
                                                    onMouseLeave={() => setHoverIndex(null)}
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
                                                                : '#000000',
                                                        border: isSelected
                                                            ? '1px solid #99CBC8'
                                                            : isHovered
                                                                ? '1px solid #5AAAA5'
                                                                : '1px solid #99CBC8',
                                                        borderRadius: '10px',
                                                        cursor: 'pointer',
                                                        fontWeight: isSelected ? '200' : 'normal',
                                                        transition: 'all 0.3s ease',
                                                    }}
                                                >
                                                    {opcao}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        )}
                        
                        {showWarning && (
                        <div className="alert alert-warning mt-3 text-center" role="alert">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            Por favor, seleciona uma opção antes de continuar.
                        </div>
                        )}

                         {pagina === cenarios.length + 1 && (
                            <>
                                 <h4 className="text-center fw-bold mb-4"style={{ color: "#234970" }}>Conclusão da Atividade</h4>
                                <div className="text-start lead">
                                    <p>Durante esta atividade, exploraste diferentes situações do dia a dia em que o <strong>estigma</strong> em relação à <strong>ansiedade</strong> pode surgir.
                                        Percebeste como <strong>palavras</strong>, <strong>olhares</strong> ou a <strong>ausência de apoio</strong> podem afetar profundamente quem vive com
                                        ansiedade — e também como um gesto de <strong>empatia</strong> pode transformar uma situação difícil num
                                        momento de <strong>acolhimento</strong> e <strong>compreensão</strong>.</p>

                                    <p><strong>A ansiedade não é uma falha, nem uma fraqueza</strong>. É uma resposta <strong>humana</strong>, <strong>natural</strong>, e todos merecem ser
                                        tratados com <strong>respeito</strong>, <strong>apoio</strong> e <strong>empatia</strong>.</p>

                                    <p><strong>Lembra-te:</strong> combater o estigma começa com <strong>pequenas ações</strong> — e começa <strong>contigo</strong>.</p>
                                </div>

                                <div className="d-flex justify-content-between mt-4">
                                    <button className="custom-btn-pink" onClick={retroceder}>
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

                        <div className="d-flex justify-content-between mt-4">
                            {pagina > 0 && pagina <= cenarios.length && (
                                <button
                                    className="custom-btn-pink" onClick={retroceder}
                                >
                                    <i className="bi bi-arrow-left me-2"></i> Anterior
                                </button>
                            )}
                            {pagina > 0 && pagina <= cenarios.length && (
                                <button
                                    className="custom-btn-turquoise" onClick={avancar}
                                    disabled={opcaoSelecionada === null}
                                >
                                    {pagina === cenarios.length ? "Conclusão" : "Próximo"} <i className="bi bi-arrow-right ms-2"></i>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
                <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                centered
                style={{
                    borderRadius: "12px",
                }}
                >
                <Modal.Header
                    closeButton
                    style={{
                    backgroundColor: "#99CBC8",
                    borderBottom: "none",
                    color: "#fff",
                    padding: "1rem 1.5rem",
                    }}
                >
                    <Modal.Title
                    style={{
                        fontWeight: "600",
                        fontSize: "1.2rem",
                        letterSpacing: "0.5px",
                        width: "100%",
                        textAlign: "center",
                    }}
                    >
                    Resultado da tua escolha
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body
                    className="text-start"
                    style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.6",
                    color: "#234970",
                    padding: "1.5rem",
                    }}
                >
                    {mensagemPopUp}
                </Modal.Body>

                <Modal.Footer
                    style={{
                    borderTop: "none",
                    backgroundColor: "#F5FDFC",
                    justifyContent: "center",
                    padding: "1rem",
                    }}
                >
                    <Button
                    onClick={() => setModalShow(false)}
                    style={{
                        backgroundColor: "#234970",
                        borderColor: "#234970",
                        borderRadius: "20px",
                        padding: "0.5rem 1.5rem",
                        fontWeight: "500",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#1b3a57")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#234970")}
                    >
                    Próximo
                    </Button>
                </Modal.Footer>
                </Modal>
        </div>
    );
};

export default AtividadeResumoModulo2;