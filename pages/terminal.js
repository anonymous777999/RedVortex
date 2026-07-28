import { useState, useEffect, useRef, useCallback } from 'react'
import Head from 'next/head'
import { personalInfo, projects, skills, socialLinks } from '../data/portfolio'

const COMMANDS = {
  help: {
    desc: 'Show available commands',
    fn: () => `
╔══════════════════════════════════════╗
║         AVAILABLE COMMANDS           ║
╠══════════════════════════════════════╣
║ help        Show this message        ║
║ whoami      Display user info        ║
║ projects    List all projects        ║
║ skills      Show skill categories    ║
║ about       About RedVortex          ║
║ banner      Show the banner          ║
║ contact     Show contact info        ║
║ date        Current date/time        ║
║ clear       Clear the terminal       ║
║ neofetch    System info (styled)     ║
║ history     Command history           ║
║ ⬆/⬇        Navigate history         ║
║ TAB         Auto-complete            ║
╚══════════════════════════════════════╝`,
  },
  whoami: {
    desc: 'Display user info',
    fn: () => `
  ┌─ ${personalInfo.name}
  ├─ ${personalInfo.title}
  ├─ ${personalInfo.tagline}
  ├─ ${personalInfo.location}
  └─ ${personalInfo.email}`,
  },
  about: {
    desc: 'About RedVortex',
    fn: () => `
  ${personalInfo.bio}
  
  "Building, Breaking, Securing, Scaling — one commit at a time."`,
  },
  banner: {
    desc: 'Show the banner',
    fn: () => `
 ██████╗ ███████╗██████╗ ██╗   ██╗ ██████╗ ██████╗ ████████╗███████╗██╗  ██╗
 ██╔══██╗██╔════╝██╔══██╗██║   ██║██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝╚██╗██╔╝
 ██████╔╝█████╗  ██║  ██║██║   ██║██║   ██║██████╔╝   ██║   █████╗   ╚███╔╝ 
 ██╔══██╗██╔══╝  ██║  ██║╚██╗ ██╔╝██║   ██║██╔══██╗   ██║   ██╔══╝   ██╔██╗ 
 ██║  ██║███████╗██████╔╝ ╚████╔╝ ╚██████╔╝██║  ██║   ██║   ███████╗██╔╝ ██╗
 ╚═╝  ╚═╝╚══════╝╚═════╝   ╚═══╝  ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
                                                                             
 ⚡ Ethical Hacker • AI Engineer • Full-Stack Developer
`,
  },
  projects: {
    desc: 'List all projects',
    fn: () => projects.map((p, i) =>
      `  ${i + 1}. ${p.title.padEnd(16)} ${p.subtitle.padEnd(28)} [${p.status}]`
    ).join('\n') + `\n\n  Type: visit /projects for details`,
  },
  skills: {
    desc: 'Show skill categories',
    fn: () => skills.map(s =>
      `  ${s.category.padEnd(22)} ${s.items.join(', ')}`
    ).join('\n'),
  },
  contact: {
    desc: 'Show contact info',
    fn: () => socialLinks.map(l =>
      `  ${l.icon.padEnd(10)} ${l.name.padEnd(12)} ${l.url}`
    ).join('\n'),
  },
  date: {
    desc: 'Current date/time',
    fn: () => {
      try {
        return `  ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`
      } catch {
        return `  ${new Date().toString()}`
      }
    },
  },
  neofetch: {
    desc: 'System info (styled)',
    fn: () => `
  ${personalInfo.name}@portfolio
  --------------------------
  OS:       Arch Linux (WSL2)
  Host:     Vercel (Next.js 14)
  Kernel:   Node.js ${typeof process !== 'undefined' && process.version ? process.version : '20.x'}
  Shell:    Interactive Terminal v2
  Uptime:   ∞
  Packages: ${projects.length} projects deployed
  Shell:    bash 5.2
  Terminal: ${personalInfo.name} Portfolio
  CPU:      (2) @ 2.0 GHz
  Memory:   Unlimited
`,
  },
}

