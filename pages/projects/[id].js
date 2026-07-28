import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { projects, personalInfo } from '../../data/portfolio'

export default function ProjectDetail() {
  const router = useRouter()
  const { id } = router.query
  const [zoomed, setZoomed] = useState(false)

  if (!router.isReady) {
    return (
      <div className="loading-page">
        <p className="mono" style={{ color: 'var(--text-dim)', textAlign: 'center', paddingTop: '200px' }}>
          Loading project...
        </p>
      </div>
    )
  }

  const project = projects.find(p => p.id === id)

  if (!project) {
    return (
      <>
        <Head><title>Project Not Found — RedVortex</title></Head>
        <section className="section" style={{ paddingTop: '140px', textAlign: 'center' }}>
          <div className="container">
            <h2 className="section-title">// 404 — Project Not Found</h2>
            <p className="section-subtitle">No project matches &quot;{id}&quot;</p>
            <Link href="/projects" className="btn btn-outline">← Back to Projects</Link>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{project.title} — RedVortex</title>
        <meta name="description" content={project.description} />
      </Head>

      <section className="section" style={{ paddingTop: '120px' }}>
        <div className="container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link href="/projects" className="breadcrumb-link">// projects</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{project.id}</span>
          </div>

          {/* Hero */}
          <div className="project-hero" style={{ '--accent': project.color }}>
            <div className="hero-left">
              <div className="status-badge" style={{ background: `${project.color}20`, color: project.color, borderColor: `${project.color}40` }}>
                <span className="status-dot" style={{ background: project.color }} />
                {project.status}
              </div>
              <h1 className="project-title">{project.title}</h1>
              <p className="project-subtitle mono">{project.subtitle}</p>
              <p className="project-desc">{project.longDescription}</p>
              <div className="hero-actions">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ background: project.color, color: '#0a0a0f' }}>
                  ⟨/⟩ View Source
                </a>
                {project.live && project.live !== '#' && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    ▶ Live Demo
                  </a>
                )}
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-terminal" style={{ borderColor: `${project.color}30` }}>
                <div className="term-header-sm">
                  <span style={{ color: project.color }}>~/projects/{project.id}</span>
                </div>
                <div className="term-content">
                  <p><span className="term-key">project</span><span className="term-op">:</span> <span className="term-val">{project.title}</span></p>
                  <p><span className="term-key">category</span><span className="term-op">:</span> <span className="term-val">{project.category}</span></p>
                  <p><span className="term-key">status</span><span className="term-op">:</span> <span className="term-val">{project.status}</span></p>
                  <p><span className="term-key">tech</span><span className="term-op">:</span> <span className="term-val">[{project.tech.length} modules]</span></p>
                  <p><span className="term-key">features</span><span className="term-op">:</span> <span className="term-val">[{project.features.length} implemented]</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="features-section">
            <h3 className="section-subtitle-mono">// features.txt</h3>
            <div className="features-grid">
              {project.features.map((feature, i) => (
                <div key={i} className="feature-card" style={{ borderColor: `${project.color}20` }}>
                  <div className="feature-num" style={{ color: project.color }}>{String(i + 1).padStart(2, '0')}</div>
                  <p className="feature-text">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshot Gallery */}
          {project.screenshot && (
            <div className="screenshot-section">
              <h3 className="section-subtitle-mono">// terminal_output.svg</h3>
              <div className="screenshot-wrapper">
                <div className="screenshot-frame" style={{ '--accent': project.color }}>
                  <div className="screenshot-header">
                    <div className="ss-dots">
                      <span className="ss-dot red" />
                      <span className="ss-dot yellow" />
                      <span className="ss-dot green" />
                    </div>
                    <span className="ss-title mono">root@redvortex:~/tools/{project.id}</span>
                    <button className="ss-expand" onClick={() => setZoomed(true)} title="Expand">
                      ⊞
                    </button>
                  </div>
                  <img
                    src={project.screenshot}
                    alt={`${project.title} terminal output`}
                    className="screenshot-img"
                  />
                </div>
                <p className="screenshot-caption mono">
                  Live terminal output from {project.title} — click to expand
                </p>
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div className="tech-section">
            <h3 className="section-subtitle-mono">// stack.config</h3>
            <div className="tech-stack">
              {project.tech.map(t => (
                <div key={t} className="tech-card" style={{ borderColor: `${project.color}20`, '--glow': project.color }}>
                  <span className="tech-name">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="highlights-section">
            <h3 className="section-subtitle-mono">// capabilities.ls</h3>
            <div className="highlights-grid">
              {project.highlights.map(h => (
                <div key={h} className="highlight-card" style={{ background: `${project.color}08`, borderColor: `${project.color}20`, color: project.color }}>
                  <span className="hl-bracket">[</span>
                  <span className="hl-text">{h}</span>
                  <span className="hl-bracket">]</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="project-nav">
            <Link href="/projects" className="btn btn-outline">← All Projects</Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {zoomed && project.screenshot && (
        <div className="lightbox" onClick={() => setZoomed(false)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setZoomed(false)}>✕</button>
            <img src={project.screenshot} alt={`${project.title} screenshot`} className="lightbox-img" />
          </div>
        </div>
      )}

      <style jsx>{`
        .breadcrumb {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          margin-bottom: 32px;
          display: flex;
          gap: 8px;
        }
        .breadcrumb-link { color: var(--chrome); text-decoration: none; transition: color 0.2s; }
        .breadcrumb-link:hover { color: var(--accent); }
        .breadcrumb-sep { color: var(--text-dim); }
        .breadcrumb-current { color: var(--text-dim); }

        .project-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          margin-bottom: 80px;
          align-items: start;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          padding: 4px 12px;
          border-radius: 4px;
          border: 1px solid;
          margin-bottom: 20px;
        }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; }

        .project-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .project-subtitle { font-size: 1rem; color: var(--accent); margin-bottom: 24px; }

        .project-desc {
          color: var(--text-secondary);
          font-size: 1.02rem;
          line-height: 1.8;
          margin-bottom: 32px;
        }

        .hero-actions { display: flex; gap: 12px; }

        .hero-terminal {
          background: #0d0d14;
          border: 1px solid;
          border-radius: 12px;
          overflow: hidden;
        }

        .term-header-sm {
          padding: 10px 16px;
          background: #111118;
          border-bottom: 1px solid var(--border);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
        }

        .term-content {
          padding: 20px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.82rem;
          line-height: 2.2;
        }

        .term-key { color: var(--chrome); }
        .term-op { color: var(--text-dim); }
        .term-val { color: var(--text-secondary); }

        .section-subtitle-mono {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.1rem;
          color: var(--text-dim);
          margin-bottom: 32px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
          margin-bottom: 80px;
        }

        .feature-card {
          background: var(--bg-card);
          border: 1px solid;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          gap: 16px;
          transition: transform 0.2s, border-color 0.2s;
        }
        .feature-card:hover { transform: translateY(-2px); }

        .feature-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          font-weight: 700;
          flex-shrink: 0;
          opacity: 0.6;
        }

        .feature-text {
          color: var(--text-secondary);
          font-size: 0.92rem;
          line-height: 1.6;
        }

        .screenshot-section { margin-bottom: 80px; }

        .screenshot-wrapper {
          max-width: 760px;
        }

        .screenshot-frame {
          border: 1px solid;
          border-radius: 12px;
          overflow: hidden;
          background: #0d0d14;
          transition: all 0.3s;
        }

        .screenshot-frame:hover {
          box-shadow: 0 0 30px color-mix(in srgb, var(--accent) 15%, transparent);
        }

        .screenshot-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: #111118;
          border-bottom: 1px solid var(--border);
        }

        .ss-dots { display: flex; gap: 8px; }
        .ss-dot { width: 12px; height: 12px; border-radius: 50%; }
        .ss-dot.red { background: #ff5f56; }
        .ss-dot.yellow { background: #ffbd2e; }
        .ss-dot.green { background: #27c93f; }

        .ss-title {
          flex: 1;
          font-size: 0.78rem;
          color: var(--text-dim);
          margin-left: 8px;
        }

        .ss-expand {
          background: none;
          border: 1px solid var(--border);
          border-radius: 4px;
          color: var(--text-dim);
          cursor: pointer;
          padding: 2px 8px;
          font-size: 0.85rem;
          transition: all 0.2s;
        }
        .ss-expand:hover {
          color: var(--chrome);
          border-color: var(--chrome);
        }

        .screenshot-img {
          width: 100%;
          height: auto;
          display: block;
        }

        .screenshot-caption {
          text-align: center;
          font-size: 0.78rem;
          color: var(--text-dim);
          margin-top: 12px;
        }

        .tech-section { margin-bottom: 80px; }

        .tech-stack { display: flex; flex-wrap: wrap; gap: 12px; }

        .tech-card {
          background: var(--bg-card);
          border: 1px solid;
          border-radius: 8px;
          padding: 12px 20px;
          transition: all 0.3s;
        }
        .tech-card:hover {
          box-shadow: 0 0 20px color-mix(in srgb, var(--glow) 20%, transparent);
          transform: translateY(-2px);
        }

        .tech-name {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        .highlights-section { margin-bottom: 80px; }

        .highlights-grid { display: flex; flex-wrap: wrap; gap: 12px; }

        .highlight-card {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          padding: 8px 16px;
          border-radius: 6px;
          border: 1px solid;
          display: flex;
          gap: 8px;
          transition: all 0.2s;
        }
        .highlight-card:hover { transform: translateY(-2px); }

        .hl-bracket { opacity: 0.4; }
        .hl-text { font-weight: 500; }

        .project-nav {
          text-align: center;
          padding-top: 40px;
          border-top: 1px solid var(--border);
        }

        /* Lightbox */
        .lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0,0,0,0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          animation: fadeIn 0.2s ease;
        }

        .lightbox-content {
          position: relative;
          max-width: 95vw;
          max-height: 90vh;
        }

        .lightbox-img {
          width: 100%;
          height: auto;
          max-height: 85vh;
          object-fit: contain;
          border-radius: 8px;
          border: 1px solid var(--border);
        }

        .lightbox-close {
          position: absolute;
          top: -40px;
          right: 0;
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 8px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 900px) {
          .project-hero { grid-template-columns: 1fr; gap: 32px; }
          .project-title { font-size: 1.8rem; }
          .features-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}
