const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5555;
const NOTAS_FILE = path.join(__dirname, 'data', 'notas.json');

app.use(cors());
app.use(bodyParser.json());

function cargarNotas() {
  if (fs.existsSync(NOTAS_FILE)) {
    return JSON.parse(fs.readFileSync(NOTAS_FILE));
  }
  return [];
}



function guardarNotas(notas) {
  fs.writeFileSync(NOTAS_FILE, JSON.stringify(notas, null, 2));
}

app.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  if (usuario === 'admin' && password === '123456') {
    res.json({ success: true, usuario });
  } else {
    res.status(401).json({ success: false, error: 'Credenciales incorrectas' });
  }
});

app.get('/notas', (req, res) => {
  const notas = cargarNotas();
  res.json(notas);
});

app.post('/notas', (req, res) => {
  const nuevaNota = req.body;
  const notas = cargarNotas();
  notas.push(nuevaNota);
  guardarNotas(notas);
  res.status(201).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`API backend corriendo en http://localhost:${PORT}`);
});

app.delete('/notas/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const notas = cargarNotas();

  if (index >= 0 && index < notas.length) {
    notas.splice(index, 1); 
    guardarNotas(notas);
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, error: 'Índice inválido' });
  }
});