import TerminalHero from '../components/TerminalHero'
import ProjectCard from '../components/ProjectCard'
import SkillCard from '../components/SkillCard'
import Head from 'next/head'
import { projects, skills, personalInfo } from '../data/portfolio'

export default function Home() {
  const featuredProjects = projects.slice(0, 3)
  const featuredSkills = skills.slice(0, 3)

  return (
    <>
      <Head>
        <title>RedVortex — Ethical Hacker • AI Engineer • Full-Stack Developer</title>
        <meta name="description" content={personalInfo.bio} />
      </Head>

      <TerminalHero />

      {/* Featured Projects */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">// featured_projects</h2>
          <p className="section-subtitle">What I'm building right now</p>
          <div className="grid-3">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
          <div className="section-footer">
            <a href="/projects" className="btn btn-outline">
              <span>→</span> View All Projects
            </a>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">// core_competencies</h2>
          <p className="section-subtitle">My technical arsenal</p>
          <div className="grid-3">
            {featuredSkills.map(skill => (
              <SkillCard key={skill.category} skill={skill} />
            ))}
          </div>
          <div className="section-footer">
            <a href="/arsenal" className="btn btn-outline">
              <span>→</span> Full Arsenal
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container cta-content">
          <div className="cta-terminal">
            <p className="cta-line"><span className="prompt">root@redvortex:~$ </span><span className="cmd">./contact.sh</span></p>
            <p className="cta-line"><span className="output">{' >'} Initiating secure connection...</span></p>
            <p className="cta-line"><span className="output">{' >'} Ready to collaborate? Let's talk.</span></p>
          </div>
          <a href="/contact" className="btn btn-primary cta-btn">
            <span>▶</span> Start Secure Channel
          </a>
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
          background: #0d0d14;
          border: 1px solid #1e293b;
          border-radius: 12px;
          padding: 24px 32px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          text-align: left;
          max-width: 500px;
          width: 100%;
        }

        .cta-line { margin: 4px 0; }
        .prompt { color: #10b981; }
        .cmd { color: #22d3ee; }
        .output { color: #64748b; }
      `}</style>
    </>
  )
}
