import Link from 'next/link'
import { socialLinks, personalInfo } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="footer-logo mono">
              <span className="logo-bracket">&lt;</span>
              <span className="logo-text">RedVortex</span>
              <span className="logo-bracket"> /&gt;</span>
            </Link>
            <p className="footer-bio">{personalInfo.bio}</p>
          </div>

          <div className="footer-social">
            <p className="footer-label mono">// network.cfg</p>
            <div className="social-links">
              {socialLinks.map(link => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="social-link">
                  {link.icon === 'github' && '⟨⟩ '}
                  {link.icon === 'linkedin' && '◈ '}
                  {link.icon === 'medium' && '◆ '}
                  {link.icon === 'instagram' && '◎ '}
                  {link.icon === 'telegram' && '◉ '}
                  {link.icon === 'email' && '✉ '}
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="mono copyright">
            <span className="prompt">root@redvortex:~$ </span>
            <span className="cmd">echo</span>
            <span className="string"> "© {new Date().getFullYear()} RedVortex — Building, Breaking, Securing."</span>
          </p>
          <p className="mono uptime">
            <span className="status">●</span> Uptime: ∞
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          border-top: 1px solid #1e293b;
          padding: 48px 0 24px;
          position: relative;
          z-index: 1;
          background: rgba(10, 10, 15, 0.8);
        }

        .footer-inner {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 48px;
        }

        .footer-logo {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.3rem;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          margin-bottom: 12px;
        }

        .logo-bracket { color: #64748b; }
        .logo-text {
          background: linear-gradient(135deg, #a78bfa, #22d3ee);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer-bio {
          color: #64748b;
          font-size: 0.9rem;
          line-height: 1.7;
          max-width: 400px;
        }

        .footer-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: #22d3ee;
          margin-bottom: 12px;
        }

        .social-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .social-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: #64748b;
          text-decoration: none;
          transition: all 0.2s;
        }

        .social-link:hover {
          color: #22d3ee;
          padding-left: 4px;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 24px;
          border-top: 1px solid #1e293b;
        }

        .copyright {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          color: #64748b;
        }

        .prompt { color: #10b981; }
        .cmd { color: #22d3ee; }
        .string { color: #a78bfa; }

        .uptime {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          color: #64748b;
        }

        .status {
          color: #10b981;
          animation: pulse 2s infinite;
        }

        @keyframes pulse { 50% { opacity: 0.5; } }

        @media (max-width: 768px) {
          .footer-top { grid-template-columns: 1fr; gap: 24px; }
          .footer-bottom { flex-direction: column; gap: 8px; align-items: flex-start; }
        }
      `}</style>
    </footer>
  )
}
