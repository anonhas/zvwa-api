const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Sem restrição nenhuma!
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { user, pass } = req.body;

  const success = user === 'admin'; // qualquer senha serve
  const token = Buffer.from(`${user}:${pass}`).toString('base64');

  res.json({
    success,
    token,
    message: success ? 'Bem-vindo, admin!' : 'Credenciais inválidas'
  });
});

app.get('/', (req, res) => {
  res.send('ZVWA API is up!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ZVWA API rodando na porta ${PORT}`));
