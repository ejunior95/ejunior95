import { useState } from 'react'
import './Header.css'

interface HeaderProps {
  onNavClick: (e: React.MouseEvent<HTMLElement>, targetId: string) => void
}

function Header({ onNavClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

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

  return (
    <>
      {/* Header - Desktop View */}
      <header className="desktop-header">
        <div className="logo" onClick={(e) => handleClick(e, 'about')}>
          &lt;e<span className="highlight">95</span>/&gt;
        </div>

        <nav className="nav">
          <a href="#about" onClick={(e) => handleClick(e, 'about')}>ABOUT ME</a>
          <a href="#skills" onClick={(e) => handleClick(e, 'skills')}>SKILLS</a>
          <a href="#experience" onClick={(e) => handleClick(e, 'experience')}>EXPERIENCE</a>
          <a href="#projects" onClick={(e) => handleClick(e, 'projects')}>PROJECTS</a>
          <a href="#education" onClick={(e) => handleClick(e, 'education')}>EDUCATION</a>
          <a href="#contact" onClick={(e) => handleClick(e, 'contact')}>CONTACT</a>
        </nav>

        <div className="header-actions">
          <a href="https://www.linkedin.com/in/deved-jr100" target="_blank" rel="noopener noreferrer" className="enroll-btn">
            {'()'} =&gt; {'{ '+ 'LINKEDIN' + ' }'}
          </a>
        </div>
      </header>

      {/* Header - Mobile View */}
      <header className="mobile-header">
        <div className="logo" onClick={(e) => handleClick(e, 'about')}>
          &lt;e<span className="highlight">95</span>/&gt;
        </div>
        
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

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#about" onClick={(e) => handleClick(e, 'about')}>ABOUT ME</a>
          <a href="#skills" onClick={(e) => handleClick(e, 'skills')}>SKILLS</a>
          <a href="#experience" onClick={(e) => handleClick(e, 'experience')}>EXPERIENCE</a>
          <a href="#projects" onClick={(e) => handleClick(e, 'projects')}>PROJECTS</a>
          <a href="#education" onClick={(e) => handleClick(e, 'education')}>EDUCATION</a>
          <a href="#contact" onClick={(e) => handleClick(e, 'contact')}>CONTACT</a>
          <div className="header-actions">
            <a href="https://www.linkedin.com/in/deved-jr100" target="_blank" rel="noopener noreferrer" className="enroll-btn">
              {'()'} =&gt; {'{ '+ 'LINKEDIN' + ' }'}
            </a>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
