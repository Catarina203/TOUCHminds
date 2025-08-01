import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './navbar';
import Sidebar from './sidebar';
import DesafioSemanal from './atividades/modulo1/desafioSemanal';
import DesafioSemanal2 from './atividades/modulo2/desafioSemanal';
import DesafioSemanal3 from './atividades/modulo3/desafioSemanal';
import DesafioSemanal4 from './atividades/modulo4/desafioSemanal';
import DesafioSemanal5 from './atividades/modulo5/desafioSemanal';
import DesafioSemanal6 from './atividades/modulo6/desafioSemanal';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../database/database";

import { UserContext } from '../App';
import modulos from '../data/modulos';
import AtividadeCard from './atividadeCard';
import { Modal, Button } from 'react-bootstrap';
import Loading from './loading';

const mensagensInicio = {
  1: "Falar sobre ansiedade pode ser desconfortável. Ao compreendê-la melhor, tornamo-nos mais conscientes dos seus desafios e descobrimos caminhos para lidar com ela com mais confiança!",
  2: "Desafiar mitos e estigmas pode abalar algumas ideias feitas. Esclarecer dúvidas permite desenvolver uma visão mais aberta e informada, abrindo espaço para novas formas de pensar!",
  3: "A voz crítica tem impacto no nosso bem-estar. Compreendê-la e conhecer alternativas, como a autocompaixão, ajuda-nos a transformar a forma como lidamos connosco mesmos!",
  4: "A mudança gera dúvidas e desconforto. Refletir sobre os prós e contras torna as decisões mais conscientes, aumentando a clareza e a confiança no processo!",
  5: "Falar sobre sintomas e pedir ajuda pode ser difícil. Perceber este passo mostra que pedir ajuda é um gesto de cuidado, e saber que existem diferentes formas de ajuda permite encontrar respostas adequadas a cada situação!",
  6: "Conhecer melhor a ajuda profissional revela como este recurso pode ser essencial para o bem-estar. Estar bem informado/a ajuda a lidar com qualquer situação que surja!"
};

const mensagensFim = {
  1: "Neste módulo, exploraste o que é a ansiedade e os desafios que ela acarreta. Compreender a ansiedade é um passo essencial para lidar com ela. Continua a explorar com curiosidade e abertura!",
  2: "Neste módulo, desmontaste mitos e estigmas sobre a ansiedade e viste como pô-los em causa. Preserva o espírito crítico e estimula a vontade de aprender!",
  3: "Neste módulo, exploraste a tua voz crítica e aprendeste a tratar-te de outra forma. Adota esta nova perspetiva e sê mais gentil contigo!",
  4: "Neste módulo, ponderaste os prós e os contras da mudança. Reconhecer que decidir traz incertezas mostra que pensar com cuidado é um ato de coragem. Confia no processo e no que vais descobrindo pelo caminho!",
  5: "Neste módulo conheceste alguns sinais de mal-estar e a importância de pedir ajuda. Reconhecer este passo abre caminho para encontrares ajuda quando precisares. Valoriza este gesto e continua a cuidar de ti!",
  6: "Neste módulo, explorastes o papel da ajuda profissional: o que envolve e quando a procurar. Guarda esta informação e confia que podes pedir ajuda sempre que for preciso!"
};

const mensagensExtra = {
  3: "Parabéns por chegares a meio do percurso! Até agora, exploraste a ansiedade, os estigmas associados e a forma como nos relacionamos com a nossa voz crítica. Estes temas podem ser desafiantes, mas refletir sobre eles demonstra o teu envolvimento. Mantém esta atitude nos próximos módulos — cada passo conta!",
  6: "Parabéns por terminares os seis módulos! Ao longo deste percurso, refletiste sobre desafios, decisões e formas de pedir ajuda quando necessário. Explorar estes temas exige tempo e empenho — e isso já é um grande passo. Agora falta apenas a sessão final com o psicólogo, onde vais consolidar tudo o que aprendeste. Leva contigo estas aprendizagens e recorre a elas sempre que precisares."};

