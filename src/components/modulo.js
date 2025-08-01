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

import { UserContext } from '../App';
import modulos from '../data/modulos';
import AtividadeCard from './atividadeCard';
import { Modal, Button } from 'react-bootstrap';
import Loading from './loading';

const mensagensInicio = {
  1: "Falar sobre ansiedade pode ser desconfortável. Ao compreendê-la melhor, tornamo-nos mais conscientes dos seus desafios e descobrimos caminhos para lidar com ela com mais confiança",
  2: "Desafiar mitos e estigmas pode abalar certezas, mas cada dúvida que vais esclarecendo fortalece a tua compreensão—continua curioso(a)!",
  3: "Olhar de frente para a tua voz crítica pode ser difícil, mas ao praticares autocompaixão constróis um alicerce sólido para o teu bem-estar.",
  4: "Mudar gera incerteza e desconforto, mas cada análise de prós e contras de mudar é um ato de coragem—confia na tua capacidade de evoluir!",
  5: "Falar de sintomas e pedir ajuda pode ser desafiante, mas reconhecer essa vulnerabilidade abre-te portas a ligações verdadeiras—és capaz de o fazer!",
  6: "Falar sobre ajuda profissional pode intimidar, mas este passo revela a tua determinação—acredita em ti para seguires em frente!"
};

const mensagensFim = {
  1: "Superaste o desconforto de falares sobre ansiedade e ganhaste clareza sobre o que sentes — és mais resiliente do que pensas!",
  2: "Passaste pelo desafio de questionares mitos e estigmas, e acabaste com uma visão mais clara — mantém essa curiosidade!",
  3: "Enfrentaste a tua voz crítica e praticaste autocompaixão, construindo um alicerce sólido para o teu bem-estar — orgulha-te deste passo!",
  4: "Analisaste prós e contras da mudança e suportaste a incerteza — demonstraste coragem para evoluir!",
  5: "Falaste de sintomas e abriste-te à ajuda, reconhecendo a tua vulnerabilidade — foste corajoso(a)!",
  6: "Abordaste a ideia de ajuda profissional e confirmaste a tua determinação — confia em ti para continuares em frente!"
};

const Modulos = () => {
  const { id } = useParams();  
  const { userData } = useContext(UserContext);  

  const modulo = modulos.find((m) => m.id === id);
  const moduloUserKey = modulo ? `modulo${modulo.id}` : '';
  const atividadesStatus = userData?.modulos?.[moduloUserKey]?.atividades || [];
  const atividadesConcluidas = atividadesStatus.filter((a) => a.concluido).length;
  const progressoModulo = (atividadesStatus.length > 0)
    ? (atividadesConcluidas / atividadesStatus.length) * 100
    : 0;

  const modalShownKey = `modalShown_modulo_${modulo?.id}`;
  const modalAlreadyShown = localStorage.getItem(modalShownKey) === 'true';

  const [showModal, setShowModal] = useState(() => {
    if (!modulo) return false;
    return (progressoModulo === 100 && !modalAlreadyShown) || progressoModulo === 0;
  });

  const [mensagemModal] = useState(() => {
    if (!modulo) return '';
    if (progressoModulo === 100 && userData.modulos[moduloUserKey].mensagemdefim === "naomostrada") {
      userData.modulos[moduloUserKey].mensagemdefim = "mostrada";
      return mensagensFim[modulo.id];
    } else if (progressoModulo === 0) {
      return moduloUserKey;
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
          }}
        >
          <Modal.Title style={{ fontWeight: "600" }}>
            ✨ Uma reflexão para ti
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            padding: "1.5rem",
            fontSize: "1.05rem",
            color: "#234970",
            backgroundColor: "#F5FDFC",
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
