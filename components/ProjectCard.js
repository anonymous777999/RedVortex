export default function ProjectCard({ project, index }) {
  return (
    <div className="project-card" style={{ '--accent-color': project.color }}>
      <div className="card-glow" />
      <div className="card-header">
        <div className="card-icon" style={{ background: `${project.color}20`, color: project.color }}>
          {index + 1}
        </div>
        <div className="card-titles">
          <h3 className="card-title">{project.title}</h3>
          <p className="card-subtitle">{project.subtitle}</p>
        </div>
      </div>

      <p className="card-description">{project.description}</p>

      <div className="card-highlights">
        {project.highlights.map(h => (
          <span key={h} className="highlight-tag" style={{ background: `${project.color}15`, color: project.color, borderColor: `${project.color}30` }}>
            {h}
          </span>
        ))}
      </div>

      <div className="card-tech">
        {project.tech.map(t => (
          <span key={t} className="tech-tag">{t}</span>
        ))}
      </div>

      <div className="card-actions">
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="card-btn primary" style={{ background: project.color, color: '#0a0a0f' }}>
          <span>⟨</span> Source <span>⟩</span>
        </a>
        {project.live && project.live !== '#' && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="card-btn secondary">
            <span>▶</span> Live Demo
          </a>
        )}
      </div>

      <style jsx>{`
        .project-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
        }

        .project-card:hover {
          transform: translateY(-6px);
          border-color: var(--accent-color);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px color-mix(in srgb, var(--accent-color) 10%, transparent);
        }

        .card-glow {
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, color-mix(in srgb, var(--accent-color) 8%, transparent), transparent 70%);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }

        .project-card:hover .card-glow { opacity: 1; }

        .card-header {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .card-titles { flex: 1; }

        .card-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .card-subtitle {
          font-size: 0.85rem;
          color: var(--text-dim);
          margin: 2px 0 0 0;
        }

        .card-description {
          color: var(--text-secondary);
          font-size: 0.92rem;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .card-highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .highlight-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          padding: 3px 10px;
          border-radius: 4px;
          border: 1px solid;
        }

        .card-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 24px;
        }

        .tech-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          padding: 3px 10px;
          border-radius: 4px;
          background: rgba(148, 163, 184, 0.08);
          color: var(--text-dim);
          border: 1px solid var(--border);
        }

        .card-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .card-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.82rem;
          font-weight: 500;
          padding: 8px 20px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s;
          border: 1px solid transparent;
        }

        .card-btn.primary:hover {
          filter: brightness(1.15);
          transform: translateY(-1px);
        }

        .card-btn.secondary {
          background: transparent;
          color: var(--text-secondary);
          border-color: var(--border);
        }

        .card-btn.secondary:hover {
          border-color: var(--accent-color);
          color: var(--accent-color);
        }
      `}</style>
    </div>
  )
}
