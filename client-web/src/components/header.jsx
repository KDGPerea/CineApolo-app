import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import apoloLogo from '../assets/IMG/apolo_logo.png';
import '../assets/css/App.css';

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    alert('¡Adiós! Esperamos verte pronto.');
    navigate('/login');
  };

  return (
    <header>
      <div className="container">
        <Link to="/" className="logo-apolo">
          <img src={apoloLogo} alt="logo de la compañía" />
          <h2 className="nombre-empresa">Cine Apolo</h2>
        </Link>
        <nav>
          <ScrollLink to="somosApolo" smooth={true} duration={500} className='scroll_link'>Acerca de</ScrollLink>
          <ScrollLink to="demostracion" smooth={true} duration={500} className='scroll_link'>Cartelera</ScrollLink>
          <Link to="/contacto">Contáctenos</Link>
          {user ? (
            <div className="dropdown">
              <button className="dropbtn">{user.nombre}</button>
              <div className="dropdown_content">
                <a href="#" onClick={handleLogout}>Cerrar Sesión</a>
              </div>
            </div>
          ) : (
            <Link to="/login">Inicio Sesión/Registrarse</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
