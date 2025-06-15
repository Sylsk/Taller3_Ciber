import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home({ usuario }) {
  const [notas, setNotas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API;

  useEffect(() => {
    axios.get(`${API_URL}/notas`)
      .then(res => setNotas(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/notas`, { titulo, contenido });
    setNotas([...notas, { titulo, contenido }]);
    setTitulo('');
    setContenido('');
  };

  const eliminarNota = async (index) => {
    try {
      await axios.delete(`${API_URL}/notas/${index}`);
      const nuevasNotas = [...notas];
      nuevasNotas.splice(index, 1);
      setNotas(nuevasNotas);
    } catch (err) {
      console.error("Error al eliminar nota:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto' }}>
      <h1>Bienvenido</h1>
      <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} required /><br />
        <textarea placeholder="Contenido" value={contenido} onChange={e => setContenido(e.target.value)} required /><br />
        <button type="submit">Guardar Nota</button>
      </form>

      <h2>Notas:</h2>
      {notas.map((nota, i) => (
        <div key={i} style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
          <h3>{nota.titulo}</h3>
          <p>{nota.contenido}</p>
          <button className="delete-btn" onClick={() => eliminarNota(i)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
