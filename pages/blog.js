import Head from 'next/head'
import BlogCard from '../components/BlogCard'
import { blogPosts as fallbackPosts, personalInfo } from '../data/portfolio'

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').trim()
}

export async function getStaticProps() {
  const mediumFeed = 'https://medium.com/feed/@redvortex_hacker'
  let posts = []

  try {
    const Parser = (await import('rss-parser')).default
    const parser = new Parser({
      customFields: {
        item: ['content:encoded', 'dc:creator'],
      },
    })
    const feed = await parser.parseURL(mediumFeed)

    posts = feed.items.slice(0, 8).map((item) => {
      const content = stripHtml(item['content:encoded'] || item.content || '')
      const excerpt = content.length > 200
        ? content.substring(0, 200).replace(/\s+\S*$/, '') + '…'
        : content

      const tags = (item.categories || []).slice(0, 4)
      const pubDate = item.pubDate
        ? new Date(item.pubDate).toISOString().split('T')[0]
        : ''

      const readTime = content
        ? `${Math.max(1, Math.ceil(content.split(/\s+/).length / 200))} min read`
        : '5 min read'

      return {
        title: item.title || 'Untitled',
        excerpt: excerpt || 'Read on Medium…',
        date: pubDate,
        readTime,
        tags: tags.length ? tags : ['Medium'],
        medium: item.link || 'https://medium.com/@redvortex_hacker',
      }
    })
  } catch (err) {
    console.error('Failed to fetch Medium RSS:', err.message)
  }

  return {
    props: {
      blogPosts: posts.length > 0 ? posts : fallbackPosts,
    },
    revalidate: 3600, // Revalidate every hour
  }
}

export default function Blog({ blogPosts }) {
  return (
    <>
      <Head>
        <title>Blog — RedVortex</title>
        <meta name="description" content={`${personalInfo.name}'s security writeups and articles`} />
      </Head>

      <section className="section" style={{ paddingTop: '120px' }}>
        <div className="container">
          <h2 className="section-title">// blog —cat writeups</h2>
          <p className="section-subtitle">Security research, tooling guides, and engineering deep dives — auto-pulled from Medium</p>

          {blogPosts.length > 0 ? (
            <div className="blog-grid">
              {blogPosts.map((post, i) => (
                <BlogCard key={post.title + i} post={post} />
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

          <p className="mono rss-note">📡 Live feed from Medium • Updates every hour</p>
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
          margin-bottom: 16px;
        }

        .rss-note {
          text-align: center;
          font-size: 0.78rem;
          color: #334155;
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
