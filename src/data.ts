/** Conteúdo principal do site. Os links de código só aparecem para repositórios públicos. */
export const profile = {
  name: 'Victor Guilherme',
  fullName: 'Victor Guilherme Silva Alves',
  initials: 'VG',
  tag: 'DESENVOLVIMENTO + DADOS + AUTOMAÇÃO',
  city: 'Belo Horizonte, Minas Gerais',
  email: 'victorguilhermesilva.a@gmail.com',
  phone: '5531983235418',
  github: 'https://github.com/vyiito',
  linkedin: 'https://www.linkedin.com/in/victorgsa/',
  resume: '/Curriculo-Victor-Guilherme.pdf',
  whatsapp: 'https://wa.me/5531983235418?text=Ol%C3%A1%2C%20Victor!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar.',
}

export type Category = 'Todos' | 'IA & Dados' | 'Web' | 'Plataformas'
export type Project = {
  id: string
  number: string
  title: string
  eyebrow: string
  category: Exclude<Category, 'Todos'>
  description: string
  detail: string
  stack: string[]
  highlight: string
  repo?: string
  featured?: boolean
  visual: 'assistant' | 'career' | 'rpg' | 'sports' | 'cars'
}

export const projects: Project[] = [
  {
    id: 'papex', number: '01', title: 'PapexChatBot', eyebrow: 'IA / AUTOMAÇÃO / ANALYTICS', category: 'IA & Dados',
    description: 'Chatbot inteligente que automatizou o primeiro atendimento e conectou leads, equipe comercial e dashboards em tempo real.',
    detail: 'Solução criada durante minha experiência na Papex do Brasil: atendimento automatizado 24/7, qualificação de leads para Vendas e RH, dashboard com filtros e exportação CSV, integração com Google Sheets e notificações por e-mail. O currículo registra R$ 440 mil em receita associada ao projeto.',
    stack: ['Python', 'Flask', 'Gemini API', 'Pandas', 'Chart.js', 'Google Sheets'],
    highlight: 'R$ 440 mil em receita registrada', featured: true, visual: 'assistant',
  },
  {
    id: 'carreiras', number: '02', title: 'VJ Carreiras', eyebrow: 'FULL STACK / PRODUTIVIDADE', category: 'Web',
    description: 'Planejador de carreira que compara vagas reais com experiências e competências para criar uma rota de evolução profissional.',
    detail: 'Aplicação com importação de currículo e vagas, análise de requisitos, score de aderência, identificação de lacunas e planejamento semanal. Inclui autenticação, perfil profissional, pipeline de candidaturas e exportação de dados.',
    stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Vite'],
    highlight: 'Análise de vagas orientada por evidências', repo: 'https://github.com/vyiito/vj-carreiras', visual: 'career',
  },
  {
    id: 'dagger', number: '03', title: 'DaggerNexus', eyebrow: 'REAL TIME / RPG / SAAS', category: 'Plataformas',
    description: 'Mesa virtual para RPG com fichas interativas, painel do mestre e sincronização de campanhas em tempo real.',
    detail: 'Uma experiência multiplayer para Daggerheart: fichas de personagens, bestiário, inventário, comércio de itens e painel do mestre. Mesas independentes, interface em português/inglês e sincronização via Socket.IO.',
    stack: ['React', 'Node.js', 'Express', 'Socket.IO', 'PostgreSQL', 'JWT'],
    highlight: 'Experiência multiplayer em tempo real', visual: 'rpg',
  },
  {
    id: 'pro', number: '04', title: 'PRO Sala HaxBall', eyebrow: 'SISTEMAS / COMUNIDADE / CLOUD', category: 'Plataformas',
    description: 'Ecossistema competitivo com salas automatizadas, ranking, perfis de jogadores, partidas e console administrativo.',
    detail: 'Bot modular para salas HaxBall integrado a um portal com rankings, perfis, temporadas, registro de partidas e gestão administrativa. Infraestrutura com deploy em servidor, sincronização em banco de dados e comandos protegidos.',
    stack: ['JavaScript', 'Next.js', 'TypeScript', 'Supabase', 'AWS', 'PostgreSQL'],
    highlight: 'Bot + plataforma + infraestrutura', visual: 'sports',
  },
  {
    id: 'cars', number: '05', title: 'VJ 3D Search', eyebrow: 'BUSCA / METADADOS / API', category: 'Web',
    description: 'Metabuscador de modelos 3D automotivos, com múltiplas fontes, filtros e resultados normalizados.',
    detail: 'Busca especializada em modelos de veículos e mods com consultas a dezenas de fontes, filtragem por categorias, normalização de marcas e modelos, tratamento de duplicados e API com streaming de resultados.',
    stack: ['TypeScript', 'React', 'Vite', 'Node.js', 'Express', 'APIs'],
    highlight: '32 fontes consultáveis', repo: 'https://github.com/vyiito/car3d-search', visual: 'cars',
  },
]

export const skills = [
  { num: '01', symbol: '</>', title: 'Desenvolvimento', subtitle: 'Interfaces e sistemas ponta a ponta', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Python / Flask', 'Node.js', 'APIs REST'] },
  { num: '02', symbol: '{ AI }', title: 'IA & Automação', subtitle: 'Tecnologia aplicada a processos reais', items: ['Gemini API', 'Chatbots', 'Automação de fluxos', 'Qualificação de leads', 'Pandas', 'Integrações'] },
  { num: '03', symbol: 'SELECT', title: 'Dados & BI', subtitle: 'Da coleta ao insight', items: ['PostgreSQL', 'Supabase', 'Power BI', 'Excel avançado', 'Chart.js', 'Dashboards'] },
  { num: '04', symbol: 'CLI_>', title: 'Cloud & Ferramentas', subtitle: 'Do ambiente local à produção', items: ['Git / GitHub', 'AWS EC2', 'Render', 'SAP ECC', 'Power Automate', 'Google Sheets API'] },
]

export const experience = [
  { date: '2025 — 2026', company: 'PAPEX DO BRASIL', position: 'Auxiliar de Licitações · Projetos Digitais', text: 'Licitações e operação de marketplaces, com desenvolvimento de chatbot com IA, análise de dados em Power BI/Excel e reestruturação do site institucional.', tags: ['IA', 'Flask', 'Dados', 'Marketplaces'] },
  { date: '2024', company: 'TIM BRASIL', position: 'Assistente Administrativo · Terceirizado', text: 'Rotinas administrativas, emissão de notas fiscais, organização documental, controle de estoque e uso de SAP GUI.', tags: ['SAP GUI', 'Processos', 'Documentação'] },
  { date: '2023 — 2024', company: 'THE HEINEKEN COMPANY', position: 'Assistente Administrativo · Aprendiz', text: 'Suporte a analistas, acompanhamento de chamados internos e rotinas administrativas com SAP ECC e Excel avançado.', tags: ['SAP ECC', 'Excel', 'Operações'] },
]
