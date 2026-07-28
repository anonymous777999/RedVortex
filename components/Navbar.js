import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { navigation } from '../data/portfolio'

const icons = {
  terminal: '→',
  folder: '📁',
  shield: '🛡',
  pen: '✎',
  mail: '✉',
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <Link href="/" className="nav-logo mono">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-text">RedVortex</span>
          <span className="logo-bracket"> /&gt;</span>
          <span className="logo-cursor">_</span>
        </Link>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          {navigation.map(item => (
            <Link
              key={item.path}
              href={item.path}
              className={`nav-link mono ${router.pathname === item.path ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <span className="nav-icon">{icons[item.icon] || '•'}</span>
              {item.name}
            </Link>
          ))}
        </div>

        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className={`bar ${open ? 'open' : ''}`} />
          <span className={`bar ${open ? 'open' : ''}`} />
          <span className={`bar ${open ? 'open' : ''}`} />
        </button>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(10, 10, 15, 0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid #1e293b;
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }

        .nav-logo {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.2rem;
          font-weight: 700;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0;
        }

        .logo-bracket {
          color: #64748b;
          transition: color 0.3s;
        }
        .nav-logo:hover .logo-bracket { color: #22d3ee; }

        .logo-text {
          background: linear-gradient(135deg, #a78bfa, #22d3ee);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo-cursor {
          color: #10b981;
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        .nav-links {
          display: flex;
          gap: 8px;
        }

        .nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: #64748b;
          padding: 8px 16px;
          border-radius: 6px;
          transition: all 0.2s;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .nav-link:hover {
          color: #22d3ee;
          background: rgba(34, 211, 238, 0.06);
        }

        .nav-link.active {
          color: #22d3ee;
          background: rgba(34, 211, 238, 0.1);
        }

        .nav-icon { font-size: 0.8rem; }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }

        .bar {
          display: block;
          width: 24px;
          height: 2px;
          background: #94a3b8;
          transition: all 0.3s;
          border-radius: 2px;
        }

        .bar.open:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .bar.open:nth-child(2) { opacity: 0; }
        .bar.open:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
            position: absolute;
            top: 64px;
            left: 0;
            right: 0;
            flex-direction: column;
            background: rgba(10, 10, 15, 0.98);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid #1e293b;
            padding: 16px;
            gap: 4px;
          }
          .nav-links.open { display: flex; }
          .hamburger { display: flex; }
        }
      `}</style>
    </nav>
  )
}
