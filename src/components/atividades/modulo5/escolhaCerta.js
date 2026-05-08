import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import modulos from "../../../data/modulos";
import AtividadeProgressao from "../atividadeProgressao";
import { db } from "../../../database/database";
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const EscolhaCerta = () => {
    const { id: moduloId } = useParams();
    const { updateUserData } = useContext(UserContext);
    const [pagina, setPagina] = useState(0);
    const [, setOpcaoSelecionada] = useState(null);
    const modulo = modulos.find((m) => m.id === moduloId);
    const [interacao, setInteracao] = useState(null); // 'gostar' | 'partilhar' | 'comentar' | null
    const [anchor, setAnchor] = useState({ x: 50, y: 50 });
    const [likePulse, setLikePulse] = useState(false);
    const [shareTo, setShareTo] = useState("");
    const [commentText, setCommentText] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [jaEscolheu, setJaEscolheu] = useState(false); // só 1 interação por cenário
    const [interacoes, setInteracoes] = useState([]);
    const AUTO_DELAY = 600; // ms para mostrar o coração antes de avançar

    const atividade = modulo?.atividades.find(a => a.url === "escolha-certa");

    const guardarRespostas = async (dadosFinais = interacoes) => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                console.error("Utilizador não autenticado");
                return;
            }

            const userRef = doc(db, "alunos", user.uid);

            // Estrutura de salvamento
            await setDoc(
                userRef,
                {
                    respostas: {
                        modulo5: {
                            // Guardamos o array de interações que acumulaste
                            escolhacerta: arrayUnion({
                                sessoes: dadosFinais, 
                                concluidoEm: new Date().toISOString()
                            }),
                        },
                    },
                },
                { merge: true }
            );

            console.log("Dados guardados com sucesso no Firebase!");
        } catch (error) {
            console.error("Erro detalhado ao guardar:", error);
        }
    };

    const cenarios = [
    {
        imagem: "/imgs/modulo5/escolhacerta/escolha_certa_1.png",
        hotspots: [
        // Botão "Enviar comentário" (retângulo grande em baixo à esquerda)
        { tipo: "comentar",  x: 31, y: 94, w: 46, h: 7 },

        // Coração
        { tipo: "gostar",    x: 74, y: 94, w: 8, h: 6 },

        // Avião (partilhar)
        { tipo: "partilhar", x: 89, y: 94, w: 8, h: 6 },
        ],
    },
    {
        imagem: "/imgs/modulo5/escolhacerta/escolha_certa_2.png",
        hotspots: [
        { tipo: "comentar",  x: 30, y: 96, w: 45, h: 7 },
        { tipo: "gostar",    x: 75, y: 96, w: 8, h: 6 },
        { tipo: "partilhar", x: 89, y: 96, w: 8, h: 6 },
        ],
    },
    {
        imagem: "/imgs/modulo5/escolhacerta/escolha_certa_3.png",
        hotspots: [
        { tipo: "comentar",  x: 30, y: 96, w: 45, h: 7  },
        { tipo: "gostar",    x: 75, y: 96, w: 8, h: 6  },
        { tipo: "partilhar", x: 89, y: 96, w: 8, h: 6  },
        ],
    },
    {
        imagem: "/imgs/modulo5/escolhacerta/escolha_certa_4.png",
        hotspots: [
        { tipo: "comentar",  x: 30, y: 96, w: 45, h: 7  },
        { tipo: "gostar",    x: 75, y: 96, w: 8, h: 6  },
        { tipo: "partilhar", x: 89, y: 96, w: 8, h: 6  },
        ],
    },
    {
        imagem: "/imgs/modulo5/escolhacerta/escolha_certa_5.png",
        hotspots: [
        { tipo: "comentar",  x: 30, y: 90, w: 45, h: 7  },
        { tipo: "gostar",    x: 75, y: 90, w: 8, h: 6  },
        { tipo: "partilhar", x: 89, y: 90, w: 8, h: 6  },
        ],
    },
    {
        imagem: "/imgs/modulo5/escolhacerta/escolha_certa_6.png",
        hotspots: [
        { tipo: "comentar",  x: 30, y: 92, w: 45, h: 7  },
        { tipo: "gostar",    x: 75, y: 92, w: 8, h: 6  },
        { tipo: "partilhar", x: 89, y: 92, w: 8, h: 6  },
        ],
    },
    {
        imagem: "/imgs/modulo5/escolhacerta/escolha_certa_7.png",
        hotspots: [
        { tipo: "comentar",  x: 30, y: 94, w: 45, h: 7  },
        { tipo: "gostar",    x: 75, y: 94, w: 8, h: 6 },
        { tipo: "partilhar", x: 89, y: 94, w: 8, h: 6  },
        ],
    },
    ];

