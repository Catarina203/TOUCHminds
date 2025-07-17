import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../App";
import Navbar from './navbar';
import Sidebar from './sidebar';
import Loading from './loading';

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

const Definicoes = () => {
  const [nome, setNome] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [avatarOptions, setAvatarOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const { userData, updateUserData } = useContext(UserContext);

  useEffect(() => {
    if (userData) {
      setNome(userData.nome || '');
      setSelectedAvatar(userData.avatarId || '');
    }

    setAvatarOptions([
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
    ]);
  }, [userData]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    if (!nome.trim()) {
      setMessage({ text: 'Por favor, insira o seu nome.', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      await updateUserData({
        ...userData,
        uid: userData.uid,
        nome: nome,
        avatarId: selectedAvatar,
      });

      setMessage({ text: 'Perfil atualizado com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setMessage({ text: 'Erro ao salvar informações. Por favor, tente novamente.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return <Loading message="A carregar as definições..." />;
  }

  return (
    <div className="container-fluid vh-100 p-0">
      <Navbar />
      <div className="row h-100 m-0">
        <Sidebar />
        <div className="col px-4 py-4" style={{ backgroundColor: "#FBF9F9" }}>
          <div className="container p-4 bg-white rounded shadow-sm">
            <h2 className="mb-3 fw-semibold" style={{ color: "#99CBC8" }}>Definições</h2>
            <p className="text-muted" style={{ fontSize: '1rem' }}>
              Personaliza o teu perfil alterando o nome na plataforma e escolhendo um avatar.
            </p>

            {message.text && (
              <div
                className={`message ${message.type}`}
                role="status"
                aria-live="polite"
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSave}>
              <div className="mt-4 p-4 rounded" style={{ backgroundColor: '#fbf9f9' }}>
                <h5 className="fw-semibold mb-2" style={{ color: '#234970' }}>Nome na Plataforma</h5>
                <p>Como queres ser chamado/a na plataforma:</p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Insira o nome na plataforma"
                  aria-label="Nome na plataforma"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  style={{ borderColor: '#66BFBF', borderRadius: '6px' }}
                />
              </div>

              <fieldset className="mt-4 p-4 rounded" style={{ backgroundColor: '#fbf9f9' }}>
                <legend className="fw-semibold mb-2" style={{ color: '#234970' }}>Escolhe o teu avatar</legend>
                <p>Seleciona uma imagem que te represente:</p>
                <div className="d-flex flex-wrap gap-3 mt-3">
                  {avatarOptions.map((avatar) => (
                    <div key={avatar.id} className="text-center">
                      <img
                        src={avatar.src}
                        alt={`Avatar ${avatar.id}`}
                        className="rounded-circle"
                        role="button"
                        tabIndex="0"
                        aria-label={`Selecionar ${avatar.id}`}
                        style={{
                          width: "75px",
                          height: "75px",
                          objectFit: "cover",
                          cursor: "pointer",
                          border: selectedAvatar === avatar.id
                            ? "3px solid #3B9C9C"
                            : "3px solid transparent",
                          transition: "all 0.2s ease",
                          boxShadow: selectedAvatar === avatar.id
                            ? "0 0 12px rgba(59, 156, 156, 0.5)"
                            : "none"
                        }}
                        onClick={() => setSelectedAvatar(avatar.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedAvatar(avatar.id);
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="mt-4 text-center">
                <button
                  type="submit"
                  className="custom-btn-turquoise px-4 py-2"
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">A processar...</span>
                      </div>
                      A processar...
                    </div>
                  ) : (
                    "Guardar alterações"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Definicoes;
