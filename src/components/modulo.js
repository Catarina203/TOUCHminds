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
  5: "Falar sobre sintomas e pedir ajuda pode ser difícil. Entender a importância desse passo mostra como procurar ajuda é um gesto de cuidado, e saber que existem diferentes formas de ajuda permite encontrar respostas adequadas a cada situação!",
  6: "Conhecer melhor a ajuda profissional revela como este recurso pode ser essencial para o bem-estar. Informar-se é uma forma de estar mais preparado/a para lidar com o que surgir!"
};

const mensagensFim = {
  1: "Neste módulo foi possível conhecer melhor o que é a ansiedade e os desafios que pode trazer porque compreender a ansiedade é um passo importante para melhor lidar com ela. Continua a explorar com curiosidade e abertura!",
  2: "Neste módulo foram exploradas ideias feitas sobre a ansiedade, ajudando a perceber como alguns mitos e estigmas podem ser postos em causa. Pensar de forma mais aberta faz a diferença e é importante mantém o espírito crítico e a vontade de aprender!",
  3: "Neste módulo falámos da voz crítica que todos temos e de como existem formas diferentes de nos tratarmos, incluindo tratarmo-nos com mais bondade. Conhecer estas alternativas faz parte do processo. Leva contigo esta nova perspetiva e continua a praticá-la!",
  4: "Neste módulo refletimos sobre os prós e contras da mudança, o que ajuda a perceber que tomar decisões envolve dúvidas ao mesmo tempo que mostra que pensar sobre elas é um gesto de coragem. Confia no processo e no que vais descobrindo pelo caminho!",
  5: "Neste módulo discutimos a importância de falar sobre sinais de mal-estar e de pedir ajuda. Reconhecer este passo pode abrir caminho para encontrar ajuda quando necessário. Valoriza o gesto de pedir ajuda e continua a cuidar de ti!",
  6: "Neste módulo falámos sobre ajuda profissional para perceber melhor em que consiste esta ajuda e quando pode ser útil. Conhecer estas possibilidades é parte de estar mais preparado(a). Leva contigo essa informação e confia que podes procurar ajuda quando fizer sentido!"
};

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

  const modalShownKey = `modalShown_modulo_${modulo?.id}`;

  const [showModal, setShowModal] = useState(() => {
    if (!modulo) return false;
    return (progressoModulo === 100 && mfim == "naomostrada") || progressoModulo === 0
  });

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
        onHide={() => setShowModal(false)}
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
           <Modal.Title style={{fontWeight: "600", margin: "0",}}>
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
              if (progressoModulo === 100) {
                localStorage.setItem(modalShownKey, 'true');
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
    </div>
  );
};

export default Modulos;