const Modulos = () => {
  const { id } = useParams();  
  const { userData } = useContext(UserContext);  

  const modulo = modulos.find((m) => m.id === id);
  const moduloUserKey = modulo ? `modulo${modulo.id}` : '';
  const mfim = userData?.modulos?.[moduloUserKey]?.mensagemdefim;
  const atividadesStatus = userData?.modulos?.[moduloUserKey]?.atividades || [];
  const atividadesConcluidas = atividadesStatus.filter((a) => a.concluido).length;
  const progressoModulo = (atividadesStatus.length > 0)
    ? (atividadesConcluidas / atividadesStatus.length) * 100
    : 50;

  const [showModal, setShowModal] = useState(() => {
    if (!modulo) return false;
    return (progressoModulo === 100 && mfim == "naomostrada") || progressoModulo === 0
  });

  const [showExtraModal, setShowExtraModal] = useState(false);

  const [mensagemModal] = useState(() => {
    if (!modulo) return '';
    if (progressoModulo === 100 && mfim == "naomostrada") {
      updateDoc(doc(db, "alunos", userData.uid), {
          [`modulos.${moduloUserKey}.mensagemdefim`]: "mostrada"
        }).catch(console.error);
      return mensagensFim[modulo.id];
    } else if (progressoModulo === 0) {
      return mensagensInicio[modulo.id];
    }
    return '';
  });

  const [mensagemModelExtra] = useState(() => {
    if (!modulo) return '';
    return mensagensExtra[modulo.id];
  });

  if (!userData || !modulo) {
    return <Loading message="A carregar o módulo..." />;
  }

  const renderDesafioSemanal = () => {
    switch (id) {
      case '1': return <DesafioSemanal id={modulo.id} />;
      case '2': return <DesafioSemanal2 id={modulo.id} />;
      case '3': return <DesafioSemanal3 id={modulo.id} />;
      case '4': return <DesafioSemanal4 id={modulo.id} />;
      case '5': return <DesafioSemanal5 id={modulo.id} />;
      case '6': return <DesafioSemanal6 id={modulo.id} />;
      default: return null;
    }
  };

  return (
    <div className="container-fluid vh-100 p-0">
      <Navbar />
      <div className="row h-100 m-0">
        <Sidebar />
        <div className="col px-4 py-4" style={{ backgroundColor: "#FBF9F9" }}>
          <div className="container p-4 bg-white rounded shadow-sm">

            <div className="mb-4">
              <h2 className="fw-semibold" style={{ color: "#99CBC8" }}>{modulo.titulo}</h2>
              <h5 className="mb-3" style={{ color: "#234970" }}>{modulo.subtitulo}</h5>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  <span className="small fw-semibold" style={{ color: "#234970" }}>Progresso do Módulo</span>
                  <span className="small fw-semibold" style={{ color: "#234970" }}>{progressoModulo.toFixed(0)}%</span>
                </div>

                <div className="progress" style={{ height: "10px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${progressoModulo}%`, backgroundColor: "#99CBC8" }}
                    aria-valuenow={progressoModulo}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
              </div>

              <h4 className="mt-5" style={{ color: "#99CBC8" }}>
                <span
                  style={{
                    borderBottom: "3px solid #99CBC8",
                    display: "inline-block",
                    paddingBottom: "2px",
                  }}
                >
                  Atividades
                </span>
              </h4>
            </div>

            <div className="row">
              {modulo.atividades.map((atividade, index) => (
                <AtividadeCard
                  key={atividade.url}
                  atividade={atividade}
                  status={atividadesStatus[index]?.status === 'desbloqueado'}
                  concluido={atividadesStatus[index]?.concluido}
                  moduloId={modulo.id}
                  atividadeIndex={index}
                />
              ))}
            </div>

            <div className="mt-5">
              {renderDesafioSemanal()}
            </div>

          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          if ((id === '3' && progressoModulo === 100 && mfim === 'naomostrada') ||
              (id === '6' && progressoModulo === 100 && mfim === 'naomostrada'))
          {
            setShowExtraModal(true);
          }
        }}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#99CBC8",
            borderBottom: "none",
            color: "#fff",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
           <Modal.Title style={{fontWeight: "600", margin: "0", padding: '1rem 7rem',}}>
           ⚡ Energia TOUCH
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            padding: "1.5rem",
            fontSize: "1.05rem",
            color: "#234970",
            backgroundColor: "#F5FDFC",
            textAlign: "center",
          }}
        >
          {mensagemModal}
        </Modal.Body>

        <Modal.Footer
          style={{
            borderTop: "none",
            backgroundColor: "#F5FDFC",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => {
              setShowModal(false);
              if ((id === '3' && progressoModulo === 100 && mfim === 'naomostrada') ||
                  (id === '6' && progressoModulo === 100 && mfim === 'naomostrada'))
              {
                setShowExtraModal(true);
              }
            }}
            style={{
              backgroundColor: "#234970",
              borderColor: "#234970",
              borderRadius: "20px",
              padding: "0.5rem 1.5rem",
              fontWeight: "500",
            }}
          >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showExtraModal} onHide={() => setShowExtraModal(false)} centered backdrop="static" keyboard={false}>
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#99CBC8",
            borderBottom: "none",
            color: "#fff",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
           <Modal.Title style={{fontWeight: "600", margin: "0", padding: '1rem 7rem',}}>
           ⚡ Energia TOUCH
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            padding: "1.5rem",
            fontSize: "1.05rem",
            color: "#234970",
            backgroundColor: "#F5FDFC",
            textAlign: "center",
          }}
        >
          {mensagemModelExtra}
        </Modal.Body>
        <Modal.Footer style={{backgroundColor: '#F5FDFC', justifyContent: 'center'}}>
          <Button onClick={() => setShowExtraModal(false)} style={{backgroundColor: '#234970'}}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Modulos;
