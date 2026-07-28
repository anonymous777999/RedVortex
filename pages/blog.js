import Head from 'next/head'
import BlogCard from '../components/BlogCard'
import { blogPosts, personalInfo } from '../data/portfolio'

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog — RedVortex</title>
        <meta name="description" content={`${personalInfo.name}'s security writeups and articles`} />
      </Head>

      <section className="section" style={{ paddingTop: '120px' }}>
        <div className="container">
          <h2 className="section-title">// blog —cat writeups</h2>
          <p className="section-subtitle">Security research, tooling guides, and engineering deep dives</p>

          {blogPosts.length > 0 ? (
            <div className="blog-grid">
              {blogPosts.map(post => (
                <BlogCard key={post.title} post={post} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-terminal">
                <p className="mono"><span className="prompt">root@redvortex:~$ </span><span className="cmd">curl writeups.redvortex</span></p>
                <p className="mono output">{' >'} HTTP 202 — Writing in progress...</p>
                <p className="mono output">{' >'} Check back soon for security research, tooling guides, and engineering deep dives.</p>
              </div>
            </div>
          )}

          <div className="medium-link">
            <a href="https://medium.com/@redvortex_hacker" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <span>◆</span> Follow on Medium
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .empty-state {
          margin-bottom: 40px;
        }

        .empty-terminal {
          background: #0d0d14;
          border: 1px solid #1e293b;
          border-radius: 12px;
          padding: 24px 32px;
          font-size: 0.85rem;
          max-width: 500px;
        }

        .empty-terminal p { margin: 6px 0; }

        .prompt { color: #10b981; }
        .cmd { color: #22d3ee; }
        .output { color: #64748b; }

        .medium-link {
          text-align: center;
        }

        @media (max-width: 480px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
