import { Mail, Phone, Linkedin, MapPin, ExternalLink } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../i18n/translations'
import './Contact.css'

function Contact() {
  const { language } = useLanguage()
  const t = translations[language].contact

  return (
    <section id="contact" className="section contact-section">
      <h2 className="section-title">
        <span className="code-bracket">{"("}</span> {t.title} <span className="code-bracket">{")"}</span>
      </h2>
      <div className="contact-grid">
        <a href="mailto:e.junior95@gmail.com" className="contact-card">
          <span className="contact-icon"><Mail size={28} /></span>
          <span className="contact-label">{t.email}</span>
          <span className="contact-value">e.junior95@gmail.com</span>
          <ExternalLink size={16} style={{ marginLeft: '4px', opacity: 0.6 }} />
        </a>
        <a href="tel:+5515988309658" className="contact-card">
          <span className="contact-icon"><Phone size={28} /></span>
          <span className="contact-label">{t.phone}</span>
          <span className="contact-value">+ 55 (15) 98830-9658</span>
        </a>
        <a href="https://www.linkedin.com/in/deved-jr100" target="_blank" rel="noopener noreferrer" className="contact-card">
          <span className="contact-icon"><Linkedin size={28} /></span>
          <span className="contact-label">{t.linkedin}</span>
          <span className="contact-value">linkedin.com/in/deved-jr100</span>
          <ExternalLink size={16} style={{ marginLeft: '4px', opacity: 0.6 }} />
        </a>
        <div className="contact-card">
          <span className="contact-icon"><MapPin size={28} /></span>
          <span className="contact-label">{t.location}</span>
          <span className="contact-value">{t.locationValue}</span>
        </div>
      </div>
    </section>
  )
}

export default Contact
