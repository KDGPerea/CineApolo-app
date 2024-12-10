import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/App.css';
import Header from '../components/Header';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Reserva() {
    const [userId, setUserId] = useState('');
    const [pelicula, setPelicula] = useState('');
    const [fechaHora, setFechaHora] = useState('');
    const [asientos, setAsientos] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (!userData || !token) {
            alert('Por favor, inicia sesión para realizar una reserva.');
            navigate('/login');
        } else {
            const user = JSON.parse(userData);
            setUserId(user.id);
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Enviando datos de reserva:', { usuario_id: userId, pelicula, hora_funcion: fechaHora, asientos });
        try {
            const response = await fetch('http://localhost:4000/reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    usuario_id: userId,
                    pelicula: pelicula,
                    hora_funcion: fechaHora,
                    asientos: asientos.join(', ')
                }),
            });
            if (response.ok) {
                setModalIsOpen(false);
                setConfirmModalIsOpen(true);
            } else {
                alert('Error al realizar la reserva');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en el servidor. Inténtalo de nuevo más tarde');
        }
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const closeConfirmModal = () => {
        setConfirmModalIsOpen(false);
    };

    const handleSeatClick = (seat) => {
        setAsientos((prevAsientos) => {
            if (prevAsientos.includes(seat)) {
                return prevAsientos.filter((s) => s !== seat);
            } else {
                return [...prevAsientos, seat];
            }
        });
    };

    const seatsLayout = [
        'A1', 'A2', 'A3', 'A4', 'A5',
        'B1', 'B2', 'B3', 'B4', 'B5',
        'C1', 'C2', 'C3', 'C4', 'C5',
        'D1', 'D2', 'D3', 'D4', 'D5',
    ];

    return (
        <>
            <Header />
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
                            <input type="datetime-local" id="fechaHora" value={fechaHora || ''} onChange={(e) => setFechaHora(e.target.value)} required /><br /><br />

                            <label htmlFor="asientos">Asientos:</label>
                            <button type="button" onClick={openModal}>Seleccionar Asientos</button><br /><br />

                            <button type="submit">Reservar</button>
                        </form>
                    </div>
                </div>
            </section>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Seleccionar Asientos">
                <h2>Seleccionar Asientos</h2>
                <div className="seats-layout">
                    {seatsLayout.map((seat) => (
                        <button
                            key={seat}
                            className={`seat ${asientos.includes(seat) ? 'selected' : ''}`}
                            onClick={() => handleSeatClick(seat)}
                        >
                            {seat}
                        </button>
                    ))}
                </div>
                <button onClick={closeModal}>Cerrar</button>
            </Modal>

            <Modal isOpen={confirmModalIsOpen} onRequestClose={closeConfirmModal} contentLabel="Confirmación de Reserva">
                <h2>Reserva Confirmada</h2>
                <p><strong>Película:</strong> {pelicula}</p>
                <p><strong>Fecha y Hora:</strong> {fechaHora}</p>
                <p><strong>Asientos:</strong> {asientos.join(', ')}</p>
                <button onClick={closeConfirmModal}>Cerrar</button>
            </Modal>

            <footer>
                <div className="container">
                    <p>&copy; Cine Apolo 2024</p>
                </div>
            </footer>
        </>
    );
}

export default Reserva;