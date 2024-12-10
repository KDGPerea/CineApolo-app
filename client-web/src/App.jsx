import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './assets/css/App.css';
import Home from './pages/Home';
import Login from './pages/login';
import Registro from './pages/registro';
import Contacto from './pages/contactenos';
import Reserva from './pages/reserva';
import AdminReservas from './pages/AdminReservas';

function App() {

  const isAuthenticated = () => { 
    const token = localStorage.getItem('token'); 
    if (token) { 
      const tokenPayload = JSON.parse(atob(token.split('.')[1])); 
      return tokenPayload.exp > Date.now() / 1000; 
    } 
    return false; 
  };

  const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        console.log('Token Payload para verificación de admin:', tokenPayload);
        return tokenPayload.rol === 'admin';
    }
    return false;
};
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/registro' element={<Registro/>} />
          <Route path='/contacto' element={<Contacto/>} />
          <Route path='/reserva' element={<Reserva/>} />
          <Route path='/admin/reservas' element={isAuthenticated() && isAdmin() ? <AdminReservas /> : <Navigate to="/login" />} />        
        </Routes>
    </Router>
  );
}

export default App;
