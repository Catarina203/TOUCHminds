import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Loading from './loading';

import modulo1 from "../imgs/peca1.png";
import modulo2 from "../imgs/peca2.png";
import modulo3 from "../imgs/peca3.png";
import modulo4 from "../imgs/peca4.png";
import modulo5 from "../imgs/peca5.png";
import modulo6 from "../imgs/peca6.png";

const Conquistas = () => {
  const [modulosConcluidos, setModulosConcluidos] = useState(0);
  const [loading, setLoading] = useState(true);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (userData) {
      setModulosConcluidos(userData.modulosConcluidos || 0);
      setLoading(false);
    }
  }, [userData]);

  if (loading) {
    return <Loading message="A carregar as tuas conquistas..." />;
  }

  const renderModuleImages = () => {
    const images = { modulo1, modulo2, modulo3, modulo4, modulo5, modulo6 };

    return Array.from({ length: 6 }, (_, i) => {
      const index = i + 1;
      const isCompleted = modulosConcluidos >= index;
      const imagePath = images[`modulo${index}`];

      return (
        <div className="col-4 p-0 d-flex align-items-stretch" key={index}>
          <img
            src={imagePath}
            alt={`Imagem do Módulo ${index} - ${isCompleted ? 'concluído' : 'bloqueado'}`}
            className="w-100 h-100 object-fit-contain"
            style={{ filter: isCompleted ? 'none' : 'grayscale(100%)', transition: 'filter 0.3s ease' }}
            loading="lazy"
          />
        </div>
      );
    });
  };

  const percentagem = Math.round((modulosConcluidos / 6) * 100);

  return (
    <div className="container-fluid vh-100 p-0">
      <Navbar />
      <div className="row h-100 m-0">
        <Sidebar />
        <main className="col px-4 py-4" style={{ backgroundColor: "#FBF9F9" }}>
          <div className="container p-4 bg-white rounded shadow-sm h-100">
            <h2 className="mb-2 fw-semibold" style={{ color: "#99CBC8" }}>
              As Minhas Conquistas
            </h2>
            <p className="text-muted mb-4" style={{ fontSize: '1rem' }}>
              Completa todos os módulos para revelar o puzzle completo!
            </p>

            <section aria-label="Progresso dos módulos concluídos" className="mb-4">
              <div className="d-flex justify-content-between mb-1">
                <span className="small fw-semibold" style={{ color: "#234970" }}>Progresso</span>
                <span className="small fw-semibold" style={{ color: "#234970" }}>{percentagem}%</span>
              </div>
              <div className="progress" style={{ height: "10px" }} role="progressbar" 
                   aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentagem} aria-label='Progresso dos módulos concluídos' 
                   aria-valuetext={`${percentagem} por cento concluído`} tabIndex={0}>
                <div
                  className="progress-bar"
                  style={{ width: `${percentagem}%`, backgroundColor: "#99CBC8" }}
                />
              </div>
            </section>
            
            <section aria-label="Imagens dos módulos" className="row justify-content-center" tabIndex={-1} style={{ gap: '0' }}>
              {renderModuleImages()}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Conquistas;
