import './App.css'

function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">&lt;e<span className="highlight">95</span>/&gt;</div>
        <nav className="nav">
          <a href="#syllabus">SYLLABUS</a>
          <a href="#modules">MODULES</a>
          <a href="#about">ABOUT</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="header-actions">
          <button className="enroll-btn">( ) =&gt; ENROLL</button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="main">
        <section className="hero">
          <div className="hero-content">
            <p className="hero-subtitle">// Olá, seja bem-vindo!</p>
            <h1 className="hero-title">&lt;ejunior<span className="highlight">95</span> /&gt;</h1>
            <p className="hero-description">
              DESENVOLVEDOR FULLSTACK SR <br />
              NODE, NEST, ANGULAR, REACT, NEXT
              DOCKER, KUBERNETES, AWS, OPENSHIFT
              AI LLM, MCP
            </p>
          </div>
          
          <div className="hero-visual">
            <div className="grid-pattern"></div>
          </div>
        </section>

        {/* Course Info */}
        <section className="course-info">
          <div className="info-stats">
            <div className="stat">
              <span className="stat-label">DURATION &gt;</span>
              <span className="stat-value">"8 WEEKS"</span>
            </div>
            <div className="stat">
              <span className="stat-label">ENROLLED:</span>
              <span className="stat-value highlight">2_047</span>
            </div>
            <div className="stat">
              <span className="stat-label">LEVEL:</span>
              <span className="stat-value">"INTERMEDIATE"</span>
            </div>
          </div>
          <button className="cta-btn">ASYNC () =&gt; ENROLL() →</button>
        </section>

        {/* Modules Grid */}
        <section className="modules-section">
          <div className="modules-grid">
            <div className="module-card">
              <span className="module-number">01 // SYLLABUS</span>
            </div>
            <div className="module-card">
              <span className="module-number">MODULES[0]</span>
            </div>
            <div className="module-card">
              <span className="module-number">MODULES[1]</span>
            </div>
            <div className="module-card">
              <span className="module-number">MODULES[2]</span>
            </div>
            <div className="module-card">
              <span className="module-number">MODULES[3]</span>
            </div>
            <div className="module-card description-card">
              <span className="module-label">/** DESCRIPTION */</span>
              <p className="module-description">
                Deep dive into tokenization algorithms, context window
                architecture, attention mechanisms, and production-grade
                prompt engineering.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
