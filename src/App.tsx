import './App.css'

function App() {
  const experiences = [
    {
      company: "CAST",
      role: "Desenvolvedor Fullstack Sênior (Angular e NodeJS)",
      period: "maio de 2022 - Presente",
      duration: "3 anos 9 meses",
      location: "Home office",
      description: "Atuei em duas frentes estratégicas de engenharia de software. Como desenvolvedor no projeto QTeste, trabalhei em uma plataforma interna para automação de testes e geração de evidências. Simultaneamente, no time de Dívida Técnica, atuei no mapeamento e análise de débitos técnicos em múltiplos projetos, ajudando a direcionar melhorias de qualidade e sustentabilidade de código para otimizar os sistemas do Banco do Brasil."
    },
    {
      company: "Revelo",
      role: "AI Trainer",
      period: "maio de 2025 - junho de 2025",
      duration: "2 meses",
      location: "Home office",
      description: "Suporte a um dos projetos de dados gerados por humanos. Nessa função, ajudo a melhorar o desempenho de um modelo de linguagem de grande porte, resolvendo desafios de programação e avaliando soluções e prompts gerados por inteligência artificial."
    },
    {
      company: "Infosys",
      role: "Desenvolvedor Backend Pleno (NodeJS)",
      period: "maio de 2021 - maio de 2022",
      duration: "1 ano 1 mês",
      location: "Home office",
      description: "Atuava no time de backend em uma Venture do cliente Braskem, chamada Loadshark. Uma plataforma de gestão de cargas e fretes."
    },
    {
      company: "Farma Ponte",
      role: "Desenvolvedor Fullstack Pleno (ReactJS)",
      period: "novembro de 2020 - maio de 2021",
      duration: "7 meses",
      location: "Sorocaba, SP",
      description: "Atuava nos sistemas legados da companhia e também nas rotinas de consulta e atualização do banco de dados SQL Server."
    },
    {
      company: "Grupo Soluções",
      role: "Desenvolvedor Frontend Junior",
      period: "maio de 2020 - novembro de 2020",
      duration: "7 meses",
      location: "Sorocaba, SP",
      description: "Trabalhava na criação de material de divulgação para as redes sociais da empresa e também criava landing pages para promoções especiais específicas."
    },
    {
      company: "Greenone Proximity Technology",
      role: "Desenvolvedor Frontend Junior",
      period: "janeiro de 2019 - abril de 2020",
      duration: "1 ano 4 meses",
      location: "Votorantim, SP",
      description: "Atuava na manutenção e gerenciamento de algumas páginas e sistemas de clientes."
    },
    {
      company: "Capgemini",
      role: "Técnico de Infraestrutura Junior",
      period: "abril de 2013 - janeiro de 2015",
      duration: "1 ano 10 meses",
      location: "Votorantim, SP",
      description: "Era responsável pela área de TI. Auxiliar na utilização, manutenção, configuração e reparação de todo o parque de informática, tais como thin clients, desktops e notebooks."
    }
  ];

  const skills = [
    { category: "Frontend", items: ["React", "Angular", "Next.js", "TypeScript"] },
    { category: "Backend", items: ["Node.js", "Nest.js", "Express.js", "REST APIs"] },
    { category: "Database", items: ["PostgreSQL", "MongoDB", "MySQL", "OracleDB", "SQL Server"] },
    { category: "DevOps", items: ["Docker", "Kubernetes", "AWS", "OpenShift", "Linux"] },
    { category: "AI/ML", items: ["LLM", "MCP", "Prompt Engineering"] },
    { category: "Microservices", items: ["Microserviços", "API Gateway", "Message Queue"] }
  ];

  const education = [
    {
      institution: "Universidade Paulista",
      degree: "Bacharelado, Análise de Sistemas de Computação",
      period: "janeiro de 2026 - janeiro de 2028"
    },
    {
      institution: "ETEC - Escola Técnica Estadual de São Paulo",
      degree: "Ensino Técnico, Tecnologia em Informática/Software",
      period: "2010 - 2011"
    }
  ];

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">&lt;e<span className="highlight">95</span>/&gt;</div>
        <nav className="nav">
          <a href="#about">SOBRE</a>
          <a href="#skills">SKILLS</a>
          <a href="#experience">EXPERIÊNCIA</a>
          <a href="#education">FORMAÇÃO</a>
          <a href="#contact">CONTATO</a>
        </nav>
        <div className="header-actions">
          <a href="https://www.linkedin.com/in/deved-jr100" target="_blank" rel="noopener noreferrer" className="enroll-btn">
            ( ) =&gt; LINKEDIN
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="main">
        <section id="about" className="hero">
          <div className="hero-content">
            <p className="hero-subtitle">// Olá, seja bem-vindo!</p>
            <h1 className="hero-title">Edvaldo de Ramos <span className="highlight">Junior</span></h1>
            <p className="hero-role">DESENVOLVEDOR FULLSTACK SR</p>
            <p className="hero-description">
              Com uma carreira dedicada ao desenvolvimento de soluções tecnológicas, 
              integro o time da Cast group como Desenvolvedor Fullstack Sênior, 
              especializado em Angular e NodeJS. Minha atuação é vital no projeto 
              QTeste do Banco do Brasil, onde aprimoramos a gestão de testes, 
              contribuindo significativamente para a eficiência operacional da instituição.
            </p>
          </div>
          
          <div className="hero-visual">
            <div className="code-block">
              <span className="code-comment">{"// developer.config.ts"}</span>
              <br />
              <span className="code-keyword">const</span> <span className="code-var">developer</span> = {"{"}
              <br />
              <span className="code-prop">  name:</span> <span className="code-string">"Edvaldo Junior"</span>,
              <br />
              <span className="code-prop">  location:</span> <span className="code-string">"Sorocaba, SP"</span>,
              <br />
              <span className="code-prop">  experience:</span> <span className="code-number">6</span>+ years,
              <br />
              <span className="code-prop">  status:</span> <span className="code-string">"available"</span>
              <br />
              {"}"};
            </div>
          </div>
        </section>

        {/* Stats Info */}
        <section className="course-info">
          <div className="info-stats">
            <div className="stat">
              <span className="stat-label">EXPERIÊNCIA &gt;</span>
              <span className="stat-value">"6+ ANOS"</span>
            </div>
            <div className="stat">
              <span className="stat-label">PROJETOS:</span>
              <span className="stat-value highlight">10+</span>
            </div>
            <div className="stat">
              <span className="stat-label">NÍVEL:</span>
              <span className="stat-value">"SÊNIOR"</span>
            </div>
            <div className="stat">
              <span className="stat-label">LOCALIZAÇÃO:</span>
              <span className="stat-value">"SOROCABA, SP"</span>
            </div>
          </div>
          <a href="mailto:e.junior95@gmail.com" className="cta-btn">ASYNC () =&gt; CONTACT() →</a>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section">
          <h2 className="section-title">
            <span className="code-bracket">{"{"}</span> skills <span className="code-bracket">{"}"}</span>
          </h2>
          <div className="skills-grid">
            {skills.map((skillGroup, index) => (
              <div key={index} className="skill-card">
                <span className="skill-category">// {skillGroup.category}</span>
                <div className="skill-items">
                  {skillGroup.items.map((item, i) => (
                    <span key={i} className="skill-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section">
          <h2 className="section-title">
            <span className="code-bracket">{"["}</span> experiência <span className="code-bracket">{"]"}</span>
          </h2>
          <div className="timeline">
            {experiences.map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <span className="timeline-index">{String(index).padStart(2, '0')}</span>
                </div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3 className="company-name">{exp.company}</h3>
                    <span className="timeline-period">{exp.period}</span>
                  </div>
                  <p className="role-title">{exp.role}</p>
                  <div className="timeline-meta">
                    <span className="meta-item">⏱ {exp.duration}</span>
                    <span className="meta-item">📍 {exp.location}</span>
                  </div>
                  <p className="timeline-description">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="section">
          <h2 className="section-title">
            <span className="code-bracket">{"<"}</span> formação <span className="code-bracket">{"/>"}</span>
          </h2>
          <div className="education-grid">
            {education.map((edu, index) => (
              <div key={index} className="education-card">
                <span className="edu-index">0{index + 1}</span>
                <h3 className="edu-institution">{edu.institution}</h3>
                <p className="edu-degree">{edu.degree}</p>
                <span className="edu-period">{edu.period}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="section">
          <h2 className="section-title">
            <span className="code-bracket">{"/*"}</span> certificações <span className="code-bracket">{"*/"}</span>
          </h2>
          <div className="certifications-grid">
            <div className="cert-card">
              <span className="cert-icon">📜</span>
              <h4 className="cert-name">Coding Fundamentals</h4>
            </div>
            <div className="cert-card">
              <span className="cert-icon">🌐</span>
              <h4 className="cert-name">EF SET Inglês</h4>
              <p className="cert-score">65/100 - C1 Proficiência Eficaz</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <h2 className="section-title">
            <span className="code-bracket">{"("}</span> contato <span className="code-bracket">{")"}</span>
          </h2>
          <div className="contact-grid">
            <a href="mailto:e.junior95@gmail.com" className="contact-card">
              <span className="contact-icon">📧</span>
              <span className="contact-label">EMAIL</span>
              <span className="contact-value">e.junior95@gmail.com</span>
            </a>
            <a href="tel:+5515988309658" className="contact-card">
              <span className="contact-icon">📱</span>
              <span className="contact-label">TELEFONE</span>
              <span className="contact-value">(15) 98830-9658</span>
            </a>
            <a href="https://www.linkedin.com/in/deved-jr100" target="_blank" rel="noopener noreferrer" className="contact-card">
              <span className="contact-icon">💼</span>
              <span className="contact-label">LINKEDIN</span>
              <span className="contact-value">linkedin.com/in/deved-jr100</span>
            </a>
            <div className="contact-card">
              <span className="contact-icon">📍</span>
              <span className="contact-label">LOCALIZAÇÃO</span>
              <span className="contact-value">Sorocaba, São Paulo, Brasil</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">
            <span className="code-comment">{"// "}</span>
            &lt;ejunior<span className="highlight">95</span> /&gt; © 2026
          </p>
        </footer>
      </main>
    </div>
  )
}

export default App