export default function Terminal() {
  const [booted, setBooted] = useState(false)
  const [bootLines, setBootLines] = useState([])
  const [lines, setLines] = useState([{ text: 'Type "help" for available commands.', isOutput: true }])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [tabIndex, setTabIndex] = useState(0)
  const inputRef = useRef(null)
  const endRef = useRef(null)

  const bootSequence = [
    '[  OK  ] Initializing terminal environment...',
    '[  OK  ] Loading command modules...',
    '[  OK  ] Connecting to RedVortex server...',
    `[  OK  ] Welcome, ${personalInfo.name} - ${personalInfo.title}`,
    '',
    `${personalInfo.name}@portfolio:~$ _`,
  ]

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < bootSequence.length) {
        setBootLines(prev => [...prev, bootSequence[i]])
        i++
      } else {
        setBooted(true)
        clearInterval(interval)
      }
    }, 150)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines, bootLines])

  useEffect(() => {
    if (booted) inputRef.current?.focus()
  }, [booted])

  const executeCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    const newHistory = [...history, cmd]
    setHistory(newHistory)
    setHistoryIndex(-1)

    let output
    if (trimmed === 'clear') {
      setLines([])
      return
    }

    const command = COMMANDS[trimmed]
    if (command) {
      try {
        output = command.fn()
      } catch (err) {
        output = `Error running '${trimmed}': ${err.message}`
      }
    } else {
      output = `bash: ${trimmed}: command not found. Try "help".`
    }

    setLines(prev => [
      ...prev,
      { text: `$ ${cmd}`, isInput: true },
      { text: output, isOutput: true },
    ])
  }, [history])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input)
      setInput('')
      setTabIndex(0)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1
        if (newIndex >= history.length) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(history[newIndex])
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const partial = input.toLowerCase()
      const matches = Object.keys(COMMANDS).filter(c => c.startsWith(partial))
      if (matches.length === 1) {
        setInput(matches[0])
      } else if (matches.length > 1) {
        const next = tabIndex % matches.length
        setInput(matches[next])
        setTabIndex(prev => prev + 1)
      }
    } else {
      setTabIndex(0)
    }
  }

  if (!booted) {
    return (
      <div className="boot-screen">
        <div className="boot-container">
          {bootLines.map((line, i) => (
            <p key={i} className={`boot-line ${typeof line === 'string' && line.startsWith('[  OK  ]') ? 'ok' : ''}`}>
              {typeof line === 'string' ? line : ''}
            </p>
          ))}
        </div>
        <style jsx>{`
          .boot-screen {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0a0a0f;
            padding-top: 60px;
          }
          .boot-container {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
            color: #64748b;
            line-height: 1.8;
          }
          .boot-line.ok {
            color: #10b981;
          }
        `}</style>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Terminal — RedVortex</title>
        <meta name="description" content="Interactive terminal - RedVortex" />
      </Head>

      <div className="terminal-page" onClick={() => inputRef.current?.focus()}>
        <div className="term-container">
          {/* Terminal header */}
          <div className="term-header">
            <div className="term-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="term-title mono">redvortex@portfolio:~/terminal — bash</span>
          </div>

          <div className="term-body">
            {lines.map((line, i) => (
              <div key={i} className={`term-line ${line?.isInput ? 'input' : 'output'}`}>
                {line?.isInput ? (
                  <span>{line?.text ?? ''}</span>
                ) : (
                  <span className="output-text">{line?.text ?? ''}</span>
                )}
              </div>
            ))}
            <div className="term-input-line">
              <span className="prompt">visitor@redvortex:~$ </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="term-input"
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal input"
              />
              {!input && <span className="cursor-blink">█</span>}
            </div>
            <div ref={endRef} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .terminal-page {
          min-height: 100vh;
          background: #0a0a0f;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 16px 40px;
          cursor: text;
        }

        .term-container {
          width: 100%;
          max-width: 900px;
          background: #0d0d14;
          border: 1px solid #1e293b;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 40px rgba(34, 211, 238, 0.05);
        }

        .term-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: #111118;
          border-bottom: 1px solid #1e293b;
        }

        .term-dots { display: flex; gap: 8px; }
        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .dot.red { background: #ff5f56; }
        .dot.yellow { background: #ffbd2e; }
        .dot.green { background: #27c93f; }

        .term-title {
          margin-left: 12px;
          font-size: 0.78rem;
          color: #64748b;
        }

        .term-body {
          padding: 20px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          line-height: 1.7;
          max-height: 70vh;
          overflow-y: auto;
          color: #e0e0e0;
        }

        .term-body::-webkit-scrollbar { width: 4px; }
        .term-body::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 2px; }

        .term-line { margin: 2px 0; }
        .term-line.input { color: #22d3ee; }
        .output-text { color: #94a3b8; white-space: pre-wrap; }

        .term-input-line {
          display: flex;
          align-items: center;
          margin-top: 4px;
        }

        .prompt {
          color: #10b981;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .term-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #22d3ee;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          caret-color: #22d3ee;
          padding: 0;
          margin: 0;
        }

        .term-input::selection {
          background: rgba(34, 211, 238, 0.3);
        }

        .cursor-blink {
          color: #22d3ee;
          animation: blink 1s step-end infinite;
          margin-left: -1px;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        @media (max-width: 768px) {
          .term-body { font-size: 0.75rem; max-height: 60vh; }
          .term-input { font-size: 0.75rem; }
        }
      `}</style>
    </>
  )
}
