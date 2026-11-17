import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, Code2, Command, Copy, Download, Github, Linkedin, Mail, MapPin, Menu, MoonStar, Search, Send, Sparkles, Sun, TerminalSquare, X } from 'lucide-react'
import { experience, profile, projects, skills, type Category, type Project } from './data'

const Universe = lazy(() => import('./Universe'))
const categories: Category[] = ['Todos', 'IA & Dados', 'Web', 'Plataformas']
const sections = [
  { id: 'inicio', name: 'Início', code: '01' },
  { id: 'sobre', name: 'Sobre', code: '02' },
  { id: 'projetos', name: 'Projetos', code: '03' },
  { id: 'experiencia', name: 'Experiência', code: '04' },
  { id: 'contato', name: 'Contato', code: '05' },
]
const accents = [ { label: 'Ciano', value: 'cyan', hex: '#65e5df' }, { label: 'Violeta', value: 'violet', hex: '#ac91ff' }, { label: 'Âmbar', value: 'amber', hex: '#ffc882' } ] as const
const read = (key: string, fallback: string) => { try { return localStorage.getItem(key) ?? fallback } catch { return fallback } }

function Brand() { return <a href="#inicio" className="brand" aria-label="Início, Victor Guilherme"><span className="brand-mark">VG<span>.</span></span><span className="brand-name">VICTOR<br />GUILHERME</span></a> }

function ProjectVisual({ type }: { type: Project['visual'] }) {
  if (type === 'assistant') return <div className="viz-assistant">
    <div className="viz-head"><span className="dots"><i/><i/><i/></span><span>papex.bot / painel de conversões</span><span className="online-indicator">● LIVE</span></div>
    <div className="viz-stats"><div><small>LEADS QUALIFICADOS</small><b>+24/7</b><span>atendimento contínuo</span></div><div><small>RESULTADO NO NEGÓCIO</small><b>R$ 440K</b><span>receita informada no currículo</span></div></div>
    <svg className="viz-chart" viewBox="0 0 520 100" preserveAspectRatio="none" aria-label="Ilustração de dashboard"><defs><linearGradient id="chartFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#65e5df" stopOpacity=".3"/><stop offset="100%" stopColor="#65e5df" stopOpacity="0"/></linearGradient></defs><path d="M0 89 L52 72 L105 79 L155 42 L205 58 L264 36 L309 51 L359 21 L423 32 L468 14 L520 6 L520 100 L0 100 Z" fill="url(#chartFade)"/><path d="M0 89 L52 72 L105 79 L155 42 L205 58 L264 36 L309 51 L359 21 L423 32 L468 14 L520 6" stroke="#65e5df" strokeWidth="2.5" fill="none" vectorEffect="non-scaling-stroke"/><g stroke="#ffffff" opacity=".09">{[20,45,70,95].map(y=><line key={y} x1="0" x2="520" y1={y} y2={y}/>)}</g></svg>
  </div>
  if (type === 'career') return <div className="viz-panel career"><div className="viz-head"><span className="dots"><i/><i/><i/></span><span>vj.carreiras / análise de perfil</span></div><div className="career-grid"><div className="score-ring"><b>86<span>%</span></b><small>ADERÊNCIA</small></div><div className="career-lines"><div><span>TypeScript</span><em style={{width:'94%'}}/></div><div><span>React</span><em style={{width:'82%'}}/></div><div><span>SQL</span><em style={{width:'67%'}}/></div></div></div><div className="viz-footer">↗ Mapa de evolução profissional</div></div>
  if (type === 'rpg') return <div className="viz-panel rpg"><div className="viz-head"><span className="dots"><i/><i/><i/></span><span>dagger.nexus / live campaign</span></div><div className="rpg-glyph">✦<span>✧</span></div><div className="rpg-badges"><span>GM / PLAYER</span><span>REAL-TIME</span><span>INVENTORY</span></div></div>
  if (type === 'sports') return <div className="viz-panel sports"><div className="viz-head"><span className="dots"><i/><i/><i/></span><span>pro / live match center</span></div><div className="scoreboard"><div>PRO<span>HOME</span></div><b>03<span>:</span>02</b><div>AWAY<span>TEAM</span></div></div><div className="court"><div className="court-mid"/><i/><b/></div></div>
  return <div className="viz-panel cars"><div className="viz-head"><span className="dots"><i/><i/><i/></span><span>vj.3d / model discovery</span></div><div className="search-ui">⌕ <span>Buscar modelos automotivos...</span><b>32 SOURCES</b></div><div className="car-model"><svg viewBox="0 0 380 140" fill="none" aria-hidden="true"><path d="M43 96h-13q-13 0-11-13l8-16 54-11 39-30h133l45 30 42 10 18 13v18h-23" stroke="currentColor" strokeWidth="3"/><path d="M94 97h191M110 58l25-25h110l37 25Z" stroke="currentColor" strokeWidth="2"/><circle cx="80" cy="97" r="23" stroke="currentColor" strokeWidth="5"/><circle cx="315" cy="97" r="23" stroke="currentColor" strokeWidth="5"/><path d="M194 33v25M24 77h42M346 78h13" stroke="currentColor" strokeWidth="2"/></svg></div></div>
}

