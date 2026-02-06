export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  readingTime: string
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "comecando-com-engenharia-de-software",
    title: "Comecando com Engenharia de Software",
    date: "2025-12-15",
    excerpt:
      "Reflexoes sobre os primeiros passos na area de engenharia de software, desafios iniciais e como construir uma base solida de conhecimento tecnico.",
    category: "Carreira",
    readingTime: "5 min",
    content: `
# Comecando com Engenharia de Software

A jornada na engenharia de software comeca com curiosidade. Nao existe um caminho unico, mas existem fundamentos que todo desenvolvedor precisa dominar.

## Os Fundamentos

Antes de mergulhar em frameworks e ferramentas, e essencial entender os conceitos basicos:

- **Logica de programacao**: A base de tudo. Sem ela, qualquer linguagem se torna um obstaculo.
- **Estruturas de dados**: Arrays, listas, arvores, grafos — saber quando usar cada uma faz toda a diferenca.
- **Algoritmos**: Nao apenas para entrevistas, mas para resolver problemas reais de forma eficiente.

## Escolhendo sua primeira linguagem

Nao existe linguagem perfeita para comecar. Python e otimo pela simplicidade. JavaScript pela versatilidade. O importante e comecar e ser consistente.

## Construindo projetos

A teoria sem pratica e incompleta. Comece com projetos pequenos:

1. Um to-do list simples
2. Um conversor de unidades
3. Uma calculadora
4. Um blog pessoal (como este!)

## O papel da comunidade

Participar de comunidades tech, contribuir com open source e compartilhar seu aprendizado acelera muito a evolucao. Nao tenha medo de mostrar codigo imperfeito — todos comecaram assim.

> "O melhor momento para comecar foi ontem. O segundo melhor e agora."

Continue aprendendo, continue construindo.
    `,
  },
  {
    slug: "ciberseguranca-para-desenvolvedores",
    title: "Ciberseguranca para Desenvolvedores",
    date: "2025-11-28",
    excerpt:
      "Por que todo desenvolvedor deveria entender os fundamentos de ciberseguranca e como isso impacta a qualidade do codigo que produzimos.",
    category: "Seguranca",
    readingTime: "7 min",
    content: `
# Ciberseguranca para Desenvolvedores

Seguranca nao e apenas responsabilidade de um time especializado. Todo desenvolvedor precisa pensar em seguranca desde a primeira linha de codigo.

## OWASP Top 10

O OWASP Top 10 e a referencia principal para vulnerabilidades web:

1. **Broken Access Control** — Garantir que usuarios so acessem o que devem
2. **Cryptographic Failures** — Proteger dados sensiveis adequadamente
3. **Injection** — SQL Injection, XSS e outras formas de injecao
4. **Insecure Design** — Falhas arquiteturais que comprometem a seguranca

## Praticas essenciais

- Sempre validar input do usuario no servidor
- Usar prepared statements para queries SQL
- Implementar autenticacao e autorizacao robustas
- Manter dependencias atualizadas
- Nunca armazenar senhas em texto puro

## Ferramentas uteis

Existem diversas ferramentas que ajudam a identificar vulnerabilidades:

- **SAST** (Static Application Security Testing): Analisa o codigo fonte
- **DAST** (Dynamic Application Security Testing): Testa a aplicacao em execucao
- **SCA** (Software Composition Analysis): Verifica vulnerabilidades em dependencias

## Conclusao

Seguranca e um investimento, nao um custo. Codigo seguro e codigo de qualidade.
    `,
  },
  {
    slug: "next-js-e-o-futuro-do-frontend",
    title: "Next.js e o Futuro do Frontend",
    date: "2025-11-10",
    excerpt:
      "Uma analise sobre como o Next.js esta moldando o desenvolvimento frontend moderno com Server Components, App Router e otimizacoes automaticas.",
    category: "Tecnologia",
    readingTime: "6 min",
    content: `
# Next.js e o Futuro do Frontend

O Next.js se consolidou como um dos frameworks mais influentes do ecossistema React. Com a introducao do App Router e Server Components, o paradigma de desenvolvimento web mudou significativamente.

## Server Components

Server Components permitem renderizar componentes no servidor, reduzindo o JavaScript enviado ao cliente:

- Acesso direto ao banco de dados
- Reducao do bundle size
- Melhor performance inicial

## App Router

O App Router trouxe uma nova forma de organizar rotas:

- Layouts aninhados
- Loading states nativos
- Error boundaries por rota
- Streaming de componentes

## Otimizacoes automaticas

O Next.js otimiza automaticamente:

- **Imagens**: Componente Image com lazy loading e formatos modernos
- **Fontes**: Otimizacao de fontes do Google sem layout shift
- **Scripts**: Carregamento inteligente de scripts de terceiros

## Quando usar Next.js?

Next.js e ideal para:

- Sites com necessidade de SEO
- Aplicacoes que precisam de SSR ou SSG
- Projetos que se beneficiam de code splitting automatico
- Times que querem produtividade com convencoes bem definidas

## Conclusao

O Next.js continua evoluindo rapidamente. Acompanhar suas atualizacoes e essencial para qualquer desenvolvedor frontend.
    `,
  },
  {
    slug: "git-alem-do-basico",
    title: "Git: Alem do Basico",
    date: "2025-10-22",
    excerpt:
      "Comandos e estrategias avancadas de Git que todo desenvolvedor deveria conhecer para um fluxo de trabalho mais eficiente.",
    category: "Ferramentas",
    readingTime: "8 min",
    content: `
# Git: Alem do Basico

Todo desenvolvedor sabe fazer commit, push e pull. Mas Git oferece muito mais do que isso.

## Rebase interativo

O rebase interativo permite reescrever o historico de commits:

\`\`\`bash
git rebase -i HEAD~5
\`\`\`

Isso abre um editor onde voce pode:
- **pick**: manter o commit
- **squash**: combinar com o commit anterior
- **reword**: alterar a mensagem
- **edit**: modificar o commit
- **drop**: remover o commit

## Git Bisect

Encontrar o commit que introduziu um bug:

\`\`\`bash
git bisect start
git bisect bad          # commit atual tem o bug
git bisect good abc123  # commit sem o bug
\`\`\`

O Git faz uma busca binaria pelos commits para encontrar exatamente onde o problema comecou.

## Stash avancado

Alem do basico \`git stash\`:

\`\`\`bash
git stash save "mensagem descritiva"
git stash list
git stash apply stash@{2}
git stash branch nova-branch
\`\`\`

## Hooks

Git hooks automatizam tarefas:

- **pre-commit**: Rodar linter antes de cada commit
- **commit-msg**: Validar formato da mensagem
- **pre-push**: Rodar testes antes de enviar

## Conclusao

Dominar Git vai alem de saber os comandos basicos. E sobre entender o modelo de dados e usar as ferramentas certas para cada situacao.
    `,
  },
  {
    slug: "produtividade-para-devs",
    title: "Produtividade para Devs",
    date: "2025-10-05",
    excerpt:
      "Tecnicas e ferramentas que me ajudam a manter o foco e a produtividade no dia a dia como desenvolvedor de software.",
    category: "Produtividade",
    readingTime: "4 min",
    content: `
# Produtividade para Devs

Ser produtivo nao e trabalhar mais horas, e trabalhar de forma mais inteligente.

## Tecnica Pomodoro adaptada

A tecnica classica de 25 min trabalho / 5 min pausa funciona, mas para programacao eu prefiro:

- **50 min** de foco intenso
- **10 min** de pausa real (longe da tela)
- Apos 3 ciclos, pausa longa de 30 min

## Ambiente de trabalho

- Editor configurado com atalhos personalizados
- Terminal com aliases para comandos frequentes
- Segundo monitor para documentacao
- Fones com cancelamento de ruido

## Gerenciamento de tarefas

- Quebrar tarefas grandes em subtarefas de no maximo 2 horas
- Usar a regra dos 2 minutos: se leva menos que 2 min, faca agora
- Manter um "parking lot" para ideias que surgem durante o foco

## Deep Work

O conceito de Cal Newport e essencial:

- Bloquear periodos de foco no calendario
- Desativar notificacoes durante deep work
- Comunicar ao time seus horarios de foco

## Conclusao

Produtividade e um habito, nao um destino. Experimente diferentes tecnicas e encontre o que funciona para voce.
    `,
  },
  {
    slug: "api-rest-boas-praticas",
    title: "API REST: Boas Praticas",
    date: "2025-09-18",
    excerpt:
      "Um guia pratico sobre como projetar APIs RESTful seguindo padroes da industria, com exemplos reais e dicas de versionamento.",
    category: "Backend",
    readingTime: "10 min",
    content: `
# API REST: Boas Praticas

Projetar uma boa API REST e uma habilidade fundamental para qualquer desenvolvedor backend.

## Nomenclatura de endpoints

- Usar substantivos no plural: \`/users\`, \`/posts\`, \`/comments\`
- Evitar verbos nos endpoints: \`GET /users\` em vez de \`GET /getUsers\`
- Usar kebab-case: \`/user-profiles\` em vez de \`/userProfiles\`

## Codigos de status HTTP

Usar os codigos corretos:

- **200**: Sucesso
- **201**: Recurso criado
- **204**: Sucesso sem conteudo
- **400**: Erro do cliente
- **401**: Nao autenticado
- **403**: Nao autorizado
- **404**: Nao encontrado
- **500**: Erro do servidor

## Versionamento

Duas abordagens principais:

1. **URL**: \`/api/v1/users\`
2. **Header**: \`Accept: application/vnd.api.v1+json\`

## Paginacao

Para listas grandes, sempre implementar paginacao:

\`\`\`json
{
  "data": [...],
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 150
  }
}
\`\`\`

## Conclusao

Uma API bem projetada e mais facil de manter, documentar e consumir. Invista tempo no design antes de comecar a implementar.
    `,
  },
]

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}
