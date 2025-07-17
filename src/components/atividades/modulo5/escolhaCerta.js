import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import modulos from "../../../data/modulos";
import AtividadeProgressao from "../atividadeProgressao";

const EscolhaCerta = () => {
    const { id: moduloId } = useParams();
    const { updateUserData } = useContext(UserContext);
    const [pagina, setPagina] = useState(0);
    const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
    const [hoverIndex, setHoverIndex] = useState(null);
    const modulo = modulos.find((m) => m.id === moduloId);

    const atividade = modulo?.atividades.find(a => a.url === "escolha-certa");

    const cenarios = [
        {
            imagem: "/imgs/modulo5/escolhacerta/escolha_certa_1.png",
            opcoes: [
                <><b>Gostar</b> – se achaste útil ou interessante.</>,
                <><b>Partilhar</b> – se conheces alguém que possa precisar.</>,
                <><b>Comentar</b> – se quiseres dizer o que pensaste ou sentiste.</>]
        },
        {
            imagem: "/imgs/modulo5/escolhacerta/escolha_certa_2.png",
            opcoes: [
                <><b>Gostar</b> – se achaste útil ou interessante.</>,
                <><b>Partilhar</b> – se conheces alguém que possa precisar.</>,
                <><b>Comentar</b> – se quiseres dizer o que pensaste ou sentiste.</>]
        },
        {
            imagem: "/imgs/modulo5/escolhacerta/escolha_certa_3.png",
            opcoes: [
                <><b>Gostar</b> – se achaste útil ou interessante.</>,
                <><b>Partilhar</b> – se conheces alguém que possa precisar.</>,
                <><b>Comentar</b> – se quiseres dizer o que pensaste ou sentiste.</>]
        },
        {
            imagem: "/imgs/modulo5/escolhacerta/escolha_certa_4.png",
            opcoes: [
                <><b>Gostar</b> – se achaste útil ou interessante.</>,
                <><b>Partilhar</b> – se conheces alguém que possa precisar.</>,
                <><b>Comentar</b> – se quiseres dizer o que pensaste ou sentiste.</>]
        },
        {
            imagem: "/imgs/modulo5/escolhacerta/escolha_certa_5.png",
            opcoes: [
                <><b>Gostar</b> – se achaste útil ou interessante.</>,
                <><b>Partilhar</b> – se conheces alguém que possa precisar.</>,
                <><b>Comentar</b> – se quiseres dizer o que pensaste ou sentiste.</>]
        },
        {
            imagem: "/imgs/modulo5/escolhacerta/escolha_certa_6.png",
            opcoes: [
                <><b>Gostar</b> – se achaste útil ou interessante.</>,
                <><b>Partilhar</b> – se conheces alguém que possa precisar.</>,
                <><b>Comentar</b> – se quiseres dizer o que pensaste ou sentiste.</>]
        },
        {
            imagem: "/imgs/modulo5/escolhacerta/escolha_certa_7.png",
            opcoes: [
                <><b>Gostar</b> – se achaste útil ou interessante.</>,
                <><b>Partilhar</b> – se conheces alguém que possa precisar.</>,
                <><b>Comentar</b> – se quiseres dizer o que pensaste ou sentiste.</>]
        },
    ];

    const avancar = () => {
        setPagina((prev) => prev + 1);
        setOpcaoSelecionada(null);
    };

    const retroceder = () => {
        setPagina((prev) => prev - 1);
        setOpcaoSelecionada(null);
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
                                style={{
                                    width: `${progresso}%`,
                                    backgroundColor: "#99CBC8",
                                }}
                                aria-valuenow={progresso}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>

                        {/* INTRODUÇÃO */}
                        {pagina === 0 && (
                            <>
                                <h2 className="fw-bold mb-4 text-start" style={{ color: "#234970" }}>
                                    {atividade?.titulo || "Escolha Certa"}
                                </h2>
                                <p className="lead text-start">
                                    {/* Coloca aqui o teu texto de introdução */}
                                    <b>Sê muito bem-vindo ou bem-vinda ao à "Escolha Certa"</b>.<br></br><br></br>

                                    Nesta <b>atividade</b>, vais ver uma sequência de <b>stories</b> com <b>informações</b> sobre os diferentes tipos de <b>ajuda</b> que podes procurar quando
                                    temos <b>dificuldades</b> ou <b>problemas</b> que não estamos a conseguir lidar <b>sozinho/a</b>. <br></br><br></br>

                                    À medida que passas por cada <b>story</b>, <b>reflete</b> sobre o que estás a ler e <b>como isso te faz sentir</b>. Ao final de cada <b>story</b>, vais poder
                                    <b>interagir</b>, escolhendo uma opção que reflete a tua <b>reação</b> ao conteúdo apresentado: <br></br><br></br>
                                    <ul style={{ marginTop: "0px" }}>
                                        <li><b>Gostar</b>: Se achaste <b>interessante</b> ou <b>útil</b>.</li>
                                        <li><b>Partilhar</b>: Se quiseres <b>partilhar</b> com alguém que possa precisar desta <b>informação</b>.</li>
                                        <li><b>Comentar</b>: Se quiseres <b>expressar</b> o que pensaste ou como te <b>sentiste</b>.</li>
                                    </ul>
                                    A ideia é <b>aprender mais</b> sobre como podemos <b>procurar ajuda</b> quando mais precisamos e <b>refletir</b> sobre o <b>impacto</b> dessa informação no nosso <b>bem-estar</b>.
                                </p>
                                <button
                                    className="custom-btn-turquoise mt-3 px-4 py-2"
                                    onClick={() => setPagina(1)}
                                >
                                    <i className="bi bi-play-fill me-2"></i>Vamos começar!
                                </button>
                            </>
                        )}

                        {/* CENÁRIOS */}
                        {pagina > 0 && pagina <= cenarios.length && (
                            <>
                                <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>
                                    Cenário {pagina} de {cenarios.length}
                                </h4>

                                <img
                                    src={cenarios[pagina - 1].imagem}
                                    alt={`Cenário ${pagina}`}
                                    className="img-fluid rounded mb-4"
                                    style={{ maxHeight: "400px", objectFit: "contain" }}
                                />

                                <p className="lead text-start">
                                    Escolhe <b>a interação</b> que melhor mostra <b>a tua reação</b> a este story:
                                </p>

                                <div className="d-flex flex-column gap-3 mb-4">
                                    {cenarios[pagina - 1].opcoes.map((opcao, index) => {
                                        const isSelected = opcaoSelecionada === index;
                                        const isHovered = hoverIndex === index;

                                        return (
                                            <div
                                                key={index}
                                                onClick={() => setOpcaoSelecionada(index)}
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
                            </>
                        )}

                        {/* CONCLUSÃO */}
                        {pagina === cenarios.length + 1 && (
                            <>
                                <h4 className="fw-bold mb-4 text-start" style={{ color: "#234970" }}>
                                    Conclusão da Atividade
                                </h4>
                                <p className="lead text-start">
                                    {/* Coloca aqui o teu texto de conclusão */}
                                    <b>Procurar ajuda é um passo fundamental para o nosso bem-estar emocional</b>.
                                    Todos nós passamos por <b>omentos difíceis</b>, e saber <b>quando</b> e a <b>quem pedir ajuda</b> é essencial para lidar com esses desafios da melhor forma.<br></br><br></br>
                                    É importante lembrar que, quando estamos perante a <b>ansiedade SOS</b>, a <b>ajuda formal</b> é <b>crucial</b>. Os <b>psicólogos</b> são especializados para lidar
                                    com essas questões e podem fornecer o <b>ajuda necessário</b> para que possas <b>compreender</b> e <b>lidar melhor com elas</b>, além de <b>desenvolver estratégias eficazes</b> para o teu <b>bem-estar</b>.<br></br><br></br>
                                    As ajudas semiformais e informais, por outro lado, são <b>valiosas</b> para quando precisas de <b>orientação</b> ou de <b>ajuda emocional imediata</b> de pessoas
                                    próximas a ti. Mas, novamente, em casos de <b>ansiedade SOS persistentes</b>, <b>procurar ajuda profissional</b> deve ser uma <b>prioridade</b>.<br></br><br></br>
                                    Embora as <b>ferramentas de autoajuda</b> (como <b>apps</b>, <b>chats</b> ou <b>sites</b>) possam ser <b>úteis</b>, é necessário ter <b>cuidado</b> ao escolher essas opções. Muitas dessas
                                    plataformas <b>não são construídas por profissionais</b> e podem <b>não ser baseadas em evidências científicas confiáveis</b>. Em momentos mais desafiantes, elas podem servir
                                    como <b>complemento</b>, mas <b>nunca devem substituir</b> a ajuda de profissionais.<br></br><br></br>
                                    <b>Cuidar de ti é o primeiro passo para o teu bem-estar</b>.

                                </p>

                                <div className="d-flex justify-content-between mt-4">
                                    <button className="custom-btn-pink" onClick={retroceder}>
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

                        {/* NAVEGAÇÃO */}
                        <div className="d-flex justify-content-between mt-4">
                            {pagina > 0 && pagina <= cenarios.length && (
                                <button className="custom-btn-pink" onClick={retroceder}>
                                    <i className="bi bi-arrow-left me-2"></i>Anterior
                                </button>
                            )}
                            {pagina > 0 && pagina <= cenarios.length && (
                                <button
                                    className="custom-btn-turquoise"
                                    onClick={avancar}
                                    disabled={opcaoSelecionada === null}
                                >
                                    {pagina === cenarios.length ? "Conclusão" : "Continuar"} <i className="bi bi-arrow-right ms-2"></i>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EscolhaCerta;