import React, { useState } from "react";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import AtividadeProgressao from "../atividadeProgressao";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../App";
import { useContext } from "react";
import { db } from "../../../database/database";
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const afirmacoes = [
  {
    texto: <p style={{color:'#234970'}}>A ansiedade é algo comum e normal.</p>,
    resposta: "Verdade",
    explicacao:
      <p className="lead">
        <strong>Verdade!</strong> Sentir <strong>ansiedade</strong> é algo que <strong>todos nós experimentamos</strong> — é uma <strong>emoção natural</strong> do corpo para nos preparar para enfrentar <strong>desafios</strong>. Por exemplo, se estás ansioso/a antes de um <strong>teste</strong>, é porque queres ter um <strong>bom desempenho</strong>! A ansiedade só se torna um <strong>problema</strong> quando é <strong>intensa</strong>, <strong>persistente</strong> e começa a <strong>interferir</strong> com o nosso <strong>dia-a-dia</strong>.
      </p>
  },
  {
    texto: <p style={{color:'#234970'}}>A medicação é a única solução para a ansiedade.</p>,
    resposta: "Mito",
    explicacao:
      <p className="lead">
      <strong>Mito!</strong> A <strong>medicação</strong> pode ajudar nos casos mais <strong>intensos</strong>, mas não é a <strong>única forma</strong> de lidar com a <strong>ansiedade</strong>. Muitas pessoas melhoram com <strong>intervenção psicológica</strong>, que ensina a <strong>reconhecer padrões de pensamento</strong> e a <strong>desenvolver</strong> outras formas de lidar com eles, como a <strong>Terapia Cognitivo-Comportamental (TCC)</strong>.
      </p>
  },
  {
    texto: <p style={{color:'#234970'}}>Se eu admitir que fico ansioso, serei visto como fraco/a ou estranho/a.</p>,
    resposta: "Mito",
    explicacao:
      <p className="lead">
        <strong>Mito!</strong> Sentir <strong>ansiedade</strong> não tem nada de <strong>estranho</strong> — é algo <strong>humano</strong>, que <strong>todos experimentamos</strong>. O <strong>medo</strong> de ser <strong>julgado</strong> pode levar muitas pessoas a hesitar em <strong>falar</strong> sobre o que sentem. No entanto, <strong>admitir</strong> que estamos <strong>ansiosos</strong> é um sinal de <strong>coragem</strong> e <strong>autoconhecimento</strong>. <strong>Falar</strong> sobre as nossas <strong>emoções</strong> pode trazer <strong>surpresas positivas</strong>: podemos encontrar a <strong>compreensão</strong> e o <strong>apoio</strong> que desejávamos, mas não esperávamos. Mostrar <strong>vulnerabilidade</strong> não só fortalece os <strong>laços de amizade</strong>, como também cria um <strong>ambiente</strong> mais <strong>acolhedor</strong> e <strong>seguro</strong>, onde todos se sentem mais à vontade para <strong>partilhar</strong> as suas <strong>experiências</strong>.
      </p>
  },
  {
    texto: <p style={{color:'#234970'}}>A ansiedade manifesta-se de forma diferente nas pessoas.</p>,
    resposta: "Verdade",
    explicacao:
     <p className="lead">
      <strong>Verdade!</strong> A <strong>ansiedade</strong> é uma <strong>experiência</strong> única e <strong>individualizada</strong>. Cada pessoa pode <strong>sentir</strong> e <strong>expressar</strong> de maneiras diferentes, com <strong>sintomas</strong> que variam amplamente. Enquanto algumas experimentam <strong>sensações físicas</strong> como <strong>palpitações</strong> e <strong>suores</strong>, outras podem ter <strong>preocupação constante</strong> ou <strong>agitação</strong>. Nem sempre é <strong>visível</strong>: muitas pessoas lidam com a <strong>ansiedade</strong> em <strong>silêncio</strong>, apresentando uma <strong>calma aparente</strong> enquanto <strong>lutam internamente</strong>. Isso pode levar à <strong>incompreensão</strong> por parte de <strong>amigos</strong> e <strong>familiares</strong>, que podem não perceber que aquela pessoa está a lidar com uma <strong>experiência</strong> de <strong>ansiedade difícil</strong>.
      </p>
  },
  {
    texto: <p style={{color:'#234970'}}>Ter ansiedade não é o mesmo que sentir medo.</p>,
    resposta: "Mito",
    explicacao:
      <p className="lead">
      <strong>Mito!</strong> A <strong>ansiedade</strong> engloba mais do que apenas o <strong>medo</strong>. O <strong>medo</strong> é uma <strong>resposta</strong> a um <strong>perigo específico</strong> e <strong>imediato</strong>, a algo que está mesmo a <strong>acontecer</strong> (como ver um <strong>cão</strong> a correr na tua <strong>direção</strong>). Já a <strong>ansiedade</strong> é mais sobre o que <strong>poderá acontecer</strong> no <strong>futuro</strong> — uma <strong>preocupação constante</strong> — mesmo que nem seja <strong>provável</strong>. A <strong>ansiedade</strong> é <strong>preocupação</strong> com o que pode estar para <strong>vir</strong>, enquanto o <strong>medo</strong> é uma <strong>resposta</strong> ao <strong>agora</strong>.
     </p>
  },
  {
    texto: <p style={{color:'#234970'}}>Eu devia ser capaz de lidar com a minha ansiedade sozinho/a.</p>,
    resposta: "Mito",
    explicacao:
      <p className="lead">
      <strong>Mito!</strong> A <strong>ansiedade</strong> não é um <strong>“defeito”</strong> ou uma <strong>“fraqueza”</strong> que se resolve apenas com <strong>força de vontade</strong>. É normal sentires-te <strong>isolado/a</strong> e achar que mais ninguém entende o que estás a viver, mas a verdade é que a <strong>ansiedade</strong> é <strong>comum</strong> a <strong>todos nós</strong>. Muitas vezes, é preciso <strong>ajuda</strong> para <strong>compreender</strong> o que está a acontecer e <strong>aprender</strong> a lidar com isso. O <strong>estigma</strong> associado à <strong>ansiedade</strong> pode criar uma grande <strong>barreira</strong> para quem precisa de <strong>ajuda</strong>, levando muitos a sentirem <strong>vergonha</strong> e <strong>medo</strong> de serem <strong>julgados</strong>. Este <strong>medo</strong> faz com que se <strong>isolem</strong> e <strong>escondam</strong> as suas <strong>emoções</strong>, o que <strong>intensifica</strong> a <strong>ansiedade</strong> e reforça a ideia de que devem lidar com ela <strong>sozinhos</strong>, aumentando a sensação de <strong>incompreensão</strong>. <strong>Falar</strong> sobre as tuas <strong>experiências</strong> não só te ajuda, como também <strong>encoraja</strong> outras pessoas a <strong>partilharem</strong> as suas.
      </p>
  },
  {
    texto: <p style={{color:'#234970'}}> Pessoas com ansiedade devem evitar situações desafiadoras.</p>,
    resposta: "Mito",
    explicacao:
      <p className="lead">
      <strong>Mito!</strong> <strong>Evitar</strong> o que nos <strong>assusta</strong> pode trazer <strong>alívio</strong> no momento, mas é apenas <strong>temporário</strong> — a longo prazo, aumenta a <strong>ansiedade</strong>. <strong>Enfrentar</strong> os <strong>desafios</strong>, mesmo com <strong>medo</strong> e com <strong>apoio</strong>, ajuda-nos a perceber que somos <strong>capazes</strong> e reduz, gradualmente, o <strong>desconforto</strong> associado aos <strong>sintomas</strong> de <strong>ansiedade</strong>.
      </p>
  },
  {
    texto: <p style={{color:'#234970'}}>Pessoas ansiosas são sempre tímidas ou introvertidas.</p>,
    resposta: "Mito",
    explicacao:
      <p className="lead">
        <strong>Mito!</strong> Há pessoas <strong>super extrovertidas</strong>, <strong>faladoras</strong> e <strong>sociáveis</strong> que também têm <strong>ansiedade</strong> — e, por vezes, <strong>escondem-na</strong> muito bem. Ter <strong>ansiedade</strong> não depende de seres <strong>tímido/a</strong> ou não, mas sim da forma como <strong>percebes</strong> o <strong>mundo</strong> e os <strong>desafios</strong> à tua volta.
      </p>
  },
  {
    texto: <p style={{color:'#234970'}}>A ansiedade não aparece do nada.</p>,
    resposta: "Verdade",
    explicacao:
      <p className="lead">
      <strong>Verdade!</strong> A <strong>ansiedade</strong> não aparece do nada — há sempre um <strong>“gatilho”</strong>, ou seja, um <strong>estímulo</strong> que a origina. Pode ser um <strong>pensamento</strong>, uma <strong>memória</strong>, um <strong>som</strong>, um <strong>lugar</strong>… Nem sempre conseguimos <strong>identificar</strong> de imediato qual foi esse <strong>gatilho</strong>, e por isso pode parecer que veio do nada. A <strong>intervenção psicológica </strong> pode ajudar a <strong>reconhecer esses gatilhos</strong> e a <strong>compreender</strong> melhor como atuam.
      </p>
  },
  {
    texto: <p style={{color:'#234970'}}>Se controlo tudo à minha volta, não vou sentir ansiedade.</p>,
    resposta: "Mito",
    explicacao:
      <p className="lead">
      <strong>Mito!</strong> Muitas <strong>pessoas ansiosas</strong> tentam <strong>controlar tudo</strong> para se sentirem <strong>seguras</strong>. Mas a verdade é que a <strong>vida</strong> está cheia de coisas que <strong>não conseguimos controlar</strong> — e tentar fazê-lo pode deixar-nos <strong>cansados</strong>, <strong>tensos</strong>… e ainda mais <strong>ansiosos</strong>. <strong>Aceitar</strong> o que <strong>não é possível controlar</strong> é um <strong>passo importante</strong> para nos sentirmos melhor.
      </p>
  }
];

