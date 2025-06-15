import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 


function Login({ setUsuario }) {
  const [usuarioInput, setUsuarioInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const API_URL = process.env.REACT_APP_API;
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, {
        usuario: usuarioInput,
        password
      });
      setUsuario(res.data.usuario);
      navigate('/'); 
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto' }}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Usuario" value={usuarioInput} onChange={e => setUsuarioInput(e.target.value)} required /><br />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required /><br />
        <button type="submit">Ingresar</button>
      </form>
      <p><small>Usuario: admin | Contraseña: 123456</small></p>
    </div>
  );
}

export default Login;
