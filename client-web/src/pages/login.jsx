import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../assets/css/App.css';
import Header from '../components/header'


function Login() {

  const [formData, setFormData] = useState({ 
    email: '', 
    password: ''
  })
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try{

      console.log('Datos enviados:', formData);

      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok){
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({ id: data.id, nombre: data.nombre}));
        alert('Inicio de sesión exitoso')
        navigate('/');
      } else{
        setError(data.message || 'Error en el inicio de sesión');
      }
    } catch (error){
      console.error('Error:', error)
      setError('Error en el servidor. Inténtalo de nuevo más tarde.');
    }
  }

  return (
    <>
      <Header/>
      <section id="login">
        <div className="container">
          <h2>Iniciar Sesión</h2>
          <div className="login">
            <form onSubmit={handleSubmit} id="loginform">
              <label htmlFor="email">Usuario:</label>
              <input type="email" id="email" name="email" placeholder="Escribe tu usuario" value={formData.email} onChange={handleChange} required /><br /><br />

              <label htmlFor="password">Contraseña:</label>
              <input type="password" id="password" name="password" placeholder="Escribe tu contraseña" value={formData.password} onChange={handleChange} required /><br /><br />

              {error && <p className='error'>{error}</p>}

              <button type="submit" value="iniciarSesion">Ingresar</button>
              <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; Cine Apolo 2024</p>
        </div>
      </footer>
    </>
  );
}

export default Login;
