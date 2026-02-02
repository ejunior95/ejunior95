import { ExternalLink } from 'lucide-react'
import DiscordiaImg  from '../assets/discordia-preview.png'
import EasyChatImg from '../assets/easychat-preview.png'
import './Projects.css'

function Projects() {
  return (
    <section id="projects" className="section">
      <h2 className="section-title">
        <span className="code-bracket">{"@"}</span> projects
      </h2>
      <div className="projects-grid">

        {/* EasyChat Project */}
        <div className="project-card">
          <div className="project-content">
            <div className="project-header">
              <h3 className="project-title">EasyChat</h3>
              <div className="project-links">
                <a href="https://easychat.ia.br/" target="_blank" rel="noopener noreferrer" className="project-link">
                  <span>website</span>
                  <ExternalLink size={14} />
                </a>
                <a href="https://github.com/ejunior95/easychat-landing-page" target="_blank" rel="noopener noreferrer" className="project-link">
                  <span>github</span>
                  <ExternalLink size={14} />
                </a>
                <a href="https://www.npmjs.com/package/@ejunior95/easy-chat" target="_blank" rel="noopener noreferrer" className="project-link">
                  <span>npm</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
            <p className="project-description">
              The secure, plug-and-play AI Chat Widget for React. Add a ChatGPT-powered assistant to your 
              application in seconds, without exposing your API Keys.
            </p>
            <div className="project-tech">
              <span className="tech-tag">React</span>
              <span className="tech-tag">TypeScript</span>
              <span className="tech-tag">OpenAI</span>
              <span className="tech-tag">Security</span>
            </div>
          </div>
          <div className="project-preview">
            <div className="crt-monitor">
              <div className="crt-screen">
                <div className="crt-content">
                  <img className="project-screenshot" src={EasyChatImg} alt="EasyChat Screenshot" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DiscordIA Project */}
        <div className="project-card">
          <div className="project-content">
            <div className="project-header">
              <h3 className="project-title">DiscordIA</h3>
              <div className="project-links">
                <a href="https://discordia.app.br/" target="_blank" rel="noopener noreferrer" className="project-link">
                  <span>website</span>
                  <ExternalLink size={14} />
                </a>
                <a href="https://github.com/ejunior95/discordia" target="_blank" rel="noopener noreferrer" className="project-link">
                  <span>github</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
            <p className="project-description">
              A contentious chat between the leading AIs on the market, competing for the best answer to your questions! 
              A digital arena where multiple AIs compete in real time.
            </p>
            <div className="project-tech">
              <span className="tech-tag">NestJS</span>
              <span className="tech-tag">OpenAI</span>
              <span className="tech-tag">Gemini</span>
              <span className="tech-tag">DeepSeek</span>
              <span className="tech-tag">Grok</span>
              <span className="tech-tag">AI</span>
            </div>
          </div>
          <div className="project-preview">
            <div className="crt-monitor">
              <div className="crt-screen">
                <div className="crt-content">
                  <img className="project-screenshot" src={DiscordiaImg} alt="DiscordIA Screenshot" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FormAI Project */}
        <div className="project-card">
          <div className="project-content">
            <div className="project-header">
              <h3 className="project-title">FormAI</h3>
              <div className="project-links">
                <a href="https://github.com/ejunior95/formai" target="_blank" rel="noopener noreferrer" className="project-link">
                  <span>github</span>
                  <ExternalLink size={14} />
                </a>
                <a href="https://www.npmjs.com/package/@ejunior95/formai-core" target="_blank" rel="noopener noreferrer" className="project-link">
                  <span>npm</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
            <p className="project-description">
              Generate form fields and validations (React, Vue, Angular) from natural language prompts. 
              Stop wasting time hunting for validation regex or manually building complex validation logic.
            </p>
            <div className="project-tech">
              <span className="tech-tag">React</span>
              <span className="tech-tag">Vue</span>
              <span className="tech-tag">Angular</span>
              <span className="tech-tag">TypeScript</span>
              <span className="tech-tag">AI</span>
            </div>
          </div>
          <div className="project-preview">
            <div className="crt-monitor">
              <div className="crt-screen">
                <div className="crt-content">
                  {/* Espaço reservado para screenshot do FormAI */}
                  <div className="screenshot-placeholder">
                    <span>// FormAI Screenshot</span>
                    <span>coming soon...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Projects