function ProjectCard({ project, index, onSelect }: { project: Project; index: number; onSelect: (project: Project) => void }) {
  return <article className={'project-card ' + (project.featured ? 'featured' : '')} style={{animationDelay: `${index*75}ms`}}>
    <div className="card-header"><span className="mono">/{project.number} &nbsp; {project.eyebrow}</span><span className="card-corner">↗</span></div>
    <div className="project-visual"><ProjectVisual type={project.visual}/></div>
    <div className="card-body"><div className="card-title-row"><h3>{project.title}</h3><button type="button" className="round-icon" onClick={() => onSelect(project)} aria-label={`Ver detalhes de ${project.title}`}><ArrowUpRight size={20}/></button></div>
      <p>{project.description}</p><div className="tech-tags">{project.stack.slice(0, 4).map(tech=><span key={tech}>{tech}</span>)}</div>
      <div className="project-bottom"><span className="project-highlight"><Sparkles size={13}/>{project.highlight}</span><button type="button" onClick={()=>onSelect(project)}>Explorar projeto <ArrowRight size={15}/></button></div>
    </div>
  </article>
}

function CommandPalette({ close, goto, showResume, copyEmail, setRecruiter }: { close: ()=>void; goto: (id:string)=>void; showResume: ()=>void; copyEmail:()=>void; setRecruiter:()=>void }) {
  const [query, setQuery] = useState('')
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => { input.current?.focus() }, [])
  const commands = [
    ...sections.map(s=>({ label: `Ir para ${s.name}`, action: ()=>goto(s.id), description:`Seção ${s.code}` })),
    {label:'Baixar currículo',action:showResume,description:'Currículo PDF'},
    {label:'Copiar e-mail',action:copyEmail,description:'Contato'},
    {label:'Alternar modo recrutador',action:setRecruiter,description:'Aparência'},
  ].filter(c=>c.label.toLowerCase().includes(query.toLowerCase()))
  return <div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget) close()}} role="presentation">
    <div className="command-dialog" role="dialog" aria-modal="true" aria-label="Paleta de comandos">
      <div className="command-input"><Search size={20}/><input ref={input} value={query} onChange={e=>setQuery(e.target.value)} placeholder="O que você quer encontrar?" aria-label="Buscar comando"/><kbd>ESC</kbd></div>
      <div className="command-list">{commands.length? commands.map(c=><button key={c.label} onClick={()=>{c.action();close()}}><Command size={16}/><span>{c.label}</span><small>{c.description}</small><ArrowUpRight size={15}/></button>):<p>Nenhum comando encontrado.</p>}</div>
      <div className="command-hint">ATALHOS DO SISTEMA <span>CTRL / ⌘ + K</span></div>
    </div>
  </div>
}

function ProjectDialog({ project, close }: { project: Project; close:()=>void }) {
  return <div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget) close()}} role="presentation"><div className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-modal-title"><button className="modal-close" aria-label="Fechar detalhes" onClick={close}><X size={21}/></button><span className="overline">PROJECT FILE // {project.number}</span><h2 id="project-modal-title">{project.title}<span>.</span></h2><div className="modal-visual"><ProjectVisual type={project.visual}/></div><p>{project.detail}</p><div className="tech-tags big">{project.stack.map(t=><span key={t}>{t}</span>)}</div><div className="dialog-foot">{project.repo?<a target="_blank" rel="noopener noreferrer" href={project.repo} className="button primary"><Github size={17}/> Ver código no GitHub <ArrowUpRight size={17}/></a>:<span className="repo-private">Projeto com repositório privado</span>}<button className="button secondary" onClick={close}>Voltar aos projetos</button></div></div></div>
}

