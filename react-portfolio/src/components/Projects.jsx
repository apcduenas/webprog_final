import { useState, useEffect } from 'react';
import FlameText from './FlameText';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/projects`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) throw new Error(`Server error: ${response.status}`);

            const result = await response.json();
            setProjects(result.data || []);
        } catch (err) {
            console.error('Error fetching projects:', err);
            // Fallback: show static projects if API not available
            setProjects([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="projects" className="projects">
            <div className="projects-container">
                <h2><FlameText text="My Projects" /></h2>
                <div className="projects-grid">
                    {loading ? (
                        <p style={{ textAlign: 'center', width: '100%' }}>Loading projects...</p>
                    ) : projects.length === 0 ? (
                        // Static fallback cards if no projects in DB
                        <>
                            <div className="project-card">
                                <i className="project-image fas fa-fire"></i>
                                <h3>Portfolio Website</h3>
                                <p>A Ghost Rider themed personal portfolio built with React featuring custom animations, fire cursor, and a REST API guestbook powered by Flask + Supabase.</p>
                            </div>
                            <div className="project-card">
                                <i className="project-image fas fa-code"></i>
                                <h3>Web Programming Projects</h3>
                                <p>Various web development projects created during my BSIT studies at Asia Pacific College, focusing on modern web technologies.</p>
                            </div>
                            <div className="project-card">
                                <i className="project-image fas fa-database"></i>
                                <h3>Database Applications</h3>
                                <p>Projects involving database design and integration, including Supabase-powered full-stack applications with REST API backends.</p>
                            </div>
                        </>
                    ) : (
                        projects.map((project) => (
                            <div key={project.id} className="project-card">
                                {project.image_url ? (
                                    <img src={project.image_url} alt={project.title} className="project-image-img" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '1rem' }} />
                                ) : (
                                    <i className={`${project.icon || 'fas fa-code'} project-image`}></i>
                                )}
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>View Project</a>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;
