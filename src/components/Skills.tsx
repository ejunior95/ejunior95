import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../i18n/translations'
import { useScrollReveal } from '../hooks/useScrollReveal'
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
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  return (
    <section id="skills" className={`section ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`} ref={ref}>
      <h2 className="section-title">
        <span className="code-bracket">{"{"}</span> {t.title} <span className="code-bracket">{"}"}</span>
      </h2>
      <div className="skills-grid">
        {skills.map((skillGroup, index) => (
          <div key={index} className="skill-card" style={{ transitionDelay: `${index * 0.1}s` }}>
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