export default function App() {
  const [recruiter, setRecruiter] = useState(() => read('vg-recruiter', '0') === '1')
  const [palette, setPalette] = useState(() => read('vg-palette', 'cyan'))
  const [commandsOpen, setCommandsOpen] = useState(false)
  const [selected, setSelected] = useState<Project | null>(null)
  const [filter, setFilter] = useState<Category>('Todos')
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('inicio')
  const [scrolled, setScrolled] = useState(0)
  const [toast, setToast] = useState('')
  const accent = accents.find(x=>x.value===palette)?.hex ?? '#65e5df'

  useEffect(() => {
    document.documentElement.classList.toggle('recruiter', recruiter)
    document.documentElement.dataset.palette = palette
    try { localStorage.setItem('vg-recruiter', recruiter?'1':'0'); localStorage.setItem('vg-palette', palette) } catch { /* disabled storage */ }
  }, [recruiter, palette])

  useEffect(() => {
    const onScroll = () => setScrolled(Math.min(100, 100 * window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)))
    const observer = new IntersectionObserver(entries=>{
      const hit = entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0]
      if(hit) setActive(hit.target.id)
    }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 })
    sections.forEach(s=>{const el=document.getElementById(s.id);if(el) observer.observe(el)})
    addEventListener('scroll',onScroll,{passive:true});onScroll()
    return ()=>{observer.disconnect(); removeEventListener('scroll',onScroll)}
  }, [])

  const goto = useCallback((id: string)=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenuOpen(false)}, [])
  const showResume = useCallback(()=>{const a=document.createElement('a');a.href=profile.resume;a.download='Curriculo-Victor-Guilherme.pdf';document.body.appendChild(a);a.click();a.remove()},[])
  const copyEmail = useCallback(()=>{navigator.clipboard?.writeText(profile.email).then(()=>setToast('E-mail copiado para a área de transferência')).catch(()=>setToast(profile.email)) ?? setToast(profile.email)},[])
  useEffect(() => {const key=(e:KeyboardEvent)=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setCommandsOpen(v=>!v)}if(e.key==='Escape'){setCommandsOpen(false);setSelected(null);setMenuOpen(false)}};addEventListener('keydown',key);return()=>removeEventListener('keydown',key)},[])
  useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),3000);return()=>clearTimeout(t)},[toast])
  useEffect(()=>{document.body.style.overflow=selected||commandsOpen?'hidden':'';return()=>{document.body.style.overflow=''}},[selected,commandsOpen])
  const filtered = projects.filter(p=>filter==='Todos'||p.category===filter)
  return <>
    <div className="scene-fallback" aria-hidden="true" />
    {!recruiter&&<Suspense fallback={null}><Universe accent={accent} disabled={recruiter}/></Suspense>}
    <div className="noise" aria-hidden="true"/>
    <div className="reading-progress" style={{width:`${scrolled}%`}} aria-hidden="true"/>
    <header className="header"><div className="header-inner"><Brand/><nav className={menuOpen?'nav-items open':'nav-items'} aria-label="Navegação principal">{sections.slice(1).map(s=><a href={'#'+s.id} key={s.id} onClick={()=>setMenuOpen(false)} className={active===s.id?'active':''}>{s.name}</a>)}</nav><div className="header-actions"><div className="palette-switch" role="group" aria-label="Escolha a cor de destaque">{accents.map(c=><button key={c.value} onClick={()=>setPalette(c.value)} aria-label={c.label} title={c.label} aria-pressed={palette===c.value} className={palette===c.value?'selected':''} style={{'--dot':c.hex} as React.CSSProperties} />)}</div><button className="header-tool command-trigger" onClick={()=>setCommandsOpen(true)} aria-label="Abrir comandos"><Command size={15}/><kbd>K</kbd></button><button className="recruiter-trigger" onClick={()=>setRecruiter(v=>!v)} title="Alternar modo de visualização">{recruiter?<MoonStar size={16}/>:<Sun size={16}/>}<span>{recruiter?'Modo imersivo':'Modo recrutador'}</span></button><button className="header-tool mobile-menu" onClick={()=>setMenuOpen(v=>!v)} aria-label="Abrir menu">{menuOpen?<X size={20}/>:<Menu size={20}/>}</button></div></div></header>

    {!recruiter&&<aside className="side-index" aria-label="Seção ativa">{sections.map(s=><button title={s.name} key={s.id} onClick={()=>goto(s.id)} aria-current={active===s.id?'location':undefined}><span className="side-line"/><span>{s.code}</span></button>)}</aside>}
    <main>
      <section id="inicio" className="hero section-shell"><div className="hero-content"><div className="eyebrow"><span className="pulse-dot"/> PORTFÓLIO / 2026 <span className="eyebrow-line"/> BELO HORIZONTE, BR</div><span className="hero-kicker">Olá, eu sou <strong>Victor Guilherme</strong><span className="cursor">_</span></span><h1>Construo soluções<br/>que unem <em>código,</em><br/><span>dados e impacto.</span></h1><p className="hero-description">Desenvolvimento full stack, automação e inteligência artificial para transformar problemas reais em produtos digitais e decisões melhores.</p><div className="hero-buttons"><a className="button primary" href="#projetos">Explorar projetos <ArrowUpRight size={19}/></a><button className="button secondary" onClick={showResume}><Download size={17}/> Baixar currículo</button></div><div className="hero-links"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub <ArrowUpRight size={14}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn <ArrowUpRight size={14}/></a><span><MapPin size={16}/> Belo Horizonte, MG</span></div></div>
        <div className="hero-feature" aria-label="Painel ilustrativo de tecnologias e métricas"><div className="feature-glow"/><div className="hero-orbit"><span className="orbit orbit-a"/><span className="orbit orbit-b"/><span className="orbit orbit-c"/><div className="orbit-center"><span>VG</span><small>BUILD / CREATE</small></div><div className="orbit-label orbit-top">FULL<span>STACK</span></div><div className="orbit-label orbit-right">AI<span>DATA</span></div><div className="orbit-label orbit-bottom">SYS<span>DESIGN</span></div></div><div className="terminal-panel"><div className="terminal-head"><span className="dots"><i/><i/><i/></span><span>victor@workspace:~</span><TerminalSquare size={13}/></div><div className="terminal-body"><span><b>$</b> whoami</span><p>Software · Dados · Automação</p><span><b>$</b> impact --projects</span><p><i>✓</i> Soluções reais, em produção</p><p><i>✓</i> Desenvolvimento end-to-end</p><span className="terminal-caret"><b>$</b> <em>▌</em></span></div></div><div className="floating-tag"><span>●</span> STATUS: BUILDING</div></div>
        <div className="scroll-hint"><span>SCROLL TO EXPLORE</span><ArrowDown size={16}/></div>
      </section>

      <div className="ticker" aria-label="Áreas de atuação"><div>FULL STACK DEVELOPMENT <span>✳</span> DATA & BUSINESS INTELLIGENCE <span>✳</span> ARTIFICIAL INTELLIGENCE <span>✳</span> AUTOMATION & SYSTEMS <span>✳</span> FULL STACK DEVELOPMENT <span>✳</span> DATA & BUSINESS INTELLIGENCE <span>✳</span></div></div>

      <section id="sobre" className="section-shell section-block"><div className="section-top"><span className="section-index">/ 01 &nbsp; O QUE EU FAÇO</span><span className="section-status">CAPABILITIES.LOG <span>● ACTIVE</span></span></div><div className="section-heading-row"><h2>Mais do que código.<br/><em>Soluções completas.</em></h2><p>Minha trajetória une visão de negócio e desenvolvimento de software. Entendo o processo, construo a solução e acompanho o resultado.</p></div><div className="skills-grid">{skills.map(s=><article className="skill-card" key={s.num}><div className="skill-top"><span>{s.num} / EXPERTISE</span><span className="skill-symbol">{s.symbol}</span></div><h3>{s.title}</h3><p>{s.subtitle}</p><div className="skill-tech">{s.items.map(item=><span key={item}>{item}</span>)}</div><ArrowDownRight className="skill-arrow" size={24}/></article>)}</div><div className="impact-strip"><div><b>R$ 440<span>mil</span></b><span>Receita associada ao chatbot, segundo currículo</span></div><div><b>24/7</b><span>Atendimento automatizado no projeto</span></div><div><b>05<span>+</span></b><span>Projetos e plataformas em destaque</span></div></div></section>

      <section id="projetos" className="section-shell section-block"><div className="section-top"><span className="section-index">/ 02 &nbsp; TRABALHOS SELECIONADOS</span><span className="section-status">PROJECT_INDEX.JSON <span>● LOADED</span></span></div><div className="section-heading-row"><h2>Ideias que viraram<br/><em>projetos reais.</em></h2><p>Da automação comercial às plataformas em tempo real. Alguns trabalhos têm repositórios privados; os links públicos estão identificados.</p></div><div className="filter-row" role="group" aria-label="Filtrar projetos"><div className="filters">{categories.map(c=><button key={c} onClick={()=>setFilter(c)} aria-pressed={filter===c} className={filter===c?'current':''}>{c} <span>{c==='Todos'?projects.length:projects.filter(p=>p.category===c).length}</span></button>)}</div><span className="results-count">EXIBINDO {String(filtered.length).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}</span></div><div className="projects-grid" key={filter}>{filtered.map((p,i)=><ProjectCard key={p.id} project={p} index={i} onSelect={setSelected}/>)}</div><a href={profile.github} className="all-projects" target="_blank" rel="noreferrer">Mais projetos no meu GitHub <ArrowUpRight size={18}/></a></section>

      <section id="experiencia" className="section-shell section-block"><div className="section-top"><span className="section-index">/ 03 &nbsp; MINHA TRAJETÓRIA</span><span className="section-status">CAREER_TIMELINE <span>● SYNCED</span></span></div><div className="section-heading-row"><h2>Experiência prática.<br/><em>Aprendizado constante.</em></h2><p>Tecnologia faz mais sentido quando resolve problemas do negócio. Essa conexão guia minha evolução profissional.</p></div><div className="journey-layout"><div className="journey-side"><div className="journey-square"><BriefcaseBusiness size={30}/><span>TRAJETÓRIA<br/>PROFISSIONAL</span><b>2023<br/>—<br/>2026</b></div><div className="journey-note"><span className="pulse-dot"/> Processos + tecnologia + visão de negócio</div></div><div className="timeline">{experience.map((ex,i)=><article className="timeline-item" key={ex.company}><div className="timeline-marker">{String(i+1).padStart(2,'0')}</div><div><span className="timeline-date">{ex.date}</span><h3>{ex.company}</h3><h4>{ex.position}</h4><p>{ex.text}</p><div className="tech-tags">{ex.tags.map(t=><span key={t}>{t}</span>)}</div></div></article>)}</div></div><div className="education-row"><div><span className="overline">FORMAÇÃO ACADÊMICA</span><h3>Engenharia de Software</h3><p>Graduação em andamento</p></div><div><span className="overline">FORMAÇÃO PROFISSIONAL</span><h3>SENAC Minas</h3><p>Qualificação em Serviços Administrativos · 2023 a 2024</p></div><div><span className="overline">IDIOMAS</span><h3>Português · Inglês</h3><p>Português nativo · Inglês avançado · Espanhol básico</p></div></div></section>

      <section id="contato" className="section-shell contact-section"><div className="contact-frame"><div className="section-top"><span className="section-index">/ 04 &nbsp; VAMOS CONVERSAR</span><span className="section-status">OPEN_CHANNEL <span>● READY</span></span></div><div className="contact-orbit" aria-hidden="true">✳</div><div className="contact-content"><span className="contact-kicker"><span className="pulse-dot"/> DISPONÍVEL PARA CONVERSAR SOBRE PROJETOS</span><h2>Tem uma ideia?<br/><em>Vamos construir.</em></h2><p>Gosto de desafios que conectam tecnologia, criatividade e resultados concretos. Uma boa conversa pode ser o primeiro passo.</p><div className="contact-buttons"><a className="button primary" href={'mailto:'+profile.email+'?subject=Contato%20pelo%20portf%C3%B3lio'}><Mail size={19}/> Enviar e-mail <ArrowUpRight size={18}/></a><a className="button secondary" target="_blank" rel="noreferrer" href={profile.whatsapp}><Send size={17}/> WhatsApp</a><button className="button secondary" onClick={copyEmail}><Copy size={17}/> Copiar e-mail</button></div><span className="contact-email">{profile.email}</span></div></div></section>
    </main>

    <footer className="footer section-shell"><Brand/><p>Feito com intenção, código e café.<br/>© {new Date().getFullYear()} Victor Guilherme.</p><div className="footer-links"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18}/></a><a href={'mailto:'+profile.email} aria-label="E-mail"><Mail size={18}/></a><button onClick={()=>scrollTo({top:0,behavior:'smooth'})}>Voltar ao topo <ArrowRight size={15} className="arrow-top"/></button></div></footer>
    <div className="mobile-bottom"><span>VG / 2026</span><button onClick={()=>setRecruiter(v=>!v)}>{recruiter?'MODO IMERSIVO':'MODO RECRUTADOR'} <Code2 size={15}/></button></div>
    {commandsOpen&&<CommandPalette close={()=>setCommandsOpen(false)} goto={goto} showResume={showResume} copyEmail={copyEmail} setRecruiter={()=>setRecruiter(v=>!v)}/>}
    {selected&&<ProjectDialog project={selected} close={()=>setSelected(null)}/>}
    {toast&&<div className="toast" role="status"><Check size={17}/>{toast}<button onClick={()=>setToast('')} aria-label="Fechar aviso"><X size={15}/></button></div>}
  </>
}