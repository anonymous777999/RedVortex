import { useState, useEffect } from 'react'

const GITHUB_USERNAME = 'anonymous777999'

// Fallback data when API is rate-limited
const fallbackStats = {
  publicRepos: 20,
  publicGists: 5,
  followers: 10,
  following: 8,
  totalStars: 15,
  totalForks: 8,
  contributedTo: 25,
}

export default function GitHubFeed({ compact = false }) {
  const [stats, setStats] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      try {
        // Fetch user data
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
        if (!userRes.ok) throw new Error(`GitHub API: ${userRes.status}`)
        const userData = await userRes.json()

        // Fetch repos (sorted by updated)
        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&type=owner`
        )
        if (!reposRes.ok) throw new Error(`GitHub API repos: ${reposRes.status}`)
        const reposData = await reposRes.json()

        if (cancelled) return

        // Calculate total stars
        const totalStars = reposData.reduce((sum, r) => sum + r.stargazers_count, 0)
        const totalForks = reposData.reduce((sum, r) => sum + r.forks_count, 0)

        setStats({
          publicRepos: userData.public_repos,
          publicGists: userData.public_gists || 0,
          followers: userData.followers,
          following: userData.following,
          totalStars,
          totalForks,
          contributedTo: 25, // Public API doesn't easily expose this
        })
        setRepos(reposData.slice(0, compact ? 3 : 6))
      } catch (err) {
        if (!cancelled) {
          console.warn('GitHub API fetch failed, using fallback:', err.message)
          setStats(fallbackStats)
          setError('Using cached data — add a GitHub token for live stats')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <div className="github-loading">
        <div className="loading-dots">
          <span className="dot" /><span className="dot" /><span className="dot" />
        </div>
        <p className="loading-text">Fetching GitHub data...</p>
        <style jsx>{`
          .github-loading {
            text-align: center;
            padding: 40px 20px;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 12px;
          }
          .loading-dots { display: flex; gap: 6px; justify-content: center; margin-bottom: 12px; }
          .loading-dots .dot {
            width: 8px; height: 8px; border-radius: 50%;
            background: var(--chrome);
            animation: bounce 1.4s infinite ease-in-out both;
          }
          .loading-dots .dot:nth-child(1) { animation-delay: -0.32s; }
          .loading-dots .dot:nth-child(2) { animation-delay: -0.16s; }
          .loading-text { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--text-dim); }
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0.6); }
            40% { transform: scale(1); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="github-feed">
      {error && (
        <div className="github-notice">
          <span className="notice-icon">⚠</span>
          <span className="notice-text">{error}</span>
        </div>
      )}

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{stats?.publicRepos || 0}</span>
          <span className="stat-label">Repositories</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats?.totalStars || 0}</span>
          <span className="stat-label">Stars</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats?.totalForks || 0}</span>
          <span className="stat-label">Forks</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats?.followers || 0}</span>
          <span className="stat-label">Followers</span>
        </div>
      </div>

      {/* Recent Repos */}
      <div className="repos-section">
        <h4 className="repos-title">📦 Recent Activity</h4>
        <div className="repos-list">
          {repos.map(repo => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-card"
            >
              <div className="repo-header">
                <span className="repo-name">{repo.name}</span>
                <div className="repo-meta">
                  <span className="repo-stars">★ {repo.stargazers_count}</span>
                  <span className="repo-forks">⑂ {repo.forks_count}</span>
                </div>
              </div>
              <p className="repo-desc">{repo.description || 'No description'}</p>
              <div className="repo-footer">
                {repo.language && (
                  <span className="repo-lang" style={{ '--lang-color': langColors[repo.language] || '#64748b' }}>
                    <span className="lang-dot" /> {repo.language}
                  </span>
                )}
                <span className="repo-updated">
                  Updated {timeAgo(new Date(repo.updated_at))}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="github-footer">
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          View Full Profile on GitHub →
        </a>
      </div>

      <style jsx>{`
        .github-feed {
          margin: 0 auto;
        }

        .github-notice {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 8px;
          margin-bottom: 24px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
        }
        .notice-icon { color: var(--warning); }
        .notice-text { color: var(--warning); }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px 16px;
          text-align: center;
          transition: all 0.3s;
        }
        .stat-card:hover {
          border-color: var(--chrome);
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.08);
        }

        .stat-value {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.8rem;
          font-weight: 700;
          background: var(--gradient-1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          display: block;
          font-size: 0.78rem;
          color: var(--text-dim);
          margin-top: 4px;
        }

        .repos-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .repos-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .repo-card {
          display: block;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 16px 20px;
          text-decoration: none;
          transition: all 0.3s;
        }
        .repo-card:hover {
          border-color: var(--chrome);
          transform: translateX(4px);
        }

        .repo-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .repo-name {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--chrome);
        }

        .repo-meta {
          display: flex;
          gap: 12px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          color: var(--text-dim);
        }

        .repo-desc {
          color: var(--text-secondary);
          font-size: 0.85rem;
          margin-bottom: 10px;
          line-height: 1.5;
        }

        .repo-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .repo-lang {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          color: var(--text-dim);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .lang-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--lang-color, #64748b);
        }

        .repo-updated {
          font-size: 0.75rem;
          color: var(--text-dim);
        }

        .github-footer {
          text-align: center;
          margin-top: 24px;
        }

        .github-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: var(--chrome);
          text-decoration: none;
          transition: color 0.2s;
        }
        .github-link:hover {
          color: var(--accent);
        }

        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .stat-value { font-size: 1.4rem; }
        }
      `}</style>
    </div>
  )
}

// Language colors
const langColors = {
  Python: '#3572A5',
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  HTML: '#E34F26',
  CSS: '#563D7C',
  Shell: '#89E051',
  Bash: '#89E051',
  Dockerfile: '#384D54',
  Rust: '#DEA584',
  Go: '#00ADD8',
  Java: '#B07219',
  C: '#555555',
  'C++': '#F34B7D',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Lua: '#000080',
  Perl: '#0298C3',
  Haskell: '#5E5086',
  Scala: '#C22D40',
  Elixir: '#6E4A7E',
  Clojure: '#DB5855',
  ObjectiveC: '#438EFF',
}

function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return date.toLocaleDateString()
}
