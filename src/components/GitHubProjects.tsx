import { ExternalLink, Star } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../i18n/translations'
import { useGitHubRepos } from '../hooks/useGitHubRepos'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './GitHubProjects.css'

function GitHubProjects() {
  const { language } = useLanguage()
  const t = translations[language].githubProjects
  const { repos, loading, error } = useGitHubRepos('ejunior95')
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  if (!loading && !error && repos.length === 0) return null

  return (
    <section className={`section github-projects-section ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`} ref={ref}>
      <h3 className="github-section-subtitle">
        <span className="code-comment">{'// '}{t.title}</span>
      </h3>

      {loading && (
        <div className="github-loading">
          <span className="loading-cursor">{'>'} {t.loading}<span className="blink">_</span></span>
        </div>
      )}

      {error && (
        <div className="github-error">
          <span className="code-comment">{'// '}{t.error}</span>
        </div>
      )}

      {!loading && !error && (
        <div className="github-grid">
          {repos.map((repo, index) => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="github-card"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="github-card-header">
                <h4 className="github-repo-name">{repo.name}</h4>
                {repo.stargazers_count > 0 && (
                  <span className="github-stars">
                    <Star size={12} />
                    {repo.stargazers_count}
                  </span>
                )}
              </div>
              {repo.description && (
                <p className="github-repo-description">{repo.description}</p>
              )}
              <div className="github-card-footer">
                {repo.language && (
                  <span className="github-language">{repo.language}</span>
                )}
                <div className="github-topics">
                  {repo.topics.filter(topic => topic !== 'portfolio').slice(0, 3).map(topic => (
                    <span key={topic} className="github-topic-tag">{topic}</span>
                  ))}
                </div>
                {repo.homepage && (
                  <span className="github-homepage-icon">
                    <ExternalLink size={12} />
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}

export default GitHubProjects
