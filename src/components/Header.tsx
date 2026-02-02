import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../i18n/translations'
import './Header.css'

interface HeaderProps {
  onNavClick: (e: React.MouseEvent<HTMLElement>, targetId: string) => void
}

function Header({ onNavClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { language, toggleLanguage } = useLanguage()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
    closeMenu()
    onNavClick(e, targetId)
  }

  const t = translations[language].header

  return (
    <>
      {/* Header - Desktop View */}
      <header className="desktop-header">
        <div className="logo" onClick={(e) => handleClick(e, 'about')}>
          &lt;e<span className="highlight">95</span>/&gt;
        </div>

        <nav className="nav">
          <a href="#about" onClick={(e) => handleClick(e, 'about')}>{t.aboutMe}</a>
          <a href="#skills" onClick={(e) => handleClick(e, 'skills')}>{t.skills}</a>
          <a href="#experience" onClick={(e) => handleClick(e, 'experience')}>{t.experience}</a>
          <a href="#projects" onClick={(e) => handleClick(e, 'projects')}>{t.projects}</a>
          <a href="#education" onClick={(e) => handleClick(e, 'education')}>{t.education}</a>
          <a href="#contact" onClick={(e) => handleClick(e, 'contact')}>{t.contact}</a>
        </nav>

        <div className="header-actions">
          <button className="lang-toggle" onClick={toggleLanguage} title={language === 'pt' ? 'Português (Brasil)' : 'English'}>
            {language === 'pt' ? 'PT-BR' : 'EN'}
          </button>
          <a href="https://www.linkedin.com/in/deved-jr100" target="_blank" rel="noopener noreferrer" className="enroll-btn">
            {'()'} =&gt; {'{ '+ t.linkedin + ' }'}
          </a>
        </div>
      </header>

      {/* Header - Mobile View */}
      <header className="mobile-header">
        <div className="logo" onClick={(e) => handleClick(e, 'about')}>
          &lt;e<span className="highlight">95</span>/&gt;
        </div>
        
        <div className="mobile-controls">
          {/* Language Toggle Button */}
          <button className="lang-toggle mobile-lang-toggle" onClick={toggleLanguage} title={language === 'pt' ? 'Português (Brasil)' : 'English'}>
            {language === 'pt' ? 'PT-BR' : 'EN'}
          </button>
          
          {/* Hamburger Button */}
          <button 
            className={`hamburger ${menuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#about" onClick={(e) => handleClick(e, 'about')}>{t.aboutMe}</a>
          <a href="#skills" onClick={(e) => handleClick(e, 'skills')}>{t.skills}</a>
          <a href="#experience" onClick={(e) => handleClick(e, 'experience')}>{t.experience}</a>
          <a href="#projects" onClick={(e) => handleClick(e, 'projects')}>{t.projects}</a>
          <a href="#education" onClick={(e) => handleClick(e, 'education')}>{t.education}</a>
          <a href="#contact" onClick={(e) => handleClick(e, 'contact')}>{t.contact}</a>
          <a href="https://www.linkedin.com/in/deved-jr100" target="_blank" rel="noopener noreferrer" className="enroll-btn">
              {'()'} =&gt; {'{ '+ t.linkedin + ' }'}
          </a>
        </nav>
      </header>
    </>
  )
}

export default Header
