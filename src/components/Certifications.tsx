import { ScrollText, Globe } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../i18n/translations'
import './Certifications.css'

function Certifications() {
  const { language } = useLanguage()
  const t = translations[language].certifications

  return (
    <section className="section">
      <h2 className="section-title">
        <span className="code-bracket">{"/*"}</span> {t.title} <span className="code-bracket">{"*/"}</span>
      </h2>
      <div className="certifications-grid">
        <div className="cert-card">
          <span className="cert-icon"><ScrollText size={28} /></span>
          <h4 className="cert-name">{t.googleCoding}</h4>
        </div>
        <div className="cert-card">
          <span className="cert-icon"><Globe size={28} /></span>
          <h4 className="cert-name">{t.efset}</h4>
          <p className="cert-score">{t.efsetScore}</p>
        </div>
      </div>
    </section>
  )
}

export default Certifications
