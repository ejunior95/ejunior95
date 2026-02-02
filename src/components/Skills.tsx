import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../i18n/translations'
import './Skills.css'

interface SkillGroup {
  category: string
  items: string[]
}

interface SkillsProps {
  skills: SkillGroup[]
}

function Skills({ skills }: SkillsProps) {
  const { language } = useLanguage()
  const t = translations[language].skills

  return (
    <section id="skills" className="section">
      <h2 className="section-title">
        <span className="code-bracket">{"{"}</span> {t.title} <span className="code-bracket">{"}"}</span>
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
  )
}

export default Skills
