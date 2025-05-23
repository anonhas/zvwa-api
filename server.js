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
    "Z2F{422_bypass200}",
    "Z2F{IDOR_exposed133}"
  ];

  const ok = validas.every(flag => flags.includes(flag)) && nome?.trim().length > 3;

  res.json({ ok });
});
const USER_PROFILES = {
  1: {
    id: 1,
    nome: "Pedro Miguel Melo",
    email: "brenopires",
    role: "user",
    bio: "Cupiditate nam velit delectus voluptatum."
  },
  2: {
    id: 2,
    nome: "Dr. Juan Lima",
    email: "rafaelpereira",
    role: "user",
    bio: "Tempora officia in iste ut."
  },
  3: {
    id: 3,
    nome: "Dr. Diogo Fernandes",
    email: "jrezende",
    role: "user",
    bio: "Debitis laborum praesentium tempore inventore nam."
  },
  4: {
    id: 4,
    nome: "Felipe Barros",
    email: "luanadias",
    role: "user",
    bio: "Suscipit amet exercitationem incidunt repellendus magnam architecto."
  },
  5: {
    id: 5,
    nome: "Luiz Gustavo Cunha",
    email: "mda-costa",
    role: "user",
    bio: "Reiciendis ducimus alias cumque aliquid occaecati."
  },
  6: {
    id: 6,
    nome: "Enrico Silva",
    email: "enrico98",
    role: "user",
    bio: "Excepturi consectetur neque ab quis."
  },
  7: {
    id: 7,
    nome: "Luiza Nunes",
    email: "araujojoao-miguel",
    role: "user",
    bio: "Repellendus ea officiis nulla deleniti."
  },
  8: {
    id: 8,
    nome: "Daniela Barros",
    email: "ysantos",
    role: "user",
    bio: "Occaecati ipsa tempora beatae rem tenetur laboriosam inventore."
  },
  9: {
    id: 9,
    nome: "Kaique Carvalho",
    email: "giovanna26",
    role: "user",
    bio: "Animi corporis necessitatibus repudiandae veniam maxime."
  },
  10: {
    id: 10,
    nome: "Davi Lucas Rezende",
    email: "calebesouza",
    role: "user",
    bio: "Aspernatur modi sint voluptatum praesentium veritatis."
  },
  11: {
    id: 11,
    nome: "Dr. Pedro Henrique Costela",
    email: "sda-rosa",
    role: "user",
    bio: "A consectetur animi quas."
  },
  12: {
    id: 12,
    nome: "Rebeca Duarte",
    email: "xsales",
    role: "user",
    bio: "Ratione veritatis corporis dolores exercitationem."
  },
  13: {
    id: 13,
    nome: "Ana Laura Costa",
    email: "lnunes",
    role: "user",
    bio: "Numquam vitae ipsam sint maxime."
  },
  14: {
    id: 14,
    nome: "Lorenzo Rodrigues",
    email: "moraesjoao-guilherme",
    role: "user",
    bio: "In accusamus exercitationem."
  },
  15: {
    id: 15,
    nome: "João Pedro da Conceição",
    email: "gabrielacaldeira",
    role: "user",
    bio: "Perspiciatis nulla consequuntur."
  },
  16: {
    id: 16,
    nome: "Mariane Teixeira",
    email: "gabriela90",
    role: "user",
    bio: "Officia necessitatibus error quo odio qui alias ducimus."
  },
  17: {
    id: 17,
    nome: "Sr. Rodrigo da Mata",
    email: "osantos",
    role: "user",
    bio: "Magnam odit odit voluptate perspiciatis quos blanditiis."
  },
  18: {
    id: 18,
    nome: "Nathan Pereira",
    email: "gabriellyfarias",
    role: "user",
    bio: "Odio sapiente iusto repellendus."
  },
  19: {
    id: 19,
    nome: "Luiz Henrique Barros",
    email: "limanatalia",
    role: "user",
    bio: "Officia consectetur quo perferendis animi quidem porro."
  },
  20: {
    id: 20,
    nome: "Ana Luiza Correia",
    email: "andrebarros",
    role: "user",
    bio: "Molestias natus odio ipsam."
  },
  21: {
    id: 21,
    nome: "Elisa Almeida",
    email: "costelamaria-cecilia",
    role: "user",
    bio: "Quaerat repudiandae quod quo qui neque voluptatem."
  },
  22: {
    id: 22,
    nome: "Dr. Leonardo Freitas",
    email: "carlos-eduardoda-luz",
    role: "user",
    bio: "Rem nostrum illo vitae suscipit."
  },
  23: {
    id: 23,
    nome: "Marcela Castro",
    email: "liviada-paz",
    role: "user",
    bio: "Delectus placeat aspernatur ut."
  },
  24: {
    id: 24,
    nome: "Sra. Nicole Dias",
    email: "laviniamoraes",
    role: "user",
    bio: "Tempora nihil delectus adipisci dolorem dolore iure eum."
  },
  25: {
    id: 25,
    nome: "Diego Costa",
    email: "barroslarissa",
    role: "user",
    bio: "Fugiat dolorem beatae accusamus perferendis tempora."
  },
  26: {
    id: 26,
    nome: "Milena Campos",
    email: "carlos-eduardo57",
    role: "user",
    bio: "Aperiam unde quia tempore praesentium enim."
  },
  27: {
    id: 27,
    nome: "Yago da Rocha",
    email: "leonardo46",
    role: "user",
    bio: "Tempora quaerat facere sequi laborum vel id."
  },
  28: {
    id: 28,
    nome: "Sra. Pietra Souza",
    email: "zfogaca",
    role: "user",
    bio: "Ut quas amet quae recusandae consectetur."
  },
  29: {
    id: 29,
    nome: "Nina Aragão",
    email: "barbosasophia",
    role: "user",
    bio: "Dolores quo cupiditate accusantium iste amet ratione."
  },
  30: {
    id: 30,
    nome: "Luna Correia",
    email: "thiagocunha",
    role: "user",
    bio: "Eligendi et cupiditate."
  },
  31: {
    id: 31,
    nome: "Dr. Vinicius Almeida",
    email: "brenooliveira",
    role: "user",
    bio: "Consequatur animi totam."
  },
  32: {
    id: 32,
    nome: "Maria Clara Ribeiro",
    email: "jazevedo",
    role: "user",
    bio: "Pariatur fugit quibusdam quae praesentium."
  },
  33: {
    id: 33,
    nome: "Heitor Carvalho",
    email: "enzosilva",
    role: "user",
    bio: "Impedit perferendis voluptate illo eaque quis fugiat."
  },
  34: {
    id: 34,
    nome: "Isabelly Cardoso",
    email: "rochafernando",
    role: "user",
    bio: "Hic tempore vero maiores cum consequatur aperiam."
  },
  35: {
    id: 35,
    nome: "Renan da Luz",
    email: "renan84",
    role: "user",
    bio: "Amet omnis praesentium ab iure reiciendis."
  },
  36: {
    id: 36,
    nome: "Calebe Rezende",
    email: "migueloliveira",
    role: "user",
    bio: "Dignissimos quasi ut natus maxime quis."
  },
  37: {
    id: 37,
    nome: "Vitória da Paz",
    email: "azevedobenicio",
    role: "user",
    bio: "Sit rem veritatis facere laboriosam eaque."
  },
  38: {
    id: 38,
    nome: "Luiz Fernando Peixoto",
    email: "caue18",
    role: "user",
    bio: "Eos magnam in eos."
  },
  39: {
    id: 39,
    nome: "Maitê Melo",
    email: "diogo06",
    role: "user",
    bio: "In expedita quia distinctio facilis dignissimos nulla cum."
  },
  40: {
    id: 40,
    nome: "Dr. Pedro Henrique Santos",
    email: "gustavo26",
    role: "user",
    bio: "Nemo laborum dolorem quisquam."
  },
  41: {
    id: 41,
    nome: "Bruna da Mata",
    email: "correiamaria",
    role: "user",
    bio: "Ad hic doloremque iste."
  },
  42: {
    id: 42,
    nome: "Lucas Gabriel Melo",
    email: "yrocha",
    role: "user",
    bio: "Odit quasi incidunt aperiam repudiandae est."
  },
  43: {
    id: 43,
    nome: "Esther da Mata",
    email: "marcos-vinicius73",
    role: "user",
    bio: "Incidunt minus ducimus doloremque accusamus nesciunt."
  },
  44: {
    id: 44,
    nome: "Gabrielly Martins",
    email: "brendalopes",
    role: "user",
    bio: "Ratione voluptas sequi ut pariatur ducimus maxime."
  },
  45: {
    id: 45,
    nome: "Sra. Elisa Monteiro",
    email: "fsales",
    role: "user",
    bio: "Maxime reprehenderit facere nihil."
  },
  46: {
    id: 46,
    nome: "Bryan da Rosa",
    email: "pcardoso",
    role: "user",
    bio: "Saepe veniam laborum sint totam facere quo eligendi."
  },
  47: {
    id: 47,
    nome: "Srta. Ana Júlia Mendes",
    email: "joao-lucas97",
    role: "user",
    bio: "Amet doloremque eligendi perspiciatis est."
  },
  48: {
    id: 48,
    nome: "Vinicius da Costa",
    email: "bruno28",
    role: "user",
    bio: "Beatae modi eaque animi suscipit."
  },
  49: {
    id: 49,
    nome: "Julia Farias",
    email: "talves",
    role: "user",
    bio: "Dignissimos totam quaerat sit."
  },
  50: {
    id: 50,
    nome: "Raul Fogaça",
    email: "rcosta",
    role: "user",
    bio: "Nulla quisquam neque fugit voluptatem laudantium magnam."
  },
  51: {
    id: 51,
    nome: "Davi Lucca da Cruz",
    email: "bbarbosa",
    role: "user",
    bio: "Voluptatibus totam eos in."
  },
  52: {
    id: 52,
    nome: "Marcela Silveira",
    email: "ivieira",
    role: "user",
    bio: "Fuga itaque voluptate."
  },
  53: {
    id: 53,
    nome: "Maria Cecília da Cruz",
    email: "pmoreira",
    role: "user",
    bio: "Voluptas quia explicabo omnis."
  },
  54: {
    id: 54,
    nome: "Nicolas Farias",
    email: "danielacosta",
    role: "user",
    bio: "Maxime magnam quibusdam facere."
  },
  55: {
    id: 55,
    nome: "Isabelly Moreira",
    email: "vieirabryan",
    role: "user",
    bio: "Quis quis eum repudiandae dicta."
  },
  56: {
    id: 56,
    nome: "Emilly Silva",
    email: "oliveirajoao-vitor",
    role: "user",
    bio: "Velit et molestias voluptatibus eaque nemo."
  },
  57: {
    id: 57,
    nome: "Luiz Otávio Silva",
    email: "saragao",
    role: "user",
    bio: "Fugit sapiente veniam earum quasi mollitia enim."
  },
  58: {
    id: 58,
    nome: "Gabrielly Rodrigues",
    email: "davi-lucca92",
    role: "user",
    bio: "Maxime quia earum veritatis pariatur."
  },
  59: {
    id: 59,
    nome: "João Lucas Vieira",
    email: "ana-laura66",
    role: "user",
    bio: "Pariatur mollitia illum voluptate maxime ad repellat."
  },
  60: {
    id: 60,
    nome: "Breno Fernandes",
    email: "hsouza",
    role: "user",
    bio: "Vel laboriosam natus nihil."
  },
  61: {
    id: 61,
    nome: "Marcela Carvalho",
    email: "joao-lucassantos",
    role: "user",
    bio: "In delectus beatae veniam perspiciatis assumenda."
  },
  62: {
    id: 62,
    nome: "Vicente Monteiro",
    email: "ocunha",
    role: "user",
    bio: "Voluptate ipsum beatae nesciunt ullam."
  },
  63: {
    id: 63,
    nome: "Esther Rocha",
    email: "qdas-neves",
    role: "user",
    bio: "Saepe magni ea nam placeat."
  },
  64: {
    id: 64,
    nome: "Isabella Alves",
    email: "joao-miguel69",
    role: "user",
    bio: "Consequatur nobis laborum repudiandae."
  },
  65: {
    id: 65,
    nome: "Heloísa Ramos",
    email: "liviabarros",
    role: "user",
    bio: "Fugiat vero saepe minima quae."
  },
  66: {
    id: 66,
    nome: "Rafael Fernandes",
    email: "larissa87",
    role: "user",
    bio: "Dolores sed quod molestias quo."
  },
  67: {
    id: 67,
    nome: "Sr. Vicente da Cunha",
    email: "pdias",
    role: "user",
    bio: "Quaerat dolorum itaque quod reprehenderit."
  },
  68: {
    id: 68,
    nome: "Caio Pinto",
    email: "aazevedo",
    role: "user",
    bio: "Tenetur nam excepturi voluptas nulla incidunt est."
  },
  69: {
    id: 69,
    nome: "Larissa Fogaça",
    email: "kamilly98",
    role: "user",
    bio: "Exercitationem qui soluta debitis recusandae similique excepturi."
  },
  70: {
    id: 70,
    nome: "João Guilherme Duarte",
    email: "xmonteiro",
    role: "user",
    bio: "Labore quisquam tenetur assumenda."
  },
  71: {
    id: 71,
    nome: "Brenda Caldeira",
    email: "da-conceicaoyago",
    role: "user",
    bio: "Quos ab sunt excepturi neque iure facilis."
  },
  72: {
    id: 72,
    nome: "Vitor Hugo Cunha",
    email: "bianca86",
    role: "user",
    bio: "Placeat maxime laboriosam autem tenetur esse."
  },
  73: {
    id: 73,
    nome: "Juliana da Conceição",
    email: "stephanyaragao",
    role: "user",
    bio: "Aut numquam corrupti nesciunt et rem consequuntur."
  },
  74: {
    id: 74,
    nome: "João Felipe Silva",
    email: "fernandesmariane",
    role: "user",
    bio: "Autem repudiandae perspiciatis laboriosam."
  },
  75: {
    id: 75,
    nome: "Isabelly da Cunha",
    email: "vcaldeira",
    role: "user",
    bio: "Qui ipsa quam sunt."
  },
  76: {
    id: 76,
    nome: "Davi Lucas Aragão",
    email: "acosta",
    role: "user",
    bio: "Quae ea ipsam est."
  },
  77: {
    id: 77,
    nome: "João Vitor da Costa",
    email: "ysilva",
    role: "user",
    bio: "Ut voluptates eaque veniam itaque dicta."
  },
  78: {
    id: 78,
    nome: "Julia Almeida",
    email: "joao-lucas53",
    role: "user",
    bio: "Aspernatur unde saepe nobis at fugiat."
  },
  79: {
    id: 79,
    nome: "Leonardo Gonçalves",
    email: "enricolima",
    role: "user",
    bio: "Temporibus corporis quasi debitis sapiente alias."
  },
  80: {
    id: 80,
    nome: "Evelyn Ferreira",
    email: "juliada-rosa",
    role: "user",
    bio: "Sequi reiciendis occaecati."
  },
  81: {
    id: 81,
    nome: "Arthur Gonçalves",
    email: "vitor-gabrielmonteiro",
    role: "user",
    bio: "Iusto assumenda perspiciatis incidunt."
  },
  82: {
    id: 82,
    nome: "João Guilherme da Mota",
    email: "ramoslevi",
    role: "user",
    bio: "Blanditiis laudantium id dolores."
  },
  83: {
    id: 83,
    nome: "Marcelo Gonçalves",
    email: "pereiraluiz-otavio",
    role: "user",
    bio: "Voluptatem itaque earum rerum ab minima optio."
  },
  84: {
    id: 84,
    nome: "Júlia Jesus",
    email: "pmelo",
    role: "user",
    bio: "Quas quam distinctio quasi quibusdam vitae placeat."
  },
  85: {
    id: 85,
    nome: "Mariane Pires",
    email: "leticiaaragao",
    role: "user",
    bio: "Reiciendis dignissimos voluptatum illum dignissimos eos."
  },
  86: {
    id: 86,
    nome: "Augusto Fernandes",
    email: "gcostela",
    role: "user",
    bio: "Rem rerum error porro minus assumenda."
  },
  87: {
    id: 87,
    nome: "Luiz Miguel Araújo",
    email: "carlos-eduardoda-rosa",
    role: "user",
    bio: "Quod numquam eaque reiciendis rerum atque fuga ab."
  },
  88: {
    id: 88,
    nome: "Vitória Nascimento",
    email: "luigi05",
    role: "user",
    bio: "Itaque sapiente doloremque laborum eius."
  },
  89: {
    id: 89,
    nome: "Luigi Azevedo",
    email: "da-pazguilherme",
    role: "user",
    bio: "Necessitatibus itaque libero reiciendis eligendi harum soluta."
  },
  90: {
    id: 90,
    nome: "Evelyn Pires",
    email: "uazevedo",
    role: "user",
    bio: "Quae hic fuga dignissimos deserunt placeat tempora quidem."
  },
  91: {
    id: 91,
    nome: "Francisco Monteiro",
    email: "mendeslavinia",
    role: "user",
    bio: "Qui hic doloribus."
  },
  92: {
    id: 92,
    nome: "Sra. Maria Eduarda Ribeiro",
    email: "davinunes",
    role: "user",
    bio: "Repellendus blanditiis atque incidunt accusantium."
  },
  93: {
    id: 93,
    nome: "João Guilherme da Cunha",
    email: "dalmeida",
    role: "user",
    bio: "Velit modi rem enim velit commodi tenetur quisquam."
  },
  94: {
    id: 94,
    nome: "Alícia Oliveira",
    email: "qcastro",
    role: "user",
    bio: "Dolore repellat sit officia minima."
  },
  95: {
    id: 95,
    nome: "Igor Silva",
    email: "sarah81",
    role: "user",
    bio: "Similique adipisci nam recusandae."
  },
  96: {
    id: 96,
    nome: "Luiz Fernando Pereira",
    email: "emanuel62",
    role: "user",
    bio: "Earum enim ipsum animi dolorem excepturi voluptatem."
  },
  97: {
    id: 97,
    nome: "Ana Carolina da Rosa",
    email: "carolinapereira",
    role: "user",
    bio: "Voluptates vel doloribus maiores ratione quis."
  },
  98: {
    id: 98,
    nome: "Nina Alves",
    email: "elisada-mata",
    role: "user",
    bio: "Tenetur animi deleniti tempore temporibus eveniet unde."
  },
  99: {
    id: 99,
    nome: "Lorena Rodrigues",
    email: "larissarocha",
    role: "user",
    bio: "Vel sit magni dolores."
  },
  100: {
    id: 100,
    nome: "Pietro Azevedo",
    email: "fernandesana-livia",
    role: "user",
    bio: "Quod rerum vel."
  },
  101: {
    id: 101,
    nome: "Vicente da Paz",
    email: "larada-rocha",
    role: "user",
    bio: "Voluptatibus voluptates facere sint occaecati similique."
  },
  102: {
    id: 102,
    nome: "Yasmin Ribeiro",
    email: "zfernandes",
    role: "user",
    bio: "Maiores est deleniti pariatur eum vitae."
  },
  103: {
    id: 103,
    nome: "Marcelo Pinto",
    email: "azevedoemanuel",
    role: "user",
    bio: "Voluptatum pariatur ratione molestiae rem dolor soluta voluptate."
  },
  104: {
    id: 104,
    nome: "Luiz Miguel Castro",
    email: "cecilia20",
    role: "user",
    bio: "Quaerat nostrum quis aliquid molestiae incidunt."
  },
  105: {
    id: 105,
    nome: "Sr. Bryan da Rosa",
    email: "helenarodrigues",
    role: "user",
    bio: "Id ipsam porro nisi."
  },
  106: {
    id: 106,
    nome: "Emanuelly Freitas",
    email: "vitoriacardoso",
    role: "user",
    bio: "Quam inventore vitae facilis quod."
  },
  107: {
    id: 107,
    nome: "Davi Lucas Correia",
    email: "arodrigues",
    role: "user",
    bio: "Blanditiis necessitatibus odio eum aliquid."
  },
  108: {
    id: 108,
    nome: "Theo Castro",
    email: "vieirathomas",
    role: "user",
    bio: "Reiciendis enim iste ipsa."
  },
  109: {
    id: 109,
    nome: "Lucca Cavalcanti",
    email: "samuel70",
    role: "user",
    bio: "Officiis fugit ducimus veniam."
  },
  110: {
    id: 110,
    nome: "Ana Sophia Alves",
    email: "laviniaduarte",
    role: "user",
    bio: "Eos quia similique sed laudantium labore."
  },
  111: {
    id: 111,
    nome: "Dra. Alexia da Paz",
    email: "maria-clara55",
    role: "user",
    bio: "Quod expedita iste."
  },
  112: {
    id: 112,
    nome: "Sra. Catarina Souza",
    email: "elisa00",
    role: "user",
    bio: "Corporis dolore distinctio amet laudantium dolor."
  },
  113: {
    id: 113,
    nome: "Srta. Isadora Nunes",
    email: "vicenteduarte",
    role: "user",
    bio: "Consequuntur voluptatibus quisquam nam nobis quibusdam."
  },
  114: {
    id: 114,
    nome: "Laura Araújo",
    email: "maite91",
    role: "user",
    bio: "Deleniti inventore vel odio id ipsa."
  },
  115: {
    id: 115,
    nome: "Sophie Dias",
    email: "vicentecunha",
    role: "user",
    bio: "Atque iste quasi quasi minus deserunt quas laborum."
  },
  116: {
    id: 116,
    nome: "Nicole da Costa",
    email: "mendeslucca",
    role: "user",
    bio: "Eius dolor quisquam."
  },
  117: {
    id: 117,
    nome: "Dr. Augusto Gonçalves",
    email: "pirescecilia",
    role: "user",
    bio: "Officiis earum eius dolorum commodi molestias."
  },
  118: {
    id: 118,
    nome: "Júlia Moreira",
    email: "cardosofernanda",
    role: "user",
    bio: "Eveniet debitis veniam eaque labore laboriosam."
  },
  119: {
    id: 119,
    nome: "Luana Viana",
    email: "fviana",
    role: "user",
    bio: "Laudantium debitis aliquam ipsum id minima eum."
  },
  120: {
    id: 120,
    nome: "Maysa Farias",
    email: "mouraana-laura",
    role: "user",
    bio: "Quasi ea excepturi harum id."
  },
  121: {
    id: 121,
    nome: "Ana Sophia Alves",
    email: "luizacardoso",
    role: "user",
    bio: "In placeat adipisci alias a dolorum."
  },
  122: {
    id: 122,
    nome: "Alexia das Neves",
    email: "bfarias",
    role: "user",
    bio: "Quisquam asperiores nesciunt quae sunt numquam sint."
  },
  123: {
    id: 123,
    nome: "Felipe da Mata",
    email: "kamillycunha",
    role: "user",
    bio: "Fugit in velit."
  },
  124: {
    id: 124,
    nome: "Diego Jesus",
    email: "luiz-henrique86",
    role: "user",
    bio: "A nostrum veritatis suscipit assumenda ad."
  },
  125: {
    id: 125,
    nome: "Cecília Rodrigues",
    email: "hda-cruz",
    role: "user",
    bio: "A reiciendis dignissimos occaecati ipsam."
  },
  126: {
    id: 126,
    nome: "Thomas Castro",
    email: "sofiapeixoto",
    role: "user",
    bio: "Explicabo occaecati soluta."
  },
  127: {
    id: 127,
    nome: "Srta. Valentina Mendes",
    email: "alexiada-rocha",
    role: "user",
    bio: "Minus aspernatur fugit aut libero."
  },
  128: {
    id: 128,
    nome: "Renan da Cunha",
    email: "ecampos",
    role: "user",
    bio: "Facilis rerum esse delectus."
  },
  129: {
    id: 129,
    nome: "Enzo Gabriel Azevedo",
    email: "mouragustavo",
    role: "user",
    bio: "Eaque laboriosam accusamus accusamus iure nesciunt tenetur."
  },
  130: {
    id: 130,
    nome: "Emanuella da Rocha",
    email: "daniela77",
    role: "user",
    bio: "Optio dolorem sit dolorum tempore est doloremque."
  },
  131: {
    id: 131,
    nome: "Luigi Nogueira",
    email: "kamilly06",
    role: "user",
    bio: "Accusamus quod facilis est earum architecto amet."
  },
  132: {
    id: 132,
    nome: "Cauê da Rosa",
    email: "cecilia71",
    role: "user",
    bio: "Id exercitationem odio minus adipisci."
  },
  133: {
    id: 133,
    nome: "Usuário Misterioso",
    email: "admin_oculto",
    role: "admin",
    bio: "Este perfil contém dados não autorizados.",
    flag: "Z2F{IDOR_exposed133}"
  },
  134: {
    id: 134,
    nome: "Maria Vitória Freitas",
    email: "da-conceicaomaria-cecilia",
    role: "user",
    bio: "Quibusdam dolor magnam vero explicabo odio nulla consequuntur."
  },
  135: {
    id: 135,
    nome: "Dr. Alexandre Ferreira",
    email: "igomes",
    role: "user",
    bio: "Eveniet eligendi amet nesciunt architecto sit."
  },
  136: {
    id: 136,
    nome: "Bruna Costela",
    email: "fmoreira",
    role: "user",
    bio: "Ipsa facere eaque beatae nisi fuga voluptate."
  },
  137: {
    id: 137,
    nome: "Sr. Matheus Azevedo",
    email: "taragao",
    role: "user",
    bio: "Tenetur eos doloremque labore deserunt facilis aliquam."
  },
  138: {
    id: 138,
    nome: "Isadora Gomes",
    email: "emanuellylopes",
    role: "user",
    bio: "Iusto dolore fuga rem expedita voluptatem maiores."
  },
  139: {
    id: 139,
    nome: "Nathan da Rocha",
    email: "caueda-rocha",
    role: "user",
    bio: "Distinctio id doloremque."
  },
  140: {
    id: 140,
    nome: "Sra. Heloísa Fernandes",
    email: "carlos-eduardo94",
    role: "user",
    bio: "Cupiditate nemo reiciendis necessitatibus porro sit repudiandae."
  },
  141: {
    id: 141,
    nome: "Leonardo Cardoso",
    email: "gabrielapeixoto",
    role: "user",
    bio: "Quasi blanditiis magnam non labore sunt."
  },
  142: {
    id: 142,
    nome: "Samuel Pinto",
    email: "melolaura",
    role: "user",
    bio: "Expedita quis sint ex qui."
  },
  143: {
    id: 143,
    nome: "Fernando Cavalcanti",
    email: "liviadias",
    role: "user",
    bio: "Qui voluptate voluptas dicta excepturi voluptatibus ullam."
  },
  144: {
    id: 144,
    nome: "Srta. Kamilly da Rosa",
    email: "bsales",
    role: "user",
    bio: "Placeat repellat minima hic eum quisquam perspiciatis."
  },
  145: {
    id: 145,
    nome: "Gustavo Azevedo",
    email: "isabellacastro",
    role: "user",
    bio: "Consequatur maxime necessitatibus dolorem."
  },
  146: {
    id: 146,
    nome: "Milena da Paz",
    email: "ipires",
    role: "user",
    bio: "Ipsum temporibus explicabo porro doloremque voluptates."
  },
  147: {
    id: 147,
    nome: "Dra. Maria Alice Peixoto",
    email: "leandropeixoto",
    role: "user",
    bio: "Harum sequi corporis enim."
  },
  148: {
    id: 148,
    nome: "Stella Monteiro",
    email: "livia58",
    role: "user",
    bio: "Accusantium tempora odio adipisci aperiam adipisci."
  },
  149: {
    id: 149,
    nome: "Isadora Costa",
    email: "laissales",
    role: "user",
    bio: "Ipsam aliquam fugit iusto corrupti."
  },
  150: {
    id: 150,
    nome: "Isabel da Costa",
    email: "moreiraisabelly",
    role: "user",
    bio: "Voluptatum magni similique ut."
  }
};

app.get('/api/user/profile', (req, res) => {
  const { id } = req.query;
  const profile = USER_PROFILES[id];

  if (!profile) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  return res.json(profile);
});
