import { useState, useEffect, useRef, useCallback } from 'react'
import Head from 'next/head'
import { personalInfo, ctfChallenge } from '../data/portfolio'

// SHA-256 hash of the solution — raw flag never ships to the client
const SOLUTION_HASH = 'dee5b5200515ad70975bf4b03c7335581c55fbd1b419700c32417462bc35a9ec'

async function hashCheck(input) {
  const data = new TextEncoder().encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/* 
 * ╔══════════════════════════════════════════╗
 * ║  FLAG{view_source_is_your_friend}       ║
 * ║  Congratulations, agent. You found it.   ║
 * ╚══════════════════════════════════════════╝
 */

export default function CTF() {
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('idle') // idle | correct | wrong | hint
  const [attempts, setAttempts] = useState(0)
  const [hintRevealed, setHintRevealed] = useState(false)
  const [terminalLines, setTerminalLines] = useState([
    { text: 'Initializing CTF challenge environment...', type: 'system' },
    { text: 'Challenge loaded. Ready.', type: 'system' },
  ])
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [terminalLines])

  const addLine = (text, type) => {
    setTerminalLines(prev => [...prev, { text, type }])
  }

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return

    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    const hash = await hashCheck(trimmed)
    if (hash === SOLUTION_HASH) {
      setStatus('correct')
      addLine(`[ATTEMPT ${newAttempts}] ${'█'.repeat(trimmed.length)}`, 'input')
      addLine('', 'system')
      addLine('╔══════════════════════════════════════════╗', 'success')
      addLine('║          ACCESS GRANTED                  ║', 'success')
      addLine('║  FLAG{view_source_is_your_friend}       ║', 'success')
      addLine('║                                          ║', 'success')
      addLine('║  "The best hackers know that the answer  ║', 'success')
      addLine('║   is often hiding in plain sight."       ║', 'success')
      addLine('╚══════════════════════════════════════════╝', 'success')
      addLine('', 'system')
      addLine('Congratulations, agent. You\'ve completed Challenge 001.', 'success')
    } else {
      setStatus('wrong')
      addLine(`[ATTEMPT ${newAttempts}] ${'█'.repeat(trimmed.length)}`, 'input')
      addLine('[DENIED] Invalid flag. Try again.', 'error')
    }
    setInput('')
  }, [input, attempts])

  const revealHint = () => {
    setHintRevealed(true)
    addLine('[HINT] ' + ctfChallenge.hint, 'hint')
  }

  const resetChallenge = () => {
    setStatus('idle')
    setAttempts(0)
    setHintRevealed(false)
    setInput('')
    setTerminalLines([
      { text: 'Challenge environment reset.', type: 'system' },
      { text: 'Ready for next attempt.', type: 'system' },
    ])
  }

  return (
    <>
      <Head>
        <title>CTF Challenge — RedVortex</title>
        <meta name="description" content={`${ctfChallenge.title} — ${personalInfo.name}`} />
      </Head>

      <section className="section" style={{ paddingTop: '100px' }}>
        <div className="container">
          <div className="ctf-header">
            <div className="ctf-badge">CTF</div>
            <h2 className="section-title" style={{ marginBottom: '4px' }}>{ctfChallenge.title}</h2>
            <div className="ctf-meta">
              <span className="ctf-difficulty" style={{ color: ctfChallenge.difficulty === 'Easy' ? 'var(--chrome)' : 'var(--warning)' }}>
                <span className="diff-dot" /> {ctfChallenge.difficulty}
              </span>
              <span className="ctf-category">Web • OSINT</span>
            </div>
            <p className="ctf-description">{ctfChallenge.description}</p>
          </div>

          {/* Terminal */}
          <div className="ctf-terminal">
            <div className="term-header">
              <div className="term-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="term-title">redvortex@ctf:~/challenge-001</span>
            </div>

            <div className="term-body">
              {terminalLines.map((line, i) => (
                <div key={i} className={`term-line ${line.type}`}>
                  {line.type === 'input' && <span className="prompt-arrow">{'>'}</span>}
                  <span>{line.text}</span>
                </div>
              ))}

              {status !== 'correct' && (
                <form onSubmit={handleSubmit} className="ctf-form">
                  <span className="prompt-arrow">{'>'}</span>
                  <span className="prompt-label">Enter flag: </span>
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="ctf-input"
                    placeholder="FLAG{...}"
                    spellCheck={false}
                    autoComplete="off"
                    autoFocus
                  />
                </form>
              )}
              <div ref={endRef} />
            </div>
          </div>

          {/* Actions */}
          <div className="ctf-actions">
            {status !== 'correct' && !hintRevealed && (
              <button onClick={revealHint} className="btn btn-outline">
                💡 Need a hint?
              </button>
            )}
            {status === 'correct' && (
              <div className="ctf-next">
                <p className="next-text">🏆 Challenge complete in {attempts} attempt{attempts !== 1 ? 's' : ''}</p>
                <button onClick={resetChallenge} className="btn btn-primary">
                  ↻ Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .ctf-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .ctf-badge {
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--bg-primary);
          background: var(--chrome);
          padding: 4px 12px;
          border-radius: 4px;
          margin-bottom: 16px;
          letter-spacing: 2px;
        }

        .ctf-meta {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .ctf-difficulty {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .diff-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: currentColor;
        }

        .ctf-category {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: var(--text-dim);
        }

        .ctf-description {
          color: var(--text-secondary);
          font-size: 1rem;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .ctf-terminal {
          max-width: 700px;
          margin: 0 auto;
          background: #0d0d14;
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 40px rgba(34, 211, 238, 0.05);
        }

        .term-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: #111118;
          border-bottom: 1px solid var(--border);
        }

        .term-dots { display: flex; gap: 8px; }
        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .dot.red { background: #ff5f56; }
        .dot.yellow { background: #ffbd2e; }
        .dot.green { background: #27c93f; }

        .term-title {
          margin-left: 12px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          color: var(--text-dim);
        }

        .term-body {
          padding: 20px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          line-height: 1.8;
          max-height: 400px;
          overflow-y: auto;
        }

        .term-body::-webkit-scrollbar { width: 4px; }
        .term-body::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

        .term-line { margin: 2px 0; white-space: pre-wrap; }
        .term-line.system { color: var(--text-dim); }
        .term-line.input { color: var(--chrome); }
        .term-line.error { color: var(--danger); }
        .term-line.success { color: var(--accent); font-weight: 600; }
        .term-line.hint { color: var(--warning); }

        .prompt-arrow {
          color: var(--chrome);
          margin-right: 8px;
        }

        .prompt-label {
          color: var(--accent);
        }

        .ctf-form {
          display: flex;
          align-items: center;
          margin-top: 8px;
        }

        .ctf-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--chrome);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          caret-color: var(--chrome);
          padding: 0;
        }

        .ctf-input::placeholder {
          color: rgba(34, 211, 238, 0.25);
        }

        .ctf-input::selection {
          background: rgba(34, 211, 238, 0.3);
        }

        .ctf-actions {
          text-align: center;
          margin-top: 24px;
        }

        .ctf-next {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .next-text {
          font-family: 'JetBrains Mono', monospace;
          color: var(--accent);
          font-size: 0.95rem;
        }

        @media (max-width: 600px) {
          .term-body { font-size: 0.75rem; max-height: 350px; }
          .ctf-input { font-size: 0.75rem; }
        }
      `}</style>
    </>
  )
}
