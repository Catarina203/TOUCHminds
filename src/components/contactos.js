import Navbar from './navbar';
import Sidebar from './sidebar';
import { useContext } from 'react';
import { UserContext } from '../App';
import Loading from './loading';

const Contactos = () => {
  const { userData } = useContext(UserContext);

  if (!userData) {
    return <Loading message="A carregar os contactos..." />;
  }

  return (
    <div className="container-fluid vh-100 p-0">
      <Navbar />
      <div className="row h-100 m-0">
        <Sidebar />
        <main className="col px-4 py-4" style={{ backgroundColor: "#FBF9F9" }}>
          <div className="container p-4 bg-white rounded shadow-sm">
            <h2 className="mb-3 fw-semibold" style={{ color: "#99CBC8" }} id="contactos-title">
              Contactos
            </h2>
            <p className="text-muted" style={{ fontSize: '1rem' }}>
              A nossa equipa de investigação está disponível para esclarecer qualquer dúvida e oferecer o apoio necessário.
            </p>

            <section className="mt-4 p-4 rounded" style={{ backgroundColor: '#fbf9f9' }} aria-labelledby="contacto-direto">
              <h5 id="contacto-direto" className="fw-semibold mb-2" style={{ color: '#234970' }}>
                Contacto da psicóloga responsável
              </h5>
              <address>
                <p className="mb-1">
                  <strong>Psicóloga Catarina Monteiro:</strong>{' '}
                
                <a
                  href="mailto:catarinaamonteiro@ua.pt"
                  style={{ color: '#2A7F7F', textDecoration: 'none', fontWeight: '500' }}
                  aria-label="Enviar e-mail para Catarina Monteiro"
                >
                  catarinaamonteiro@ua.pt
                </a>
                </p>
              </address>
            </section>

            <section className="mt-4 p-4 rounded" style={{ backgroundColor: '#fbf9f9' }} aria-labelledby="outras-opcoes">
              <h5 id="outras-opcoes" className="fw-semibold mb-2" style={{ color: '#234970' }}>
                Outras opções de apoio
              </h5>
              <ul
                style={{ listStyleType: 'none', paddingLeft: 0, lineHeight: '1.8' }}
                aria-label="Lista de linhas de apoio"
              >
                <li>
                  <strong>Linha S.O.S. Adolescente:</strong>{' '}
                  <a
                    href="tel:800202484"
                    style={{ color: '#2A7F7F', textDecoration: 'none' }}
                    aria-label="Ligar para Linha S.O.S. Adolescente 800 202 484"
                  >
                    800 202 484
                  </a>
                </li>
                <li>
                  <strong>Linha Jovem:</strong>{' '}
                  <a
                    href="tel:800208020"
                    style={{ color: '#2A7F7F', textDecoration: 'none' }}
                    aria-label="Ligar para Linha Jovem 800 208 020"
                  >
                    800 208 020
                  </a>
                </li>
                <li><strong>Falar com o/a psicólogo/a da tua escola</strong></li>
              </ul>
              
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Contactos;
