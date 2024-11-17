import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './assets/css/App.css';
import Home from './pages/Home';
import Login from './pages/login';
import Registro from './pages/registro';
import Contacto from './pages/contactenos';
import Reserva from './pages/reserva';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/registro' element={<Registro/>} />
          <Route path='/contacto' element={<Contacto/>} />
          <Route path='/reserva' element={<Reserva/>} />
        </Routes>
    </Router>
  );
}

export default App;
