import { useState, useContext } from "react";
import { UserContext } from "../App";
import { motion } from "framer-motion";
import { Eye, EyeOff, X } from "lucide-react";
import { loginAluno, dadosAlunos } from "../database/database";
import logo from "../imgs/logositeazul.png";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function LoginModal({ onClose, onLoginSuccess, onSwitchToSignup }) {
  const [codigoParticipante, setCodigoParticipante] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { updateUserData } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await loginAluno(codigoParticipante, password);
      const dados = await dadosAlunos(user.uid);
      updateUserData({ uid: user.uid, ...dados });
      navigate("/plataforma");
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      setError("Código de participante ou senha incorretos. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <motion.div
        className="modal-card"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button className="modal-close" onClick={onClose}><X /></button>
        <div className="text-center mb-3">
          <img src={logo} alt="Logo" style={{ maxWidth: 100 }} className="mb-2" />
          <h4 style={{ color: "#99CBC8" }}>Entrar na tua conta</h4>
          <p className="text-muted">
            ou <span onClick={onSwitchToSignup} style={{ cursor: "pointer", textDecoration: "underline", color: "#E7C8C2" }}>criar uma conta</span>
          </p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Código de Participante*</label>
            <input
              type="text"
              className="form-control"
              value={codigoParticipante}
              onChange={(e) => setCodigoParticipante(e.target.value)}
              required
              style={{ borderRadius: "12px" }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Palavra-passe*</label>
            <div className="input-group" style={{ borderRadius: "12px", overflow: "hidden" }}>
              <input
                type={mostrarSenha ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ borderRadius: "12px 0 0 12px"}}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                style={{ borderRadius: "0 12px 12px 0", border:' 1px solid #99CBC8', borderLeft: 'none'}}
              >
                {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#99CBC8",
              border: "none",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "12px",
              transition: "background-color 0.3s ease"
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#85b5b2")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#99CBC8")}
            disabled={loading}
          >
            {loading ? "A processar..." : "Entrar"}
          </button>
        </form>

      </motion.div>
    </div>
  );
}