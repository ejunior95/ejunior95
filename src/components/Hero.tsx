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
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../i18n/translations'
import './Hero.css'

function Hero() {
  const { language } = useLanguage()
  const t = translations[language].hero

  return (
    <section id="about" className="hero">
      <div className="hero-content">
        <p className="hero-subtitle">{t.subtitle}</p>
        <h1 className="hero-title">Edvaldo Ramos <span className="highlight">Junior</span></h1>
        <p className="hero-role">{t.role}</p>
        <p className="hero-description">
          {t.description}
        </p>
        
        <div className="tech-stack">
          <p className="tech-stack-title">{t.techStackTitle}</p>
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
          </div>
        </div>
      </div>
      
      <div className="hero-visual">
        <div className="code-block">
          <span className="code-comment">{t.codeComment}</span>
          <br />
          <span className="code-keyword">const</span> <span className="code-var">greatDeveloper</span> = {"{"}
          <br />
          <span className="code-prop">  name:</span> <span className="code-string">"{t.codeName}"</span>,
          <br />
          <span className="code-prop">  location:</span> <span className="code-string">"{t.codeLocation}"</span>,
          <br />
          <span className="code-prop">  experience:</span><span className="code-number">{t.codeExperience},</span>
          <br />
          <span className="code-prop">  status:</span> <span className="code-string">"{t.codeStatus}"</span>
          <br />
          {"}"};
        </div>
      </div>
    </section>
  )
}

export default Hero
