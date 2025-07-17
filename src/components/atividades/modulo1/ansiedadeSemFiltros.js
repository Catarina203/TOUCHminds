import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import modulos from '../../../data/modulos';
import AtividadeProgressao from '../atividadeProgressao';

const AnsiedadeSemFiltros = () => {
  const [pagina, setPagina] = useState(0);
  const [hashtags, setHashtags] = useState(Array(12).fill(""));
  const [inputError, setInputError] = useState(false);

  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);

  const modulo = modulos.find((m) => m.id === moduloId);
  const atividade = modulo?.atividades.find(a => a.url === "ansiedade-sem-filtros");

  const avancarPagina = () => {
    if (pagina > 0 && pagina <= 12 && !hashtags[pagina - 1].trim()) {
      setInputError(true);
      return;
    }
    setInputError(false);
    setPagina((prev) => prev + 1);
  };

  const retrocederPagina = () => {
    setInputError(false);
    setPagina((prev) => prev - 1);
  };

  const progresso = Math.round((pagina / 14) * 100);

  const handleHashtagChange = (index, value) => {
    if (value.includes(" ") || value.includes(",")) {
      setInputError(true);
      return;
    }
    const newHashtags = [...hashtags];
    newHashtags[index] = value;
    setHashtags(newHashtags);
    if (inputError && value.trim() !== "") {
      setInputError(false);
    }
  };

  const descricoesImagem = {
    1: "Quase 14% dos adolescentes sofrem de alguma perturbação de saúde mental. Muitas destas perturbações não são identificadas nem tratadas. As perturbações de ansiedade geralmente começam na infância ou adolescência e são comuns entre os adolescentes. Afetando cerca de 5.5% dos jovens entre 15 e 19 anos.",
    2: "Ansiedade na adolecência. Ter ansiedade na adolescência pode aumentar a probabilidade de continuar a sentir ansiedade. na vida adulta, além de outras dificultades, como o consumo de álcool ou drogas a a depressão. Também pode afetar a tua saúde, o bem-estar e o desempenho escolar. Por isso, é importante reconhecer os sinais de ansiedade e procurar ajuda o mais cedo possivel, para prevenir consequências no futuro.",
    3: "Muitos adolescentes ainda tem alguma dificuldade em pedir ajuda. Uma das razões para isso é que nem sempre é fácil perceber que aquilo que se está a sentir pode ser um problema de saúde mental. Por vezes, falta informação e, por isso, alguns adolescentes não reconhecem a gravidade da situação ou nem identificam o que sentem como um problema de saúde mental. Além disso, é comum muitos preferirem lidar com as dificuldades sozinhos, em vez de pedirem ajuda a alguém.",
    4: "Quando a ansiedade se torna um problema. A ansiedade faz parte das nossas vidas e é útil, ajudando-nos a preparar para desafios ou situações novas. Mas quando é demasiado intensa, prolongada no tempo e interfere com o dia a dia, pode tratar-se de uma perturbação de ansiedade.",
    5: "As perturbações de ansiedade. Fobia específica. Medo, ansiedade ou evitamento persistente perante certos objetos ou situações (como animais, alturas, agulhas...). O medo é desproporcional e pode levar a evitar essas situações.",
    6: "As perturbações de ansiedade. Perturbação de ansiedade social. Medo intenso de situações sociais ou de desempenho, como falar em público ou interagir com desconhecidos, por receio de ser julgado.",
    7: "As perturbações de ansiedade. Perturbação de pânico. Ataques de pânico inesperados e recorrentes - episódios de medo muito intenso com sintomas como batimentos cardíacos acelerados, falta de ar, tonturas.",
    8: "As perturbações de ansiedade. Perturbação de ansiedade generalisada. Ansiedade e preocupação excessivas, persistentes e difíceis de controlar em vários contextos (como escola, saúde, família), mesmo quando não há razão clara.",
    9: "As perturbações de ansiedade. Perturbação de ansiedade de separação. Medo ou ansiedade excessivos perante a separação de figuras importantes (como os pais), que não corresponde à idade ou fase de desenvolvimento.",
    10:"As perturbações de ansiedade. Agrofobia. Medo ou ansiedade de estar em locais ou situações das quais pode ser difícil sair ou onde possa não haver ajuda em caso de mal-estar (como transportes públicos, espaços abertos ou multidões).",
    11:"As perturbações de ansiedade. Perturbação obsessivo-compulsiva. Presença de pensamentos ou imagens indesejadas e repetitivas e/ou comportamentos repetitivos que a pessoa sente que tem de fazer para aliviar a ansiedade.",
    12:"As perturbações de ansiedade. Perturbação de stress pós-traumático.Ansiedade intensa depois de viver ou presenciar um acontecimento traumático. Pode incluir reviver o trauma, evitar tudo o que o relembre, sentir-se em constante alerta ou alterações de humor."
  };

  return (
    <div className="container-fluid vh-100 p-0 font-poppins">
      <Navbar />
      <div className="row h-100 m-0">
        <Sidebar />
        <div className="col px-4 py-4" style={{ backgroundColor: "#FBF9F9" }}>
          <div className="container p-5 bg-white rounded shadow-sm">
            <div
              className="progress mb-4"
              style={{ height: "8px" }}
              role="progressbar"
              aria-valuenow={progresso}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label={`Progresso da atividade: ${progresso}% concluído`}
            >
              <div
                className="progress-bar"
                style={{ width: `${progresso}%`, backgroundColor: "#99CBC8" }}
              ></div>
            </div>

            {/* INTRODUÇÃO */}
            {pagina === 0 && (
              <div className="text-start py-4">
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>
                  {atividade?.titulo || "Ansiedade: Aliada ou Empecilho?"}
                </h2>
                <div className="row">
                  <div className="col-md-12">
                    <p className="lead">
                      <strong>Sê muito bem-vindo ou bem-vinda ao Ansiedade Sem Filtros.</strong><br /><br />
                      Nesta <strong>atividade</strong>, vais ver uma <strong>sequência de imagens</strong> com informações
                      sobre a <strong>ansiedade na adolescência</strong> — como aparece, o <strong>impacto</strong> que pode ter e porque
                      é tão importante falarmos sobre isto.<br /><br />
                      Imagina que estás a fazer <strong>scroll no Instagram</strong> e deste de caras com um post sobre este tema. Lê cada imagem com <strong>atenção</strong> e, no final, reage com um <strong>hashtag</strong> que mostre o que sentiste ao ver aquela informação.<br />
                      Podes escrever <strong>qualquer hashtag</strong> — algo que sintas, penses ou te venha à cabeça naquele momento.<br /><br />
                      O <strong>objetivo</strong> é parares um instante e <strong>refletires</strong> sobre o que estás a ver e como isso te <strong>faz sentir</strong>.
                    </p>
                    <div className="text-center">
                      <button
                        className="mt-3 px-4 py-2 custom-btn-turquoise"
                        onClick={avancarPagina}
                        aria-label="Começar a atividade"
                      >
                        <i className="bi bi-play-fill me-2" aria-hidden="true"></i>
                        Vamos a isto?
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 12 IMAGENS COM HASHTAG INPUTS */}
            {pagina > 0 && pagina <= 12 && (
              <>
                <h4 className="fw-bold mb-3" style={{ color: "#234970" }}>
                  Imagem {pagina} de 12
                </h4>
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <img
                      src={`/imgs/modulo1/hashtag/hashtag_${pagina}.png`}
                      alt={`Imagem ${pagina} sobre ansiedade`} // breve
                      aria-describedby={`descricao-imagem-${pagina}`}
                      className="img-fluid rounded"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "400px",
                        objectFit: "contain"
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div id={`descricao-imagem-${pagina}`} className="visually-hidden">
                      {descricoesImagem[pagina]}
                    </div>
                  </div>


                  <div className="input-group mx-auto" style={{ maxWidth: "500px" }}>
                    <span
                      className="input-group-text"
                      id="hashtag-addon"
                      style={{
                        border: '1px solid #99CBC8',
                        borderRight: 'none',
                        backgroundColor: 'white',
                        borderTopLeftRadius: '0.375rem',
                        borderBottomLeftRadius: '0.375rem'
                      }}
                    >
                      <i className="bi bi-hash" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      className={`bdform-control form-control ${inputError ? 'is-invalid' : ''}`}
                      style={{
                        border: '1px solid #99CBC8',
                        borderLeft: 'none'
                      }}
                      placeholder="hashtag"
                      value={hashtags[pagina - 1]}
                      onChange={(e) => handleHashtagChange(pagina - 1, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "," || e.key === "Tab") {
                          e.preventDefault();
                          setInputError(true);
                        }
                      }}
                      aria-label={`Introduz uma hashtag para a imagem ${pagina}`}
                      aria-describedby="hashtag-addon"
                      required
                    />
                    {inputError && (
                      <div className="invalid-feedback" role="alert">
                        Usa apenas uma palavra, sem espaços nem vírgulas.
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    className="custom-btn-pink"
                    onClick={retrocederPagina}
                    aria-label="Voltar à imagem anterior"
                  >
                    <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
                    Anterior
                  </button>
                  <button
                    className="custom-btn-turquoise"
                    onClick={avancarPagina}
                    aria-label={pagina === 12 ? "Ver reflexão final" : "Avançar para a próxima imagem"}
                  >
                    {pagina === 12 ? "Ver reflexão" : "Próximo"}
                    <i className="bi bi-arrow-right ms-2" aria-hidden="true"></i>
                  </button>
                </div>
              </>
            )}

            {/* CONCLUSÃO */}
            {pagina === 13 && (
              <>
                <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>
                  Conclusão da Atividade
                </h4>
                <p className="lead">
                  Agora que refletiste sobre as imagens e reagiste com <strong>hashtags</strong>, percebeste que a <strong>ansiedade</strong> não é algo <strong>isolado</strong>. Pelo
                  contrário, afeta muitos <strong>jovens</strong> e pode, por vezes, ser um <strong>problema maior</strong> do que parece.<br /><br />
                  Ao longo das imagens, <strong>exploraste</strong> como a ansiedade pode <strong>surgir</strong>, como ela pode <strong>persistir</strong> ao longo do
                  tempo e os <strong>desafios</strong> que traz a muitos adolescentes.<br /><br />
                  Ao mesmo tempo, <strong>aprendeste</strong> que a ansiedade não é um problema que deva ser <strong>ignorado</strong>, mas sim <strong>reconhecido</strong> e <strong>cuidado</strong>,
                  para evitar consequências mais graves no futuro.<br /><br />
                  A informação que partilhaste através dos hashtags ajuda-te a entender e expressar as diferentes <strong>emoções</strong> que sentiste ao aprender sobre as diversas
                  formas de ansiedade e como elas afetam o nosso <strong>bem-estar</strong>, a nossa <strong>saúde mental</strong> e o nosso <strong>futuro</strong>.<br /><br />
                  Lembra-te que <strong>falar</strong> sobre isso é <strong>fundamental</strong> para lidar com os desafios da saúde mental.
                </p>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    className="custom-btn-pink"
                    onClick={retrocederPagina}
                    aria-label="Voltar à última imagem"
                  >
                    <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
                    Anterior
                  </button>
                  <AtividadeProgressao
                    moduloId={moduloId}
                    atividadeIndex={3}
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

export default AnsiedadeSemFiltros;
