import { useLocation, useNavigate } from 'react-router-dom';
import { House, Envelope, Trophy, People, Gear } from 'react-bootstrap-icons';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Define os caminhos
  const navItems = [
    { icon: <House />, text: 'Página Inicial', path: '/plataforma' },
    { icon: <Envelope />, text: 'Progresso', path: '/progresso' },
    { icon: <Trophy />, text: 'Conquistas', path: '/conquistas' },
    { icon: <People />, text: 'Contactos', path: '/contactos' },
  ];

  return (
    <div className="col-auto bg-white shadow-sm py-4 px-3 d-none d-md-block" style={{ width: '220px' }}>
      <div className="nav flex-column">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            text={item.text}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>
    </div>
  );
};


const NavItem = ({ icon, text, active, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`nav-link d-flex align-items-center py-2 position-relative ${active ? 'text-green fw-semibold' : 'text-secondary'}`}
      style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}
    >
      {active && (
        <div 
          className="position-absolute start-0 top-0 bottom-0"
          style={{
            width: '4px',
            backgroundColor: '#69a6a4',
            borderRadius: '0 4px 4px 0',
            animation: 'slide-in 0.3s ease forwards'
          }}
        ></div>
      )}
      <span className="me-3 ms-2" style={{ width: '24px' }}>
        {icon}
      </span>
      <span className='font-lato'>{text}</span>
    </div>
  );
};


export default Sidebar;