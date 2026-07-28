import Head from 'next/head'
import ProjectCard from '../components/ProjectCard'
import { projects, personalInfo } from '../data/portfolio'

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects — RedVortex</title>
        <meta name="description" content={`${personalInfo.name}'s projects - ${personalInfo.title}`} />
      </Head>

      <section className="section" style={{ paddingTop: '120px' }}>
        <div className="container">
          <h2 className="section-title">// projects —ls</h2>
          <p className="section-subtitle">All projects — {projects.length} found</p>

          <div className="projects-grid">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 24px;
        }

        @media (max-width: 480px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
