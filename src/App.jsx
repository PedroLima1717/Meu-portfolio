import React, { useState, useEffect, useRef, useCallback } from 'react';
import Particles from './Particles';
import SplitText from './SplitText';
import StarBorder from './StarBorder';
import './App.css';

// ─── SCROLL REVEAL HOOK ──────────────────────────────────────────────────────

function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px 0px -60px 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: "Portfolio Pessoal",
    tag: "React • Vite",
    desc: "Este portfólio que você está vendo agora! Construído com React, Vite e a biblioteca React Bits para o efeito de partículas. Design com modo Dev e modo Mecânico.",
    status: "ao vivo",
    color: "#a78bfa",
  },
  {
    id: 2,
    title: "Sistema de Gestão de Oficina",
    tag: "Node.js • PostgreSQL",
    desc: "Aplicação backend para gerenciar ordens de serviço, estoque de peças e agendamentos de clientes em uma oficina mecânica.",
    status: "em dev",
    color: "#cf2d28ff",
  },
  {
    id: 3,
    title: "Agenda de Tarefas",
    tag: "React • LocalStorage",
    desc: "App web de produtividade com categorias, prioridades e filtros. Interface limpa com modo claro/escuro e persistência local.",
    status: "concluído",
    color: "#f59e0b",
  },
  {
    id: 4,
    title: "API de Usuários",
    tag: "Node.js • Express • JWT",
    desc: "API REST com autenticação JWT, CRUD completo de usuários, validação de dados e documentação Swagger.",
    status: "concluído",
    color: "#60a5fa",
  },
];

const skills = [
  { name: "React JS", level: 70, cat: "dev" },
  { name: "Node.js", level: 60, cat: "dev" },
  { name: "PostgreSQL", level: 55, cat: "dev" },
  { name: "JavaScript", level: 72, cat: "dev" },
  { name: "HTML & CSS", level: 80, cat: "dev" },
  { name: "Git & GitHub", level: 65, cat: "dev" },
  { name: "Diagnóstico", level: 85, cat: "mec" },
  { name: "Motor / Suspensão", level: 80, cat: "mec" },
  { name: "Trabalho em Equipe", level: 90, cat: "mec" },
];

// ─── SVG ICONS ───────────────────────────────────────────────────────────────

