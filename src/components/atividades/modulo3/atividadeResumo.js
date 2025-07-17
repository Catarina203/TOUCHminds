import React, { useState, useContext, useRef, useEffect } from "react";
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
  const inputRefs = useRef({});

  const handleChange = (name, value) => {
    setCarta(prev => ({ ...prev, [name]: value }));
    if (erroCampos) {
      setErroCampos(false);
    }
  };

  const gerarConteudoCarta = () => {
    return `Querido/a eu,\n\nSei que estás a passar por um momento difícil, e quero que saibas que ${carta.parte1}.\nEu sei que às vezes é difícil lidar com ${carta.parte2}.\nMesmo que estejas a sentir ${carta.parte3},\nQuando cometes erros, é importante lembrares-te que ${carta.parte4}.\nEu estou aqui para te apoiar, porque ${carta.parte5}.\nÉ normal sentires-te frustrado/a às vezes, mas ${carta.parte6}.\nEu sei que já enfrentaste situações complicadas antes, e ${carta.parte7}.\nLembra-te de que, mesmo quando erramos, podemos aprender, porque ${carta.parte8}.\nEstou muito orgulhoso/a de ti por ${carta.parte9}.\nPara o futuro, desejo-te que ${carta.parte10}.`;
  };

  const gerarCarta = () => {
    const conteudo = gerarConteudoCarta();
    const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Carta_para_mim.txt";
    a.click();
  };

  const validarCampos = () => {
    const todosPreenchidos = Object.values(carta).every((v) => v.trim() !== "");
    if (todosPreenchidos) {
      setErroCampos(false);
      setPagina(2);
    } else {
      setErroCampos(true);
    }
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
                <h2 className="fw-bold mb-4" style={{ color: "#234970" }}>Atividade Resumo</h2>
                <p className="mb-3 lead"><strong>Sê muito bem-vindo ou bem-vinda à atividade resumo do Módulo 3 – "Sê Amigo de Ti Mesmo!"</strong></p>
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
                <h5 className="fw-bold mb-4">Escreve a tua Carta</h5>
                <p className="mb-4 text-muted">Completa as frases abaixo para criar a tua carta personalizada:</p>

                <div className="card p-4 mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                  <h6 className="fw-bold mb-3">Querido/a eu,</h6>
                  
                  <div className="carta-content" style={{ fontSize: '16px', lineHeight: '2' }}>
                    
                    <div className="mb-3">
                      Sei que estás a passar por um momento difícil, e quero que saibas que{" "}
                      <input
                        type="text"
                        value={carta.parte1}
                        onChange={(e) => handleChange('parte1', e.target.value)}
                        placeholder="escreve aqui..."
                        style={{
                          border: erroCampos && !carta.parte1.trim() ? '2px solid #dc3545' : '1px solid #ccc',
                          borderRadius: '4px',
                          padding: '2px 6px',
                          fontSize: '16px',
                          minWidth: '200px',
                          outline: 'none'
                        }}
                      />
                      .
                      {erroCampos && !carta.parte1.trim() && (
                        <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '2px' }}>Campo obrigatório</div>
                      )}
                    </div>

                    <div className="mb-3">
                      Eu sei que às vezes é difícil lidar com{" "}
                      <input
                        type="text"
                        value={carta.parte2}
                        onChange={(e) => handleChange('parte2', e.target.value)}
                        placeholder="escreve aqui..."
                        style={{
                          border: erroCampos && !carta.parte2.trim() ? '2px solid #dc3545' : '1px solid #ccc',
                          borderRadius: '4px',
                          padding: '2px 6px',
                          fontSize: '16px',
                          minWidth: '200px',
                          outline: 'none'
                        }}
                      />
                      .
                      {erroCampos && !carta.parte2.trim() && (
                        <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '2px' }}>Campo obrigatório</div>
                      )}
                    </div>

                    <div className="mb-3">
                      Mesmo que estejas a sentir{" "}
                      <input
                        type="text"
                        value={carta.parte3}
                        onChange={(e) => handleChange('parte3', e.target.value)}
                        placeholder="escreve aqui..."
                        style={{
                          border: erroCampos && !carta.parte3.trim() ? '2px solid #dc3545' : '1px solid #ccc',
                          borderRadius: '4px',
                          padding: '2px 6px',
                          fontSize: '16px',
                          minWidth: '200px',
                          outline: 'none'
                        }}
                      />
                      ,
                      {erroCampos && !carta.parte3.trim() && (
                        <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '2px' }}>Campo obrigatório</div>
                      )}
                    </div>

                    <div className="mb-3">
                      Quando cometes erros, é importante lembrares-te que{" "}
                      <input
                        type="text"
                        value={carta.parte4}
                        onChange={(e) => handleChange('parte4', e.target.value)}
                        placeholder="escreve aqui..."
                        style={{
                          border: erroCampos && !carta.parte4.trim() ? '2px solid #dc3545' : '1px solid #ccc',
                          borderRadius: '4px',
                          padding: '2px 6px',
                          fontSize: '16px',
                          minWidth: '200px',
                          outline: 'none'
                        }}
                      />
                      .
                      {erroCampos && !carta.parte4.trim() && (
                        <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '2px' }}>Campo obrigatório</div>
                      )}
                    </div>

                    <div className="mb-3">
                      Eu estou aqui para te apoiar, porque{" "}
                      <input
                        type="text"
                        value={carta.parte5}
                        onChange={(e) => handleChange('parte5', e.target.value)}
                        placeholder="escreve aqui..."
                        style={{
                          border: erroCampos && !carta.parte5.trim() ? '2px solid #dc3545' : '1px solid #ccc',
                          borderRadius: '4px',
                          padding: '2px 6px',
                          fontSize: '16px',
                          minWidth: '200px',
                          outline: 'none'
                        }}
                      />
                      .
                      {erroCampos && !carta.parte5.trim() && (
                        <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '2px' }}>Campo obrigatório</div>
                      )}
                    </div>

                    <div className="mb-3">
                      É normal sentires-te frustrado/a às vezes, mas{" "}
                      <input
                        type="text"
                        value={carta.parte6}
                        onChange={(e) => handleChange('parte6', e.target.value)}
                        placeholder="escreve aqui..."
                        style={{
                          border: erroCampos && !carta.parte6.trim() ? '2px solid #dc3545' : '1px solid #ccc',
                          borderRadius: '4px',
                          padding: '2px 6px',
                          fontSize: '16px',
                          minWidth: '200px',
                          outline: 'none'
                        }}
                      />
                      .
                      {erroCampos && !carta.parte6.trim() && (
                        <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '2px' }}>Campo obrigatório</div>
                      )}
                    </div>

                    <div className="mb-3">
                      Eu sei que já enfrentaste situações complicadas antes, e{" "}
                      <input
                        type="text"
                        value={carta.parte7}
                        onChange={(e) => handleChange('parte7', e.target.value)}
                        placeholder="escreve aqui..."
                        style={{
                          border: erroCampos && !carta.parte7.trim() ? '2px solid #dc3545' : '1px solid #ccc',
                          borderRadius: '4px',
                          padding: '2px 6px',
                          fontSize: '16px',
                          minWidth: '200px',
                          outline: 'none'
                        }}
                      />
                      .
                      {erroCampos && !carta.parte7.trim() && (
                        <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '2px' }}>Campo obrigatório</div>
                      )}
                    </div>

                    <div className="mb-3">
                      Lembra-te de que, mesmo quando erramos, podemos aprender, porque{" "}
                      <input
                        type="text"
                        value={carta.parte8}
                        onChange={(e) => handleChange('parte8', e.target.value)}
                        placeholder="escreve aqui..."
                        style={{
                          border: erroCampos && !carta.parte8.trim() ? '2px solid #dc3545' : '1px solid #ccc',
                          borderRadius: '4px',
                          padding: '2px 6px',
                          fontSize: '16px',
                          minWidth: '200px',
                          outline: 'none'
                        }}
                      />
                      .
                      {erroCampos && !carta.parte8.trim() && (
                        <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '2px' }}>Campo obrigatório</div>
                      )}
                    </div>

                    <div className="mb-3">
                      Estou muito orgulhoso/a de ti por{" "}
                      <input
                        type="text"
                        value={carta.parte9}
                        onChange={(e) => handleChange('parte9', e.target.value)}
                        placeholder="escreve aqui..."
                        style={{
                          border: erroCampos && !carta.parte9.trim() ? '2px solid #dc3545' : '1px solid #ccc',
                          borderRadius: '4px',
                          padding: '2px 6px',
                          fontSize: '16px',
                          minWidth: '200px',
                          outline: 'none'
                        }}
                      />
                      .
                      {erroCampos && !carta.parte9.trim() && (
                        <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '2px' }}>Campo obrigatório</div>
                      )}
                    </div>

                    <div className="mb-3">
                      Para o futuro, desejo-te que{" "}
                      <input
                        type="text"
                        value={carta.parte10}
                        onChange={(e) => handleChange('parte10', e.target.value)}
                        placeholder="escreve aqui..."
                        style={{
                          border: erroCampos && !carta.parte10.trim() ? '2px solid #dc3545' : '1px solid #ccc',
                          borderRadius: '4px',
                          padding: '2px 6px',
                          fontSize: '16px',
                          minWidth: '200px',
                          outline: 'none'
                        }}
                      />
                      .
                      {erroCampos && !carta.parte10.trim() && (
                        <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '2px' }}>Campo obrigatório</div>
                      )}
                    </div>

                  </div>
                </div>

                <div className="mb-4">
                  <button className="custom-btn-complete me-3" onClick={gerarCarta}>
                    <i className="bi bi-download me-2"></i>Download da Carta
                  </button>
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button className="custom-btn-pink" onClick={() => setPagina(0)}>
                    <i className="bi bi-arrow-left me-2"></i>Anterior
                  </button>
                  <button className="custom-btn-turquoise" onClick={validarCampos}>Conclusão</button>
                </div>
              </div>
            )}

            {pagina === 2 && (
              <div>
                <h4 className="fw-bold mb-4 text-start" style={{ color: "#234970" }}>Conclusão da Atividade</h4>
                
                <div className="alert border mb-4" style={{ backgroundColor: '#f8f9fa', borderColor: '#ddd' }}>
                  <h6 className="fw-bold mb-3">A tua Carta Final:</h6>
                  <div style={{ whiteSpace: 'pre-wrap', fontSize: '15px', lineHeight: '1.6' }}>
                    {gerarConteudoCarta()}
                  </div>
                </div>

                <p className="mb-3 lead"><strong>Ao escreveres esta carta para ti próprio/a</strong>, estás a cultivar uma prática de <strong>autocompaixão</strong> que te permitirá lidar com os <strong>momentos difíceis</strong> de forma <strong>gentil</strong>.</p>
                <p className="mb-3 lead">Lembra-te de que <strong>todos enfrentam desafios</strong> e que os <strong>erros fazem parte da condição humana</strong>.</p>
                <p className="mb-3 lead">Ao tratares-te com <strong>bondade</strong> e <strong>compreensão</strong>, estás a reforçar a tua <strong>capacidade de cuidar de ti mesmo</strong> nas situações mais complicadas.</p>
                <p className="mb-4 lead">Sempre que precisares de um <strong>lembrete</strong>, recorre a esta carta e lembra-te de que és <strong>digno/a de compaixão</strong> e que <strong>mereces tratar-te com bondade e de forma gentil</strong>.</p>
                
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