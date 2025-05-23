const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const USERS = [
  {
    email: 'elizaur',
    password: 'bhy8V#&6yVT6d5rcvt7',
    role: 'user'
  },
  {
    email: 'administrator',
    password: 'bFU8GA7SFcvt6cd65$&',
    role: 'admin'
  },
  {
    email: 'guest',
    password: 'guest',
    role: 'user'
  }
];


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = USERS.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ error: 'Usuário inexistente' });
  }

  if (user.password !== password) {
    return res.status(401).json({
      error: 'Senha incorreta',
      correta: user.password 
    });
  }

  return res.json({
    email: user.email,
    role: user.role,
    token: Buffer.from(`${email}:${password}`).toString('base64')
  });
});


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

app.get('/api/dashboard/secret-data', (req, res) => {
  const role = req.headers['x-role'];
  if (role !== 'admin') {
    return res.status(422).json({ error: 'Acesso restrito' });
  }

  return res.json({
    segredo: 'Este dado só deveria estar acessível para administradores.',
    chaveInterna: 'Z2F{422_bypass200}'
  });
});

app.get('/', (req, res) => {
  res.send('ZVWA API está online!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ZVWA API rodando na porta ${PORT}`);
});

app.get('/api/dashboard/secret-data', (req, res) => {
  const role = req.headers['x-role'];
  if (role !== 'admin') {
    return res.status(422).json({ error: "Acesso não autorizado" });
  }

  res.status(200).json({
    segredo: "Dados confidenciais expostos.",
    flag: "Z2F{secret422pwn}"
  });
});
app.post('/validar-flags', (req, res) => {
  const { flags, nome } = req.body;

  const validas = [
    "Z2F{B8Yg67fc7tad$g8ab5%}",
    "Z2F{XSS_search_reflected}",
    "Z2F{422_bypass200}"
  ];

  const ok = validas.every(flag => flags.includes(flag)) && nome?.trim().length > 3;

  res.json({ ok });
});
