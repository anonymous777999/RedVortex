import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light') {
      setDark(false)
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      className="theme-toggle"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      <span className="toggle-icon">{dark ? '☀' : '☾'}</span>
      <span className="toggle-label">{dark ? 'Light' : 'Dark'}</span>

      <style jsx>{`
        .theme-toggle {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--theme-toggle-bg);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 6px 12px;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          color: var(--theme-toggle-icon);
          margin-left: 4px;
          flex-shrink: 0;
        }

        .theme-toggle:hover {
          border-color: var(--chrome);
          box-shadow: 0 0 15px rgba(34, 211, 238, 0.1);
          transform: translateY(-1px);
        }

        .toggle-icon {
          font-size: 1rem;
          transition: transform 0.3s;
        }

        .theme-toggle:hover .toggle-icon {
          transform: rotate(15deg);
        }

        .toggle-label {
          font-size: 0.75rem;
        }

        @media (max-width: 768px) {
          .toggle-label { display: none; }
          .theme-toggle { padding: 6px 8px; }
        }
      `}</style>
    </button>
  )
}
