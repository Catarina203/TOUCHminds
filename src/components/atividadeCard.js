import { Link } from "react-router-dom";
import { CheckCircle, Lock } from "lucide-react";


const AtividadeCard = ({ atividade, status, concluido, moduloId }) => {
  const containerStyle = {
    filter: status ? "none" : "grayscale(100%)",
    cursor: status ? "pointer" : "not-allowed",
    transition: "0.3s",
  };

  console.log("Atividades:", moduloId);

  const content = (
    <div className="position-relative" style={containerStyle}>
      <img
        src={atividade.imagem}
        alt={atividade.titulo}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "12px",
          opacity: status ? 1 : 0.7,
        }}
      />
      
      {/* Badge de Bloqueado (similar ao de Concluído) */}
      {!status && (
        <div
          className="position-absolute top-0 end-0 m-2 bg-secondary text-white rounded-pill px-2 py-1"
          style={{ fontSize: "0.8rem" }}
        >
          <Lock size={16} className="me-1" /> Bloqueada
        </div>
      )}
      
      {/* Badge de Concluído */}
      {status && concluido && (
        <div
          className="position-absolute top-0 end-0 m-2 bg-success text-white rounded-pill px-2 py-1"
          style={{ fontSize: "0.8rem" }}
        >
          <CheckCircle size={16} className="me-1" /> Concluída
        </div>
      )}
      
      <div className="mt-2 text-start">
        <h6 className="fw-semibold mb-1" style={{ color: "#234970" }}>
          {atividade.titulo}
        </h6>
      </div>
    </div>
  );

  return (
    <div className="col-sm-6 col-md-4 mb-4">
      {status ? (
        <Link
          to={`/modulos/${moduloId}/atividade/${atividade.url}`}
          className="text-decoration-none text-dark"
        >
          {content}
        </Link>
      ) : (
        <div className="text-decoration-none text-dark">
          {content}
        </div>
      )}
    </div>
  );
};

export default AtividadeCard;