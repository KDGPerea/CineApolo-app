import React, { useEffect, useState } from 'react';
import '../assets/css/App.css';
import Header from '../components/Header';

function AdminReservas() {
    const [reservas, setReservas] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState('');  // 'id', 'nombre', 'pelicula', 'fecha'

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await fetch('http://localhost:4000/admin/reservas', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                setReservas(data);
            } catch (error) {
                console.error('Error al obtener reservas:', error);
            }
        };

        fetchReservas();
    }, []);

    const handleEliminar = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/admin/reservas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                setReservas(reservas.filter(reserva => reserva.id !== id));
            } else {
                console.error('Error al eliminar la reserva');
            }
        } catch (error) {
            console.error('Error al eliminar la reserva:', error);
        }
    };

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    const handleFiltro = (e) => {
        setFiltro(e.target.value);
    };

    const reservasFiltradas = reservas.filter(reserva => {
        if (filtro === 'id') {
            return reserva.id.toString().includes(busqueda);
        }
        if (filtro === 'nombre') {
            return reserva.usuario_nombre.toLowerCase().includes(busqueda.toLowerCase());
        }
        if (filtro === 'pelicula') {
            return reserva.pelicula.toLowerCase().includes(busqueda.toLowerCase());
        }
        if (filtro === 'fecha') {
            return new Date(reserva.hora_funcion).toLocaleString().includes(busqueda);
        }
        return true;
    });

    return (
        <>
            <Header />
            <section id="admin-reservas">
                <div className="container">
                    <h2>Reservas Programadas</h2>
                    <div className="busqueda-container">
                        <select onChange={handleFiltro}>
                            <option value="">Filtrar por...</option>
                            <option value="id">ID</option>
                            <option value="nombre">Nombre</option>
                            <option value="pelicula">Película</option>
                            <option value="fecha">Fecha</option>
                        </select>
                        <input type="text" placeholder="Buscar..." value={busqueda} onChange={handleBusqueda} />
                    </div>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID Reserva</th>
                                <th>Usuario</th>
                                <th>Película</th>
                                <th>Fecha y Hora</th>
                                <th>Asientos</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservasFiltradas.map((reserva) => (
                                <tr key={reserva.id}>
                                    <td>{reserva.id}</td>
                                    <td>{reserva.usuario_nombre}</td>
                                    <td>{reserva.pelicula}</td>
                                    <td>{new Date(reserva.hora_funcion).toLocaleString()}</td>
                                    <td>{reserva.asientos}</td>
                                    <td>
                                        <button onClick={() => handleEliminar(reserva.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

export default AdminReservas;