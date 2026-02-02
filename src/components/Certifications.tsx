import { ScrollText, Globe } from 'lucide-react'
import './Certifications.css'

function Certifications() {
  return (
    <section className="section">
      <h2 className="section-title">
        <span className="code-bracket">{"/*"}</span> certifications <span className="code-bracket">{"*/"}</span>
      </h2>
      <div className="certifications-grid">
        <div className="cert-card">
          <span className="cert-icon"><ScrollText size={28} /></span>
          <h4 className="cert-name">Google Coding Fundamentals</h4>
        </div>
        <div className="cert-card">
          <span className="cert-icon"><Globe size={28} /></span>
          <h4 className="cert-name">EF SET English</h4>
          <p className="cert-score">65/100 - C1 Effective Proficiency</p>
        </div>
      </div>
    </section>
  )
}

export default Certifications
