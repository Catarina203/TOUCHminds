import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, X } from "lucide-react";
import { registerAluno } from "../database/database";
import logo from "../imgs/logositeazul.png";
import PersonalizationPopup from "./personalizacao";
import "../App.css";


import avatar1 from "../imgs/avatar1.jpg";
import avatar2 from "../imgs/avatar2.jpg";
import avatar3 from "../imgs/avatar3.jpg";
import avatar4 from "../imgs/avatar4.jpg";
import avatar5 from "../imgs/avatar5.jpg";
import avatar6 from "../imgs/avatar6.jpg";
import avatar7 from "../imgs/avatar7.jpg";
import avatar8 from "../imgs/avatar8.jpg";
import avatar9 from "../imgs/avatar9.jpg";
import avatar10 from "../imgs/avatar10.jpg";

export default function SignupModal({ onClose, onSwitchToLogin }) {
  const [codigoParticipante, setCodigoParticipante] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [userId, setUserId] = useState(null);
  const [nome, setNome] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const avatarOptions = [
    { id: "avatar1", src: avatar1 },
    { id: "avatar2", src: avatar2 },
    { id: "avatar3", src: avatar3 },
    { id: "avatar4", src: avatar4 },
    { id: "avatar5", src: avatar5 },
    { id: "avatar6", src: avatar6 },
    { id: "avatar7", src: avatar7 },
    { id: "avatar8", src: avatar8 },
    { id: "avatar9", src: avatar9 },
    { id: "avatar10", src: avatar10 },
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const user = await registerAluno(codigoParticipante, password);
      setUserId(user.uid);
      setShowPopup(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (showPopup) {
    return (
      <PersonalizationPopup
        userId={userId}
        nome={nome}
        setNome={setNome}
        selectedAvatar={selectedAvatar}
        setSelectedAvatar={setSelectedAvatar}
        avatarOptions={avatarOptions}
        setLoading={setLoading}
        setError={setError}
      />
    );
  }


  return (
    <div className="modal-overlay">
      <motion.div
        className="modal-card"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Botão de fechar */}
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Fechar"
        >
          <X />
        </button>

        <div className="text-center mb-3">
          <img src={logo} alt="Logo" style={{ maxWidth: 100 }} className="mb-2" />
          <h4 style={{ color: "#99CBC8" }}>Criar uma conta</h4>
          <p className="text-muted">
            ou{" "}
            <span
              onClick={onSwitchToLogin}
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                color: "#E7C8C2"
              }}
            >
              entrar na tua conta
            </span>
          </p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Código de Participante*</label>
            <input
              type="text"
              className="form-control"
              style={{ borderRadius: "12px" }}
              value={codigoParticipante}
              onChange={(e) => setCodigoParticipante(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
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

          <div className="mb-4">
            <label className="form-label">Confirmar Palavra-passe*</label>
            <input
              type={mostrarSenha ? "text" : "password"}
              className="form-control"
              style={{ borderRadius: "12px" }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
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
            {loading ? "A processar..." : "Criar conta"}
          </button>
        </form>

      </motion.div>
    </div>
  );
}


