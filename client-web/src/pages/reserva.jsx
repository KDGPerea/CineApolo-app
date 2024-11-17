import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/App.css';
import Header from '../components/header'

function Reserva() {

    const [userId, setUserId] = useState('');
    const [pelicula, setPelicula] = useState('');
    const [fechaHora, setFechaHora] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if(!userData || !token){
            alert('Por favor, inicia sesión para realizar una reserva.');
            
            navigate('/login');
        } else{
            const user = JSON.parse(userData);
            setUserId(user.id);
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Enviando datos de reserva;', {usuario_id: userId, pelicula, hora_funcion: fechaHora});
        try{
            const response = await fetch('http://localhost:4000/reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    usuario_id: userId,
                    pelicula: pelicula,
                    hora_funcion: fechaHora
                }),
            });
            if(response.ok){
                alert('Reserva realizada con éxito');
            } else{
                alert('Error al realizar la reserva')
            }
        } catch (error){
            console.error('Error:', error)
            alert('Error en el servidor. Intentalo de nuevo más tarde');
        }
    }

  return (
   <> 
        <Header/>
        <section id='reserva'>
            <div className="container">
                <h2>Formulario de Reserva</h2>
                <div className="reserva">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="usuarioId">ID Usuario:</label>
                        <input type="text" id="usuarioId" value={userId || ''} readOnly /><br /><br />

                        <label htmlFor="pelicula">Película:</label>
                        <select id="pelicula" name='pelicula' value={pelicula} onChange={(e) => setPelicula(e.target.value)} required>
                            <option value="El Susurro de las Sombras">El Susurro de las Sombras</option>
                            <option value="Aventuras en el Bosque Encantado">Aventuras en el Bosque Encantado</option>
                            <option value="La Última Estrella">La Última Estrella</option>
                        </select>
                        
                        <label htmlFor="Fecha">Fecha:</label>
                        <input type="datetime-local" id="fechaHora" value={fechaHora || ''} onChange={(e)=> setFechaHora(e.target.value)} required /><br /><br />

                        <button type="submit">Reservar</button>
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

export default Reserva;
