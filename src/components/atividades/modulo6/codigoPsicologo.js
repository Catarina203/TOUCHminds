import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import modulos from '../../../data/modulos';
import AtividadeProgressao from '../atividadeProgressao';

const CodigoDoPsicologo = () => {
  const [pagina, setPagina] = useState(0);
  const [codigoInput, setCodigoInput] = useState("");
  const [erroVazio, setErroVazio] = useState(false);
  const [erroIncorreto, setErroIncorreto] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);
  const [acertou, setAcertou] = useState(false);

  const modulo = modulos.find((m) => m.id === moduloId);

  // Códigos e suas respectivas palavras
  const codigos = [
    { numeros: "5 - 19 - 3 - 21 - 20 - 1", palavra: "ESCUTA" },
    { numeros: "22 - 5 - 18 - 4 - 1 - 4 - 5", palavra: "VERDADE" },
    { numeros: "16 - 18 - 9 - 22 - 1 - 3 - 9 - 4 - 1 - 4 - 5", palavra: "PRIVACIDADE" },
    { numeros: "12 - 5 - 22 - 1 - 18 - 0 - 1 - 0 - 19 - 5 - 18 - 9 - 15", palavra: "LEVAR A SERIO" },
    { numeros: "16 - 1 - 18 - 20 - 9 - 3 - 9 - 16 - 1 - 3 - 1 - 15", palavra: "PARTICIPACAO" },
    { numeros: "15 - 16 - 9 - 14 - 9 - 1 - 15", palavra: "OPINIAO" }
  ];

  const tabelaSubstituicao = [
  ['A', '1'], ['B', '2'], ['C', '3'], ['D', '4'], ['E', '5'], ['F', '6'],
  ['G', '7'], ['H', '8'], ['I', '9'], ['J', '10'], ['K', '11'], ['L', '12'],
  ['M', '13'], ['N', '14'], ['O', '15'], ['P', '16'], ['Q', '17'], ['R', '18'],
  ['S', '19'], ['T', '20'], ['U', '21'], ['V', '22'], ['W', '23'], ['X', '24'],
  ['Y', '25'], ['Z', '26'], ['Espaço', '0']  
];

const textosPorPagina = [
  {
    codigo: codigos[0],
    resposta: (
      <>
        Na consulta, a pessoa é ouvida com <strong>atenção</strong> e <strong>respeito</strong>. 
        O psicólogo não dá <strong>ordens</strong> nem diz o que fazer, 
        mas para criar um <strong>espaço seguro</strong> onde é possível partilhar 
        <strong> pensamentos</strong> e <strong>emoções</strong> e encontrar, em conjunto, novos <strong>caminhos</strong> para a <strong>mudança</strong>.
      </>
    )
  },
  {
    codigo: codigos[1],
    resposta: (
      <>
        A <strong>intervenção psicológica</strong> é <strong>transparente</strong>.  
        Não existem <strong>segredos</strong> nem <strong>respostas iguais</strong> para todos, 
        e também não se resolve em duas ou três <strong>sessões</strong>.  
        Cada <strong>passo</strong> é explicado de forma <strong>simples</strong>, permitindo que a pessoa 
        compreenda o <strong>processo</strong> e decida o que deseja para o seu <strong>percurso terapêutico</strong>.
      </>
    )
  },
  {
    codigo: codigos[2],
    resposta: (
      <>
        O que é <strong>partilhado</strong> em consulta é <strong>confidencial</strong>, 
        exceto em situações de <strong>risco</strong> para si próprio/a ou para outros.  
        O <strong>respeito</strong> pelo <strong>tempo</strong>, <strong>espaço</strong> e <strong>experiências</strong> da pessoa é garantido.  
        A <strong>psicologia</strong> não é apenas para casos muito <strong>graves</strong>: 
        pode ser procurada por qualquer pessoa que queira cuidar do seu <strong>bem-estar</strong>.
      </>
    )
  },
  {
    codigo: codigos[3],
    resposta: (
      <>
        Cada <strong>opinião</strong>, <strong>pensamento</strong> e <strong>emoção</strong> é <strong>valorizado</strong>.  
        Nada do que é partilhado é <strong>desconsiderado</strong> ou <strong>diminuído</strong>.  
        Ser <strong>levada a sério</strong> significa que a pessoa é sempre reconhecida no seu direito de ser <strong>ouvida</strong>.  
        A intervenção não se limita ao <strong>passado</strong>: 
        o foco está no <strong>presente</strong>, no <strong>futuro</strong> ou em <strong>experiências</strong> anteriores.
      </>
    )
  },
  {
    codigo: codigos[4],
    resposta: (
      <>
        A pessoa tem <strong>voz ativa</strong> no <strong>processo</strong>.  
        As <strong>decisões</strong> são discutidas em <strong>conjunto</strong>, e não impostas.  
        O psicólogo apoia à <strong>reflexão</strong>, mas a <strong>escolha final</strong> é sempre construída de acordo com o que é mais <strong>significativo</strong> para a pessoa.
      </>
    )
  },
  {
    codigo: codigos[5],
    resposta: (
      <>
        Em consulta, é possível expressar <strong>ideias</strong>, <strong>sentimentos</strong> e <strong>opiniões</strong> sem receio de <strong>julgamento</strong>.  
        O psicólogo <strong>valoriza</strong> essa expressão e não prescreve <strong>medicação</strong> — essa é uma função médica.  
        O que a pessoa partilha é tido em conta nas <strong>decisões</strong> sobre a <strong>intervenção</strong>.
      </>
    )
  }
];

  const totalPaginas = 8;;
  const progresso = Math.round(((pagina + 1) / totalPaginas) * 100);

