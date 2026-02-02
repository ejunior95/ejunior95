import { 
  SiJavascript,
  SiTypescript,
  SiReact,
  SiAngular,
  SiDocker,
  SiKubernetes,
  SiMongodb,
  SiOracle
} from 'react-icons/si'
import './Hero.css'

function Hero() {
  return (
    <section id="about" className="hero">
      <div className="hero-content">
        <p className="hero-subtitle">// Hello, welcome!</p>
        <h1 className="hero-title">Edvaldo Ramos <span className="highlight">Junior</span></h1>
        <p className="hero-role">SENIOR FULLSTACK DEVELOPER</p>
        <p className="hero-description">
          With a career dedicated to developing technological solutions, 
          I am part of the CAST team as a Senior Fullstack Developer, 
          specializing in all typescript frameworks. My role is vital in the Technical Debt and at a project known as QTeste 
          of client company, where we improve test management, 
          significantly contributing to the institution's operational efficiency.
        </p>
        
        <div className="tech-stack">
          <p className="tech-stack-title">## Main Technologies</p>
          <div className="tech-icons">
            <div className="tech-icon" title="JavaScript">
              <SiJavascript />
            </div>
            <div className="tech-icon" title="TypeScript">
              <SiTypescript />
            </div>
            <div className="tech-icon" title="React">
              <SiReact />
            </div>
            <div className="tech-icon" title="Angular">
              <SiAngular />
            </div>
            <div className="tech-icon" title="Docker">
              <SiDocker />
            </div>
            <div className="tech-icon" title="Kubernetes">
              <SiKubernetes />
            </div>
            <div className="tech-icon" title="MongoDB">
              <SiMongodb />
            </div>
            <div className="tech-icon" title="Oracle DB">
              <SiOracle />
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-visual">
        <div className="code-block">
          <span className="code-comment">{"// developer.config.ts"}</span>
          <br />
          <span className="code-keyword">const</span> <span className="code-var">greatDeveloper</span> = {"{"}
          <br />
          <span className="code-prop">  name:</span> <span className="code-string">"Edvaldo Junior"</span>,
          <br />
          <span className="code-prop">  location:</span> <span className="code-string">"Sorocaba, SP - Brazil"</span>,
          <br />
          <span className="code-prop">  experience:</span><span className="code-number">+10 years,</span>
          <br />
          <span className="code-prop">  status:</span> <span className="code-string">"working"</span>
          <br />
          {"}"};
        </div>
      </div>
    </section>
  )
}

export default Hero
