import React, { useState } from 'react';
import '../assets/css/App.css'; 
import Header from '../components/header'

function Contacto() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:4000/contactos',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: name,
          correo_electronico: email,
          asunto: subject,
          mensaje: message
        }),
      });
      if (response.ok){
        alert('Mensaje enviado con éxito');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else{
        alert('Error al enviar ek mensaje')
      }
    } catch (error){
      console.error('Error:', error)
      alert('Error en el servidaor. Intentalo de nuevo más tarde.')
    }
  }

  return (
    <>
      <Header/>
      <section id="contactenos">
        <div className="container">
          <h2>Contáctenos</h2>
          <div className="contactenos">
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Nombre:</label>
              <input type="text" id="name" name="name" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Nombre del contacto" required /><br /><br />

              <label htmlFor="email">Correo Electrónico:</label>
              <input type="email" id="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="tunombrecorreo@dominio.com" required /><br /><br />

              <label htmlFor="subject">Asunto a tratar:</label>
              <select name="subject" id="subject" value={subject} onChange={(e)=> setSubject(e.target.value)} required>
                <option value="0">- - - -</option>
                <option value="1">Consulta general</option>
                <option value="2">Compra de boletos</option>
                <option value="3">Eventos especiales</option>
                <option value="4">Quejas y reclamos</option>
                <option value="5">Alquiler de espacios</option>
              </select><br /><br />

              <label htmlFor="message">Mensaje:</label>
              <textarea name="message" id="message" rows="6" value={message} onChange={(e)=> setMessage(e.target.value)} placeholder="Aclaraciones de tu duda" required></textarea><br /><br />
              <button type="submit" className="Contact-btn">Enviar</button>
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

export default Contacto;