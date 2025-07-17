import React from "react";
import dep from "../imgs/depvertical.png";
import ue from "../imgs/ue.png";
import rp from "../imgs/rp.png";
import fct from "../imgs/fct.png";
import wjcr from "../imgs/wjcr.png";
import hml from "../imgs/healthyminds.png";
import pessoas30 from "../imgs/pessoas30.png";
import portugal30 from "../imgs/portugal30.png";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#99CBC8", color: "#ffffff" }} className="pt-5">
      <div className="container">
        <div className="row g-4">
          
          {/* PROMOTORES */}
          <div className="col-md-6 text-center text-md-start">
            <h5 className="fw-bold text-uppercase mb-3" style={{ color: "#234970" }}>Promotores</h5>
            <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-4 align-items-center">
              <img src={dep} alt="Departamento Psicologia" style={{ height: "60px" }} />
              <img src={wjcr} alt="William James Center for Research" style={{ height: "60px" }} />
              <img src={hml} alt="Healthy Minds Lab" style={{ height: "80px" }} />
            </div>
          </div>

          {/* FINANCIADORES */}
          <div className="col-md-6 text-center text-md-start">
            <h5 className="fw-bold text-uppercase mb-3" style={{ color: "#234970" }}>Financiadores</h5>
            <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-4 align-items-center">
              <img src={ue} alt="União Europeia" style={{ height: "50px" }} />
              <img src={rp} alt="República Portuguesa" style={{ height: "50px" }} />
              <img src={fct} alt="FCT" style={{ height: "70px" }} />
              <img src={pessoas30} alt="Pessoas 2030" style={{ height: "40px" }} />
              <img src={portugal30} alt="Portugal 2030" style={{ height: "40px" }} />
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4" style={{ borderTop: "1px solid #ffffff88" }} />

        {/* Texto final */}
        <div className="text-center small" style={{ color: "#f7f7f7" }}>
          Desenvolvido pelo <strong>Departamento de Psicologia e Educação</strong> da Universidade de Aveiro e pelo <strong>William James Center for Research</strong>, com financiamento da <strong>Fundação para a Ciência e Tecnologia</strong>.
        </div>
      </div>

      {/* Barra inferior */}
      <div style={{ backgroundColor: "#234970", padding: "10px 0", marginTop: "30px" }}>
        <p className="text-center mb-0 small" style={{ color: "#ffffffcc" }}>
          © {new Date().getFullYear()} TOUCHminds – Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
