import TerminalHero from '../components/TerminalHero'
import ProjectCard from '../components/ProjectCard'
import SkillCard from '../components/SkillCard'
import Head from 'next/head'
import useReveal from '../hooks/useReveal'
import { projects, skills, personalInfo } from '../data/portfolio'

function RevealSection({ delay = 0, children, className = '' }) {
  const ref = useReveal(delay)
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

export default function Home() {
  const featuredProjects = projects.slice(0, 3)
  const featuredSkills = skills.slice(0, 3)

  return (
    <>
      <Head>
        <title>RedVortex — Ethical Hacker • AI Engineer • Full-Stack Developer</title>
        <meta name="description" content={personalInfo.bio} />
        <meta property="og:title" content="RedVortex — Ethical Hacker • AI Engineer • Full-Stack Developer" />
        <meta property="og:description" content={personalInfo.bio} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RedVortex — Ethical Hacker • AI Engineer • Full-Stack Developer" />
        <meta name="twitter:description" content={personalInfo.bio} />
      </Head>

      <TerminalHero />

      {/* Featured Projects */}
      <section className="section">
        <div className="container">
          <RevealSection>
            <h2 className="section-title">// featured_projects</h2>
            <p className="section-subtitle">What I'm building right now</p>
          </RevealSection>
          <div className="grid-3">
            {featuredProjects.map((project, i) => (
              <RevealSection key={project.id} delay={(i + 1) * 100} className={`reveal-delay-${i + 1}`}>
                <ProjectCard project={project} index={i} />
              </RevealSection>
            ))}
          </div>
          <RevealSection delay={400}>
            <div className="section-footer">
              <a href="/projects" className="btn btn-outline">
                <span>→</span> View All Projects
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="section">
        <div className="container">
          <RevealSection>
            <h2 className="section-title">// core_competencies</h2>
            <p className="section-subtitle">My technical arsenal</p>
          </RevealSection>
          <div className="grid-3">
            {featuredSkills.map((skill, i) => (
              <div key={skill.category} className={`reveal reveal-delay-${i + 1}`}>
                <SkillCard skill={skill} />
              </div>
            ))}
          </div>
          <RevealSection delay={400}>
            <div className="section-footer">
              <a href="/arsenal" className="btn btn-outline">
                <span>→</span> Full Arsenal
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <RevealSection>
            <div className="cta-content">
              <div className="cta-terminal">
                <p className="cta-line"><span className="prompt">root@redvortex:~$ </span><span className="cmd">./contact.sh</span></p>
                <p className="cta-line"><span className="output">{' >'} Initiating secure connection...</span></p>
                <p className="cta-line"><span className="output">{' >'} Ready to collaborate? Let's talk.</span></p>
              </div>
              <a href="/contact" className="btn btn-primary cta-btn">
                <span>▶</span> Start Secure Channel
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      <style jsx>{`
        .section-footer {
          text-align: center;
          margin-top: 40px;
        }

        .cta-section {
          text-align: center;
        }

        .cta-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .cta-terminal {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px 32px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          text-align: left;
          max-width: 500px;
          width: 100%;
          transition: background-color 0.3s, border-color 0.3s;
        }

        .cta-line { margin: 4px 0; }
        .prompt { color: var(--accent); }
        .cmd { color: var(--chrome); }
        .output { color: var(--text-dim); }
      `}</style>
    </>
  )
}
