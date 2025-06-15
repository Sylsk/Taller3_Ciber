import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true); 

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
    }
    setCargando(false); 
  }, []);

  const handleSetUsuario = (usuario) => {
    setUsuario(usuario);
    localStorage.setItem('usuario', usuario);
  };

  if (cargando) return <p>Cargando...</p>; 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={usuario ? <Home usuario={usuario} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setUsuario={handleSetUsuario} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
