import Header from './components/Header'
import Hero from './components/Hero'
import StatsInfo from './components/StatsInfo'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useLanguage } from './contexts/LanguageContext'
import { translations } from './i18n/translations'
import './App.css'

function AppContent() {
  const { language } = useLanguage()
  const t = translations[language]

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
    e.preventDefault()
    
    // Pequeno delay para garantir que o menu feche antes do scroll
    setTimeout(() => {
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const calculateDuration = (startMonth: number, startYear: number, endMonth?: number, endYear?: number, lang: 'en' | 'pt' = language) => {
    const startDate = new Date(startYear, startMonth)
    const endDate = endYear !== undefined && endMonth !== undefined ? new Date(endYear, endMonth) : new Date()
    
    let years = endDate.getFullYear() - startDate.getFullYear()
    let months = endDate.getMonth() - startDate.getMonth()

    if (months < 0) {
      years--
      months += 12
    }

    const yearText = lang === 'pt' ? (years > 1 ? t.experience.years : t.experience.year) : (years > 1 ? 'years' : 'year')
    const monthText = lang === 'pt' ? (months > 1 ? t.experience.months : t.experience.month) : (months > 1 ? 'months' : 'month')

    let durationStr = ''
    if (years > 0) {
      durationStr += `${years} ${yearText} `
    }
    if (months > 0) {
      durationStr += `${months} ${monthText}`
    }

    return durationStr.trim()
  }

  const experiences = [
    {
      company: "CAST",
      role: t.experience.castRole,
      period: t.experience.castPeriod,
      duration: calculateDuration(3, 2022),
      location: t.experience.castLocation,
      description: t.experience.castDescription,
      startMonth: 3,
      startYear: 2022,
    },
    {
      company: "Revelo",
      role: t.experience.revaloRole,
      period: t.experience.revaloPeriod,
      duration: calculateDuration(4, 2025, 5, 2025),
      location: t.experience.revaloLocation,
      description: t.experience.revaloDescription,
      startMonth: 4,
      startYear: 2025,
      endMonth: 5,
      endYear: 2025,
    },
    {
      company: "Infosys",
      role: t.experience.infosysRole,
      period: t.experience.infosysPeriod,
      duration: calculateDuration(4, 2021, 4, 2022),
      location: t.experience.infosysLocation,
      description: t.experience.infosysDescription,
      startMonth: 4,
      startYear: 2021,
      endMonth: 4,
      endYear: 2022,
    },
    {
      company: "Farma Ponte",
      role: t.experience.farmaPonteRole,
      period: t.experience.farmaPontePeriod,
      duration: calculateDuration(10, 2020, 4, 2021),
      location: t.experience.farmaPonteLocation,
      description: t.experience.farmaPonteDescription,
      startMonth: 10,
      startYear: 2020,
      endMonth: 4,
      endYear: 2021,
    },
    {
      company: "Grupo Soluções",
      role: t.experience.grupoSolucoesRole,
      period: t.experience.grupoSolucoesPeriod,
      duration: calculateDuration(4, 2020, 10, 2020),
      location: t.experience.grupoSolucoesLocation,
      description: t.experience.grupoSolucoesDescription,
      startMonth: 4,
      startYear: 2020,
      endMonth: 10,
      endYear: 2020,
    },
    {
      company: "Greenone Proximity Technology",
      role: t.experience.greenoneRole,
      period: t.experience.greenonePeriod,
      duration: calculateDuration(0, 2019, 3, 2020),
      location: t.experience.greenoneLocation,
      description: t.experience.greenoneDescription,
      startMonth: 0,
      startYear: 2019,
      endMonth: 3,
      endYear: 2020,
    },
    {
      company: "Capgemini",
      role: t.experience.capgeminiRole,
      period: t.experience.capgeminiPeriod,
      duration: calculateDuration(3, 2013, 0, 2015),
      location: t.experience.capgeminiLocation,
      description: t.experience.capgeminiDescription,
      startMonth: 3,
      startYear: 2013,
      endMonth: 0,
      endYear: 2015,
    }
  ];

  const skills = [
    { category: t.skills.frontend, items: ["React", "Angular", "Next.js", "TypeScript"] },
    { category: t.skills.backend, items: ["Node.js", "Nest.js", "Express.js", "REST APIs"] },
    { category: t.skills.database, items: ["PostgreSQL", "MongoDB", "MySQL", "OracleDB", "SQL Server"] },
    { category: t.skills.devops, items: ["Docker", "Kubernetes", "AWS", "OpenShift", "Linux"] },
    { category: t.skills.aiml, items: ["LLM", "MCP", "Prompt Engineering"] },
    { category: t.skills.microservices, items: ["Microserviços", "API Gateway", "Message Queue"] }
  ];

  const education = [
    {
      institution: t.education.unip,
      degree: t.education.unipDegree,
      period: t.education.unipPeriod
    },
    {
      institution: t.education.etec,
      degree: t.education.etecDegree,
      period: t.education.etecPeriod
    }
  ];

  return (
    <div className="app">
      <Header onNavClick={handleNavClick} />
    
      {/* Hero Section */}
      <main className="main">
        <Hero />
        <StatsInfo />
        <Skills skills={skills} />
        <Experience experiences={experiences} />
        <Projects />
        <Education education={education} />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default AppContent
