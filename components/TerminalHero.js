import { useState, useEffect, useCallback } from 'react'
import GlitchText from './GlitchText'
import { personalInfo, projects, blogPosts } from '../data/portfolio'

const TYPING_SPEED = 40
const ERASE_SPEED = 20
const PAUSE_MS = 2000

const lines = [
  'Initializing RedVortex portfolio...',
  'Loading skill matrix...',
  'Scanning for vulnerabilities... done.',
  'System ready. Welcome, operator. █',
]

const commands = [
  { cmd: 'whoami', output: `> ${personalInfo.name} — ${personalInfo.tagline}` },
  { cmd: 'cat /etc/location', output: `> ${personalInfo.location}` },
  { cmd: 'curl -s http://status.redvortex/live', output: '> HTTP 200 — System Online 🟢' },
  { cmd: 'nmap -sV target:redvortex', output: '> Open ports: 22, 80, 443, 3000, 8000\n> Services: SSH, HTTP, HTTPS, Next.js, FastAPI\n> All secure ✅' },
]

export default function TerminalHero() {
  const [bootPhase, setBootPhase] = useState('booting')
  const [bootLine, setBootLine] = useState(0)
  const [bootText, setBootText] = useState('')
  const [bootChar, setBootChar] = useState(0)

  const [cmdIndex, setCmdIndex] = useState(0)
  const [cmdText, setCmdText] = useState('')
  const [cmdChar, setCmdChar] = useState(0)
  const [showOutput, setShowOutput] = useState(false)
  const [erasing, setErasing] = useState(false)

  // Boot sequence
  useEffect(() => {
    if (bootPhase !== 'booting') return
    if (bootLine >= lines.length) {
      setBootPhase('interactive')
      return
    }

    const currentLine = lines[bootLine]
    if (bootChar < currentLine.length) {
      const timer = setTimeout(() => {
        setBootText(prev => prev + currentLine[bootChar])
        setBootChar(c => c + 1)
      }, TYPING_SPEED / 2)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setBootLine(l => l + 1)
        setBootChar(0)
        setBootText(prev => prev + '\n')
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [bootPhase, bootLine, bootChar])

  // Interactive commands
  useEffect(() => {
    if (bootPhase !== 'interactive') return

    const currentCmd = commands[cmdIndex]

    if (!erasing) {
      if (cmdChar < currentCmd.cmd.length) {
        const timer = setTimeout(() => {
          setCmdText(prev => prev + currentCmd.cmd[cmdChar])
          setCmdChar(c => c + 1)
        }, TYPING_SPEED)
        return () => clearTimeout(timer)
      } else if (!showOutput) {
        const timer = setTimeout(() => setShowOutput(true), 400)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => setErasing(true), PAUSE_MS)
        return () => clearTimeout(timer)
      }
    } else {
      if (cmdChar > 0) {
        const timer = setTimeout(() => {
          setCmdText(prev => prev.slice(0, -1))
          setCmdChar(c => c - 1)
        }, ERASE_SPEED)
        return () => clearTimeout(timer)
      } else {
        setErasing(false)
        setShowOutput(false)
        setCmdIndex(i => (i + 1) % commands.length)
        setCmdText('')
        setCmdChar(0)
      }
    }
  }, [bootPhase, cmdIndex, cmdChar, showOutput, erasing])

  const currentOutput = showOutput ? commands[cmdIndex].output : ''
  const nextCmd = commands[(cmdIndex + 1) % commands.length]

  return (
    <section className="terminal-hero">
      <div className="matrix-overlay" />
      <div className="container hero-content">
        <div className="terminal-window">
          <div className="terminal-header">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="terminal-title">RedVortex@root:~</span>
          </div>
          <div className="terminal-body">
            <div className="boot-text">
              {bootText.split('\n').map((line, i) => (
                <p key={i} className="boot-line">{line}</p>
              ))}
            </div>

            {bootPhase === 'interactive' && (
              <div className="interactive-section">
                <div className="cmd-line">
                  <span className="prompt">root@redvortex:~$ </span>
                  <span className="cmd-text">{cmdText}</span>
                  <span className="cursor">█</span>
                </div>

                {showOutput && (
                  <div className="cmd-output">
                    {currentOutput.split('\n').map((line, i) => (
                      <p key={i} className={line.startsWith('> Open') || line.startsWith('> Services') || line.startsWith('> All') ? 'output-line dim' : 'output-line'}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {bootPhase === 'interactive' && !showOutput && cmdChar === 0 && (
              <div className="cmd-line ready-line">
                <span className="prompt">root@redvortex:~$ </span>
                <span className="cmd-text dim">{nextCmd.cmd}</span>
                <span className="cursor dim">█</span>
              </div>
            )}
          </div>
        </div>

        <div className="hero-text">
          <p className="hero-greeting mono">// hello.c — Hello, World!</p>
          <GlitchText text={personalInfo.name} className="hero-name" />
          <p className="hero-title">{personalInfo.title}</p>
          <p className="hero-tagline">{personalInfo.tagline}</p>
          <p className="hero-bio">{personalInfo.bio}</p>
          <div className="hero-badges">
            <span className="hero-badge">⚡ {commands.length} Skills Loaded</span>
            <span className="hero-badge">🔒 {projects.length} Projects Deployed</span>
            <span className="hero-badge">🌐 {blogPosts.length} Writeups Published</span>
          </div>
          <div className="hero-actions">
            <a href="/projects" className="btn btn-primary">
              <span>▶</span> View Projects
            </a>
            <a href="/contact" className="btn btn-outline">
              <span>✉</span> Get In Touch
            </a>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>▼ scroll ▼</span>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap');

        .terminal-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding-top: 80px;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .terminal-window {
          background: #0d0d14;
          border: 1px solid #1e293b;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 40px rgba(34, 211, 238, 0.08), 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .terminal-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: #111118;
          border-bottom: 1px solid #1e293b;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .dot.red { background: #ff5f56; }
        .dot.yellow { background: #ffbd2e; }
        .dot.green { background: #27c93f; }

        .terminal-title {
          margin-left: 12px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: #64748b;
        }

        .terminal-body {
          padding: 20px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          line-height: 1.7;
          min-height: 320px;
        }

        .boot-line {
          color: #64748b;
        }

        .interactive-section {
          margin-top: 8px;
        }

        .cmd-line {
          display: flex;
          flex-wrap: wrap;
        }

        .prompt {
          color: #10b981;
        }

        .cmd-text {
          color: #22d3ee;
        }

        .cmd-text.dim {
          color: #334155;
        }

        .cursor {
          color: #22d3ee;
          animation: blink 1s step-end infinite;
        }
        .cursor.dim {
          color: #1e293b;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        .cmd-output {
          margin-top: 8px;
          padding-left: 8px;
          border-left: 2px solid #1e293b;
        }

        .output-line {
          color: #a78bfa;
        }
        .output-line.dim {
          color: #64748b;
          font-size: 0.8rem;
        }

        .ready-line {
          margin-top: 8px;
        }

        .hero-text {
          padding: 20px;
        }

        .hero-greeting {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          color: #64748b;
          margin-bottom: 16px;
        }

        .hero-name {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #a78bfa, #22d3ee, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.1rem;
          color: #10b981;
          margin-bottom: 8px;
        }

        .hero-tagline {
          font-size: 1.05rem;
          color: #94a3b8;
          margin-bottom: 20px;
        }

        .hero-bio {
          color: #64748b;
          line-height: 1.7;
          margin-bottom: 24px;
          max-width: 540px;
        }

        .hero-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 32px;
        }

        .hero-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          padding: 6px 14px;
          border-radius: 20px;
          background: rgba(34, 211, 238, 0.08);
          border: 1px solid rgba(34, 211, 238, 0.15);
          color: #22d3ee;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: #334155;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }

        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-name { font-size: 2.2rem; }
          .terminal-window { min-height: 280px; }
          .terminal-body { min-height: 240px; font-size: 0.75rem; }
          .scroll-indicator { display: none; }
        }
      `}</style>
    </section>
  )
}
