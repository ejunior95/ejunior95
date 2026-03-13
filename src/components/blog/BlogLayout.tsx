import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../i18n/translations'
import './BlogLayout.css'

interface BlogLayoutProps {
  children: React.ReactNode
}

function BlogLayout({ children }: BlogLayoutProps) {
  const { language, toggleLanguage } = useLanguage()
  const t = translations[language].blog

  return (
    <div className="blog-layout">
      <header className="blog-header">
        <a href="/" className="blog-logo">
          &lt;e<span className="highlight">95</span>/&gt;
        </a>
        <nav className="blog-nav">
          <a href="/" className="blog-back">{t.backToPortfolio}</a>
          <button className="lang-toggle" onClick={toggleLanguage}>
            {language === 'pt' ? 'EN' : 'PT-BR'}
          </button>
        </nav>
      </header>
      <main className="blog-main">
        {children}
      </main>
      <footer className="blog-footer">
        <span className="code-comment">// {t.footer}</span>
      </footer>
    </div>
  )
}

export default BlogLayout
