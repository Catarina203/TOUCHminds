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
  const [inputError, setInputError] = useState(false);

  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);

  const modulo = modulos.find((m) => m.id === moduloId);
  const atividade = modulo?.atividades.find(a => a.url === "codigo-do-psicologo");

  // Códigos e suas respectivas palavras
  const codigos = [
    { numeros: "13 - 15 - 20 - 9 - 22 - 1", palavra: "MOTIVA" },
    { numeros: "22 - 5 - 18 - 4 - 1 - 4 - 5", palavra: "VERDADE" },
    { numeros: "16 - 18 - 9 - 22 - 1 - 3 - 9 - 4 - 1 - 4 - 5", palavra: "PRIVACIDADE" },
    { numeros: "12 - 5 - 22 - 1 - 18 - 1 - 19 - 5 - 18 - 9 - 15", palavra: "LEVARASERIO" },
    { numeros: "16 - 1 - 18 - 20 - 9 - 3 - 9 - 16 - 1 - 3 - 1 - 15", palavra: "PARTICIPACAO" },
    { numeros: "15 - 16 - 9 - 14 - 9 - 1 - 15", palavra: "OPINIAO" }
  ];

  const tabelaSubstituicao = [
    ['A', '1'], ['B', '2'], ['C', '3'], ['D', '4'], ['E', '5'], ['F', '6'],
    ['G', '7'], ['H', '8'], ['I', '9'], ['J', '10'], ['K', '11'], ['L', '12'],
    ['M', '13'], ['N', '14'], ['O', '15'], ['P', '16'], ['Q', '17'], ['R', '18'],
    ['S', '19'], ['T', '20'], ['U', '21'], ['V', '22'], ['W', '23'], ['X', '24'],
    ['Y', '25'], ['Z', '26']
  ];

  const textosPorPagina = [
    {
      texto: "O **psicólogo** tem um **papel ativo no processo de mudança**. Em conjunto, são definidos **objetivos claros e realistas**, sendo o psicólogo responsável por **esclarecer as expectativas** em relação à **terapia** e à **possibilidade de mudança**, explicando que se trata de um **processo gradual**.",
      codigo: codigos[0],
      resposta: "O **psicólogo** **motiva** e **prepara** para o **processo de mudança**."
    },
    {
      texto: "Quando se está numa **sessão**, o **psicólogo** deve ser **honesto** com a pessoa. **Não há segredos** nem **informações escondidas**. Tudo o que for dito deve ser **explicado de forma clara**, para que seja possível **compreender o que está a acontecer**. **Conhecer o que está em jogo** ajuda a pessoa a **tomar decisões** sobre o que pretende para o seu **processo terapêutico**.",
      codigo: codigos[1],
      resposta: "O psicólogo **deve ser sempre claro** e **honesto** sobre o **que está a acontecer**."
    },
    {
      texto: "Durante a **terapia**, tudo o que for **partilhado** deve ser sempre **respeitado**. Nada do que for dito será comunicado a outras pessoas sem o **consentimento da pessoa**, exceto em situações de **risco para si própria ou para outros**. Nesses casos, o **psicólogo** explicará claramente o que irá acontecer. Além disso, o psicólogo deve **tratar sempre a pessoa com respeito**, independentemente das suas **experiências** ou **emoções**.",
      codigo: codigos[2],
      resposta: "O psicólogo deve **proteger as informações partilhadas** e deve **respeitar sempre o tempo e espaço da pessoa**."
    },
    {
      texto: "Os **pensamentos**, **emoções** e **opiniões** da pessoa são **importantes**, e o **psicólogo** deve sempre **ouvir com atenção**. Não deve **desvalorizar** o que é dito, e as **emoções** devem ser **respeitadas**. Se houver **alguma dúvida** ou **algo a partilhar**, a pessoa deve ser **levada a sério**.",
      codigo: codigos[3],
      resposta: "O psicólogo **deve ouvir atentamente** e **respeitar o que é dito**, **sem julgar**."
    },
    {
      texto: "O **psicólogo** deve perguntar a **opinião da pessoa** sobre o que considera que **lhe pode ajudar**. O que a pessoa **sente** e **pensa** sobre o **processo** é **muito importante**, e tem o **direito de dar a sua opinião** sobre as escolhas feitas. O psicólogo deve **ouvir** e **ajudar a tomar decisões importantes**, respeitando aquilo que é **mais significativo para a pessoa**.",
      codigo: codigos[4],
      resposta: "O psicólogo vai **garantir que a pessoa tenha uma palavra** a dizer sobre o **que acontece na terapia**."
    },
    {
      texto: "É muito importante que o psicólogo permita que a pessoa fale sobre o que está a viver, sem receio de ser **julgada**. As **opiniões** e **emoções** da pessoa devem ser sempre **levadas a sério** e **respeitadas**. O psicólogo deve **ouvir tudo o que for partilhado**, e a **voz da pessoa** deve ter **peso nas decisões** tomadas durante a **terapia**.",
      codigo: codigos[5],
      resposta: "O **psicólogo** deve **ouvir as ideias, pensamentos e emoções da pessoa**, e essas **opiniões** devem ser **respeitadas** e **valorizadas**."
    }
  ];

  const totalPaginas = 8;;
  const progresso = Math.round(((pagina + 1) / totalPaginas) * 100);

  const avancarPagina = () => {
    // Verificar se é página de código e se o código está correto
    if (pagina > 0 && pagina <= 6) {
      const codigoCorreto = textosPorPagina[pagina - 1].codigo.palavra;
      if (codigoInput.toUpperCase() !== codigoCorreto) {
        setInputError(true);
        return;
      }
    }

    setInputError(false);
    setCodigoInput("");
    setPagina((prev) => prev + 1);
  };

  const retrocederPagina = () => {
    setInputError(false);
    setPagina((prev) => prev - 1);
  };

  const handleCodigoChange = (value) => {
    setCodigoInput(value);
    if (inputError) {
      setInputError(false);
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
              <div className="text-start py-4 ps-2">
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>Código do Psicólogo</h2>

                <div className="col-md-12">
                  <p className="lead mb-3">
                    <strong>Sê muito bem-vindo ou bem-vinda ao Código do Psicólogo!</strong>
                  </p>
                  <p className="mb-3 lead">
                    O objetivo desta atividade é <strong>descobrires mais sobre o papel do psicólogo</strong> e os <strong>direitos que tens durante as consultas</strong>.
                  </p>
                  <p className="mb-3 lead">
                    Ao longo da atividade vais encontrar <strong>códigos secretos</strong>. Esses códigos estão <strong>disfarçados por números</strong> e representam <strong>palavras-chave</strong> que são <strong>essenciais</strong> para entender o papel do psicólogo e os teus <strong>direitos</strong>.
                  </p>
                  <p className="mb-4 lead">
                    Usa a <strong>tabela de substituição</strong> fornecida para <strong>converter os números em letras</strong>. Cada número corresponde a uma <strong>letra do alfabeto</strong>, e ao converteres os números em letras, vais revelar <strong>palavras-chave</strong> que te ajudarão a <strong>compreender melhor o que o psicólogo faz</strong> e como os teus <strong>direitos são respeitados</strong> nas consultas.
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
                <h4 className="fw-bold mb-4" style={{ color: "#234970" }}>
                  Descodifica o código apresentado a seguir!
                </h4>
                <p className="mb-4">
                  Para isso, usa a <strong>tabela de substituição fornecida</strong> e <strong>converte os números em letras</strong>.
                </p>

                {/* Tabela de Substituição */}
                <div className="row mb-4">
                  <div className="col-md-6 mx-auto">
                    <table className="table table-bordered table-sm" style={{ backgroundColor: "#FBF9F9" }}>
                      <thead>
                        <tr>
                          <th style={{ backgroundColor: "#FBF9F9" }}><strong>Letra</strong></th>
                          <th style={{ backgroundColor: "#FBF9F9" }}><strong>Número</strong></th>
                        </tr>
                      </thead>
                      <tbody>
                        {tabelaSubstituicao.map(([letra, numero], index) => (
                          <tr key={index}>
                            <td style={{ backgroundColor: "#FBF9F9" }}>{letra}</td>
                            <td style={{ backgroundColor: "#FBF9F9" }}>{numero}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Texto explicativo */}
                <div className="mb-4 p-3 rounded" style={{ backgroundColor: "#FBF9F9" }}>
                  <p dangerouslySetInnerHTML={{ __html: textosPorPagina[pagina - 1].texto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                </div>

                {/* Código para descodificar */}
                <div className="text-center mb-4">
                  <h5 className="fw-bold" style={{ color: "#234970" }}>
                    {textosPorPagina[pagina - 1].codigo.numeros}
                  </h5>
                </div>

                {/* Input para resposta */}
                <div className="mb-4">
                  <label className="form-label fw-bold">Descodifica o Código Aqui</label>
                  <input
                    type="text"
                    className={`form-control ${inputError ? 'is-invalid' : ''}`}
                    value={codigoInput}
                    onChange={(e) => handleCodigoChange(e.target.value)}
                    placeholder="Escreve a palavra descodificada aqui..."
                    required
                  />
                  {inputError && (
                    <div className="invalid-feedback">
                      Código incorreto. Verifica a tabela de substituição e tenta novamente.
                    </div>
                  )}
                </div>

                {/* Mostrar resposta se código estiver correto */}
                {codigoInput.toUpperCase() === textosPorPagina[pagina - 1].codigo.palavra && (
                  <div className="alert alert-success">
                    <p dangerouslySetInnerHTML={{ __html: textosPorPagina[pagina - 1].resposta.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                  </div>
                )}

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
                    <strong>Lembraste-te</strong> de que o psicólogo está aqui para te <strong>apoiar</strong>, <strong>motivar</strong> e <strong>ouvir</strong>, sempre com <strong>respeito</strong> e <strong>honestidade</strong>.
                  </p>
                  <p className="mb-3">
                    Durante a terapia, tens o <strong>direito de ser respeitado</strong>, de manter a <strong>privacidade das tuas informações</strong>, de ser <strong>levado a sério</strong> e de <strong>participar nas decisões</strong>.
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