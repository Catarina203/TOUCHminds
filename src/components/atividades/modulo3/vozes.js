import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import AtividadeProgressao from "../atividadeProgressao";

const AtividadeVozCritica = () => {
  const [pagina, setPagina] = useState(0);
  const [vozCritica, setVozCritica] = useState("");
  const [vozCompassiva, setVozCompassiva] = useState("");
  const [mostrarErro, setMostrarErro] = useState(false);
  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);

  const avancarPagina = () => {
    // Validação para a página de reflexão (página 10)
    if (pagina === 10) {
      if (!vozCritica.trim() || !vozCompassiva.trim()) {
        setMostrarErro(true);
        return;
      }
      setMostrarErro(false);
    }
    setPagina((prev) => prev + 1);
  };

  const retrocederPagina = () => setPagina((prev) => prev - 1);

  const progresso = Math.round((pagina / 12) * 100);

  const imagens = [
    null, // Página 0: instrução
    "/imgs/modulo3/vozes/vozes1.png",
    "/imgs/modulo3/vozes/vozes2.png",
    "/imgs/modulo3/vozes/vozes3.png",
    "/imgs/modulo3/vozes/vozes4.png",
    "/imgs/modulo3/vozes/vozes5.png",
    "/imgs/modulo3/vozes/vozes6.png",
    "/imgs/modulo3/vozes/vozes7.png",
    "/imgs/modulo3/vozes/vozes8.png",
    "/imgs/modulo3/vozes/vozes9.png",
    null,
    null, // Reflexão
    null  // Conclusão
  ];

  const textos = [
    // Página 0: Introdução
    <>
      <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>A Voz Crítica E A Voz Compassiva</h2>
      <p className="mb-3 lead"><strong>Sê muito bem-vindo ou bem-vinda à Banda Desenhada da Voz Crítica e da Voz Compassiva!</strong></p>
      <p className="mb-3 lead">Nesta <strong>banda desenhada</strong>, vais acompanhar duas personagens e perceber como a <strong>voz crítica</strong> pode afetar negativamente o nosso <strong>bem-estar</strong>, as nossas <strong>relações com os outros</strong> e a nossa <strong>capacidade de pedir ajuda</strong>.</p>
      <p className="mb-3 lead">Por outro lado, vais ver como a <strong>voz compassiva</strong> pode transformar essa experiência, trazendo <strong>compreensão</strong>, <strong>cuidado</strong> e <strong>aceitação</strong>.</p>
      <p className="mb-3 lead">Para isso, lê com <strong>atenção</strong> os quadros da banda desenhada e a sua <strong>descrição</strong>.</p>
      <p className="mb-3 lead">No final da atividade, vais <strong>refletir</strong> sobre a tua própria <strong>voz crítica</strong> e <strong>voz compassiva</strong>. Vais ser convidado/a a pensar no que a tua voz crítica costuma dizer-te nos <strong>momentos difíceis</strong> e em como poderias <strong>responder a ela com mais gentileza e compreensão</strong>.</p>
      <div className="text-center">
        <button className="custom-btn-turquoise mt-2 px-4 py-2" onClick={avancarPagina}>
         <i className="bi bi-play-fill me-2"></i> Vamos a isto?
        </button>
      </div>
    </>,
    // Página 1
    <>Vamos falar sobre algo que nos afeta a todos: aquilo a que chamamos de <strong>autocriticismo</strong>. <br></br>
      Muitas vezes, sem perceber, tornamo-nos os nossos <strong>piores inimigos</strong>. O autocriticismo é aquela <strong>voz interna</strong> que só vê os nossos <strong>erros</strong> e <strong>falhas</strong>, sem olhar para o que <strong>fazemos bem</strong>.<br></br>
      Isso pode afetar profundamente a forma como nos sentimos e como nos relacionamos com os outros.</>,
    // Página 2
    <>Quando ouvimos esta <strong>voz crítica</strong>, começamos a acreditar que as nossas <strong>falhas nos definem</strong>.<br></br>
      O <strong>autocriticismo</strong> pode criar uma sensação constante de <strong>insuficiência</strong>, como se <strong>não fôssemos bons o suficiente</strong>. <br></br>
      Ele pode trazer <strong>vergonha</strong>, <strong>ansiedade</strong>, <strong>tristeza</strong> e <strong>insegurança</strong>, fazendo-nos sentir <strong>distantes dos outros</strong>, mesmo quando não é verdade.<br></br>
      Esses <strong>pensamentos</strong> podem fazer-nos <strong>duvidar de nós mesmos</strong>, criando uma <strong>barreira</strong> entre o que sentimos e o que realmente somos.</>,
    // Página 3
    <>O <strong>autocriticismo</strong> pode afetar também as nossas <strong>relações com os outros</strong>.<br></br>
      Podemos sentir-nos em <strong>desvantagem</strong> em relação aos outros, como se estivéssemos sempre a <strong>falhar</strong> ou a <strong>dececioná-los</strong>. <br></br>
      Começamos a acreditar que <strong>ninguém vai gostar de nós</strong> ou que estamos constantemente a ser <strong>rejeitados</strong>. <br></br>
      Isso cria uma sensação de <strong>isolamento</strong>, onde evitamos <strong>situações sociais</strong>, pensando que <strong>não temos valor</strong>.</>,
    // Página 4
    <>Quando estamos <strong>afundados no autocriticismo</strong>, acreditamos que devemos <strong>enfrentar tudo sozinhos</strong>. <br></br>
      Pensamos que nos mostrarmos <strong>vulneráveis</strong> é sinal de <strong>fraqueza</strong> ou que <strong>não somos dignos de cuidado</strong>, o que nos impede de <strong>pedir ajuda</strong>. <br></br>
      Quando sentimos que <strong>não somos bons o suficiente</strong>, é mais fácil <strong>isolarmo-nos</strong>, achando que os outros vão acabar por se afastar.<br></br>
      Isso cria um <strong>ciclo de solidão</strong>, onde nos sentimos <strong>rejeitados</strong>, mesmo quando <strong>não estamos a ser rejeitados de verdade</strong>.</>,
    // Página 5
    <>Uma alternativa ao <strong>autocriticismo</strong> é a <strong>autocompaixão</strong>. <br></br>
    A autocompaixão é a capacidade de sermos <strong>gentis</strong> e <strong>compreensivos connosco mesmos</strong> nos <strong>momentos difíceis</strong>. <br></br>
    Em vez de nos <strong>criticarmos</strong>, é sermos capazes de <strong>reconhecer o nosso sofrimento</strong> e, perante ele, adotarmos uma atitude de <strong>cuidado</strong> e <strong>bondade</strong>, reconhecendo que <strong>todos temos falhas</strong> e que isso <strong>não nos torna menos merecedores de compreensão e apoio</strong>.</>,
    // Página 6
    <>A <strong>autocompaixão</strong> não significa <strong>ignorar os nossos erros</strong>, mas sim olharmos para eles com <strong>compreensão</strong> e <strong>vontade de melhorar</strong>. <br></br>
    Ao <strong>praticá-la</strong>, criamos um <strong>ambiente interno seguro e positivo</strong>, onde podemos <strong>aprender</strong>, em vez de nos criticarmos. <br></br>
    Esta nova forma de <strong>nos tratarmos a nós mesmos</strong> é essencial para o nosso <strong>bem-estar</strong>. <br></br>
    Cada vez que enfrentamos uma <strong>situação difícil</strong>, temos a <strong>oportunidade de escolher</strong> a forma como <strong>falamos connosco</strong>.</>,
    // Página 7
    <>Quando praticamos a <strong>autocompaixão</strong>, as nossas <strong>relações com os outros</strong> também melhoram. <br></br>
    Ao sermos mais <strong>gentis connosco</strong>, podemos ser mais <strong>genuínos</strong> nas nossas interações.<br></br>
     Isso faz com que as nossas <strong>amizades</strong> e <strong>conexões</strong> se tornem mais <strong>autênticas</strong>, porque <strong>não estamos a tentar esconder as nossas imperfeições</strong>. <br></br>
     A autocompaixão não só nos faz mais <strong>compreensivos connosco</strong>, como também nos ajuda a <strong>receber o carinho e apoio que merecemos</strong>.</>,
    // Página 8
    <>A <strong>autocompaixão</strong> também significa saber <strong>pedir ajuda quando necessário</strong>. <br></br>
    Quando <strong>reconhecemos o nosso sofrimento</strong> e aceitamos que <strong>precisamos de ajuda</strong>, estamos a dar o <strong>primeiro passo para o nosso bem-estar</strong>. 
    Todos <strong>merecemos cuidar de nós mesmos</strong> e <strong>procurar ajuda</strong> quando precisamos.</>,
    // Página 9
    <>A <strong>voz crítica</strong> pode sempre estar por perto, mas <strong>não define quem somos</strong>. <br></br>
    Ela <strong>faz parte de nós</strong>, mas <strong>não é a nossa verdade</strong>. <br></br>
    Quando começamos a <strong>reconhecê-la</strong> e a perceber <strong>de onde vem</strong>, podemos começar a construir uma <strong>relação mais saudável connosco</strong> — uma relação baseada na <strong>aceitação</strong>, no <strong>cuidado</strong> e no <strong>respeito por quem somos</strong>.</>,
    // Página 10 - Reflexão
    <>
      <h4 className="fw-bold mb-3 text-start" style={{ color: "#234970" }}>Vamos refletir!</h4>
      <p className="mb-3 lead">Pensa no <strong>pensamento mais comum</strong> que a tua <strong>voz crítica</strong> te diz e escreve uma <strong>resposta mais gentil e acolhedora</strong>.</p>
      {mostrarErro && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Por favor, preenche ambos os campos antes de avançar.
        </div>
      )}
      <label className="lead"><strong><strong>O que é que a tua voz crítica te costuma dizer nos momentos difíceis?</strong></strong></label>
      <textarea
        required
        className="form-control mb-3"
        placeholder="Exemplo: Nunca faço nada de jeito"
        value={vozCritica}
        onChange={(e) => {
          setVozCritica(e.target.value);
          if (mostrarErro) setMostrarErro(false);
        }}
      ></textarea>
      <label className="lead"><strong><strong>Como poderias responder a essa voz com mais gentileza e compreensão?</strong></strong></label>
      <textarea
        required
        className="form-control mb-3"
        placeholder="Exemplo: Eu sei que te sentes desapontado..."
        value={vozCompassiva}
        onChange={(e) => {
          setVozCompassiva(e.target.value);
          if (mostrarErro) setMostrarErro(false);
        }}
      ></textarea>
    </>,
    // Página 11 - Conclusão
    <>
      <h4 className="fw-bold mb-4 text-start" style={{ color: "#234970" }}>Conclusão da Atividade</h4>
      <p className="mb-3 lead">Ao longo desta atividade, tiveste a oportunidade de <strong>refletir</strong> sobre como as nossas <strong>vozes internas</strong> podem impactar o nosso <strong>bem-estar</strong>, as nossas <strong>relações com os outros</strong> e a nossa <strong>capacidade de pedir ajuda</strong>.</p>
      <p className="mb-3 lead">A <strong>voz crítica</strong>, muitas vezes, pode ser muito <strong>severa</strong>, levando-nos a <strong>duvidar de nós mesmos</strong> e a sentir que <strong>não somos bons o suficiente</strong>.</p>
      <p className="mb-3 lead">Mas, como vimos, a <strong>voz compassiva</strong> nos oferece uma maneira diferente de lidar com os <strong>desafios da vida</strong> — com <strong>gentileza</strong>, <strong>compreensão</strong> e <strong>aceitação</strong>.</p>
      <p className="mb-3 lead">Ao praticarmos a <strong>autocompaixão</strong>, começamos a <strong>cultivar um espaço interno mais saudável</strong>, onde podemos <strong>aprender com os nossos erros</strong> e sermos mais <strong>genuínos</strong> e <strong>felizes</strong> nas nossas relações.</p>
      <p className="mb-3 lead">Agora que <strong>refletiste</strong> sobre a tua própria <strong>voz crítica</strong> e <strong>voz compassiva</strong>, lembra-te: todas as <strong>vozes fazem parte de ti</strong>, mas a forma como <strong>escolhes ouvi-las e responder-lhes</strong> pode mudar a forma como <strong>te sentes</strong> e <strong>te relacionas com o mundo à tua volta</strong>.</p>
      <p className="mb-3 lead"><strong>Escolher ser mais compassivo contigo mesmo/a</strong> é um passo importante para o teu <strong>bem-estar</strong>.</p>
    </>
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
            {imagens[pagina] && (
              <div className="text-center mb-4">
                <img
                  src={imagens[pagina]}
                  alt={`Página ${pagina}`}
                  className="img-fluid"
                  style={{ maxWidth: "400px", height: "auto" }}
                />
              </div>
            )}
            <div className="mb-4 font-lato">{textos[pagina]}</div>
            <div className="d-flex justify-content-between">
              {pagina > 0 && (
                <button className="custom-btn-pink" onClick={retrocederPagina}>
                  <i className="bi bi-arrow-left me-2"></i>Anterior
                </button>
              )}
              {pagina < 11 && pagina > 0 ? (
                <button className="custom-btn-turquoise" onClick={avancarPagina}>
                  Próximo<i className="bi bi-arrow-right ms-2"></i>
                </button>
              ) : pagina === 11 ? (
                <AtividadeProgressao
                  moduloId={moduloId}
                  atividadeIndex={0}
                  updateUserData={updateUserData}
                />
              ) : null}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtividadeVozCritica;