import Head from 'next/head'
import Link from 'next/link'
import { personalInfo } from '../data/portfolio'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 — Page Not Found | RedVortex</title>
      </Head>

      <section className="section" style={{ paddingTop: '120px', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="error-terminal" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="term-header">
              <div className="term-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="term-title mono">redvortex@portfolio:~/404 — bash</span>
            </div>

            <div className="term-body">
              <p className="mono line error-line">╔══════════════════════════════════════╗</p>
              <p className="mono line error-line">║          ERROR 404: NOT FOUND        ║</p>
              <p className="mono line error-line">╚══════════════════════════════════════╝</p>
              <p className="mono line">&nbsp;</p>
              <p className="mono line dim">The page you're looking for doesn't exist.</p>
              <p className="mono line dim">It may have been moved, deleted, or never existed.</p>
              <p className="mono line">&nbsp;</p>
              <p className="mono line cmd-line">
                <span className="prompt">root@redvortex:~$ </span>
                <span className="cmd">ls /</span>
              </p>
              <p className="mono line dim">bin/  projects/  arsenal/  blog/  terminal/  ctf/  contact/</p>
              <p className="mono line">&nbsp;</p>
              <p className="mono line cmd-line">
                <span className="prompt">root@redvortex:~$ </span>
                <span className="blink">█</span>
              </p>
            </div>
          </div>

          <div className="error-actions" style={{ marginTop: '32px' }}>
            <Link href="/" className="btn btn-primary">
              <span>←</span> Return to Home
            </Link>
            <Link href="/projects" className="btn btn-outline" style={{ marginLeft: '12px' }}>
              <span>→</span> View Projects
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .error-terminal {
          background: #0d0d14;
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 40px rgba(239, 68, 68, 0.08);
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
          font-size: 0.78rem;
          color: var(--text-dim);
        }

        .term-body {
          padding: 24px 28px;
          font-size: 0.85rem;
          line-height: 1.8;
          text-align: left;
        }

        .line { margin: 2px 0; white-space: pre; }
        .error-line { color: var(--danger); font-weight: 600; }
        .dim { color: var(--text-dim); }

        .prompt { color: var(--accent); }
        .cmd { color: var(--chrome); }

        .blink {
          color: var(--chrome);
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </>
  )
}
