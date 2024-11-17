import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';
import bcrypt from 'bcryptjs'
import '../assets/css/App.css';
import Header from '../components/header'

function Registro() {

  const [formData, setFormData] = useState({
    name: '', 
    apellidos: '', 
    documentoIdentidad: 'TI', 
    numeroDocumento: '', 
    date: '', 
    genero: '0', 
    telefono: '', 
    email: '', 
    password: '' 
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try{
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      const data = { 
        nombre: formData.name, 
        apellidos: formData.apellidos, 
        tipo_documento: formData.documentoIdentidad, 
        numero_documento: formData.numeroDocumento, 
        fecha_nacimiento: formData.date, 
        genero: formData.genero, 
        telefono: formData.telefono, 
        email: formData.email, 
        contraseña: hashedPassword
      }

      console.log('Datos enviados:', data);
    
      const response = await fetch('http://localhost:4000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    const result = await response.json();
    console.log('Respuesta del servidor:', result);

    if(response.ok){
      alert('Registro exitoso')
      navigate('/login');
    }else{
      setError(result.message || 'Error en el registro');
    }
  } catch (error) {
    console.error('Error:', error);
    setError('Error en el servidor. Inténtalo más tarde')
  }
}
  return (
    <>
      <Header/>
      <section id="registro">
        <div className="container">
          <h2>Regístrese</h2>
          <div className="registro">
            <form onSubmit={handleSubmit} id="registroform">
              <label htmlFor="name">Nombre:</label>
              <input type="text" name="name" id="name" placeholder="Nombre de usuario" value={formData.name} onChange={handlechange} required /><br /><br />

              <label htmlFor="apellidos">Apellidos:</label>
              <input type="text" name="apellidos" id="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handlechange} required /><br /><br />

              <label htmlFor="documentoIdentidad">Documento de identidad</label>
              <select name="documentoIdentidad" id="documentoIdentidad" value={formData.documentoIdentidad} onChange={handlechange} required>
                <option value="TI">Tarjeta de identidad</option>
                <option value="CC">Cédula de ciudadanía</option>
                <option value="TE">Tarjeta de extranjería</option>
                <option value="CE">Cédula de extranjería</option>
              </select><br /><br />

              <label htmlFor="numeroDocumento">Número de documento</label>
              <input type="number" id="numeroDocumento" name="numeroDocumento" placeholder="Ingrese el número de su documento" value={formData.numeroDocumento} onChange={handlechange} required/><br /><br />

              <label htmlFor="date">Fecha de nacimiento:</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handlechange} required /><br /><br />

              <label htmlFor="genero">Género:</label>
              <select name="genero" id="genero" value={formData.genero} onChange={handlechange} required>
                <option value="---">Elige una opción</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select><br /><br />

              <label htmlFor="telefono">Teléfono</label>
              <input type="number" name="telefono" id="telefono" placeholder="Ingrese número de teléfono" value={formData.telefono} onChange={handlechange} required/><br /><br />

              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" name="email" id="email" placeholder="tunombrecorreo@dominio.com" value={formData.email} onChange={handlechange} required /><br /><br />

              <label htmlFor="password">Contraseña</label>
              <input type="password" name="password" id="password" placeholder="Contraseña" value={formData.password} onChange={handlechange} required /><br /><br />

              <div className="checkbox-container">
                <input type="checkbox" /> Deseo recibir en mi correo electrónico sin ningún costo el boletín informativo de Teatro Apolo S.A.<br /><br />
                <input type="checkbox" required /> Autorizo recibir información de promociones, eventos y lanzamiento de Teatro Apolo S.A por email, EME, llamadas telefónicas o WhatsApp.<br /><br />
              </div>

              <button type="submit">Crear cuenta</button>

              <p>¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link></p>
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

export default Registro;