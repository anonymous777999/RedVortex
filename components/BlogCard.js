export default function BlogCard({ post }) {
  return (
    <a href={post.medium} target="_blank" rel="noopener noreferrer" className="blog-card">
      <div className="blog-meta">
        <span className="blog-date">{post.date}</span>
        <span className="blog-read">{post.readTime}</span>
      </div>
      <h3 className="blog-title">{post.title}</h3>
      <p className="blog-excerpt">{post.excerpt}</p>
      <div className="blog-tags">
        {post.tags.map(tag => (
          <span key={tag} className="blog-tag">{tag}</span>
        ))}
      </div>
      <span className="blog-link">Read on Medium →</span>

      <style jsx>{`
        .blog-card {
          display: block;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 24px;
          text-decoration: none;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .blog-card:hover {
          transform: translateY(-4px);
          border-color: #22d3ee;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        .blog-meta {
          display: flex;
          gap: 12px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: var(--text-dim);
          margin-bottom: 12px;
        }

        .blog-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
          transition: color 0.2s;
        }

        .blog-card:hover .blog-title {
          color: #22d3ee;
        }

        .blog-excerpt {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .blog-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }

        .blog-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          padding: 3px 10px;
          border-radius: 4px;
          background: rgba(34, 211, 238, 0.08);
          color: #22d3ee;
          border: 1px solid rgba(34, 211, 238, 0.15);
        }

        .blog-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.82rem;
          color: #a78bfa;
          transition: all 0.2s;
        }

        .blog-card:hover .blog-link {
          color: #22d3ee;
        }
      `}</style>
    </a>
  )
}
