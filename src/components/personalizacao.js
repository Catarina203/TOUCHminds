import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { dadosAlunos } from "../database/database"; 

const PersonalizationPopup = ({
  nome,
  setNome,
  selectedAvatar,
  setSelectedAvatar,
  avatarOptions,
  userId,
  loading,
  setLoading,
  setError,
}) => {
  const navigate = useNavigate();

  const {updateUserData} = useContext(UserContext)

  console.log("userId recebido no popup:", userId);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!nome.trim()) {
      setError("Por favor, insire o teu nome.");
      setLoading(false);
      return;
    }

    try {
      await updateUserData({
        uid: userId,        
        nome: nome,
        avatarId: selectedAvatar,
      });

       // Pequeno intervalo para garantir a escrita
      await new Promise((res) => setTimeout(res, 300));

      // Força a leitura atualizada dos dados
      const latestData = await dadosAlunos(userId);
      updateUserData({ ...latestData, uid: userId }); 

      navigate("/plataforma");
    } catch (error) {
      setError("Erro ao salvar informações. Por favor, tenta novamente.");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
        style={{ 
          backgroundColor: "rgba(0, 0, 0, 0.5)", 
          zIndex: 1050 
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="card shadow-lg border-0 p-4"
          style={{ 
            maxWidth: "500px", 
            width: "90%", 
            borderRadius: "20px",
            backgroundColor: "#FBF9F9" 
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.h4 
            className="text-center mb-4 fw-semibold"
            style={{ color: "#99CBC8" }}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Personaliza o teu perfil
          </motion.h4>

          <form onSubmit={handleSave}>
            <motion.div
              className="mb-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="form-label fw-medium">Nome na Plataforma</label>
              <motion.input
                type="text"
                className="form-control custom-input"
                placeholder="Insire o nome na plataforma"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                whileFocus={{ boxShadow: "0 0 0 3px rgba(153, 203, 200, 0.25)" }}
              />
            </motion.div>

            <motion.div
              className="mb-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="form-label fw-medium">Escolhe o teu avatar*</label>
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-2">
                {avatarOptions.map((avatar, index) => (
                  <motion.div
                    key={avatar.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={avatar.src}
                      alt={`Avatar ${index + 1}`}
                      className={`rounded-circle avatar-option ${
                        selectedAvatar === avatar.id ? "avatar-selected" : ""
                      }`}
                      style={{ 
                        width: "70px", 
                        height: "70px", 
                        objectFit: "cover",
                        cursor: "pointer",
                        border: selectedAvatar === avatar.id
                          ? "3px solid #99CBC8"
                          : "3px solid transparent",
                      }}
                      onClick={() => setSelectedAvatar(avatar.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.button
              type="submit"
              className="btn w-100 rounded-pill"
              style={{ 
                backgroundColor: "#E7C8C2", 
                color: "white", 
                fontWeight: "600" 
              }}
              disabled={loading}
              whileHover={{ backgroundColor: "#deb9b2", scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {loading ? (
                <div className="d-flex align-items-center justify-content-center">
                  <div className="spinner-border spinner-border-sm me-2" role="status">
                    <span className="visually-hidden">A processar...</span>
                  </div>
                  A processar...
                </div>
              ) : (
                "Guardar e continuar"
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PersonalizationPopup;