export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readingTime: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "comecando-com-engenharia-de-software",
    title: "Comecando com Engenharia de Software",
    date: "2026-02-06",
    excerpt:
      "Reflexoes sobre os primeiros passos na area de engenharia de software, desafios iniciais e como construir uma base solida de conhecimento tecnico.",
    category: "Carreira",
    readingTime: "5 min",
    content: `# Comecando com Engenharia de Software

A transicao para a area de engenharia de software pode parecer intimidadora no inicio. Sao tantas tecnologias, frameworks e conceitos que e facil se sentir perdido. No entanto, a chave esta em construir uma base solida e ir avancando passo a passo.

## Fundamentos sao a base de tudo

Antes de pular para o framework da moda, invista tempo entendendo os fundamentos: como a web funciona, o protocolo HTTP, estruturas de dados e algoritmos basicos. Esse conhecimento vai te diferenciar a longo prazo.

> "A diferenca entre um programador junior e um senior nao esta no framework que ele domina, mas na profundidade com que entende os fundamentos."

## Construindo seu primeiro projeto

A melhor maneira de aprender e construindo. Escolha um projeto simples e leve ate o fim:

- Defina um escopo pequeno e realista
- Use controle de versao desde o inicio com **Git**
- Documente suas decisoes tecnicas
- Nao tenha medo de errar e refatorar

## Ferramentas essenciais

Para comecar, voce vai precisar de poucas ferramentas:

1. Um editor de codigo como o **VS Code**
2. **Git** para controle de versao
3. Um terminal confortavel
4. Acesso ao **GitHub** para compartilhar seu codigo

## Exemplo de configuracao inicial

\`\`\`bash
git init meu-projeto
cd meu-projeto
npm init -y
\`\`\`

O importante e comecar. Nao espere estar "pronto" para construir algo. Voce aprende fazendo, errando e melhorando. Cada linha de codigo escrita e um passo a frente na sua jornada.`,
  },
  {
    slug: "seguranca-em-aplicacoes-web",
    title: "Seguranca em Aplicacoes Web: O Basico que Todo Dev Precisa Saber",
    date: "2026-02-06",
    excerpt:
      "Uma introducao pratica aos conceitos fundamentais de seguranca em aplicacoes web, incluindo OWASP Top 10, sanitizacao de inputs e autenticacao segura.",
    category: "Seguranca",
    readingTime: "7 min",
    content: `# Seguranca em Aplicacoes Web

Seguranca nao e um recurso opcional. E uma responsabilidade que todo desenvolvedor deve levar a serio desde o primeiro commit. Neste artigo, vamos explorar os conceitos basicos que todo dev precisa conhecer.

## OWASP Top 10

O OWASP Top 10 e uma lista das vulnerabilidades mais criticas em aplicacoes web. Conhece-las e o primeiro passo para escrever codigo mais seguro:

- **Injection** - SQL, NoSQL, OS command injection
- **Broken Authentication** - Falhas em autenticacao e sessoes
- **Sensitive Data Exposure** - Dados sensiveis sem criptografia
- **XSS (Cross-Site Scripting)** - Scripts maliciosos injetados no browser

## Sanitizacao de Inputs

Nunca confie em dados que vem do usuario. Sempre valide e sanitize:

\`\`\`typescript
// Nunca faca isso
const query = \`SELECT * FROM users WHERE id = \${userId}\`

// Faca isso
const query = \`SELECT * FROM users WHERE id = $1\`
const result = await db.query(query, [userId])
\`\`\`

## Autenticacao Segura

Algumas praticas essenciais para autenticacao:

1. Nunca armazene senhas em texto puro - use **bcrypt** ou **argon2**
2. Implemente rate limiting para prevenir forca bruta
3. Use tokens **JWT** com expiracao curta
4. Sempre use **HTTPS** em producao

> "A seguranca de uma aplicacao e tao forte quanto seu elo mais fraco."

Investir em seguranca desde o inicio do projeto e muito mais barato do que remediar uma brecha depois. Faca disso um habito, nao uma tarefa pendente.`,
  },
  {
    slug: "produtividade-para-desenvolvedores",
    title: "Produtividade para Desenvolvedores: Habitos e Ferramentas",
    date: "2026-02-06",
    excerpt:
      "Dicas praticas de produtividade para desenvolvedores, desde gerenciamento de tempo ate automacoes e atalhos que fazem a diferenca no dia a dia.",
    category: "Produtividade",
    readingTime: "4 min",
    content: `# Produtividade para Desenvolvedores

Ser produtivo nao significa trabalhar mais horas. Significa trabalhar de forma mais inteligente, eliminando friccoes e focando no que realmente importa.

## Gerenciamento de Tempo

A tecnica mais eficiente que encontrei e uma variacao do Pomodoro:

- **50 minutos** de foco profundo
- **10 minutos** de pausa real (longe da tela)
- A cada 3 ciclos, uma pausa mais longa de **20 minutos**

## Atalhos que Fazem a Diferenca

No VS Code, esses atalhos vao mudar seu fluxo:

1. \`Ctrl+P\` para buscar arquivos rapidamente
2. \`Ctrl+Shift+P\` para a paleta de comandos
3. \`Ctrl+D\` para selecionar multiplas ocorrencias
4. \`Alt+Shift+F\` para formatar o documento

## Automacoes Essenciais

Automatize tudo que e repetitivo:

\`\`\`bash
# Alias para git no seu .bashrc
alias gs="git status"
alias gc="git commit -m"
alias gp="git push origin"
\`\`\`

> "A melhor otimizacao e eliminar o trabalho desnecessario."

O segredo da produtividade a longo prazo e consistencia. Pequenos habitos diarios geram resultados exponenciais ao longo do tempo.`,
  },
  {
    slug: "introducao-ao-backend-com-nodejs",
    title: "Introducao ao Backend com Node.js",
    date: "2026-02-06",
    excerpt:
      "Um guia pratico para quem esta comecando no desenvolvimento backend com Node.js, cobrindo conceitos fundamentais, Express e boas praticas.",
    category: "Backend",
    readingTime: "6 min",
    content: `# Introducao ao Backend com Node.js

Node.js revolucionou o desenvolvimento web ao permitir que JavaScript rodasse no servidor. Se voce ja conhece JavaScript do frontend, a transicao para o backend se torna muito mais natural.

## Por que Node.js?

- **JavaScript em todo lugar** - mesma linguagem no front e backend
- **Event-driven e non-blocking** - excelente para I/O
- **NPM** - o maior ecossistema de pacotes do mundo
- **Comunidade ativa** - documentacao e suporte abundantes

## Seu primeiro servidor

\`\`\`javascript
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
\`\`\`

## Estrutura de Projeto Recomendada

Para projetos maiores, organize seu codigo:

- \`/src\` - Codigo fonte principal
- \`/src/routes\` - Definicao de rotas
- \`/src/controllers\` - Logica de negocio
- \`/src/models\` - Modelos de dados
- \`/src/middleware\` - Middlewares customizados

## Boas Praticas

1. Use **variaveis de ambiente** para configuracoes sensiveis
2. Implemente **tratamento de erros** centralizado
3. Adicione **logs estruturados** para debugging
4. Escreva **testes** desde o inicio

> "Codigo limpo no backend e a fundacao de uma aplicacao escalavel."

Node.js e uma excelente porta de entrada para o mundo do backend. Comece simples, entenda os conceitos e va evoluindo gradualmente.`,
  },
  {
    slug: "ferramentas-essenciais-2026",
    title: "Ferramentas Essenciais para Desenvolvedores em 2026",
    date: "2026-02-06",
    excerpt:
      "Uma curadoria das ferramentas mais uteis para desenvolvedores em 2026, desde editores e terminais ate servicos de deploy e monitoramento.",
    category: "Ferramentas",
    readingTime: "5 min",
    content: `# Ferramentas Essenciais para Desenvolvedores em 2026

O ecossistema de ferramentas para desenvolvedores evolui rapidamente. Aqui esta minha selecao das ferramentas que mais impactam a produtividade no dia a dia.

## Editor e Terminal

- **VS Code** continua sendo o editor mais versatil
- **Warp** ou **Alacritty** para um terminal moderno e rapido
- **Starship** para um prompt bonito e informativo

## Controle de Versao e CI/CD

- **GitHub** para repositorios e code review
- **GitHub Actions** para CI/CD automatizado
- **Conventional Commits** para historico de commits legivel

## Deploy e Infraestrutura

1. **Vercel** para frontend e full-stack Next.js
2. **Railway** ou **Fly.io** para backends
3. **Supabase** para banco de dados e autenticacao
4. **Cloudflare** para CDN e Workers

## Monitoramento

\`\`\`yaml
# Exemplo de stack de monitoramento
monitoring:
  logs: Axiom
  errors: Sentry
  uptime: BetterStack
  analytics: Plausible
\`\`\`

## IA como Copiloto

A inteligencia artificial se tornou parte integral do fluxo de trabalho:

- **GitHub Copilot** para sugestoes de codigo
- **ChatGPT / Claude** para debugging e aprendizado
- **v0** para prototipagem rapida de UI

> "As melhores ferramentas sao aquelas que desaparecem do caminho e deixam voce focar no problema."

Escolha ferramentas que se adequem ao seu fluxo. Nao adote algo so porque e popular - adote porque resolve um problema real no seu dia a dia.`,
  },
];

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatDate(dateString: string): string {
  // Parse date parts directly from the YYYY-MM-DD string to avoid
  // timezone discrepancies between server and client (hydration mismatch).
  const [year, month, day] = dateString.split("-");
  const months = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ];
  const monthIndex = parseInt(month, 10) - 1;
  return `${day} de ${months[monthIndex]}. de ${year}`;
}
