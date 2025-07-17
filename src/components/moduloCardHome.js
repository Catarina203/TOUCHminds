import React from "react";
import { CheckCircle, Lock } from "lucide-react";

const ModuloCard = ({ imagem, titulo, subtitulo, status, atividades, onNavigate }) => {
  const isBloqueado = status === "bloqueado";
  const todasConcluidas = atividades.length > 0 && atividades.every((a) => a.concluido === true);

  return (
    <div
      className="mb-4 position-relative"
      onClick={!isBloqueado ? onNavigate : null}
      style={{
        cursor: isBloqueado ? "not-allowed" : "pointer",
        filter: isBloqueado ? "grayscale(100%)" : "none",
        opacity: isBloqueado ? 0.7 : 1,
        transition: "0.3s",
      }}
    >
      <div className="position-relative">
        <img
          src={imagem}
          alt={titulo}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />

        {isBloqueado && (
          <div
            className="position-absolute top-0 end-0 m-2 bg-secondary text-white rounded-pill px-2 py-1 d-flex align-items-center"
            style={{ fontSize: "0.8rem" }}
          >
            <Lock size={16} className="me-1" /> Bloqueado
          </div>
        )}

        {todasConcluidas && (
          <div
            className="position-absolute top-0 end-0 m-2 bg-success text-white rounded-pill px-2 py-1 d-flex align-items-center"
            style={{ fontSize: "0.8rem" }}
          >
            <CheckCircle size={16} className="me-1" /> Concluído
          </div>
        )}
      </div>

      <div className="mt-3 text-start">
        <h5 className="fw-bold" style={{ color: "#99CBC8" }}>
          {titulo}
        </h5>
        <p className="mb-1 fw-bold" style={{ color: "#234970" }}>
          {subtitulo}
        </p>
      </div>
    </div>
  );
};

export default ModuloCard;