const normalizar = (s) =>
  (s || "")
    .normalize("NFD")                // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // tira acentos
    .replace(/\s+/g, " ")            // comprime espaços múltiplos em 1 só
    .trim()
    .toUpperCase();

    const codigoCorretoAtual = pagina > 0 && pagina <= 6
  ? textosPorPagina[pagina - 1].codigo.palavra
  : "";

 const avancarPagina = () => {
  if (pagina > 0 && pagina <= 6) {
    // Campo vazio → WARNING
    if (!codigoInput.trim()) {
      setErroVazio(true);
      setErroIncorreto(false);
      setShowValidationError(true);  // mostra o alert-warning
      setAcertou(false);
      return;
    }
    // Código errado → DANGER
    if (!acertou) {
      setErroIncorreto(true);        // mostra o alert-danger
      setErroVazio(false);
      setShowValidationError(false);  // <— garantir que o warning NÃO aparece
      return;
    }
  }
  // Se chegou aqui, pode avançar
  setErroVazio(false);
  setErroIncorreto(false);
  setShowValidationError(false);
  setCodigoInput("");
  setAcertou(false);
  setPagina((prev) => prev + 1);
};

 const retrocederPagina = () => {
  setErroVazio(false);
  setErroIncorreto(false);
  setShowValidationError(false);
  setAcertou(false);
  setCodigoInput("");
  setPagina((prev) => prev - 1);
};

 const handleCodigoChange = (value) => {
  setCodigoInput(value);
  if (erroVazio) setErroVazio(false);
  if (erroIncorreto) setErroIncorreto(false);
  if (showValidationError) setShowValidationError(false);

  if (
    pagina > 0 &&
    pagina <= 6 &&
    normalizar(value) === normalizar(codigoCorretoAtual)
  ) {
    setAcertou(true);
  } else {
    setAcertou(false);
  }
};

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


            {/* INTRODUÇÃO */}
            {pagina === 0 && (
              <div className= "text-center">
                <h2 className="text-center fw-bold mb-4"style={{ color: "#234970" }}>Código do Psicólogo</h2>

                <div className="lead">
                  <p className="lead">
                    <strong>Sê muito bem-vindo/a ao Código do Psicólogo!</strong>
                  </p>
                  <p className="lead">
                    O objetivo desta atividade é <strong>descobrires mais sobre o papel do psicólogo</strong> e os <strong>direitos que tens durante as consultas</strong>.
                  </p>
                  <p className="lead">
                    Ao longo da atividade vais encontrar <strong>códigos secretos</strong>. 
                  </p>
                  <p className="lead">
                     Cada número corresponde a uma <strong>letra do alfabeto</strong>, e ao converteres os números em letras, vais revelar <strong>palavras-chave</strong> que te ajudarão a <strong>compreender melhor o que o psicólogo faz</strong> e como os teus <strong>direitos são respeitados</strong> nas consultas.
                  </p>
                  <div className="text-center">
                    <button className="custom-btn-turquoise mt-3 px-4 py-2" onClick={avancarPagina}>
                      <i className="bi bi-play-fill me-2"></i>Vamos a isto?
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* PÁGINAS DE CÓDIGOS */}
            {pagina > 0 && pagina <= 6 && (
              <>
                <h4 className="text-center fw-bold mb-4"style={{ color: "#234970" }}>
                  Descodifica o código
                </h4>
                <p className="mb-4">
                  Usa a tabela fornecida e <strong>converte os números em letras</strong> para descodificares o código.
                </p>

                {/* Tabela de Substituição */}
                    <div className="row mb-4">
                      <div className="col-md-10 mx-auto">
                        <table
                              className="table table-bordered text-center"
                              style={{
                                backgroundColor: "#FBF9F9",
                                "--bs-table-border-color": "#234970", 
                                "--bs-border-color": "#234970",      
                              }}
                            >
                          <thead>
                            <tr>
                              {tabelaSubstituicao.map(([letra], index) => (
                                <th key={index} style={{ backgroundColor: "#E7C8C2" }}>{letra}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {tabelaSubstituicao.map(([_, numero], index) => (
                                <td key={index} style={{ backgroundColor: "#99CBC8" }}>{numero}</td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                {/* Código para descodificar */}
                <div className="text-center mb-4">
                  <h5 className="fw-bold" style={{ color: "#234970" }}>
                    {textosPorPagina[pagina - 1].codigo.numeros}
                  </h5>
                </div>

                {/* Input para resposta */}
                    <div className="mb-4">
                      <label className="fw-bold mb-2" style={{ color: "#234970" }} htmlFor="codigoInput">
                        Descodifica o Código Aqui
                      </label>

                      <input
                        id="codigoInput"
                        type="text"
                        style={{
                          border: '1px solid #99CBC8',
                          borderRadius: '12px',
                          padding: '12px 20px',
                          fontSize: '16px'
                        }}
                        className={`form-control ${(erroVazio || erroIncorreto) ? 'is-invalid' : ''}`}
                        value={codigoInput}
                        onChange={(e) => handleCodigoChange(e.target.value)}
                        placeholder="Escreve a palavra descodificada aqui"
                      />

                      {/* Campo vazio */}
                      {erroVazio && !codigoInput.trim() && (
                        <div id="error-codigo-inline" className="invalid-feedback" role="alert">
                          Este campo é obrigatório.
                        </div>
                      )}

                      {/* Código incorreto */}
                      {erroIncorreto && (
                        <div className="alert alert-danger mb-3" role="alert" aria-live="assertive" id="error-codigo">
                          <i className="bi bi-exclamation-triangle me-2"></i>
                          Código incorreto. Verifica a tabela e tenta novamente.
                        </div>
                      )}

                      {/* Aviso geral quando tenta avançar sem estar correto */}
                      {showValidationError && (
                        <div className="alert alert-warning mt-3 text-center" role="alert" id="error-codigo-warning">
                          <i className="bi bi-exclamation-triangle-fill me-2"></i>
                          Por favor, descodifica o código antes de continuar.
                        </div>
                      )}
                     {acertou && (
                      <div
                        className="alert mt-3"
                        role="status"
                        style={{ backgroundColor: "#99CBC8", color: "#234970", borderRadius: "12px" }}
                      >
                        {textosPorPagina[pagina - 1].resposta}
                      </div>
                    )}
                    </div>
                <div className="d-flex justify-content-between">
                  <button className="custom-btn-pink" onClick={retrocederPagina}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                   <button
                    className="custom-btn-turquoise"
                    onClick={avancarPagina}
                  >
                    {pagina === 6 ? "Conclusão" : "Próximo"}
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </>
            )}

            {/* CONCLUSÃO */}
            {pagina === 7 && (
              <>
                <h4 className="fw-bold mb-4 text-start" style={{ color: "#234970" }}>Conclusão da Atividade</h4>
                <div className="lead">
                  <p className="mb-3">
                    <strong>Esperamos que esta atividade te tenha ajudado</strong> a entender melhor o <strong>papel do psicólogo</strong> e os <strong>direitos que tens durante as consultas</strong>.
                  </p>
                  <p className="mb-3">
                    <strong>Lembras-te</strong> de que o psicólogo está presente para te <strong>apoiar</strong>, <strong>ouvir</strong>, sempre com <strong>respeito</strong> e <strong>honestidade</strong>.
                  </p>
                  <p className="mb-3">
                    Durante a intervenção, tens o <strong>direito de ser ouvido/a e respeitado/a</strong>, de manter a <strong>privacidade das tuas informações</strong>, de ser <strong>levado/a a sério</strong> e de <strong>participar nas decisões</strong>.
                  </p>
                  <p className="mb-4">
                    A tua <strong>opinião é importante</strong>, e <strong>nunca estarás sozinho/a no teu percurso de mudança</strong>.
                  </p>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink" onClick={retrocederPagina}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <AtividadeProgressao
                    moduloId={moduloId}
                    atividadeIndex={0}
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

export default CodigoDoPsicologo;