import React from 'react';

const PortfolioSection = ({ projects }) => {
  return (
    <section id="portfolio">
      <h2>My Projects</h2>
      <div className="portfolio-grid">
        {projects.map(project => (
          <div key={project.id} className="portfolio-item">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Technologies: {project.technologies.join(', ')}</p>
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>}
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;