const VerdadeOuMito = () => {
  const [pagina, setPagina] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [respostas, setRespostas] = useState({});
  
  const guardarRespostas = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;

    const userRef = doc(db, "alunos", user.uid);

    await setDoc(
    userRef,
    {
      verdadeOuMito: arrayUnion({
        respostas: respostas,
        data: new Date().toISOString(),
      }),
    },
    { merge: true }
  );

    console.log("Resposta adicionada ao histórico!");
  } catch (error) {
    console.error("Erro ao guardar:", error);
  }
};

 const avancarPagina = () => {
    // Se estiver numa afirmação e ainda não escolheu nada, mostra aviso
    if (estaNaAfimacao && respostaSelecionada === null) {
      setMostrarAviso(true);
      return;
    }
    setMostrarAviso(false);
    setRespostaSelecionada(null);
    setMostrarPopup(false);
    setPagina((prev) => prev + 1);
  };

  const retrocederPagina = () => {
    setRespostaSelecionada(null);
    setMostrarPopup(false);
    setPagina((prev) => prev - 1);
  };

  const selecionarResposta = (resposta) => {
  setRespostaSelecionada(resposta);
  setMostrarAviso(false);
  setMostrarPopup(true);

  setRespostas((prev) => ({
    ...prev,
    [pagina - 1]: resposta,
  }));
};

  // 🔵 CÁLCULO DO PROGRESSO
  const totalPaginas = afirmacoes.length + 2; // introdução + afirmações + conclusão
  const progresso = Math.round((pagina / (totalPaginas - 1)) * 100);

  const estaNaIntroducao = pagina === 0;
  const estaNaConclusao = pagina === afirmacoes.length + 1;
  const estaNaAfimacao = pagina >= 1 && pagina <= afirmacoes.length;

  const afirmacaoAtual = afirmacoes[pagina - 1];
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
                aria-valuemax="100">
              </div>
            </div>
            {estaNaIntroducao && (
             <div className="text-center">
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>
                  Verdade ou Mito?
                </h2>
                <p className="lead mb-3">
                  <strong>Sê muito bem-vindo/a ao Verdade ou Mito?!</strong> <br></br><br></br>

                  Nesta atividade, terás a oportunidade de explorar <strong>diversas afirmações sobre a ansiedade</strong>. <br></br><br></br>

                  Para cada uma delas, deverás decidir se é <strong>verdade</strong> ou se se trata de um <strong>mito</strong>. <br></br><br></br>

                  Após a tua escolha, aparecerá uma <strong>explicação</strong> que te ajudará a entender melhor o que está por trás de cada afirmação.
                </p>
                <button className="custom-btn-turquoise px-4 py-2" onClick={avancarPagina}>
                 <i className="bi bi-play-fill me-2"></i> Vamos a isto?
                </button>
              </div>
            )}

              {estaNaAfimacao && (
                <div className="text-center py-4">
                  
                    {/* Aviso se tentar avançar sem escolher */}
                    {mostrarAviso && (
                    <div className="alert alert-warning mt-3 text-center" role="alert">
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      Por favor, seleciona uma opção antes de continuar.
                    </div>
                  )}

                  {/* INSTRUÇÃO IGUAL PARA TODAS AS PÁGINAS */}
                  <p className="lead mb-3">
                    Lê a afirmação e decide se é “Verdade” ou “Mito”.
                  </p>

                  <h5 className="fw-bold mb-4">{afirmacaoAtual.texto}</h5>

                  <div className="d-flex justify-content-center gap-4 mb-4">
                    <button
                      className="custom-btn-complete"
                      disabled={respostaSelecionada !== null}
                      onClick={() => selecionarResposta("Verdade")}
                    >
                      Verdade
                    </button>
                    <button
                      className="custom-btn-pink"
                      disabled={respostaSelecionada !== null}
                      onClick={() => selecionarResposta("Mito")}
                    >
                      Mito
                    </button>
                  </div>

                      {mostrarPopup && (
                        <div
                          className="mt-3 text-start"
                          role="alert"
                          style={{
                            backgroundColor:
                              afirmacaoAtual.resposta === "Verdade" ? "#234970" : "#E7C8C2",
                            color: "#fff", // texto branco
                            border:
                              afirmacaoAtual.resposta === "Verdade"
                                ? "1px solid #234970"
                                : "1px solid #E7C8C2",
                            padding: "20px",
                            borderRadius: "8px"
                          }}
                        >
                          {afirmacaoAtual.explicacao}
                        </div>
                      )}

                  <div className="d-flex justify-content-between mt-4">
                    <button
                      className="custom-btn-pink"
                      onClick={retrocederPagina}
                      disabled={pagina === 0}
                    >
                      <i className="bi bi-arrow-left me-2"></i> Anterior
                    </button>
                   <button
                      className="custom-btn-turquoise"
                      onClick={async () => {
                        await guardarRespostas();
                        avancarPagina();
                      }}
                    >
                      Próximo <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  </div>
                </div>
              )}

            {estaNaConclusao && (
              <div className="text-center">
                <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>Conclusão da Atividade</h4>
                <div className="lead mb-3">
                  <p>
                    Ao longo desta atividade, percebeste que existem <strong>muitas ideias erradas sobre a ansiedade</strong> — os chamados <strong>mitos</strong> —
                    que podem fazer-nos sentir <strong>pior</strong> ou ficar mais <strong>confusos</strong> sobre o que estamos a viver.
                  </p>
                  <p>
                    A boa notícia é que, quando começamos a compreender melhor o que sentimos, tudo passa a fazer mais <strong>sentido</strong>.
                  </p>
                  <p>
                    Ao entenderes melhor o que é a <strong>ansiedade</strong> e deixares de acreditar nos <strong>mitos que a alimentam</strong>, dás um passo essencial para promover o teu <strong>bem-estar.</strong></p>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink"
                    onClick={retrocederPagina}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <AtividadeProgressao
                    moduloId={moduloId}
                    atividadeIndex={1}
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

export default VerdadeOuMito;
