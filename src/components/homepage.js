import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { UserContext } from '../App'; 
import Navbar from './navbar';
import Sidebar from './sidebar';
import { useNavigate } from 'react-router-dom';
import ModuloCard from './moduloCardHome'; 
import modulos from '../data/modulos'; 
import Loading from './loading'; 
import Login from "./login";
import Signup from "./signup";

const Homepage = () => {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const mensagemPopUp = "⚠️ Atenção: O site pode não ter a melhor experiência em dispositivos móveis.";

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setModalShow(true);
    }
  }, []);

  useEffect(() => {
    if (!userData) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setShowLogin(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [userData]);

  const handleOpenLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleOpenSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const handleClosePopups = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleCloseWithNavigation = () => {
    handleClosePopups();
    navigate('../');
  };

  const handleNavigate = (moduloId) => {
    navigate(`/modulos/${moduloId}`);
  };

  const totalModulos = 6;
  const concluidos = userData?.modulosConcluidos || 0;
  const percentagem = Math.round((concluidos / totalModulos) * 100);

  if (!userData && isLoading) {
    return <Loading message="A carregar a tua página inicial..." />;
  }

  if (!userData) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'white' }}>
        {showLogin && (
          <Login
            show={showLogin}
            onClose={handleCloseWithNavigation}
            onLoginSuccess={handleClosePopups}
            onSwitchToSignup={handleOpenSignup}
          />
        )}
        {showSignup && (
          <Signup
            show={showSignup}
            onClose={handleCloseWithNavigation}
            onSwitchToLogin={handleOpenLogin}
          />
        )}
      </div>
    );
  }

  return (
    <div className="container-fluid vh-100 p-0" style={{ position: 'relative' }}>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        centered
        role="dialog"
        aria-modal="true"
        aria-label="Aviso sobre experiência móvel"
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#D9534F",
            borderBottom: "none",
            color: "#fff",
          }}
        >
          <Modal.Title style={{ fontWeight: "600" }}>
            Aviso
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-start" style={{ color: "#721c24" }}>
          {mensagemPopUp}
        </Modal.Body>
        <Modal.Footer
          style={{
            borderTop: "none",
            backgroundColor: "#f8d7da",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Button
            onClick={() => setModalShow(false)}
            aria-label="Fechar aviso sobre dispositivos móveis"
            style={{
              backgroundColor: "#D9534F",
              borderColor: "#D43F3A",
              borderRadius: "20px",
              padding: "0.5rem 1.5rem",
              fontWeight: "500",
            }}
          >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      <Navbar />
      <div className="row h-100 m-0">
        <Sidebar />
        <div className="col px-4 py-4" style={{ backgroundColor: "#FBF9F9" }}>
          <div className="container p-4 bg-white rounded shadow-sm">
            <h2 className="mb-3 fw-semibold" style={{ color: "#99CBC8" }}>
              Bem vindo/a, <span>{userData.nome}!</span>
            </h2>

            <div className="mb-4" aria-label="Progresso dos módulos">
              <div className="d-flex justify-content-between mb-1">
                <span className="small fw-semibold" style={{ color: "#234970" }}>Progresso dos Módulos</span>
                <span className="small fw-semibold" style={{ color: "#234970" }}>{percentagem}%</span>
              </div>
              <div className="progress" style={{ height: "10px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${percentagem}%`, backgroundColor: "#99CBC8" }}
                  aria-label={`Progresso: ${percentagem}% dos módulos concluídos`}
                  aria-valuenow={percentagem}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>

              <div className="mt-2 small text-muted">
                {percentagem === 0 && <>Ainda não concluíste nenhum módulo. <span className=" fw-semibold" style={{ color: "#234970" }}>Dá o primeiro passo!</span></>}
                {percentagem > 0 && percentagem <= 20 && <>Iniciaste o caminho! <span className="fw-semibold " style={{ color: "#234970" }}>Estás a dar os primeiros passos.</span></>}
                {percentagem > 20 && percentagem <= 40 && <>Estás a caminhar! <span className=" fw-semibold" style={{ color: "#234970" }}>Lembra-te que cada passo importa!</span></>}
                {percentagem > 40 && percentagem <= 60 && <>Mantém o ritmo! <span className=" fw-semibold" style={{ color: "#234970" }}>Continua com essa motivação!</span></>}
                {percentagem > 60 && percentagem <= 80 && <>Quase lá! <span className=" fw-semibold " style={{ color: "#234970" }}>Faltam só mais alguns passos!</span></>}
                {percentagem > 80 && percentagem < 100 && <>Último módulo à vista!! <span className=" fw-semibold " style={{ color: "#234970" }}> O teu esforço vai valer a pena!</span></>}
                {percentagem === 100 && <>Parabéns! Concluíste todos os módulos. <span className=" fw-semibold " style={{ color: "#234970" }}>Aproveita tudo o que este percurso te trouxe!</span></>}
              </div>
            </div>

            <div className="row row-cols-1 row-cols-md-3 g-4" aria-label="Lista de módulos">
              {modulos.map((modulo) => {
                const chaveModulo = `modulo${modulo.id}`;
                const status = userData.modulos?.[chaveModulo]?.status || 'bloqueado';
                return (
                  <ModuloCard
                    key={modulo.id}
                    {...modulo}
                    status={status}
                    atividades={userData.modulos?.[chaveModulo]?.atividades || []}
                    onNavigate={() => handleNavigate(modulo.id)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
