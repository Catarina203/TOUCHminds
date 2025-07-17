import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoxArrowRight, List, House, Envelope, Trophy, People, Gear,  } from 'react-bootstrap-icons';
import { UserContext } from '../App';
import { logoutAluno } from "../database/database";
import logo from "../imgs/logoazul.png";

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

const Navbar = () => {
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

  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const [notificacaoVisivel, setNotificacaoVisivel] = useState(false);
  const [notificacaoSemanal, setNotificacaoSemanal] = useState('');
  const [menuAberto, setMenuAberto] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutAluno();
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
    }
  };

  const handleDefinicoes = () => {
    navigate('/definicoes');
    setShowTooltip(false);
  };

  const toggleTooltip = () => setShowTooltip(prev => !prev);

  const verificarNotificacoesSemanais = () => {
    const hoje = new Date();
    const diaSemana = hoje.getDay();
    const todayStr = hoje.toDateString();
    const lastShown = localStorage.getItem('lastNotificationDate');

    if (lastShown === todayStr) return;

    const hasModuloIncompleto = Object.values(userData?.modulos || {}).some(mod =>
      (mod.atividades || []).some(ativ => !ativ.concluido)
    );

    let mensagem = '';

    if (hasModuloIncompleto && diaSemana !== 1 && diaSemana !== 5) {
      mensagem = "Ainda há um módulo por acabar. Retoma-o para não quebrares o teu progresso.";
    } else if (diaSemana === 1) {
      mensagem = "Novo módulo! Explora hoje as atividades e dá mais um passo.";
    } else if (diaSemana === 5) {
      mensagem = "A semana está quase a terminar! Conclui o módulo e continua a avançar.";
    }

    if (mensagem) {
      setNotificacaoSemanal(mensagem);
      setNotificacaoVisivel(true);
      localStorage.setItem('lastNotificationDate', todayStr);
    }
  };

  useEffect(() => {
    if (userData) verificarNotificacoesSemanais();
  }, [userData]);

  useEffect(() => {
    if (notificacaoVisivel) {
      const timer = setTimeout(() => setNotificacaoVisivel(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [notificacaoVisivel]);

  let avatarSelecionado = avatarOptions.find(a => a.id === userData?.avatarId)?.src;

  const navItems = [
    { icon: <House size={24} />, text: 'Página Inicial', path: '/plataforma' },
    { icon: <Envelope size={24} />, text: 'Progresso', path: '/progresso' },
    { icon: <Trophy size={24} />, text: 'Conquistas', path: '/conquistas' },
    { icon: <People size={24} />, text: 'Contactos', path: '/contactos' },
    { icon: <Gear size={24} />, text: 'Definições', path: '/definicoes' },
  ];

  return (
    <div className="navbar navbar-light bg-white py-2 px-4 position-relative">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Botão de menu (hambúrguer) e logo */}
        <div className="d-flex align-items-center">
          <button className="btn d-md-none me-3" onClick={() => setMenuAberto(true)}>
            <List size={28} />
          </button>
          <a
            className="navbar-brand text-info d-flex align-items-center"
            onClick={() => navigate('/plataforma')}
            style={{ cursor: 'pointer' }}
          >
            <img src={logo} alt="TOUCHminds Logo" style={{ width: "120px" }} />
          </a>
        </div>

        {/* Avatar com tooltip/logout */}
        <div className="position-relative">
          <img
            src={avatarSelecionado}
            alt="Avatar"
            className="rounded-circle"
            style={{ width: "44px", height: "44px", cursor: "pointer" }}
            onClick={toggleTooltip}
          />
          {showTooltip && (
            <div
              className="position-absolute bg-white border rounded-3 shadow-lg mt-2 p-1 mb-5"
              style={{ right: 0, zIndex: 1000, width: '160px' }}
            >
              <button
                className="btn btn-sm w-100  px-4 py-2 rounded-3 d-flex align-items-center justify-content-center"
                style={{ backgroundColor: '#234970', color: 'white' }}
                onClick={handleDefinicoes}
              >
                <Gear size={20} className="me-2" />
                DEFINIÇÕES
              </button>
              <button
                className="btn btn-sm btn-danger w-100 px-4 py-2 rounded-3 d-flex align-items-center justify-content-center mt-1"
                onClick={handleLogout}
              >
                <BoxArrowRight size={20} className="me-2" />
                SAIR
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Menu lateral */}
      {menuAberto && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setMenuAberto(false)}
        >
          <div
            className="h-100"
            style={{
              width: '260px',
              backgroundColor: '#99cbc8',
              color: 'white',
              padding: '24px',
              transition: 'transform 0.3s ease-in-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h5 className="mb-4">Menu</h5>

            {/* Restantes links */}
            {navItems.map((item, idx) => (
              <div
                key={idx}
                className="d-flex align-items-center py-3 mb-1"
                style={{ fontSize: '18px', cursor: 'pointer' }}
                onClick={() => {
                  navigate(item.path);
                  setMenuAberto(false);
                }}
              >
                <span className="me-3">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notificação semanal no fundo do ecrã */}
      {notificacaoVisivel && notificacaoSemanal && (
        <div
          className="position-fixed bottom-0 end-0 m-4 text-white px-4 py-3 rounded shadow"
          style={{ zIndex: 1060, minWidth: '280px', maxWidth: '400px', backgroundColor: '#234970' }}
        >
          <strong>{notificacaoSemanal}</strong>
        </div>
      )}
    </div>
  );
};

export default Navbar;