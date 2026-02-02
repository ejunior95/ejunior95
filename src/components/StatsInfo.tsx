import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../i18n/translations'
import './StatsInfo.css'

function StatsInfo() {
  const { language } = useLanguage()
  const t = translations[language].stats

  return (
    <section className="course-info">
      <div className="info-stats">
        <div className="stat">
          <span className="stat-label">{t.experienceLabel}</span>
          <span className="stat-value highlight">{t.experienceValue}</span>
        </div>
        <div className="stat">
          <span className="stat-label">{t.projectsLabel}</span>
          <span className="stat-value highlight">{t.projectsValue}</span>
        </div>
        <div className="stat">
          <span className="stat-label">{t.levelLabel}</span>
          <span className="stat-value highlight">{t.levelValue}</span>
        </div>
        <div className="stat">
          <span className="stat-label">{t.locationLabel}</span>
          <span className="stat-value highlight">{t.locationValue}</span>
        </div>
      </div>
      <a href="mailto:e.junior95@gmail.com" className="cta-btn">{t.ctaButton}</a>
    </section>
  )
}

export default StatsInfo
