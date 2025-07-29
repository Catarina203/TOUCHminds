import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import { FaArrowDown } from 'react-icons/fa';
import logo from "../imgs/logositeazul.png";
import Footer from "./footer";
import ModuleCard from "./moduleCardLanding";
import mod1 from "../imgs/module1.jpg";
import mod2 from "../imgs/module2.jpg";
import mod3 from "../imgs/module3.jpg";
import mod4 from "../imgs/module4.jpg";
import mod5 from "../imgs/module5.jpg";
import mod6 from "../imgs/module6.jpg";

import Login from "./login";
import Signup from "./signup";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

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

  return (
    <div style={{ position: "relative", overflow: "hidden", backgroundColor: "#fbf9f9" }}>
      {(showLogin || showSignup) && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
          onClick={handleClosePopups}
          aria-label="Fechar popup clicando fora do formulário"
        />
      )}

      {showLogin && (
        <div
          className="position-fixed top-50 start-50 translate-middle"
          style={{ zIndex: 1050, width: "100%", maxWidth: "500px" }}
          role="dialog"
          aria-modal="true"
          aria-label="Formulário de login"
        >
          <Login
            onClose={handleClosePopups}
            onSwitchToSignup={handleOpenSignup}
          />
        </div>
      )}

      {showSignup && (
        <div
          className="position-fixed top-50 start-50 translate-middle"
          style={{ zIndex: 1050, width: "100%", maxWidth: "500px" }}
          role="dialog"
          aria-modal="true"
          aria-label="Formulário de registo"
        >
          <Signup
            onClose={handleClosePopups}
            onSwitchToLogin={handleOpenLogin}
          />
        </div>
      )}

      <img src={logo} alt="Logotipo TOUCHminds" className="mt-4 mx-auto d-block" style={{ width: "10%" }} />

      <section className="container py-5"  aria-label="Introdução ao programa TOUCHminds">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 text-center text-md-start">
            <h1 className="fw-bold font-poppins py-3" style={{ color: "#99CBC8", fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
              Procurar ajuda é o começo da mudança!
            </h1>
            <p className="text-muted font-lato py-3">
              Bem-vindo/a ao TOUCHminds. <br />O TOUCHminds oferece um programa online gratuito destinado a ajudar os adolescentes entre os 15 e os 17 anos a compreender a ansiedade e a promover a procura de ajuda.
            </p>
            <div className="py-3">
              <button
                aria-label="Abre o formulário de registo para começar o programa TOUCHminds"
                className="btn font-poppins fw-bold py-2 px-4 py-md-3 px-md-5 btn-lg"
                style={{
                  backgroundColor: "#E7C8C2",
                  borderColor: "#E7C8C2",
                  color: "#1a3a5a",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s",
                  fontSize: "clamp(0.8rem, 1.5vw, 1.1rem)"
                }}
                onClick={handleOpenSignup}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                Começa a tua jornada agora
              </button>
            </div>
          </div>
          <div className="d-none d-md-block w-50 text-center">
            <img
              src={''}
              alt=""
              className="img-fluid w-75 mx-auto d-block"
            />
          </div>
        </div>
      </section>

      <div className="text-center pb-4" style={{ color: "#234970" }}>
        <a href="#faq" style={{ textDecoration: "none", color: "#234970" }} aria-label="Ir para as perguntas frequentes">
          <FaArrowDown className="arrow-down" />
        </a>
      </div>

      <section className="py-5 text-start" style={{ backgroundColor: "#99CBC8", color: "white", minHeight: "380px" }} aria-label="Perguntas frequentes sobre o programa TOUCHminds">
        <div className="container" id="faq">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header className="font-poppins">O que é?</Accordion.Header>
              <Accordion.Body className="font-lato">
                O TOUCHminds é um programa online e gratuito, criado para promover a procura de ajuda em adolescentes que lidam com dificuldades relacionadas com a ansiedade.
                Sabemos que, muitas vezes, a dificuldade em pedir ajuda vem do medo de ser julgado, da ideia de que as nossas emoções não são importantes, ou até da imposição
                que nos colocamos de que deveríamos ser capazes de lidar com essa dificuldade sozinho/a. Este programa foi desenvolvido para mudar estas ideias e promover a
                procura de ajuda, quando e se necessário.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className="font-poppins">A quem se dirige?</Accordion.Header>
              <Accordion.Body className="font-lato">
                O TOUCHminds destina-se a adolescentes dos 15 aos 17 anos que sentem que a ansiedade tem impacto na sua vida. Atualmente, o programa está disponível para
                participantes das escolas selecionadas no norte do país, sendo necessário efetuar um registo na plataforma para aceder ao programa.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header className="font-poppins">Como funciona?</Accordion.Header>
              <Accordion.Body className="font-lato">
                <ul>
                  <li>É 100% online e gratuito.</li>
                  <li>Composto por seis módulos interativos com vídeos, áudios, imagens e atividades interativas.</li>
                  <li>O programa adapta-se à tua rotina, para que possas fazê-lo ao teu ritmo.</li>
                  <li>Inclui três sessões com um psicólogo, online e síncronos.</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </section>

      <section className="container py-5" style={{ backgroundColor: "#fbf9f9" }}>
        <h2 className="text-start font-poppins fw-bold mb-4" style={{ color: "#234970" }}>
          Espreita os Módulos!
        </h2>
        <div className="row mt-4">
          <ModuleCard image={mod1} title="Módulo 1" subtitle="Ansiedade NÃO é bicho-papão!" description="Aprende a diferenciar ansiedade comum de SOS, e reconhece como a ansiedade pode afetar a vida das pessoas, incluindo a tua." />
          <ModuleCard image={mod2} title="Módulo 2" subtitle="Desmistificar a Ansiedade!" description="Percebe o impacto do estigma sobre a ansiedade e a forma como lidamos com ela e aprende a separar factos de mitos." />
          <ModuleCard image={mod3} title="Módulo 3" subtitle="Sê Amigo de Ti Mesmo!" description="Examina como o autocriticismo te trava e descobre a autocompaixão como superpoder para cuidares melhor de ti." />
          <ModuleCard image={mod4} title="Módulo 4" subtitle="O Poder da Mudança!" description="Explora as fases da mudança, avalia prós e contras de novos comportamentos e desenvolve confiança para dares pequenos passos." />
          <ModuleCard image={mod5} title="Módulo 5" subtitle="Reviravolta em Rede!" description="Identifica sinais de ansiedade, explora terapias baseadas em evidência e aprende a distinguir diferentes fontes de ajuda." />
          <ModuleCard image={mod6} title="Módulo 6" subtitle="Um Novo Começo!" description="Conhece o papel do psicólogo, compreende as etapas da psicoterapia e explora recursos disponíveis para pedires ajuda sempre que precisares." />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
