import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import { UserContext } from "../../../App";
import AtividadeProgressao from "../atividadeProgressao";

const AtividadeResumoCarta = () => {
  const [pagina, setPagina] = useState(0);
  const { id: moduloId } = useParams();
  const { updateUserData } = useContext(UserContext);
  const [carta, setCarta] = useState({
    parte1: "",
    parte2: "",
    parte3: "",
    parte4: "",
    parte5: "",
    parte6: "",
    parte7: "",
    parte8: "",
    parte9: "",
    parte10: ""
  });
  const [erroCampos, setErroCampos] = useState(false);

  const handleChange = (name, value) => {
    setCarta(prev => ({ ...prev, [name]: value }));
    if (erroCampos) {
      setErroCampos(false);
    }
  };

  // Conta quantos campos foram preenchidos
const camposPreenchidos = Object.values(carta).filter(v => v.trim() !== "").length;


  const gerarConteudoCarta = () => {
  const linhas = ["Querido/a eu,", ""];

  if (carta.parte1.trim())
    linhas.push(`Sei que estás a passar por um momento difícil, e quero que saibas que ${carta.parte1.trim()}.`);

  if (carta.parte2.trim())
    linhas.push(`Eu sei que às vezes é difícil lidar com ${carta.parte2.trim()}.`);

  if (carta.parte3.trim())
    linhas.push(`Mesmo que estejas a sentir ${carta.parte3.trim()}.`);

  if (carta.parte4.trim())
    linhas.push(`Quando cometes erros, é importante lembrares-te que ${carta.parte4.trim()}.`);

  if (carta.parte5.trim())
    linhas.push(`Eu estou aqui para te apoiar, porque ${carta.parte5.trim()}.`);

  if (carta.parte6.trim())
    linhas.push(`É normal sentires-te frustrado/a às vezes, mas ${carta.parte6.trim()}.`);

  if (carta.parte7.trim())
    linhas.push(`Eu sei que já enfrentaste situações complicadas antes, e ${carta.parte7.trim()}.`);

  if (carta.parte8.trim())
    linhas.push(`Lembra-te de que, mesmo quando erramos, podemos aprender, porque ${carta.parte8.trim()}.`);

  if (carta.parte9.trim())
    linhas.push(`Estou muito orgulhoso/a de ti por ${carta.parte9.trim()}.`);

  if (carta.parte10.trim())
    linhas.push(`Para o futuro, desejo-te que ${carta.parte10.trim()}.`);

  return linhas.join("\n");
};

  const gerarCarta = () => {
  const conteudo = gerarConteudoCarta();
  const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Carta_para_mim.txt";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

 const validarCampos = () => {
  if (camposPreenchidos >= 3) {
    setErroCampos(false);
    setPagina(2);
  } else {
    setErroCampos(true);
  }
};

const baseInputStyle = {
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '2px 6px',
  fontSize: '16px',
  minWidth: '200px',
  outline: 'none',
  fontFamily: 'inherit'  // <— add isto
};

  const progresso = Math.round((pagina / 2) * 100);

  return (
    <div className="container-fluid vh-100 p-0 font-poppins">
      <Navbar />
      <div className="row h-100 m-0">
        <Sidebar />
        <div className="col px-4 py-4" style={{ backgroundColor: "#FBF9F9" }}>
          <div className="container p-5 bg-white rounded shadow-sm">
            <div className="progress mb-4" style={{ height: "8px" }}>
              <div className="progress-bar" style={{ width: `${progresso}%`, backgroundColor: "#99CBC8" }}></div>
            </div>

            {pagina === 0 && (
              <div>
                <div className="text-center"></div>
                <h2 className="text-center fw-bold" style={{ color: "#234970" }}>Atividade Resumo</h2>
                <p className="mb-3 lead"><strong>Sê muito bem-vindo/a à atividade resumo do Módulo 3 – "Sê Amigo de Ti Mesmo!"</strong></p>
                <p className="mb-3 lead">O objetivo desta atividade é <strong>consolidar os conteúdos</strong> que explorámos ao longo do módulo.</p>
                <p className="mb-3 lead">Convido-te a <strong>escrever uma carta para ti próprio/a</strong>, que será uma ferramenta para usares nos <strong>momentos difíceis</strong>, para te lembrares de que és <strong>merecedor/a de compaixão</strong> e que os <strong>desafios fazem parte da experiência humana</strong>.</p>
                <p className="mb-3 lead">Aproveita esta oportunidade para te tratares com <strong>carinho</strong>, <strong>aceitação</strong> e <strong>compreensão</strong>. </p>
                <p className="mb-4 lead">No final, poderás fazer o <strong>download da carta</strong> para recorreres a ela sempre que considerares necessário.</p>
                <div className="text-center">
                  <button className="custom-btn-turquoise mt-2 px-4 py-2" onClick={() => setPagina(1)}>
                    <i className="bi bi-play-fill me-2"></i>Vamos a isto?
                  </button>
                </div>
              </div>
            )}

            {pagina === 1 && (
              <div>
                <h5 className="text-center fw-bold">Escreve a tua Carta style={{ color: "#234970" }} </h5> 
                <p className="lead mb-4">
                  Completa <strong>pelo menos 3</strong> das frases abaixo (à tua escolha) e cria a tua carta personalizada:
                </p>
                
            {erroCampos && (
                  <div className="alert alert-warning py-2 d-flex align-items-center" role="alert" aria-live="polite">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Preenche pelo menos 3 campos para continuar. ({camposPreenchidos}/3)
                  </div>
                )}

                <div className="card p-4 mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                  <h6 className="fw-bold mb-3 lead">Querido/a eu,</h6>
                  
                  <div className="carta-content lead" style={{ lineHeight: 2 }}>
                    
                    <div className="mb-3">
                      Sei que estás a passar por um momento difícil, e quero que saibas que{" "}
                      <input
                        type="text"
                        value={carta.parte1}
                        onChange={(e) => handleChange('parte1', e.target.value)}
                        placeholder="continua aqui..."
                        style={baseInputStyle}
                      />
                    </div>

                    <div className="mb-3">
                      Eu sei que às vezes é difícil lidar com{" "}
                      <input
                        type="text"
                        value={carta.parte2}
                        onChange={(e) => handleChange('parte2', e.target.value)}
                        placeholder="continua aqui..."
                        style={baseInputStyle}
                      />
                    </div>

                    <div className="mb-3">
                      Mesmo que estejas a sentir{" "}
                      <input
                        type="text"
                        value={carta.parte3}
                        onChange={(e) => handleChange('parte3', e.target.value)}
                        placeholder="continua aqui..."
                        style={baseInputStyle}
                      />
                    </div>

                    <div className="mb-3">
                      Quando cometes erros, é importante lembrares-te que{" "}
                      <input
                        type="text"
                        value={carta.parte4}
                        onChange={(e) => handleChange('parte4', e.target.value)}
                       placeholder="continua aqui..."
                       style={baseInputStyle}
                      />
                    </div>

                    <div className="mb-3">
                      Eu estou aqui para te apoiar, porque{" "}
                      <input
                        type="text"
                        value={carta.parte5}
                        onChange={(e) => handleChange('parte5', e.target.value)}
                        placeholder="continua aqui..."
                      style={baseInputStyle}
                      />
                    </div>

                    <div className="mb-3">
                      É normal sentires-te frustrado/a às vezes, mas{" "}
                      <input
                        type="text"
                        value={carta.parte6}
                        onChange={(e) => handleChange('parte6', e.target.value)}
                        placeholder="continua aqui..."
                        style={baseInputStyle}
                      />
                    </div>

                    <div className="mb-3">
                      Eu sei que já enfrentaste situações complicadas antes, e{" "}
                      <input
                        type="text"
                        value={carta.parte7}
                        onChange={(e) => handleChange('parte7', e.target.value)}
                        placeholder="continua aqui..."
                        style={baseInputStyle}
                      />
                    </div>

                    <div className="mb-3">
                      Lembra-te de que, mesmo quando erramos, podemos aprender, porque{" "}
                      <input
                        type="text"
                        value={carta.parte8}
                        onChange={(e) => handleChange('parte8', e.target.value)}
                        placeholder="continua aqui..."
                        style={baseInputStyle}
                      />
                    </div>

                    <div className="mb-3">
                      Estou muito orgulhoso/a de ti por{" "}
                      <input
                        type="text"
                        value={carta.parte9}
                        onChange={(e) => handleChange('parte9', e.target.value)}
                        placeholder="continua aqui..."
                        style={baseInputStyle}
                      />
                    </div>

                    <div className="mb-3">
                      Para o futuro, desejo-te que{" "}
                      <input
                        type="text"
                        value={carta.parte10}
                        onChange={(e) => handleChange('parte10', e.target.value)}
                        placeholder="continua aqui..."
                        style={baseInputStyle}
                      />
                    </div>

                  </div>
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink" onClick={() => setPagina(0)}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <button
                    className="custom-btn-turquoise"
                    onClick={validarCampos}
                    aria-label="Avançar para a conclusão"
                  >
                    Conclusão
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            )}

            {pagina === 2 && (
              <div>
                <h4 className="text-center fw-bold" style={{ color: "#234970" }}>Conclusão da Atividade</h4>
                
                <p className="mb-4 lead">
                  A tua carta está pronta para download. Podes guardá-la e relê-la sempre que precisares.
                </p>

                <p className="mb-3 lead"><strong>Ao escreveres esta carta para ti próprio/a</strong>, estás a cultivar uma prática de <strong>autocompaixão</strong> que te permitirá lidar com os <strong>momentos difíceis</strong> de forma <strong>gentil</strong>.</p>
                <p className="mb-3 lead">Lembra-te de que <strong>todos os seres humanos enfrentam desafios</strong> e que os <strong>erros fazem parte da condição humana</strong>.</p>
                <p className="mb-3 lead">Ao tratares-te com <strong>bondade</strong> e <strong>compreensão</strong>, estás a reforçar a tua <strong>capacidade de cuidar de ti mesmo</strong> nas situações mais complicadas.</p>
                <p className="mb-4 lead">Sempre que precisares de um <strong>lembrete</strong>, recorre a esta carta e lembra-te de que és digno/a de <strong> compaixão e de ajuda </strong>, de ti próprio/a e dos outros, e que mereces tratar-te <strong> com bondade e de forma gentil</strong>.</p>
                
                <div className="mb-4">
                  <button className="custom-btn-complete" onClick={gerarCarta}>
                    <i className="bi bi-download me-2"></i>Download da Carta Final
                  </button>
                </div>

                <div className="d-flex justify-content-between">
                  <button className="custom-btn-pink" onClick={() => setPagina(1)}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <AtividadeProgressao
                    moduloId={moduloId}
                    atividadeIndex={3}
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

export default AtividadeResumoCarta;