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

  const titulos = [
  null, // 0 - intro, sem título aqui
  "O Autocriticismo",
  "Autocriticismo: Impacto no Bem-Estar",
  "Autocriticismo: Impacto nas Relações",
  "Autocriticismo: Pedir Ajuda",
  "A Autocompaixão",
  "Autocompaixão: Impacto no Bem-Estar",
  "Autocompaixão: Impacto nas Relações",
  "Autocompaixão: Pedir Ajuda",
  "Autocriticismo e Autocompaixão",
];

  const textos = [
    // Página 0: Introdução
    <>
      <div className="text-center"></div>
      <h2 className="text-center fw-bold"  style={{ color: "#234970" }}>A Voz Crítica E A Voz Compassiva</h2>
      <p className="mb-3 lead"><strong>Sê muito bem-vindo/a à Banda Desenhada da Voz Crítica e da Voz Compassiva!</strong></p>
      <p className="mb-3 lead">Nesta <strong>banda desenhada</strong>, vais acompanhar duas personagens e perceber como a <strong>voz crítica</strong> pode afetar negativamente o nosso <strong>bem-estar</strong>, as nossas <strong>relações com os outros</strong> e a nossa <strong>capacidade de pedir ajuda</strong>.</p>
      <p className="mb-3 lead">Por outro lado, vais ver como a <strong>voz compassiva</strong> pode transformar essa experiência, trazendo <strong>compreensão</strong>, <strong>cuidado</strong> e <strong>aceitação</strong>.</p>
      <p className="mb-3 lead">Para isso, lê com <strong>atenção</strong> os quadros da banda desenhada e a sua <strong>descrição</strong>.</p>
      <div className="text-center">
        <button className="custom-btn-turquoise mt-2 px-4 py-2" onClick={avancarPagina}>
         <i className="bi bi-play-fill me-2"></i> Vamos a isto?
        </button>
      </div>
      </>,
    
              // Página 1
            <>
              <div className="text-center">
                <p className="lead">
                  Vamos falar sobre algo que nos afeta a todos: aquilo a que chamamos de <strong>autocriticismo</strong>. Muitas vezes, sem perceber, tornamo-nos os nossos <strong>piores inimigos</strong>. O autocriticismo é aquela <strong>voz interna</strong> que só vê os nossos <strong>erros</strong> e <strong>falhas</strong>, sem olhar para o que <strong>fazemos bem</strong>. Isso pode afetar profundamente a forma como nos sentimos e como nos relacionamos com os outros.
                </p>
              </div>
            </>,

            // Página 2
            <>
              <div className="text-center">
                <p className="lead">
                  Quando ouvimos esta <strong>voz crítica</strong>, começamos a acreditar que as nossas <strong>falhas</strong> nos definem. O <strong>autocriticismo</strong> pode criar uma sensação constante de <strong>insuficiência</strong>, como se <strong>não fôssemos bons o suficiente</strong>. Ele pode trazer <strong>vergonha</strong>, <strong>ansiedade</strong>, <strong>tristeza</strong> e <strong>insegurança</strong>, fazendo-nos sentir <strong>distantes dos outros</strong>, como se mais ninguém passasse pelas mesmas situações ou tivesse as mesmas emoções. Esses <strong>pensamentos</strong> podem fazer-nos <strong>duvidar de nós mesmos</strong>, criando uma <strong>barreira</strong> entre o que sentimos e o que realmente somos.
                </p>
              </div>
            </>,

            // Página 3
            <>
              <div className="text-center">
                <p className="lead">
                  O <strong>autocriticismo</strong> pode afetar também as nossas <strong>relações com os outros</strong>. Podemos sentir-nos em <strong>desvantagem</strong> em relação aos outros, como se estivéssemos sempre a <strong>falhar</strong> ou a <strong>dececioná-los</strong>. Começamos a acreditar que <strong>ninguém vai gostar de nós</strong> ou que estamos constantemente a ser <strong>rejeitados</strong>. Isso cria uma sensação de <strong>isolamento</strong>, onde evitamos <strong>situações sociais</strong>, pensando que <strong>não temos valor</strong>.
                </p>
              </div>
            </>,

            // Página 4
            <>
              <div className="text-center">
                <p className="lead">
                  Quando estamos <strong>afundados no autocriticismo</strong>, acreditamos que devemos <strong>enfrentar tudo sozinhos</strong>. Pensamos que mostrar as nossas <strong>preocupações</strong> e <strong>vulnerabilidades</strong> é sinal de <strong>fraqueza</strong> ou que <strong>não somos dignos de cuidado</strong>, o que nos impede de <strong>pedir ajuda</strong>. Quando sentimos que <strong>não somos bons o suficiente</strong>, é mais fácil <strong>isolarmo-nos</strong>, porque acreditamos que os outros vão acabar por <strong>se afastar</strong>. Isso cria um <strong>ciclo de solidão</strong>, onde nos sentimos <strong>rejeitados</strong> e não damos aos outros a oportunidade de <strong>fazerem parte das nossas vidas</strong>.
                </p>
              </div>
            </>,

            // Página 5
            <>
              <div className="text-center">
                <p className="lead">
                  Uma alternativa ao <strong>autocriticismo</strong> é a <strong>autocompaixão</strong>. A autocompaixão é a capacidade de sermos <strong>gentis</strong> e <strong>compreensivos connosco mesmos</strong> nos <strong>momentos difíceis</strong>. Em vez de <strong>nos criticarmos</strong>, é sermos capazes de <strong>reconhecer o nosso sofrimento</strong> e, perante ele, adotarmos uma atitude de <strong>cuidado</strong> e <strong>bondade</strong>, reconhecendo que <strong>todos temos falhas</strong> e que isso <strong>não nos torna menos merecedores de compreensão e apoio</strong>.
                </p>
              </div>
            </>,

            // Página 6
            <>
              <div className="text-center">
                <p className="lead">
                  A <strong>autocompaixão</strong> não significa <strong>ignorar os nossos erros</strong>, mas sim <strong>olharmos para eles com compreensão</strong> e <strong>vontade de melhorar</strong>. Ao <strong>praticá-la</strong>, criamos um <strong>ambiente interno seguro e positivo</strong>, onde podemos <strong>aprender</strong>, em vez de nos criticarmos. Esta nova forma de <strong>nos tratarmos a nós mesmos</strong> é essencial para o nosso <strong>bem-estar</strong>. Cada vez que enfrentamos uma <strong>situação difícil</strong>, temos a <strong>oportunidade de escolher</strong> a forma como <strong>falamos connosco</strong>.
                </p>
              </div>
            </>,

            // Página 7
            <>
              <div className="text-center">
                <p className="lead">
                  Quando <strong>praticamos a autocompaixão</strong>, as nossas <strong>relações com os outros</strong> também melhoram. Ao sermos mais <strong>gentis connosco</strong>, podemos ser mais <strong>genuínos</strong> nas nossas interações. Isso faz com que as nossas <strong>amizades</strong> e <strong>conexões</strong> se tornem mais <strong>autênticas</strong>, porque <strong>não estamos a tentar esconder as nossas imperfeições</strong>. A <strong>autocompaixão</strong> não só nos faz mais <strong>compreensivos connosco</strong>, como também nos ajuda a <strong>receber o carinho e apoio que merecemos</strong> dos outros à nossa volta.
                </p>
              </div>
            </>,

            // Página 8
            <>
              <div className="text-center">
                <p className="lead">
                  A <strong>autocompaixão</strong> também significa saber <strong>pedir ajuda</strong> quando necessário. Quando <strong>reconhecemos o nosso sofrimento</strong> e aceitamos que <strong>precisamos de ajuda</strong>, estamos a dar o <strong>primeiro passo para o nosso bem-estar</strong>. Todos <strong>merecemos cuidar de nós mesmos</strong> e <strong>procurar ajuda</strong> quando precisamos.
                </p>
              </div>
            </>,

            // Página 9
            <>
              <div className="text-center">
                <p className="lead">
                  A <strong>voz crítica</strong> pode sempre estar por perto, mas <strong>não define quem somos</strong>. Ela <strong>faz parte de nós</strong>, mas <strong>não é a nossa verdade</strong>. Quando começamos a <strong>reconhecê-la</strong> e a <strong>perceber de onde vem</strong>, podemos começar a <strong>construir uma relação mais saudável connosco</strong> — uma relação baseada na <strong>aceitação</strong>, no <strong>cuidado</strong> e no <strong>respeito por quem somos</strong>.
                </p>
              </div>
            </>, 

          // Página 10 - Reflexão
        <>
          <div className="text-center"></div>
          <h4 className="text-center fw-bold" style={{ color: "#234970" }}>Vamos Refletir!</h4>

          {mostrarErro && (
            <div className="alert alert-danger mb-3" role="alert" aria-live="assertive">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Por favor, preenche os dois campos antes de avançar.
            </div>
          )}

          <div className="row">
            <div className="col-md-12">
              <p className="lead mb-3">
                Agora, vou pedir-te que <strong>reflitas</strong> sobre como <strong>a tua voz crítica e a tua voz compassiva</strong> podem moldar a forma <strong>como te sentes, como te relacionas com os outros e como lidas com os desafios</strong>.
                <br /><br />
                Identifica o <strong>pensamento mais comum</strong> que a tua voz crítica te diz e escreve <strong>uma frase compassiva</strong> que possas usar como alternativa sempre que esse pensamento surgir. Escreve no espaço abaixo indicado.<br /><br />
              </p>
            </div>

            <div className="mb-3">
              <label htmlFor="vozCritica" className="form-label lead">
                <strong>O meu pensamento crítico é:</strong>
              </label>
              <textarea
                id="vozCritica"
                required
                className={`form-control ${mostrarErro && !vozCritica.trim() ? 'is-invalid' : ''}`}
                placeholder="Escreve aqui o teu pensamento crítico"
                value={vozCritica}
                onChange={(e) => {
                  setVozCritica(e.target.value);
                  if (mostrarErro) setMostrarErro(false);
                }}
                aria-required="true"
                aria-invalid={mostrarErro && !vozCritica.trim()}
                aria-describedby={mostrarErro && !vozCritica.trim() ? "error-vozCritica" : undefined}
              
              ></textarea>
              {mostrarErro && !vozCritica.trim() && (
                <div id="error-vozCritica" className="invalid-feedback" role="alert">
                  Este campo é obrigatório.
               </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="vozCompassiva" className="form-label lead">
                <strong>A minha frase compassiva é:</strong>
              </label>
              <textarea
                id="vozCompassiva"
                required
                className={`form-control ${mostrarErro && !vozCompassiva.trim() ? 'is-invalid' : ''}`}
                placeholder="Escreve aqui a tua frase compassiva"
                value={vozCompassiva}
                onChange={(e) => {
                  setVozCompassiva(e.target.value);
                  if (mostrarErro) setMostrarErro(false);
                }}
                aria-required="true"
                aria-invalid={mostrarErro && !vozCompassiva.trim()}
                aria-describedby={mostrarErro && !vozCompassiva.trim() ? "error-vozCompassiva" : undefined}
              ></textarea>
              {mostrarErro && !vozCompassiva.trim() && (
                <div id="error-vozCompassiva" className="invalid-feedback" role="alert">
                  Este campo é obrigatório.
                </div>
              )}
          </div>   
        </div>    
      </>,    
  

    // Página 11 - Conclusão
    <>
    <div className="text-center"></div>
      <h4 className="text-center fw-bold"  style={{ color: "#234970" }}>Conclusão da Atividade</h4>
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
            
            {pagina >= 1 && pagina <= 9 && titulos[pagina] && (
                <h4 className="text-center fw-bold mb-3" style={{ color: "#234970" }}>
                  {titulos[pagina]}
                </h4>
              )}     
            
            {imagens[pagina] && (
              <div className="text-center mb-4">
                <img
                  src={imagens[pagina]}
                  alt={`Página ${pagina}`}
                  className="img-fluid"
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    height: "auto",
                    objectFit: "cover",
                  }}
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
              <button
                className="custom-btn-turquoise"
                onClick={avancarPagina}
              >
                {pagina === 9 ? "Refletir" : "Próximo"} <i className="bi bi-arrow-right ms-2"></i>
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