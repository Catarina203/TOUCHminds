import React, { useState } from "react";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import AtividadeProgressao from "../atividadeProgressao";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../App";
import { useContext } from "react";

const afirmacoes = [
  {
    texto: <p style={{color:'#234970'}}>A ansiedade é algo comum e normal.</p>,
    resposta: "Verdade",
    explicacao:
      <p className="lead"><strong>Verdade!</strong> Sentir <strong>ansiedade</strong> é algo que <strong>todos nós experimentamos</strong> — é uma <strong>emoção natural</strong> do corpo para nos preparar para enfrentar <strong>desafios</strong>. Por exemplo,
        se estás ansioso/a antes de um <strong>teste</strong>, é porque queres ter um <strong>bom desempenho!</strong> A ansiedade só se torna um <strong>problema</strong> quando é <strong>excessiva</strong> e começa a <strong>interferir</strong> com o
        nosso <strong>dia-a-dia</strong>.</p>
  },
  {
    texto: <p style={{color:'#234970'}}>A medicação é a única solução para a ansiedade.</p>,
    resposta: "Mito",
    explicacao:
      <p className="lead"><strong>Mito!</strong> A <strong>medicação</strong> pode ajudar, nos casos mais intensos, mas <strong>não é a única forma de lidar com a ansiedade</strong>. Muitas pessoas melhoram com <strong>psicoterapia</strong>,
        especialmente com <strong>terapias que ensinam a reconhecer padrões de pensamento</strong> e a desenvolver formas mais <strong>equilibradas de lidar com eles</strong>, como a <strong>Terapia
          Cognitivo-Comportamental (TCC)</strong>.</p>
  },
  {
    texto: <p style={{color:'#234970'}}>Se eu admitir que fico ansioso, serei visto como fraco/a ou estranho/a.</p>,
    resposta: "Mito",
    explicacao:
      <p className="lead"><strong>Mito!</strong> Sentir <strong>ansiedade</strong> não tem nada de estranho — é algo <strong>humano</strong> e que todos sentimos. O <strong>medo de ser julgado</strong> pode fazer com que as
        pessoas hesitem em falar sobre a sua ansiedade. No entanto, admitir que estamos ansiosos é um sinal de <strong>coragem</strong> e <strong>autoconhecimento</strong>. Falares sobre as
        tuas <strong>emoções</strong> pode surpreender-te positivamente… Podes encontrar a <strong>compreensão</strong> e <strong>apoio</strong> que não estavas a esperar, mas também desejavas. Mostrar-nos
        <strong>vulneráveis</strong> não só fortalece os <strong>laços de amizade</strong>, como também cria um ambiente mais <strong>acolhedor</strong> e <strong>seguro</strong>, permitindo que todos se sintam mais à vontade
        para <strong>partilhar as suas experiências</strong>.</p>
  },
  {
    texto: <p style={{color:'#234970'}}>A ansiedade manifesta-se de forma diferente nas pessoas.</p>,
    resposta: "Verdade",
    explicacao:
      <p className="lead"><strong>Verdade!</strong> A ansiedade é uma <strong>experiência única</strong> e <strong>individualizada</strong>. Cada pessoa pode sentir e expressar a ansiedade de maneiras diferentes,
        e os <strong>sintomas</strong> podem variar amplamente. Por exemplo, enquanto algumas pessoas podem experimentar <strong>sensações físicas</strong> como <strong>palpitações</strong> e <strong>suores</strong>,
        outras podem ter <strong>preocupação constante</strong> ou <strong>agitação</strong>.<br></br>
        Nem sempre é <strong>visível externamente</strong>; muitas pessoas lidam com a ansiedade em <strong>silêncio</strong>, apresentando uma aparência <strong>calma</strong> enquanto lutam internamente.
        Isso pode levar à <strong>incompreensão</strong> por parte de amigos e familiares, que podem não perceber que também aquela pessoa está a lidar com uma experiência
        de ansiedade <strong>difícil</strong>.</p>
  },
  {
    texto: <p style={{color:'#234970'}}>Ter ansiedade não é o mesmo que sentir medo.</p>,
    resposta: "Verdade",
    explicacao:
      <p className="lead"><strong>Verdade!</strong> A ansiedade é uma <strong>emoção mais ampla</strong> do que o medo. Embora o <strong>medo</strong> seja uma resposta a um <strong>perigo específico e imediato</strong>, a algo que está mesmo a
        acontecer (como ver um cão a correr na tua direção), a ansiedade é mais sobre o que poderá acontecer no <strong>futuro</strong> — uma <strong>preocupação constante</strong> — mesmo que nem seja provável.<br></br>
        A ansiedade é mais no <strong>futuro</strong>, enquanto o medo é uma resposta ao <strong>agora</strong>.
      </p>
  },
  {
    texto: <p style={{color:'#234970'}}>Eu devia ser capaz de lidar com a minha ansiedade sozinho/a.</p>,
    resposta: "Mito",
    explicacao:
      <p className="lead"><strong>Mito!</strong> A ansiedade não é um <strong>“defeito”</strong> que se resolve com <strong>força de vontade</strong>. É normal sentires-te <strong>isolado/a</strong> e achar que mais ninguém entende o que estás a
        viver. Mas a verdade é que a ansiedade é algo que é <strong>comum a todos nós</strong>.<br></br>
        Às vezes, é preciso <strong>ajuda</strong> para perceber o que está a acontecer e aprender a lidar com isso. O <strong>estigma associado à ansiedade</strong> pode criar uma <strong>barreira significativa</strong>
        para aqueles que precisam de ajuda, levando muitos a sentirem <strong>vergonha</strong> e <strong>medo de serem julgados</strong>.<br></br>
        Este medo faz com que se <strong>isolem</strong> e <strong>escondam as suas emoções</strong>, o que intensifica a ansiedade e reforça a ideia de que devem lidar com ela sozinhos,
        aumentando a sensação de <strong>incompreensão</strong>.<br></br>
        <strong>Falar sobre as tuas experiências</strong> não só te ajuda a ti, mas também encoraja os outros a <strong>partilharem as suas próprias experiências</strong>.
      </p>
  },
  {
    texto: <p style={{color:'#234970'}}> com ansiedade devem evitar situações desafiadoras.</p>,
    resposta: "Mito",
    explicacao:
      <p className="lead"><strong>Mito!</strong> Quando evitamos o que nos <strong>assusta</strong>, a ansiedade parece <strong>desaparecer</strong> — mas é um <strong>alívio temporário</strong>, aumentando a ansiedade a <strong>longo prazo</strong>.<br></br>
        <strong>Enfrentar os desafios</strong>, mesmo com <strong>medo</strong>, com <strong>apoio</strong>, mostra-nos que <strong>conseguimos</strong> e diminui gradualmente o <strong>desconforto associado aos sintomas de ansiedade</strong>.
        </p>
  },
  {
    texto: <p style={{color:'#234970'}}>Pessoas ansiosas são sempre tímidas ou introvertidas.</p>,
    resposta: "Mito",
    explicacao:
      <p className="lead"><strong>Mito!</strong> Há pessoas <strong>super extrovertidas</strong>, <strong>faladoras e sociáveis</strong> que também têm ansiedade — às vezes <strong>escondem isso muito bem</strong>.<br></br>
        Ter ansiedade não depende de seres <strong>tímido ou não</strong>, mas sim de como <strong>percebes o mundo</strong> e os <strong>desafios à tua volta</strong>.
        </p>
  },
  {
    texto: <p style={{color:'#234970'}}>A ansiedade não aparece do nada.</p>,
    resposta: "Verdade",
    explicacao:
      <p className="lead"><strong>Verdade!</strong> A ansiedade <strong>não aparece do nada</strong>, há sempre um <strong>“gatilho”</strong>, isto é, um <strong>estímulo que origina</strong> — pode ser um <strong>pensamento</strong>, uma <strong>memória</strong>, um <strong>som</strong>, um <strong>lugar</strong>... <br></br>
        Nem sempre conseguimos <strong>identificar logo</strong> o que foi, mas isso <strong>não quer dizer que surja do nada</strong>. A <strong>psicoterapia</strong> pode ajudar a <strong>descobrir estes gatilhos</strong>.
        </p>
  },
  {
    texto: <p style={{color:'#234970'}}>Se controlo tudo à minha volta, não vou sentir ansiedade.</p>,
    resposta: "Mito",
    explicacao:
      <p className="lead"> <strong>Mito!</strong> Muitas pessoas <strong>ansiosas</strong> tentam <strong>controlar tudo</strong> para se sentirem <strong>seguras</strong>. Mas a verdade é que a vida é cheia de coisas que <strong>não conseguimos controlar</strong>, e tentar
        controlar tudo pode deixar-te mais <strong>cansado</strong>, mais <strong>tenso</strong>… e mais <strong>ansioso</strong>.<br></br>
        <strong>Aprender a aceitar</strong> o que não controlas é um <strong>passo importante</strong> para te sentires <strong>melhor</strong>.
        </p>
  }
];




