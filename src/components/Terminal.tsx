import { useState, useRef, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../i18n/translations'
import './Terminal.css'

interface TerminalProps {
  isOpen: boolean
  onClose: () => void
}

interface TerminalLine {
  type: 'input' | 'output'
  text: string
}

function Terminal({ isOpen, onClose }: TerminalProps) {
  const { language, toggleLanguage } = useLanguage()
  const t = translations[language].terminal
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', text: t.welcome }
  ])
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [cmdIndex, setCmdIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [history])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const currentT = translations[language].terminal

    const commands: Record<string, string> = {
      help: currentT.helpText,
      about: currentT.aboutText,
      skills: currentT.skillsText,
      experience: currentT.experienceText,
      projects: currentT.projectsText,
      contact: currentT.contactText,
      education: currentT.educationText,
    }

    let output: string

    if (trimmed === '') {
      return
    } else if (trimmed === 'clear') {
      setHistory([])
      return
    } else if (trimmed === 'language') {
      toggleLanguage()
      const newLang = language === 'en' ? 'pt' : 'en'
      output = translations[newLang].terminal.languageChanged
    } else if (trimmed === 'sudo' || trimmed.startsWith('sudo ')) {
      output = currentT.sudoText
    } else if (trimmed === 'theme') {
      output = currentT.themeText
    } else if (commands[trimmed]) {
      output = commands[trimmed]
    } else {
      output = `${currentT.notFound} '${cmd.trim()}'.\n${currentT.typeHelp}`
    }

    setHistory(prev => [
      ...prev,
      { type: 'input', text: cmd.trim() },
      { type: 'output', text: output }
    ])
  }, [language, toggleLanguage])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input)
      if (input.trim()) {
        setCmdHistory(prev => [input.trim(), ...prev])
      }
      setInput('')
      setCmdIndex(-1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdIndex < cmdHistory.length - 1) {
        const newIndex = cmdIndex + 1
        setCmdIndex(newIndex)
        setInput(cmdHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (cmdIndex > 0) {
        const newIndex = cmdIndex - 1
        setCmdIndex(newIndex)
        setInput(cmdHistory[newIndex])
      } else {
        setCmdIndex(-1)
        setInput('')
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div className="terminal-window" onClick={e => e.stopPropagation()}>
        <div className="terminal-titlebar">
          <div className="terminal-dots">
            <span className="dot dot-red" onClick={onClose}></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <span className="terminal-title">visitor@ejunior95:~</span>
          <button className="terminal-close" onClick={onClose} aria-label="Close terminal">
            <X size={14} />
          </button>
        </div>
        <div className="terminal-body" ref={terminalRef} onClick={() => inputRef.current?.focus()}>
          {history.map((line, i) => (
            <div key={i} className={`terminal-line ${line.type}`}>
              {line.type === 'input' ? (
                <span><span className="terminal-prompt">visitor@ejunior95:~$</span> {line.text}</span>
              ) : (
                <pre className="terminal-output">{line.text}</pre>
              )}
            </div>
          ))}
          <div className="terminal-input-line">
            <span className="terminal-prompt">visitor@ejunior95:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terminal
