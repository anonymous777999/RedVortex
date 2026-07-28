import Head from 'next/head'
import SkillCard from '../components/SkillCard'
import { skills, personalInfo } from '../data/portfolio'

export default function Arsenal() {
  return (
    <>
      <Head>
        <title>Arsenal — RedVortex</title>
        <meta name="description" content={`${personalInfo.name}'s technical arsenal and skills`} />
      </Head>

      <section className="section" style={{ paddingTop: '120px' }}>
        <div className="container">
          <h2 className="section-title">// arsenal —show_skills</h2>
          <p className="section-subtitle">{skills.length} skill categories loaded</p>

          <div className="arsenal-grid">
            {skills.map(skill => (
              <SkillCard key={skill.category} skill={skill} />
            ))}
          </div>

          <div className="stats-section">
            <h2 className="section-title">// github_stats</h2>
            <p className="section-subtitle">Live metrics</p>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value mono" style={{ color: '#22d3ee' }}>
                  <img src="https://img.shields.io/github/followers/anonymous777999?style=for-the-badge&logo=github&color=22D3EE&labelColor=0A101F" alt="Followers" />
                </div>
                <p className="stat-label mono">GitHub Followers</p>
              </div>
              <div className="stat-card">
                <div className="stat-value mono" style={{ color: '#a78bfa' }}>
                  <img src="https://img.shields.io/github/stars/anonymous777999?style=for-the-badge&logo=github&color=A78BFA&labelColor=0A101F" alt="Stars" />
                </div>
                <p className="stat-label mono">Total Stars</p>
              </div>
              <div className="stat-card">
                <div className="stat-value mono" style={{ color: '#10b981' }}>
                  <img src="https://img.shields.io/github/repos/anonymous777999?style=for-the-badge&logo=github&color=10B981&labelColor=0A101F" alt="Repos" />
                </div>
                <p className="stat-label mono">Public Repositories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .arsenal-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
          margin-bottom: 80px;
        }

        .stats-section {
          padding-top: 40px;
          border-top: 1px solid #1e293b;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .stat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 28px;
          text-align: center;
          transition: all 0.3s;
        }

        .stat-card:hover {
          border-color: #22d3ee;
          transform: translateY(-2px);
        }

        .stat-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .stat-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          color: var(--text-dim);
        }

        @media (max-width: 768px) {
          .arsenal-grid {
            grid-template-columns: 1fr;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