const VerdadeOuMito = () => {
  const [pagina, setPagina] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);

  const avancarPagina = () => {
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
    setMostrarPopup(true);
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
              <div className="text-center py-4">
                <h2 className="fw-bold mb-4 text-start" style={{ color: "#234970" }}>
                  Verdade ou Mito?
                </h2>
                <p className="lead mb-3">
                  <strong>Sê muito bem-vindo ou bem-vinda ao Verdade ou Mito?!</strong> <br></br><br></br>

                  Nesta atividade, terás a oportunidade de explorar <strong>diversas afirmações sobre a ansiedade</strong>. <br></br><br></br>

                  Para cada uma delas, deverás decidir se é <strong>verdade</strong> ou se se trata de um <strong>mito</strong>. <br></br><br></br>

                  Após a tua escolha, aparecerá uma <strong>explicação</strong> que te ajudará a entender melhor o que está por trás de cada afirmação.
                </p>
                <button className="custom-btn-turquoise px-4 py-2" onClick={avancarPagina}>
                 <i className="bi bi-play-fill me-2"></i> Vamos começar?
                </button>
              </div>
            )}

            {estaNaAfimacao && (
              <div className="text-center py-4">
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
                  <div className="mt-3 text-start" role="alert"
                    style={{
                      backgroundColor: "#fbf9f9",
                      color: "#000", // Opcional: para garantir boa legibilidade
                      border: "1px solid #E7C8C2",
                      padding: "20px", // espaço interno para respirar
                      borderRadius: "8px" // opcional: suaviza os cantos
                    }}>
                    {afirmacaoAtual.explicacao}
                  </div>
                )}

                <div className="d-flex justify-content-between mt-4">
                  <button
                    className="custom-btn-pink" onClick={retrocederPagina}
                    disabled={pagina === 0}
                  >
                    <i className="bi bi-arrow-left me-2"></i> Anterior
                  </button>
                  <button
                    className="custom-btn-turquoise" onClick={avancarPagina}
                    disabled={!mostrarPopup}
                  >
                    Próximo <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            )}

            {estaNaConclusao && (
              <div className="text-center py-4">
                <h4 className="fw-bold mb-4 text-start" style={{ color: "#234970" }}>Conclusão da Atividade</h4>
                <div className="lead mb-3">
                  <p>
                    <strong>Boa!</strong> Chegaste ao fim desta atividade — e isso já é <strong>um passo muito importante!</strong>
                  </p>
                  <p>
                    Ao longo desta atividade, percebemos que há muitas <strong>ideias erradas sobre a ansiedade</strong>, e que essas ideias — os chamados <strong>mitos</strong> —
                    podem fazer-nos sentir <strong>piores</strong> e mais <strong>confusos</strong> sobre o que estamos a viver.

                  </p>
                  <p>
                    A boa notícia é que, quando começamos a perceber melhor o que sentimos, tudo começa a fazer mais <strong>sentido</strong>.
                  </p>
                  <p>
                    Ao perceberes melhor o que é a <strong>ansiedade</strong> e ao deixares de acreditar nos <strong>mitos que a alimentam</strong>, dás um passo essencial para promover o teu <strong>bem-estar!</strong></p>
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
