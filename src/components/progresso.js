import Navbar from './navbar';
import Sidebar from './sidebar';
import { useContext, useEffect, useRef } from 'react';
import { UserContext } from '../App';
import Loading from './loading';
import modulosData from '../data/modulos';

const LinhaTemporal = () => {
  const { userData } = useContext(UserContext);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const items = timelineRef.current?.querySelectorAll('.timeline-item') || [];
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [userData]);

  if (!userData || !userData.modulos) {
    return <Loading message="A carregar o progresso..." />;
  }

  const progressoDoUser = modulosData.map((moduloBase) => {
    const userModulo = userData.modulos[`modulo${moduloBase.id}`];

    if (!userModulo) {
      return {
        ...moduloBase,
        status: 'bloqueado',
        totalAtividades: moduloBase.atividades.length,
        atividadesConcluidas: 0,
        percentualConcluido: 0,
        atividades: moduloBase.atividades.map(a => ({ ...a, concluido: false })),
        dataFim: null,
      };
    }

    const atividades = moduloBase.atividades.map((atividade, idx) => ({
      ...atividade,
      concluido: Boolean(userModulo.atividades?.[idx]?.concluido),
      status: userModulo.atividades?.[idx]?.status || 'bloqueado'
    }));

    const totalAtividades = atividades.length;
    const atividadesConcluidas = atividades.filter(a => a.concluido).length;
    const atividadesCompletas = totalAtividades > 0 && atividadesConcluidas === totalAtividades;
    const statusModulo = atividadesCompletas ? 'concluído' : 'em progresso';

    return {
      ...moduloBase,
      status: statusModulo,
      dataFim: userModulo.dataFim || null,
      totalAtividades,
      atividadesConcluidas,
      percentualConcluido: totalAtividades > 0 ? Math.min(100, (atividadesConcluidas / totalAtividades) * 100) : 0,
      atividades,
    };
  });

  const formatarData = (timestamp) => {
    if (!timestamp?.seconds) return null;
    const data = new Date(timestamp.seconds * 1000);
    return data.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="container-fluid vh-100 p-0">
      <Navbar />
      <div className="row h-100 m-0">
        <Sidebar />
        <div className="col px-4 py-4" style={{ backgroundColor: '#FBF9F9' }}>
          <div className="container p-4 bg-white rounded shadow-sm">
            <h2 className="mb-3 fw-semibold" style={{ color: '#99CBC8' }}>O Meu Progresso</h2>
            <p className="text-muted" style={{ fontSize: '1rem' }}>
              Acompanha o teu progresso nos diferentes módulos do programa.
            </p>

            <div className="timeline-container" ref={timelineRef}>
              <div className="timeline-line" aria-hidden="true"></div>

              {progressoDoUser.map((modulo, index) => {
                const moduloAnteriorConcluido = index === 0 || progressoDoUser[index - 1].status === 'concluído';
                const bloqueado = !moduloAnteriorConcluido && modulo.status !== 'concluído';

                return (
                  <div
                    key={modulo.id}
                    className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                    aria-label={`Módulo ${index + 1}, ${modulo.status}`}
                  >
                    <div className="timeline-marker">
                      {modulo.status === 'concluído' ? (
                        <div className="marker-icon completed" aria-hidden="true">
                          <i className="fas fa-medal" aria-hidden="true"></i>
                        </div>
                      ) : (
                        <div className={`marker-icon ${bloqueado ? 'locked' : 'available'}`} aria-hidden="true">
                          <i className={`fas ${bloqueado ? 'fa-lock' : 'fa-play'}`} aria-hidden="true"></i>
                        </div>
                      )}
                      <div className="marker-number">{index + 1}</div>
                    </div>

                    <div className="timeline-content">
                      <div className="content-card">
                        <div className="card-header">
                          <div className="header-top">
                            <h3 className="module-title">{modulo.titulo}</h3>
                          </div>
                          <p className="module-subtitle fw-bold">{modulo.subtitulo}</p>

                          {modulo.status === 'concluído' ? (
                            <div
                              className="status-badge completed"
                              aria-label={`Estado do módulo: Concluído em ${formatarData(modulo.dataFim)}`}
                            >
                              <i className="fas fa-check-circle me-2" aria-hidden="true"></i>
                              Concluído em {formatarData(modulo.dataFim)}
                            </div>
                          ) : (
                            <div
                              className={`status-badge ${bloqueado ? 'locked' : 'available'}`}
                              aria-label={`Estado do módulo: ${bloqueado ? 'Bloqueado' : 'Ainda não concluído'}`}
                            >
                              <i className={`fas ${bloqueado ? 'fa-lock' : 'fa-hourglass-start'} me-2`} aria-hidden="true"></i>
                              {bloqueado ? 'Bloqueado' : 'Ainda não concluído'}
                            </div>
                          )}
                        </div>

                        <div className="card-body">
                          <div className="progress-section">
                            <div className="progress-header">
                              <h4 className="section-title">
                                Progresso das Atividades
                              </h4>
                              <span className="progress-text">
                                {modulo.atividadesConcluidas}/{modulo.totalAtividades}
                              </span>
                            </div>

                            <div
                              className="progress-bar"
                              role="progressbar"
                              aria-valuenow={Math.round(modulo.percentualConcluido)}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              <div
                                className="progress-fill"
                                style={{ width: `${modulo.percentualConcluido}%` }}
                              ></div>
                            </div>
                            <span className="progress-percentage">
                              {Math.round(modulo.percentualConcluido)}%
                            </span>
                          </div>
                        </div>

                        </div>
                      </div>
                    </div>
                );
              })}
            </div>

            <style jsx>{`
              .timeline-container {
                position: relative;
                max-width: 1200px;
                margin: 0 auto;
                padding: 1rem 0;
              }

              .timeline-line {
                position: absolute;
                left: 50%;
                top: 0;
                bottom: 0;
                width: 4px;
                background: linear-gradient(to bottom, #90C8CA, #C8C2AF);
                transform: translateX(-50%);
                border-radius: 2px;
                box-shadow: 0 0 10px rgba(144, 200, 202, 0.3);
              }

              .timeline-item {
                position: relative;
                margin: 4rem 0;
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
              }

              .timeline-item.animate-in {
                opacity: 1;
                transform: translateY(0);
              }

              .timeline-item.left {
                transform: translateY(50px) translateX(-30px);
              }

              .timeline-item.right {
                transform: translateY(50px) translateX(30px);
              }

              .timeline-item.animate-in.left,
              .timeline-item.animate-in.right {
                transform: translateY(0) translateX(0);
              }

              .timeline-marker {
                position: absolute;
                left: 50%;
                top: 2rem;
                transform: translateX(-50%);
                z-index: 10;
              }

              .marker-icon {
                width: 70px;
                height: 70px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.8rem;
                margin-bottom: 0.5rem;
                box-shadow: 0 6px 20px rgba(0,0,0,0.2);
                border: 5px solid white;
                transition: transform 0.3s ease;
              }

              .marker-icon:hover {
                transform: scale(1.1);
              }

              .marker-icon.completed {
                background: linear-gradient(135deg, #FBF9F9, #FDFDFD);
                color: #234970;
                border: 3px solid #E7C8C2;
              }

              .marker-icon.available {
                background: linear-gradient(135deg, #90C8CA, #234970);
                color: white;
              }

              .marker-icon.locked {
                background: linear-gradient(135deg, #C8C2AF, #90C8CA);
                color: #234970;
              }

              .marker-number {
                background: rgba(253, 253, 253, 0.95);
                color: #234970;
                width: 35px;
                height: 35px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 1rem;
                margin: 0 auto;
                box-shadow: 0 3px 10px rgba(35, 73, 112, 0.15);
              }

              .timeline-content {
                width: 45%;
                position: relative;
              }

              .timeline-item.left .timeline-content {
                margin-left: 0;
                margin-right: 55%;
              }

              .timeline-item.right .timeline-content {
                margin-left: 55%;
                margin-right: 0;
              }

              .content-card {
                background: #FDFDFD;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(35, 73, 112, 0.1);
                transition: all 0.4s ease;
                border: 1px solid rgba(144, 200, 202, 0.2);
              }

              .content-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 40px rgba(35, 73, 112, 0.15);
              }

              .card-header {
                padding: 2rem;
                background: linear-gradient(135deg, #FBF9F9, #FDFDFD);
                border-bottom: 1px solid rgba(144, 200, 202, 0.1);
              }

              .header-top {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 0.25rem;
              }

              .module-title {
                font-size: 1.5rem;
                font-weight: 700;
                color: #99CBC8;
                margin: 0;
                line-height: 1.3;
                flex: 1;
                margin-right: 1rem;
              }

              .module-subtitle {
                font-size: 1.1rem;
                color: #234970;
                margin-bottom: 1.3rem;
                line-height: 1.5;
              }

              .completion-date {
                display: flex;
                align-items: center;
                color: #234970;
                font-weight: 600;
                font-size: 0.95rem;
                background: rgba(144, 200, 202, 0.1);
                padding: 0.5rem 1rem;
                border-radius: 25px;
                border: 1px solid rgba(144, 200, 202, 0.3);
              }

              .status-badge {
                display: inline-block;
                padding: 0.5rem 1.2rem;
                border-radius: 25px;
                font-size: 0.85rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                white-space: nowrap;
              }

              .status-badge.completed {
                background: linear-gradient(135deg, #90C8CA, #234970);
                color: white;
                box-shadow: 0 4px 15px rgba(144, 200, 202, 0.4);
              }

              .status-badge.available {
                background: linear-gradient(135deg, #C8C2AF, #90C8CA);
                color: #234970;
                box-shadow: 0 4px 15px rgba(200, 194, 175, 0.4);
              }

              .status-badge.locked {
                background: linear-gradient(135deg, #E7C8C2, #FBF9F9);
                color: #234970;
                box-shadow: 0 4px 15px rgba(231, 200, 194, 0.3);
              }

              .card-body {
                padding: 2rem;
              }

              .progress-section {
                margin-bottom: 2rem;
              }

              .progress-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
              }

              .section-title {
                font-size: 1.1rem;
                font-weight: 600;
                color: #234970;
                margin: 0;
                display: flex;
                align-items: center;
              }

              .progress-text {
                font-weight: 600;
                color: #90C8CA;
                font-size: 1.1rem;
              }

              .progress-bar-container {
                display: flex;
                align-items: center;
                gap: 1rem;
              }

              .progress-bar {
                flex: 1;
                height: 12px;
                background: #E7C8C2;
                border-radius: 6px;
                overflow: hidden;
                position: relative;
              }

              .progress-fill {
                height: 100%;
                background: linear-gradient(135deg, #90C8CA, #234970);
                border-radius: 6px;
                transition: width 1s ease-out;
                position: relative;
              }

              .progress-fill::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                animation: shimmer 2s infinite;
              }

              @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }

              .progress-percentage {
                font-weight: 700;
                color: #234970;
                font-size: 1.1rem;
                min-width: 45px;
                text-align: right;
              }

              .activities-summary {
                margin-bottom: 2rem;
              }

              .summary-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
              }

              .summary-item {
                display: flex;
                align-items: center;
                padding: 1rem;
                border-radius: 12px;
                transition: transform 0.3s ease;
              }

              .summary-item:hover {
                transform: translateY(-2px);
              }

              .summary-item.completed {
                background: linear-gradient(135deg, #FDFDFD, #FBF9F9);
                border: 1px solid #90C8CA;
              }

              .summary-item.pending {
                background: linear-gradient(135deg, #FBF9F9, #E7C8C2);
                border: 1px solid #C8C2AF;
              }

              .summary-item.total {
                background: linear-gradient(135deg, #E7C8C2, #C8C2AF);
                border: 1px solid #234970;
              }

              .summary-icon {
                margin-right: 0.75rem;
                font-size: 1.5rem;
              }

              .summary-item.completed .summary-icon {
                color: #90C8CA;
              }

              .summary-item.pending .summary-icon {
                color: #C8C2AF;
              }

              .summary-item.total .summary-icon {
                color: #234970;
              }

              .summary-info {
                display: flex;
                flex-direction: column;
              }

              .summary-number {
                font-size: 1.5rem;
                font-weight: 700;
                line-height: 1;
              }

              .summary-label {
                font-size: 0.85rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                opacity: 0.8;
              }

              .challenge-section {
                border-top: 1px solid rgba(144, 200, 202, 0.1);
                padding-top: 1.5rem;
              }

              .challenge-card {
                display: flex;
                align-items: center;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                transition: all 0.3s ease;
              }

              .challenge-card:hover {
                transform: translateX(5px);
              }

              .challenge-card.concluído {
                background: linear-gradient(135deg, #90C8CA, #C8C2AF);
                border: 1px solid #234970;
              }

              .challenge-card.desbloqueado {
                background: linear-gradient(135deg, #FBF9F9, #FDFDFD);
                border: 1px solid #90C8CA;
              }

              .challenge-card.bloqueado {
                background: linear-gradient(135deg, #E7C8C2, #C8C2AF);
                border: 1px solid #234970;
              }

              .challenge-icon {
                margin-right: 1rem;
                font-size: 1.5rem;
              }

              .challenge-card.concluído .challenge-icon {
                color: #234970;
              }

              .challenge-card.desbloqueado .challenge-icon {
                color: #90C8CA;
              }

              .challenge-card.bloqueado .challenge-icon {
                color: #234970;
              }

              .challenge-status {
                font-weight: 600;
                font-size: 1rem;
              }

              .timeline-arrow {
                position: absolute;
                top: 2.5rem;
                width: 0;
                height: 0;
                border: 20px solid transparent;
                z-index: 5;
              }

              .timeline-item.left .timeline-arrow {
                right: -40px;
                border-left-color: white;
                border-right: none;
                filter: drop-shadow(2px 0 4px rgba(0,0,0,0.1));
              }

              .timeline-item.right .timeline-arrow {
                left: -40px;
                border-right-color: white;
                border-left: none;
                filter: drop-shadow(-2px 0 4px rgba(0,0,0,0.1));
              }

              @media (max-width: 768px) {
                .timeline-line {
                  left: 35px;
                }

                .timeline-marker {
                  left: 35px;
                }

                .marker-icon {
                  width: 60px;
                  height: 60px;
                  font-size: 1.5rem;
                }

                .marker-number {
                  width: 30px;
                  height: 30px;
                  font-size: 0.9rem;
                }

                .timeline-content {
                  width: calc(100% - 90px);
                  margin-left: 90px !important;
                  margin-right: 0 !important;
                }

                .timeline-arrow {
                  display: none;
                }

                .timeline-item {
                  margin: 3rem 0;
                }

                .summary-grid {
                  grid-template-columns: 1fr;
                }

                .header-top {
                  flex-direction: column;
                  align-items: flex-start;
                  gap: 1rem;
                }

                .module-title {
                  margin-right: 0;
                }
              }

              @media (max-width: 480px) {
                .timeline-container {
                  padding: 1rem 0;
                }

                .card-header, .card-body {
                  padding: 1.5rem;
                }

                .module-title {
                  font-size: 1.3rem;
                }

                .summary-item {
                  padding: 0.75rem;
                }

                .summary-number {
                  font-size: 1.3rem;
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinhaTemporal;