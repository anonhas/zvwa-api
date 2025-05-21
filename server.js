const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const USERS = [
  {
    email: 'ana.elizaur',
    password: 'senha123',
    role: 'admin'
  },
  {
    email: 'usuaria.comum',
    password: 'senha123',
    role: 'user'
  }
];

// Simula o login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = USERS.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  return res.json({
    email: user.email,
    role: user.role,
    token: Buffer.from(`${email}:${password}`).toString('base64')
  });
});

// Retorna dados fictícios com base na role
app.get('/api/dashboard/data', (req, res) => {
  const role = req.headers['x-role'];

  if (role === 'admin') {
    return res.json({
      painel: 'Administração de Usuários',
      usuarios: ['ana.elizaur', 'usuaria.comum', 'joana.seg'],
      alertas: ['Token inválido detectado', 'Reset de senha solicitado']
    });
  }

  return res.json({
    painel: 'Resumo do sistema',
    mensagens: ['Bem-vinda de volta!', 'Sistema operando normalmente'],
    notificacoes: ['Sua fatura está disponível']
  });
});

// Endpoint com falha: retorna 422 se não for admin, mas dá pra manipular
app.get('/api/dashboard/secret-data', (req, res) => {
  const role = req.headers['x-role'];
  if (role !== 'admin') {
    return res.status(422).json({ error: 'Acesso restrito' });
  }

  return res.json({
    segredo: 'Este dado só deveria estar acessível para administradores.',
    chaveInterna: 'ZXhwbG9zZV92dWxuX2hlcmU='
  });
});

app.get('/', (req, res) => {
  res.send('ZVWA API está online!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ZVWA API rodando na porta ${PORT}`);
});
