import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../i18n/translations'
import './Education.css'

interface EducationItem {
  institution: string
  degree: string
  period: string
}

interface EducationProps {
  education: EducationItem[]
}

function Education({ education }: EducationProps) {
  const { language } = useLanguage()
  const t = translations[language].education

  return (
    <section id="education" className="section">
      <h2 className="section-title">
        <span className="code-bracket">{"<"}</span> {t.title} <span className="code-bracket">{" />"}</span>
      </h2>
      <div className="education-grid">
        {education.map((edu, index) => (
          <div key={index} className="education-card">
            {/* <span className="edu-index">0{index + 1}</span> */}
            <h3 className="edu-institution">{edu.institution}</h3>
            <p className="edu-degree">{edu.degree}</p>
            <span className="edu-period">{edu.period}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Education