const resetUI = () => {
  setInteracao(null);
  setAnchor({ x: 50, y: 50 });
  setLikePulse(false);
  setShareTo("");
  setCommentText("");
  setOpcaoSelecionada(null);
  setShowWarning(false);
  setJaEscolheu(false); // <-- aqui é o sítio certo
};

const avancar = () => {
  if (!jaEscolheu) {
    setShowWarning(true);
    return;
  }
  setShowWarning(false);
  setPagina(prev => prev + 1);
  resetUI();
};

const retroceder = () => {
setPagina((prev) => prev - 1);
resetUI();
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
                                <h2 className="text-center fw-bold mb-4" style={{ color: "#234970" }}>
                                    {atividade?.titulo || "Escolha Certa"}
                                </h2>
                                <p className="lead">
                                    <b>Sê muito bem-vindo/a à "Escolha Certa"</b>.<br></br><br></br>
                                    Nesta <b> atividade</b>, vais ver uma sequência de <b>stories</b> com <b> informações</b> sobre as diferentes fontes de <b>ajuda</b> que podemos procurar quando
                                    temos <b> dificuldades</b> ou <b> problemas</b> que não estamos a conseguir lidar <b> sozinhos/as</b>. <br></br><br></br>
                                    À medida que passas por cada <b> story</b>, <b>reflete</b> sobre o que estás a ler e <b> como isso te faz sentir</b>. Vais poder
                                    <b> interagir</b> com cada story, escolhendo uma opção que reflete a tua <b> reação</b> ao conteúdo apresentado. <br></br><br></br>
                                    A ideia é <b> aprender mais</b> sobre como podemos <b>procurar ajuda</b> e <b> refletir</b> sobre o <b>impacto</b> dessa informação no nosso <b>bem-estar</b>.
                                </p>
                               <button
                                        className="custom-btn-turquoise mt-3 px-4 py-2"
                                        onClick={() => setPagina(1)}
                                        >
                                        <i className="bi bi-play-fill me-2"></i>Vamos a isto?
                                        </button>
                            </>
                        )}

                       {/* CENÁRIOS */}
                            {pagina > 0 && pagina <= cenarios.length && (
                            <>
                                <h4 className="fw-bold text-center mb-2" style={{ color: "#234970" }}>
                                Lê cada story com atenção e reage à informação apresentada carregando no:
                                </h4>
                                <ul className="lead" style={{ maxWidth: 700 }}>
                                <li><b>Gostar</b>: se achaste interessante ou útil.</li>
                                <li><b>Partilhar</b>: se quisesses partilhar com alguém que possa precisar desta informação.</li>
                                <li><b>Comentar</b>: se quisesses expressar o que pensaste ou como te sentiste.</li>
                                </ul>

                        {/* IMAGEM + HOTSPOTS + UI */}
                                <div className="position-relative mx-auto mb-3" style={{ maxWidth: 450 }}>
                                <img
                                    src={cenarios[pagina - 1].imagem}
                                    alt={`Cenário ${pagina}`}
                                    className="img-fluid w-100 d-block rounded"
                                    style={{ objectFit: "contain", pointerEvents: "none" }}
                                    onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                    const fallback = e.currentTarget.nextElementSibling;
                                    if (fallback) fallback.style.display = "flex";
                                    }}
                                />
                                {/* Fallback */}
                                <div
                                    style={{
                                    display: "none",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    minHeight: 280,
                                    border: "1px dashed #ddd",
                                    borderRadius: 12,
                                    }}
                                >
                                    <span className="text-muted">Imagem indisponível</span>
                                </div>

                                {/* HOTSPOTS */}
                                {cenarios[pagina - 1].hotspots?.map((h, i) => (
                                    <button
                                    key={i}
                                    type="button"
                                    aria-label={h.tipo}
                                    onClick={() => {
                                        if (jaEscolheu) return; // já escolheu neste cenário
                                        const nova = {
                                            pagina,
                                            tipo: "gostar",
                                            data: new Date().toISOString()
                                        };

                                        setInteracoes(prev => [...prev, nova]);

                                        setInteracao(h.tipo);
                                        setAnchor({ x: h.x, y: h.y });
                                        setShowWarning(false);

                                        if (h.tipo === "gostar") {
                                        setLikePulse(true);
                                        setOpcaoSelecionada("gostar");
                                        setJaEscolheu(true);
                                        setTimeout(() => {
                                            setLikePulse(false);
                                            setPagina(prev => prev + 1); // avança sozinho
                                            resetUI();
                                        }, AUTO_DELAY);
                                        }
                                    }}
                                    className="p-0"
                                    style={{
                                        position: "absolute",
                                        left: `${h.x}%`,
                                        top: `${h.y}%`,
                                        width: `${h.w}%`,
                                        height: `${h.h}%`,
                                        transform: "translate(-50%, -50%)",
                                        background: "transparent",
                                        border: "2px solid transparent",
                                        borderRadius: 12,
                                        cursor: "pointer",
                                        zIndex: 3,
                                    }}
                                    >
                                    <span className="visually-hidden">{h.tipo}</span>
                                    </button>
                                ))}

                                {/* CORAÇÃO (Gostar) */}
                                {interacao === "gostar" && (
                                    <div
                                    className={likePulse ? "heart-pop" : ""}
                                    style={{
                                        position: "absolute",
                                        left: `${anchor.x}%`,
                                        top: `${anchor.y}%`,
                                        transform: "translate(-50%, -50%)",
                                        pointerEvents: "none",
                                        zIndex: 5,
                                    }}
                                    >
                                    <i className="bi bi-heart-fill" style={{ fontSize: 48, color: "#E63946" }} />
                                    </div>
                                )}

                                {/* PARTILHAR */}
                                {interacao === "partilhar" && (
                                    <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (jaEscolheu || !shareTo.trim()) return;
                                        const nova = {
                                            pagina,
                                            tipo: "partilhar",
                                            para: shareTo,
                                            data: new Date().toISOString()
                                        };
                                        setInteracoes(prev => [...prev, nova]);
                                        setJaEscolheu(true);
                                        setInteracao(null);
                                        setShareTo("");
                                        setTimeout(() => { setPagina(p => p + 1); resetUI(); }, 250);
                                    }}
                                    style={{
                                        position: "absolute",
                                        left: `${anchor.x}%`,
                                        top: `calc(${anchor.y}% + 8%)`,
                                        transform: "translate(-50%, 0)",
                                        background: "#fff",
                                        border: "1px solid #99CBC8",
                                        borderRadius: 12,
                                        padding: 12,
                                        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                                        minWidth: 260,
                                        zIndex: 6,
                                    }}
                                    >
                                    <label className="form-label mb-1">Partilhar com:</label>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="Quero partilhar com"
                                        value={shareTo}
                                        onChange={(e) => setShareTo(e.target.value)}
                                    />
                                    <div className="d-flex gap-2 justify-content-end">
                                        <button
                                        type="button"
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => { setInteracao(null); setShareTo(""); }}
                                        >
                                        Cancelar
                                        </button>
                                        <button type="submit" className="btn btn-sm" style={{ background: "#99CBC8", color: "#fff" }}>
                                        Partilhar
                                        </button>
                                    </div>
                                    </form>
                                )}

                                {/* COMENTAR */}
                                {interacao === "comentar" && (
                                    <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (jaEscolheu || commentText.trim().length < 2) return;
                                        const nova = {
                                            pagina,
                                            tipo: "comentar",
                                            comentario: commentText,
                                            data: new Date().toISOString()
                                        };
                                        setInteracoes(prev => [...prev, nova]);
                                        setJaEscolheu(true);
                                        setInteracao(null);
                                        setCommentText("");
                                        setTimeout(() => { setPagina(p => p + 1); resetUI(); }, 250);
                                    }}
                                    style={{
                                        position: "absolute",
                                        left: `${anchor.x}%`,
                                        top: `calc(${anchor.y}% + 8%)`,
                                        transform: "translate(-50%, 0)",
                                        background: "#fff",
                                        border: "1px solid #99CBC8",
                                        borderRadius: 12,
                                        padding: 12,
                                        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                                        minWidth: 260,
                                        zIndex: 6,
                                    }}
                                    >
                                    <label className="form-label mb-1">O teu comentário:</label>
                                    <textarea
                                        className="form-control mb-2"
                                        rows={3}
                                        placeholder="Escreve aqui o teu comentário"
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                    />
                                     <div className="d-flex gap-2 justify-content-end">
                                        <button
                                        type="button"
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => { setInteracao(null); setCommentText(""); }}
                                        >
                                        Cancelar
                                        </button>
                                        <button type="submit" className="btn btn-sm" style={{ background: "#99CBC8", color: "#fff" }}>
                                        Enviar
                                        </button>
                                    </div>
                                    </form>
                                )}
                                </div>

                                {/* ALERTA GLOBAL */}
                                {showWarning && (
                                <div className="alert alert-warning mt-2 text-center" role="alert" aria-live="assertive">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                    Por favor, seleciona uma reação antes de continuar.
                                </div>
                                )}
                            </>
                            )}

                        {/* CONCLUSÃO */}
                        {pagina === cenarios.length + 1 && (
                            <>
                                <h4 className="fw-bold mb-4 text-center" style={{ color: "#234970" }}>
                                    Conclusão da Atividade
                                </h4>
                                <p className="lead">
                                    <b>Procurar ajuda é um passo fundamental para o nosso bem-estar</b>.
                                    Todos nós passamos por <b> momentos difíceis</b>, e saber <b> quando</b> e a <b> quem pedir ajuda</b> é essencial para lidar com esses desafios da melhor forma.<br></br><br></br>
                                    É importante lembrar que, quando estamos perante a <b> ansiedade SOS</b>, a <b> ajuda formal</b> é <b> crucial</b>. Os <b> psicólogos</b> são preparados para lidar
                                    com essas questões e podem fornecer a <b> ajuda necessária</b> para que possas <b> compreender</b> e <b>lidar melhor com as tuas dificuldades</b>, além de <b> desenvolver estratégias eficazes</b> para o teu <b>bem-estar</b>.<br></br><br></br>
                                    As ajudas semiformais e informais, por outro lado, são <b>valiosas</b> para quando precisas de <b>orientação</b> ou de <b>ajuda emocional imediata</b> de pessoas
                                    próximas a ti; não esqueças que mesmo quando estas ajudas estão presentes,  <b>a ajuda profissional</b> deve ser uma prioridade em casos de <b>ansiedade SOS persistente</b>.<br></br><br></br>
                                    Embora as <b>ferramentas de autoajuda</b> (como <b>apps</b>, <b>chats</b> ou <b>sites</b>) possam ser <b>úteis</b>, é necessário ter <b>cuidado</b> ao escolher essas opções. Muitas dessas
                                    plataformas <b>não são construídas por profissionais</b> e podem <b>não ser baseadas em evidências científicas confiáveis</b>. Em momentos mais desafiantes, elas podem servir
                                    como <b>complemento</b>, mas <b>nunca devem substituir</b> a ajuda de profissionais ou de pessoas cuja intenção é estar do teu lado e contribuir para o teu bem-estar. <br></br><br></br>
                                    <b>Cuidar de ti, e deixares que alguém te cuide, é um passo muito importante para o teu bem-estar</b>.
                                </p>

                                <div className="d-flex justify-content-between mt-4">
                                    <button className="custom-btn-pink" onClick={retroceder}>
                                        <i className="bi bi-arrow-left me-2"></i>Anterior
                                    </button>
                                    <AtividadeProgressao
                                        moduloId={moduloId}
                                        atividadeIndex={1}
                                        updateUserData={updateUserData}
                                        onComplete={() => guardarRespostas(interacoes)} 
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
                                >
                                    {pagina === cenarios.length ? "Conclusão" : "Próximo"} <i className="bi bi-arrow-right ms-2"></i>
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