import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../i18n/translations'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Achievements.css'

interface Achievement {
  icon: string
  unlocked: boolean
}

function Achievements() {
  const { language } = useLanguage()
  const t = translations[language].achievements
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  const achievements: Achievement[] = [
    { icon: '🏆', unlocked: true },
    { icon: '⭐', unlocked: true },
    { icon: '🌍', unlocked: true },
    { icon: '🐳', unlocked: true },
    { icon: '🤖', unlocked: true },
    { icon: '🎓', unlocked: true },
    { icon: '📦', unlocked: true },
    { icon: '🔒', unlocked: true },
    { icon: '❓', unlocked: false },
    { icon: '❓', unlocked: false },
  ]

  return (
    <section className={`section ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`} ref={ref}>
      <h2 className="section-title">
        <span className="code-comment">{'// '}{t.title}</span>
      </h2>
      <div className="achievements-grid">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            style={{ transitionDelay: `${index * 0.08}s` }}
          >
            <span className="achievement-icon">{achievement.unlocked ? achievement.icon : '🔒'}</span>
            <h4 className="achievement-title">
              {achievement.unlocked ? t.items[index]?.title : '???'}
            </h4>
            <p className="achievement-description">
              {achievement.unlocked ? t.items[index]?.description : t.locked}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Achievements
