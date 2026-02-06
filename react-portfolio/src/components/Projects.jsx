import React from 'react';

const Projects = () => {
    return (
        <section id="projects" className="projects">
            <div className="projects-container">
                <h2>My <span className="accent">Projects</span></h2>
                <div className="projects-grid">
                    <div className="project-card">
                        <i className="project-image fas fa-fire"></i>
                        <h3>Portfolio Website</h3>
                        <p>A Ghost Rider themed personal portfolio built with HTML, CSS, and Vue.js featuring custom animations and a unique fire cursor effect.</p>
                    </div>
                    {/* Add more projects here as needed */}
                </div>
            </div>
        </section>
    );
};

export default Projects;
