import React, { useState, useContext, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import AtividadeProgressao from "../atividadeProgressao";

const JaFosteCapaz = () => {
  const [pagina, setPagina] = useState(0);
  const [audioCompleted, setAudioCompleted] = useState([false, false, false, false]); // pág. 1..4
  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);
  const audioRefs = useRef([]);

  // =========================
  // PÁGINA 1 — Experiência Pessoal e Desempenho Atual
  // =========================
  const [intensidadeInicio1, setIntensidadeInicio1] = useState(5); // 0..10
  const [intensidadeFinal1, setIntensidadeFinal1] = useState(6);   // 0..10
  const opcoesMudanca1 = [
    "Respiração mais calma",
    "Coração mais estável",
    "Ombros relaxados",
    "Mãos mais quentes/estáveis",
    "Olhar mais firme",
    "Pensamentos mais claros",
    "Ritmo controlado"
  ];
  const [mudancas1, setMudancas1] = useState([]);
  const [resposta1, setResposta1] = useState(""); // síntese curta do que fez
  const [showSinteseWarning1, setShowSinteseWarning1] = useState(false);

  // =========================
  // PÁGINA 2 — Experiência Vicária / Observação de Modelos
  // =========================
  const [modeloCategoria2, setModeloCategoria2] = useState(null); // Amigo/a, Colega, Familiar, Professor/a, Atleta, Influencer, Outra
  const percecoes2 = [
    "Teve coragem em público",
    "Persistiu apesar das dificuldades",
    "Vi progresso real ao longo do tempo",
    "Assumiu vulnerabilidade (foi autêntico/a)",
    "Aprendeu com erros/contratempos",
    "Parecia impossível e aconteceu"
  ];
  const [percecoesSel2, setPercecoesSel2] = useState([]);
  const [inspiracao2, setInspiracao2] = useState(7); // 0..10
  const [modeloResposta2, setModeloResposta2] = useState("");
  const [showSinteseWarning2, setShowSinteseWarning2] = useState(false);

  // =========================
  // PÁGINA 3 — Persuasão Social / Informação Persuasiva
  // =========================
  const [pessoaCategoria3, setPessoaCategoria3] = useState(null); // Amigo/a, Professor/a, Familiar, Colega, Outra
  const emo3 = ["Alívio", "Coragem", "Motivação", "Tranquilidade", "Confiança"];
  const [emoSel3, setEmoSel3] = useState([]);
  const [impacto3, setImpacto3] = useState(7); // 0..10
  const [resposta3, setResposta3] = useState("");
  const [showSinteseWarning3, setShowSinteseWarning3] = useState(false);

  // =========================
  // PÁGINA 4 — Indicadores Emocionais e Fisiológicos
  // =========================
  const [sinaisCategoria4, setSinaisCategoria4] = useState(null);
  const sinais4 = ["Respiração", "Batimento", "Ombros/Postura", "Expressão", "Pensamento", "Energia"];
  const sensacoes4 = [
    "Respiração estável",
    "Ombros relaxados",
    "Mãos quentes",
    "Olhar mais firme",
    "Pensamento claro",
    "Ritmo controlado"
  ];
  const [sensSel4, setSensSel4] = useState([]);
  const [prontoAgir4, setProntoAgir4] = useState(6);
  const [resposta4, setResposta4] = useState("");
  const [showSinteseWarning4, setShowSinteseWarning4] = useState(false);

  // Áudio
  const [showAudioWarning, setShowAudioWarning] = useState(false);

  // =========================
  // Navegação + Validações
  // =========================
  const avancarPagina = () => {
    // ouvir áudio até ao fim nas páginas 1..4
    if (pagina >= 1 && pagina <= 4 && !audioCompleted[pagina - 1]) {
      setShowAudioWarning(true);
      return;
    }

    // pág. 1: texto + pelo menos 1 sensação/indicador selecionado
    if (pagina === 1) {
      const ok1 = resposta1.trim().length >= 1 && mudancas1.length >= 1;
      if (!ok1) {
        setShowSinteseWarning1(true);
        return;
      }
      setShowSinteseWarning1(false);
    }

    // pág. 2: categoria + perceções + texto
    if (pagina === 2) {
      const ok2 = !!modeloCategoria2 && percecoesSel2.length >= 1 && modeloResposta2.trim().length >= 1;
      if (!ok2) {
        setShowSinteseWarning2(true);
        return;
      }
      setShowSinteseWarning2(false);
    }

    // pág. 3: quem + emoção(ões) + texto
    if (pagina === 3) {
      const ok3 = !!pessoaCategoria3 && emoSel3.length >= 1 && resposta3.trim().length >= 1;
      if (!ok3) {
        setShowSinteseWarning3(true);
        return;
      }
      setShowSinteseWarning3(false);
    }

    // pág. 4: sinal principal + sensação(ões) + texto
    if (pagina === 4) {
      const ok4 = !!sinaisCategoria4 && sensSel4.length >= 1 && resposta4.trim().length >= 1;
      if (!ok4) {
        setShowSinteseWarning4(true);
        return;
      }
      setShowSinteseWarning4(false);
    }

    setShowAudioWarning(false);
    setPagina((p) => p + 1);
  };

  const retrocederPagina = () => setPagina((p) => p - 1);

  const progresso = Math.round((pagina / 5) * 100); // 0..5 (intro, 1-4, conclusão)

  const handleAudioEnded = (audioIndex) => {
    setAudioCompleted((prev) => {
      const newState = [...prev];
      newState[audioIndex] = true;
      return newState;
    });
  };

  useEffect(() => {
    setShowAudioWarning(false);
    if (pagina >= 1 && pagina <= 4) {
      const idx = pagina - 1;
      if (!audioCompleted[idx]) {
        setAudioCompleted((prev) => {
          const newState = [...prev];
          newState[idx] = false;
          return newState;
        });
      }
    }
  }, [pagina]);

  const toggleMulti = (list, setter, value) => {
    const active = list.includes(value);
    setter(active ? list.filter((x) => x !== value) : [...list, value]);
  };

  return (
    <div className="container-fluid vh-100 p-0 font-poppins">
      <Navbar />
      <div className="row h-100 m-0">
        <Sidebar />
        <div className="col px-4 py-4" style={{ backgroundColor: "#FBF9F9" }}>
          <div className="container p-5 bg-white rounded shadow-sm">
            {/* PROGRESSO */}
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
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>
                  Já Foste Capaz!
                </h2>
                <p className="lead mb-3">
                  Sê muito <strong>bem-vindo</strong> ou <strong>bem-vinda</strong> à atividade <strong>"Já Foste Capaz"</strong>!
                </p>
                <p className="mb-3 lead">
                  Nesta <strong>atividade</strong> vais ter a oportunidade de <strong>parar um pouco</strong> e <strong>refletir</strong> sobre <strong>situações</strong> em que ultrapassaste <strong>dificuldades</strong>, mesmo quando parecia <strong>difícil</strong>.
                </p>
                <p className="mb-3 lead">
                  A ideia é ajudares-te a ti próprio/a a <strong>reconhecer</strong> tudo o que já foste <strong>capaz</strong> de fazer, mesmo em momentos de <strong>dúvida</strong> ou <strong>ansiedade</strong>.
                </p>
                <p className="mb-3 lead">
                  Ao longo da atividade, vais <strong>lembrar-te</strong> de <strong>experiências tuas</strong>, de <strong>outras pessoas</strong> que te <strong>inspiraram</strong> e do <strong>impacto</strong> que o <strong>apoio dos outros</strong> pode ter em ti.
                </p>
                <p className="mb-4 lead">
                  Quando estiveres <strong>pronto/a</strong>, começa a <strong>explorar</strong> — esta <strong>viagem é sobre ti</strong>. <strong>Ouve os áudios que se seguem</strong>, que te irão guiar nesta reflexão.
                </p>
                <div className="text-center">
                  <button className="custom-btn-turquoise mt-2 px-4 py-2" onClick={avancarPagina}>
                    <i className="bi bi-play-fill me-2"></i> Vamos a isto?
                  </button>
                </div>
              </div>
            )}


            {/* PÁGINAS 1-4 — ÁUDIO + INTERAÇÕES */}
            {pagina >= 1 && pagina <= 4 && (
              <div className="text-center py-4">
                <h4 className="fw-bold mb-4 text-start" style={{ color: "#234970" }}>
                  Áudio {pagina} de 4
                </h4>
                <p className="lead mb-4">Ouve com atenção este áudio que te vai guiar na reflexão.</p>

                {/* Player de Áudio */}
                <div className="mb-4">
                  <audio
                    ref={(el) => { if (el) audioRefs.current[pagina - 1] = el; }}
                    controls
                    style={{ width: "100%", maxWidth: "600px" }}
                    onEnded={() => handleAudioEnded(pagina - 1)}
                  >
                    <source src={`/audios/modulo4/jafostecapaz/ja-foste-capaz-${pagina}.mp3`} type="audio/mpeg" />
                    O teu navegador não suporta a reprodução de áudio.
                  </audio>
                </div>

                {showAudioWarning && (
                  <div className="alert mb-4 text-white" style={{ backgroundColor: "#99CBC8", border: "none" }}>
                    <i className="bi bi-info-circle me-2"></i>
                    É necessário ouvir o áudio até ao fim para continuar.
                  </div>
                )}

                {/* INTERAÇÕES ESPECÍFICAS (apenas após concluir o áudio) */}
                <div className="text-start">
                  {/* ===== Página 1: Experiência Pessoal ===== */}
                  {pagina === 1 && audioCompleted[0] && (
                    <div className="mt-3">
                      {/* Slider — ansiedade inicial */}
                      <div className="border rounded p-3 mb-3">
                        <p className="mb-2">
                          <strong>No início, quão intensa foi a ansiedade?</strong>
                        </p>
                        <div className="d-flex align-items-center gap-3">
                          <span className="text-muted">0</span>
                          <input
                            type="range"
                            className="form-range"
                            min={0}
                            max={10}
                            step={1}
                            value={intensidadeInicio1}
                            onChange={(e) => setIntensidadeInicio1(Number(e.target.value))}
                            style={{ maxWidth: 400 }}
                          />
                          <span className="text-muted">10</span>
                          <span className="ms-2">
                            <strong>{intensidadeInicio1}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Slider — confiança final */}
                      <div className="border rounded p-3 mb-3">
                        <p className="mb-2">
                          <strong>No final, quão confiante te sentiste?</strong>
                        </p>
                        <div className="d-flex align-items-center gap-3">
                          <span className="text-muted">0</span>
                          <input
                            type="range"
                            className="form-range"
                            min={0}
                            max={10}
                            step={1}
                            value={intensidadeFinal1}
                            onChange={(e) => setIntensidadeFinal1(Number(e.target.value))}
                            style={{ maxWidth: 400 }}
                          />
                          <span className="text-muted">10</span>
                          <span className="ms-2">
                            <strong>{intensidadeFinal1}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Multi-seleção — mudanças notadas (corpo/mente) */}
                      <div className="border rounded p-3 mb-3">
                        <p className="mb-2">
                          <strong>O que notaste que mudou no teu corpo/mente quando começaste a sentir que ia correr bem?</strong>
                        </p>
                        <div className="d-flex flex-wrap">
                          {opcoesMudanca1.map((op) => {
                            const active = mudancas1.includes(op);
                            return (
                              <button
                                key={op}
                                type="button"
                                className={`btn btn-sm me-2 mb-2 ${active ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => toggleMulti(mudancas1, setMudancas1, op)}
                              >
                                {op}
                              </button>
                            );
                          })}
                        </div>
                        <small className="text-muted">Seleciona pelo menos uma opção.</small>
                      </div>

                      {/* Texto curto — síntese pessoal (o que fizeste) */}
                      <div className="border rounded p-3">
                        <label className="form-label">
                          O que fizeste para lidar com a ansiedade e conseguires superar essa situação?
                        </label>
                        <textarea
                          className="form-control"
                          rows={3}
                          maxLength={120}
                          value={resposta1}
                          onChange={(e) => setResposta1(e.target.value)}
                          placeholder="Escreve brevemente o que fizeste"
                        />
                        <small className="text-muted">{resposta1.length}/120</small>
                      </div>

                      {showSinteseWarning1 && (
                        <div className="alert alert-warning mt-3">
                          Para avançar: seleciona pelo menos um sinal que mudou e escreve uma resposta breve.
                        </div>
                      )}
                    </div>
                  )}

                  {/* ===== Página 2: Experiência Vicária ===== */}
                  {pagina === 2 && audioCompleted[1] && (
                    <div className="mt-3">
                      {/* Quem foi o modelo */}
                      <div className="border rounded p-3 mb-3">
                        <p className="mb-2">
                          <strong>De quem te lembraste?</strong>
                        </p>
                        <div className="d-flex flex-wrap">
                          {["Amigo/a", "Colega", "Familiar", "Professor/a", "Atleta", "Influencer", "Outra"].map((op) => (
                            <button
                              key={op}
                              type="button"
                              className={`btn btn-sm me-2 mb-2 ${modeloCategoria2 === op ? "btn-primary" : "btn-outline-primary"}`}
                              onClick={() => setModeloCategoria2(op)}
                            >
                              {op}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Slider — inspiração sentida */}
                      <div className="border rounded p-3 mb-3">
                        <p className="mb-2">
                          <strong>Quanto te inspirou ver essa pessoa a superar o desafio?</strong>
                        </p>
                        <div className="d-flex align-items-center gap-3">
                          <span className="text-muted">0</span>
                          <input
                            type="range"
                            className="form-range"
                            min={0}
                            max={10}
                            step={1}
                            value={inspiracao2}
                            onChange={(e) => setInspiracao2(Number(e.target.value))}
                            style={{ maxWidth: 400 }}
                          />
                          <span className="text-muted">10</span>
                          <span className="ms-2">
                            <strong>{inspiracao2}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Observações/perceções */}
                      <div className="border rounded p-3 mb-3">
                        <p className="mb-2">
                          <strong>O que observaste nessa pessoa?</strong>
                        </p>
                        <div className="d-flex flex-wrap">
                          {percecoes2.map((op) => {
                            const active = percecoesSel2.includes(op);
                            return (
                              <button
                                key={op}
                                type="button"
                                className={`btn btn-sm me-2 mb-2 ${active ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => toggleMulti(percecoesSel2, setPercecoesSel2, op)}
                              >
                                {op}
                              </button>
                            );
                          })}
                        </div>
                        <small className="text-muted">Seleciona pelo menos uma opção.</small>
                      </div>

                      {/* Texto curto — crença pessoal */}
                      <div className="border rounded p-3">
                        <label className="form-label">
                          O que é que essa pessoa fez que te fez acreditar que tu também podes conseguir?
                        </label>
                        <textarea
                          className="form-control"
                          rows={3}
                          maxLength={140}
                          value={modeloResposta2}
                          onChange={(e) => setModeloResposta2(e.target.value)}
                          placeholder="Escreve brevemente (máx. 140 caracteres)"
                        />
                        <small className="text-muted">{modeloResposta2.length}/140</small>
                      </div>

                      {showSinteseWarning2 && (
                        <div className="alert alert-warning mt-3">
                          Para avançar: escolhe uma categoria, marca pelo menos uma observação e escreve uma frase breve.
                        </div>
                      )}
                    </div>
                  )}

                  {/* ===== Página 3: Persuasão Social ===== */}
                  {pagina === 3 && audioCompleted[2] && (
                    <div className="mt-3">
                      {/* Quem acreditou em ti */}
                      <div className="border rounded p-3 mb-3">
                        <p className="mb-2">
                          <strong>Quem acreditou em ti?</strong>
                        </p>
                        <div className="d-flex flex-wrap">
                          {["Amigo/a", "Professor/a", "Familiar", "Colega", "Outra"].map((op) => (
                            <button
                              key={op}
                              type="button"
                              className={`btn btn-sm me-2 mb-2 ${pessoaCategoria3 === op ? "btn-primary" : "btn-outline-primary"}`}
                              onClick={() => setPessoaCategoria3(op)}
                            >
                              {op}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Slider — impacto das palavras */}
                      <div className="border rounded p-3 mb-3">
                        <p className="mb-2">
                          <strong>Quanto impacto tiveram essas palavras em ti?</strong>
                        </p>
                        <div className="d-flex align-items-center gap-3">
                          <span className="text-muted">0</span>
                          <input
                            type="range"
                            className="form-range"
                            min={0}
                            max={10}
                            step={1}
                            value={impacto3}
                            onChange={(e) => setImpacto3(Number(e.target.value))}
                            style={{ maxWidth: 400 }}
                          />
                          <span className="text-muted">10</span>
                          <span className="ms-2">
                            <strong>{impacto3}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Emoções sentidas (multi-seleção) */}
                      <div className="border rounded p-3 mb-3">
                        <p className="mb-2">
                          <strong>Que emoções sentiste quando ouviste essas palavras?</strong>
                        </p>
                        <div className="d-flex flex-wrap">
                          {emo3.map((op) => {
                            const active = emoSel3.includes(op);
                            return (
                              <button
                                key={op}
                                type="button"
                                className={`btn btn-sm me-2 mb-2 ${active ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => toggleMulti(emoSel3, setEmoSel3, op)}
                              >
                                {op}
                              </button>
                            );
                          })}
                        </div>
                        <small className="text-muted">Seleciona pelo menos uma emoção.</small>
                      </div>

                      {/* Texto curto — como te sentiste */}
                      <div className="border rounded p-3">
                        <label className="form-label">Como te sentiste quando essa pessoa acreditou em ti?</label>
                        <textarea
                          className="form-control"
                          rows={3}
                          maxLength={140}
                          value={resposta3}
                          onChange={(e) => setResposta3(e.target.value)}
                          placeholder="Escreve brevemente (máx. 140 caracteres)"
                        />
                        <small className="text-muted">{resposta3.length}/140</small>
                      </div>

                      {showSinteseWarning3 && (
                        <div className="alert alert-warning mt-3">
                          Para avançar: seleciona quem foi, marca pelo menos uma emoção e escreve uma frase breve.
                        </div>
                      )}
                    </div>
                  )}

                  {/* ===== Página 4: Indicadores Emocionais e Fisiológicos ===== */}
                  {pagina === 4 && audioCompleted[3] && (
                    <div className="mt-3">
                      {/* Sinal principal */}
                      <div className="border rounded p-3 mb-3">
                        <p className="mb-2">
                          <strong>No teu corpo/mente, o que notaste mais quando sentiste que ia correr bem?</strong>
                        </p>
                        <div className="d-flex flex-wrap">
                          {sinais4.map((op) => (
                            <button
                              key={op}
                              type="button"
                              className={`btn btn-sm me-2 mb-2 ${sinaisCategoria4 === op ? "btn-primary" : "btn-outline-primary"}`}
                              onClick={() => setSinaisCategoria4(op)}
                            >
                              {op}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sensações (multi-seleção) */}
                      <div className="border rounded p-3 mb-3">
                        <p className="mb-2">
                          <strong>Seleciona as sensações que notaste no corpo/mente quando sentiste que ia correr bem.</strong>
                        </p>
                        <div className="d-flex flex-wrap">
                          {sensacoes4.map((op) => {
                            const active = sensSel4.includes(op);
                            return (
                              <button
                                key={op}
                                type="button"
                                className={`btn btn-sm me-2 mb-2 ${active ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => toggleMulti(sensSel4, setSensSel4, op)}
                              >
                                {op}
                              </button>
                            );
                          })}
                        </div>
                        <small className="text-muted">Seleciona pelo menos uma sensação.</small>
                      </div>

                      {/* Slider — pronto para agir */}
                      <div className="border rounded p-3 mb-3">
                        <p className="mb-2">
                          <strong>Neste momento, quão pronto/a te sentes para agir em próximos desafios?</strong>
                        </p>
                        <div className="d-flex align-items-center gap-3">
                          <span className="text-muted">0</span>
                          <input
                            type="range"
                            className="form-range"
                            min={0}
                            max={10}
                            step={1}
                            value={prontoAgir4}
                            onChange={(e) => setProntoAgir4(Number(e.target.value))}
                            style={{ maxWidth: 400 }}
                          />
                          <span className="text-muted">10</span>
                          <span className="ms-2">
                            <strong>{prontoAgir4}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Texto curto — síntese */}
                      <div className="border rounded p-3">
                        <label className="form-label">
                          Descreve brevemente como notaste estas sensações e como as levas contigo para situações difíceis.
                        </label>
                        <textarea
                          className="form-control"
                          rows={3}
                          maxLength={140}
                          value={resposta4}
                          onChange={(e) => setResposta4(e.target.value)}
                          placeholder="Ex.: respiração estável, ombros relaxados, pensamentos mais claros…"
                        />
                        <small className="text-muted">{resposta4.length}/140</small>
                      </div>

                      {showSinteseWarning4 && (
                        <div className="alert alert-warning mt-3">
                          Para avançar: escolhe um sinal principal, marca pelo menos uma sensação e escreve uma frase breve.
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Navegação */}
                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink" onClick={retrocederPagina}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>

                  <button className="custom-btn-turquoise" onClick={avancarPagina}>
                    {pagina === 4 ? "Conclusão" : "Próximo"}
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            )}

         {/* PÁGINA 5 - CONCLUSÃO */}
            {pagina === 5 && (
              <>
               <h4 className="text-center fw-bold mb-4" style={{ color: "#234970" }}>Conclusão da Atividade</h4>
                <p className="lead">
                  Com esta atividade pudeste perceber que a nossa <strong>confiança</strong> em ser capaz de <strong>enfrentar</strong> e <strong>superar desafios</strong> vem da <strong>crença</strong> de que conseguimos realizar o que nos propomos.
                </p>
                <p className="lead">
                  As <strong>experiências passadas</strong>, especialmente as em que <strong>superamos dificuldades</strong>, ajudam-nos a perceber que somos <strong>capazes</strong> de lidar com <strong>situações difíceis</strong>.
                </p>
                <p className="lead">
                  Além disso, ver <strong>outras pessoas</strong> a conseguirem o que parecia <strong>impossível</strong> pode nos fazer <strong>acreditar</strong> que também somos capazes.
                </p>
                <p className="lead">
                  O <strong>apoio</strong> de quem acredita em nós, como <strong> amigos, professores</strong> ou <strong>familiares</strong>, aumenta essa confiança.
                </p>
                <p className="lead">
                  Quando estamos <strong>bem-dispostos e com energia</strong>, isso nota-se também no <strong> nosso corpo </strong> e ajuda a sentirmo-nos mais confiantes para enfrentar os desafios.
                </p>

                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink" onClick={retrocederPagina}>
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
    </div>
  );
};

export default JaFosteCapaz;


