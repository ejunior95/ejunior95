import { Clock, MapPin } from 'lucide-react'
import './Experience.css'

interface ExperienceItem {
  company: string
  role: string
  period: string
  duration: string
  location: string
  description: string
  startMonth: number
  startYear: number
  endMonth?: number
  endYear?: number
}

interface ExperienceProps {
  experiences: ExperienceItem[]
}

function Experience({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="section">
      <h2 className="section-title">
        <span className="code-bracket">{"["}</span> experience <span className="code-bracket">{"]"}</span>
      </h2>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker">
              <span className="timeline-index">{(experiences.length - index) - 1}</span>
            </div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3 className="company-name">{exp.company}</h3>
                <span className="timeline-period">{exp.period}</span>
              </div>
              <p className="role-title">{exp.role}</p>
              <div className="timeline-meta">
                <span className="meta-item"><Clock size={16} style={{ marginRight: '4px' }} /> {exp.duration}</span>
                <span className="meta-item"><MapPin size={16} style={{ marginRight: '4px' }} /> {exp.location}</span>
              </div>
              <p className="timeline-description">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
