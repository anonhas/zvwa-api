const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'zero2flag123'; // a senha real do admin

app.post('/api/login', (req, res) => {
  const { user, pass } = req.body;

  if (user !== ADMIN_USER) {
    return res.status(404).json({
      error: 'Usuário inexistente'
    });
  }

  if (pass !== ADMIN_PASS) {
    return res.status(401).json({
      error: 'Senha incorreta',
      dica: `A senha real do admin é: ${ADMIN_PASS}`
    });
  }

  const token = Buffer.from(`${user}:${pass}`).toString('base64');

  res.json({
    success: true,
    token,
    message: 'Bem-vindo, admin!'
  });
});

app.get('/', (req, res) => {
  res.send('ZVWA API is up!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ZVWA API rodando na porta ${PORT}`);
});

