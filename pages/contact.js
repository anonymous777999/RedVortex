import { useState } from 'react'
import Head from 'next/head'
import { socialLinks, personalInfo } from '../data/portfolio'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(data.get('subject') || 'Contact from Portfolio')}&body=${encodeURIComponent(`Name: ${data.get('name')}\n\nMessage:\n${data.get('message')}`)}`
    window.location.href = mailto
    setSent(true)
  }

  return (
    <>
      <Head>
        <title>Contact — RedVortex</title>
        <meta name="description" content={`Contact ${personalInfo.name}`} />
      </Head>

      <section className="section" style={{ paddingTop: '120px' }}>
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="section-title">// contact —open_channel</h2>
              <p className="section-subtitle">Let's build something secure together</p>

              <div className="info-terminal">
                <p className="mono line"><span className="prompt">root@redvortex:~$ </span><span className="cmd">cat /etc/profile</span></p>
                <p className="mono line dim">{' >'} RedVortex</p>
                <p className="mono line dim">{' >'} {personalInfo.title}</p>
                <p className="mono line dim">{' >'} Location: {personalInfo.location}</p>
                <p className="mono line dim">{' >'} Email: {personalInfo.email}</p>
                <p className="mono line dim">{' >'} Status: Online 🟢</p>
              </div>

              <div className="contact-links">
                <p className="mono label">// socials.cfg</p>
                {socialLinks.map(link => (
                  <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="contact-link mono">
                    <span className="link-icon">
                      {link.icon === 'github' && '⟨⟩'}
                      {link.icon === 'linkedin' && '◈'}
                      {link.icon === 'medium' && '◆'}
                      {link.icon === 'instagram' && '◎'}
                      {link.icon === 'telegram' && '◉'}
                      {link.icon === 'email' && '✉'}
                    </span>
                    <span className="link-name">{link.name}</span>
                    <span className="link-arrow">→</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-form-wrapper">
              {sent ? (
                <div className="sent-message">
                  <div className="sent-terminal">
                    <p className="mono"><span className="prompt">root@redvortex:~$ </span><span className="cmd">./send_message.sh</span></p>
                    <p className="mono" style={{ color: '#10b981' }}>{' >'} Message queued successfully</p>
                    <p className="mono" style={{ color: '#64748b' }}>{' >'} Your email client has opened. Just hit send!</p>
                  </div>
                  <a href="/" className="btn btn-outline" style={{ marginTop: 24 }}>
                    <span>←</span> Back to Home
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-header mono">
                    <span className="prompt">$ </span>
                    <span className="cmd">./compose_message.sh</span>
                  </div>

                  <div className="form-group">
                    <label className="mono label" htmlFor="name">// name</label>
                    <input type="text" id="name" name="name" required placeholder="Your name" className="form-input mono" />
                  </div>

                  <div className="form-group">
                    <label className="mono label" htmlFor="subject">// subject</label>
                    <input type="text" id="subject" name="subject" placeholder="What's this about?" className="form-input mono" />
                  </div>

                  <div className="form-group">
                    <label className="mono label" htmlFor="message">// message</label>
                    <textarea id="message" name="message" required rows="5" placeholder="Your message here..." className="form-input mono" />
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn">
                    <span>▶</span> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        .info-terminal {
          background: #0d0d14;
          border: 1px solid #1e293b;
          border-radius: 12px;
          padding: 20px 24px;
          font-size: 0.85rem;
          margin-bottom: 32px;
        }

        .info-terminal .line { margin: 6px 0; }
        .prompt { color: #10b981; }
        .cmd { color: #22d3ee; }
        .dim { color: #64748b; }

        .contact-links {
          margin-top: 8px;
        }

        .label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: #22d3ee;
          margin-bottom: 12px;
          display: block;
        }

        .contact-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 8px;
          color: #64748b;
          text-decoration: none;
          transition: all 0.2s;
          font-size: 0.85rem;
        }

        .contact-link:hover {
          color: #22d3ee;
          background: rgba(34, 211, 238, 0.05);
          padding-left: 18px;
        }

        .link-icon { width: 24px; font-size: 1rem; }
        .link-name { flex: 1; }
        .link-arrow { opacity: 0; transition: 0.2s; }
        .contact-link:hover .link-arrow { opacity: 1; color: #22d3ee; }

        .contact-form {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 28px;
        }

        .form-header {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 20px;
        }

        .form-header .prompt { color: #10b981; }
        .form-header .cmd { color: #22d3ee; }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group .label {
          margin-bottom: 8px;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          background: #0d0d14;
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text-primary);
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-input:focus {
          border-color: #22d3ee;
          box-shadow: 0 0 15px rgba(34, 211, 238, 0.08);
        }

        .form-input::placeholder {
          color: #334155;
        }

        textarea.form-input {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          width: 100%;
          justify-content: center;
        }

        .sent-message {
          text-align: center;
        }

        .sent-terminal {
          background: #0d0d14;
          border: 1px solid #1e293b;
          border-radius: 12px;
          padding: 24px 32px;
          font-size: 0.85rem;
          text-align: left;
        }

        .sent-terminal p { margin: 6px 0; }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </>
  )
}