const IconMail = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconGitHub = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const IconLinkedIn = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const IconWrench = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const IconCode = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Navbar({ isDevMode, setIsDevMode, active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['início', 'sobre', 'projetos', 'skills', 'contato'];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">
        <span className="logo-bracket">&lt;</span>
        <span className="logo-name">Pedro</span>
        <span className="logo-slash"> /</span>
        <span className="logo-bracket">&gt;</span>
      </div>

      <ul className="nav-links">
        {links.map(link => (
          <li key={link}>
            <a
              href={`#${link}`}
              className={active === link ? 'active' : ''}
              onClick={() => setActive(link)}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      <button
        className={`mode-toggle ${isDevMode ? 'dev' : 'mec'}`}
        onClick={() => setIsDevMode(!isDevMode)}
        title={isDevMode ? 'Ativar Modo Mecânico' : 'Ativar Modo Dev'}
      >
        <span className="toggle-icon">{isDevMode ? <IconWrench /> : <IconCode />}</span>
        <span className="toggle-label">{isDevMode ? 'Modo Mec' : 'Modo Dev'}</span>
      </button>
    </nav>
  );
}

function Hero({ isDevMode }) {
  const [heroRef, heroVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="início" className="hero-section">
      <div className="particles-wrap">
        <Particles
          particleColors={isDevMode ? ["#a78bfa", "#c4b5fd", "#ffffff"] : ["#f59e0b", "#fcd34d", "#ffffff"]}
          particleCount={400}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      <div ref={heroRef} className={`hero-content ${heroVisible ? 'reveal' : ''}`}>
        <div className="hero-badge">
          <span className="badge-dot" />
          <SplitText
            text={isDevMode ? 'Desenvolvedor em formação' : 'Mecânico Profissional'}
            tag="span"
            splitType="chars"
            delay={30}
            duration={0.5}
            ease="power2.out"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="left"
          />
        </div>

        <h1 className="hero-title">
          <SplitText
            text="Olá, sou o"
            tag="span"
            splitType="words"
            delay={80}
            duration={0.8}
            ease="power3.out"
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="center"
          />
          {' '}
          <SplitText
            text="Pedro"
            tag="span"
            className={isDevMode ? 'gradient-text-inline' : 'gradient-text-mec-inline'}
            splitType="words"
            delay={80}
            duration={0.8}
            ease="power3.out"
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="center"
          />
          <br />
          <SplitText
            text={isDevMode ? '< Dev />' : 'Mecânico'}
            tag="span"
            className="hero-sub"
            splitType="chars"
            delay={50}
            duration={0.6}
            ease="back.out(1.7)"
            from={{ opacity: 0, y: 30, scale: 0.5 }}
            to={{ opacity: 1, y: 0, scale: 1 }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="center"
          />
        </h1>

        <SplitText
          text={isDevMode
            ? '17 anos. Fã do Corinthians, apaixonado por futebol e pela minha namorada. Construindo o futuro através de linhas de código — cursando DS enquanto trabalho.'
            : '17 anos. Fã do Corinthians, apaixonado por futebol e pela minha namorada. Sujo as mãos de graxa hoje para garantir qualidade financeira amanhã.'}
          tag="p"
          className="hero-desc"
          splitType="words"
          delay={25}
          duration={0.6}
          ease="power2.out"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-50px"
          textAlign="center"
        />

        <div className="hero-cta">
          <a href="#projetos" className="btn-primary">Ver Projetos</a>
          <a href="#contato" className="btn-ghost">Entrar em contato</a>
        </div>

        <div className="hero-scroll">
          <span>scroll</span>
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  );
}

function About({ isDevMode }) {
  const [textRef, textVisible] = useScrollReveal();
  const [cardRef, cardVisible] = useScrollReveal({ rootMargin: '0px 0px -40px 0px' });

  return (
    <section id="sobre" className="about-section">
      <div className="section-label">
        <SplitText
          text="// sobre mim"
          tag="span"
          splitType="chars"
          delay={40}
          duration={0.4}
          ease="power2.out"
          from={{ opacity: 0, y: 15 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-50px"
          textAlign="left"
        />
      </div>
      <div className="about-grid">
        <div ref={textRef} className={`about-text ${textVisible ? 'reveal' : ''}`}>
          <SplitText
            text="Dois mundos, uma pessoa."
            tag="h2"
            className="section-title"
            splitType="words"
            delay={80}
            duration={0.7}
            ease="power3.out"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-80px"
            textAlign="left"
          />
          <SplitText
            text="Tenho 17 anos e vivo entre dois universos que, à primeira vista, parecem opostos: a oficina mecânica e o mundo do desenvolvimento de software."
            tag="p"
            splitType="words"
            delay={20}
            duration={0.5}
            ease="power2.out"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-60px"
            textAlign="left"
          />
          <SplitText
            text="Durante o dia, trabalho como mecânico — aprendo a diagnosticar problemas, trabalhar em equipe e manter o foco sob pressão. À noite, curso Desenvolvimento de Sistemas e construo projetos com React, Node.js e PostgreSQL."
            tag="p"
            splitType="words"
            delay={20}
            duration={0.5}
            ease="power2.out"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-60px"
            textAlign="left"
          />
          <SplitText
            text="Acredito que a disciplina da mecânica me torna um dev melhor: ambas as áreas exigem diagnóstico preciso, paciência e método."
            tag="p"
            splitType="words"
            delay={20}
            duration={0.5}
            ease="power2.out"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-60px"
            textAlign="left"
          />

          <div className="about-tags">
            <span>Fiel do Corinthians</span>
            <span>Futebol</span>
            <span>Namorada</span>
            <span>Dev em formação</span>
            <span>Mecânico</span>
          </div>
        </div>

        <div ref={cardRef} className={`about-card ${cardVisible ? 'reveal' : ''}`}>
          <StarBorder
            as="div"
            className="card-inner"
            innerClassName="card-inner-content"
            color={isDevMode ? '#a78bfa' : '#f59e0b'}
            speed="30s"
            thickness={2}
          >
            <div className="card-mode-label">{isDevMode ? 'dev' : 'mec'}</div>
            <div className="card-avatar">PH</div>
            <div className="card-name">Pedro Henrique</div>
            <div className="card-role">
              {isDevMode ? 'Full Stack em formação' : 'Mecânico Profissional'}
            </div>
            <div className="card-stats">
              <div className="stat">
                <span className="stat-num">4+</span>
                <span className="stat-label">projetos</span>
              </div>
              <div className="stat">
                <span className="stat-num">1+</span>
                <span className="stat-label">ano na área</span>
              </div>
              <div className="stat">
                <span className="stat-num">∞</span>
                <span className="stat-label">curiosidade</span>
              </div>
            </div>
          </StarBorder>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [hovered, setHovered] = useState(null);
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section id="projetos" className="projects-section">
      <div ref={headerRef} className={`${headerVisible ? 'reveal' : ''}`}>
        <div className="section-label">
          <SplitText
            text="// projetos"
            tag="span"
            splitType="chars"
            delay={40}
            duration={0.4}
            ease="power2.out"
            from={{ opacity: 0, y: 15 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="left"
          />
        </div>
        <SplitText
          text="O que eu construo"
          tag="h2"
          className="section-title"
          splitType="words"
          delay={80}
          duration={0.7}
          ease="power3.out"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-80px"
          textAlign="center"
        />
        <SplitText
          text="Projetos reais que estou desenvolvendo durante o curso de DS"
          tag="p"
          className="section-sub"
          splitType="words"
          delay={30}
          duration={0.5}
          ease="power2.out"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-60px"
          textAlign="center"
        />
      </div>

      <div className="projects-grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} hovered={hovered} setHovered={setHovered} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index, hovered, setHovered }) {
  const [cardRef, cardVisible] = useScrollReveal({ rootMargin: '0px 0px -30px 0px' });

  return (
    <div
      ref={cardRef}
      className={`project-wrapper ${cardVisible ? 'reveal' : ''}`}
      style={{ '--reveal-delay': `${index * 0.12}s`, display: 'flex', flexDirection: 'column', height: '100%' }}
      onMouseEnter={() => setHovered(p.id)}
      onMouseLeave={() => setHovered(null)}
    >
      <StarBorder
        as="div"
        color={p.color}
        speed="12s"
        thickness={2}
        className={`project-card ${hovered === p.id ? 'hovered' : ''}`}
        innerClassName="project-card-inner"
        style={{ '--card-color': p.color }}
      >
        <div className="proj-number">{String(p.id).padStart(2, '0')}</div>
        <div className="proj-header">
          <span className="proj-tag">{p.tag}</span>
          <span className={`proj-status status-${p.status.replace(' ', '-')}`}>{p.status}</span>
        </div>
        <h3 className="proj-title">{p.title}</h3>
        <p className="proj-desc">{p.desc}</p>
        <div className="proj-footer">
          <span className="proj-arrow">→</span>
        </div>
      </StarBorder>
    </div>
  );
}

function Skills({ isDevMode }) {
  const filtered = skills.filter(s => isDevMode ? s.cat === 'dev' : s.cat === 'mec');
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section id="skills" className="skills-section">
      <div ref={headerRef} className={`${headerVisible ? 'reveal' : ''}`}>
        <div className="section-label">
          <SplitText
            text="// habilidades"
            tag="span"
            splitType="chars"
            delay={40}
            duration={0.4}
            ease="power2.out"
            from={{ opacity: 0, y: 15 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="left"
          />
        </div>
        <SplitText
          text={isDevMode ? 'Minha stack técnica' : 'Minhas ferramentas'}
          tag="h2"
          className="section-title"
          splitType="words"
          delay={80}
          duration={0.7}
          ease="power3.out"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-80px"
          textAlign="center"
        />
      </div>

      <div className="skills-list">
        {filtered.map((skill, i) => (
          <SkillItem key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </section>
  );
}

function SkillItem({ skill, index }) {
  const [ref, isVisible] = useScrollReveal({ rootMargin: '0px 0px -20px 0px' });

  return (
    <div
      ref={ref}
      className={`skill-item ${isVisible ? 'reveal' : ''}`}
      style={{ '--reveal-delay': `${index * 0.08}s` }}
    >
      <div className="skill-top">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-pct">{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-fill"
          style={{ width: isVisible ? `${skill.level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

function Contact() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [cardsRef, cardsVisible] = useScrollReveal({ rootMargin: '0px 0px -40px 0px' });

  return (
    <section id="contato" className="contact-section">
      <div ref={headerRef} className={`${headerVisible ? 'reveal' : ''}`}>
        <div className="section-label">
          <SplitText
            text="// contato"
            tag="span"
            splitType="chars"
            delay={40}
            duration={0.4}
            ease="power2.out"
            from={{ opacity: 0, y: 15 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="left"
          />
        </div>
        <SplitText
          text="Vamos conversar?"
          tag="h2"
          className="section-title"
          splitType="words"
          delay={80}
          duration={0.7}
          ease="power3.out"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-80px"
          textAlign="center"
        />
        <SplitText
          text="Estou aberto a oportunidades, parcerias e trocas de conhecimento."
          tag="p"
          className="section-sub"
          splitType="words"
          delay={30}
          duration={0.5}
          ease="power2.out"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-60px"
          textAlign="center"
        />
      </div>

      <div ref={cardsRef} className={`contact-links ${cardsVisible ? 'reveal' : ''}`}>
        <StarBorder
          as="a"
          href="mailto:pedro.lima2998@gmail.com"
          color="#60a5fa"
          speed="12s"
          thickness={2}
          className="contact-card"
          innerClassName="contact-card-inner"
          style={{ '--reveal-delay': '0s' }}
        >
          <span className="contact-icon"><IconMail /></span>
          <span className="contact-label">Email</span>
          <span className="contact-value">pedro.lima2998@gmail.com</span>
        </StarBorder>
        <StarBorder
          as="a"
          href="https://github.com/PedroLima1717"
          target="_blank"
          rel="noreferrer"
          color="#a78bfa"
          speed="12s"
          thickness={2}
          className="contact-card"
          innerClassName="contact-card-inner"
          style={{ '--reveal-delay': '0.1s' }}
        >
          <span className="contact-icon"><IconGitHub /></span>
          <span className="contact-label">GitHub</span>
          <span className="contact-value">github.com/PedroLima1717</span>
        </StarBorder>
        <StarBorder
          as="a"
          href="https://www.linkedin.com/in/pedro-lima-3629b734b/"
          target="_blank"
          rel="noreferrer"
          color="#34d399"
          speed="12s"
          thickness={2}
          className="contact-card"
          innerClassName="contact-card-inner"
          style={{ '--reveal-delay': '0.2s' }}
        >
          <span className="contact-icon"><IconLinkedIn /></span>
          <span className="contact-label">LinkedIn</span>
          <span className="contact-value">linkedin.com/in/pedro-lima-3629b734b</span>
        </StarBorder>
      </div>
    </section>
  );
}

function Footer({ isDevMode }) {
  return (
    <footer className="footer">
      <span>Feito por Pedro Henrique</span>
      <span className="footer-mode">{isDevMode ? '< dev />' : 'mec'}</span>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

function App() {
  const [isDevMode, setIsDevMode] = useState(true);
  const [active, setActive] = useState('início');

  useEffect(() => {
    document.body.className = isDevMode ? 'mode-dev' : 'mode-mec';
  }, [isDevMode]);

  return (
    <div className="app">
      <Navbar isDevMode={isDevMode} setIsDevMode={setIsDevMode} active={active} setActive={setActive} />
      <Hero isDevMode={isDevMode} />
      <About isDevMode={isDevMode} />
      <Projects />
      <Skills isDevMode={isDevMode} />
      <Contact />
      <Footer isDevMode={isDevMode} />
    </div>
  );
}

export default App;
