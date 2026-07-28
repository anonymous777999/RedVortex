export default function SkillCard({ skill }) {
  return (
    <div className="skill-card" style={{ '--accent': skill.color }}>
      <h3 className="skill-category">{skill.category}</h3>
      <div className="skill-items">
        {skill.items.map(item => (
          <span key={item} className="skill-item">{item}</span>
        ))}
      </div>

      <style jsx>{`
        .skill-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 24px;
          transition: all 0.3s;
        }

        .skill-card:hover {
          border-color: var(--accent);
          box-shadow: 0 0 30px color-mix(in srgb, var(--accent) 8%, transparent);
          transform: translateY(-2px);
        }

        .skill-category {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1rem;
          font-weight: 600;
          color: var(--accent);
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }

        .skill-items {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-item {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          padding: 5px 12px;
          border-radius: 6px;
          background: color-mix(in srgb, var(--accent) 8%, var(--bg-primary));
          color: var(--text-secondary);
          border: 1px solid color-mix(in srgb, var(--accent) 20%, var(--border));
          transition: all 0.2s;
        }

        .skill-item:hover {
          background: color-mix(in srgb, var(--accent) 20%, var(--bg-primary));
          color: var(--accent);
          border-color: var(--accent);
        }
      `}</style>
    </div>
  )
}
