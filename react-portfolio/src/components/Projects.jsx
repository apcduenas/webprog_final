import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "projects"), orderBy("order", "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const projectList = [];
            querySnapshot.forEach((doc) => {
                projectList.push({ id: doc.id, ...doc.data() });
            });
            setProjects(projectList);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <section id="projects" className="projects">
            <div className="projects-container">
                <h2>My <span className="accent">Projects</span></h2>
                <div className="projects-grid">
                    {loading ? (
                        <p style={{ textAlign: 'center', width: '100%' }}>Loading projects...</p>
                    ) : projects.length === 0 ? (
                        // Fallback static project kung wala pang data sa database
                        <div className="project-card">
                            <i className="project-image fas fa-fire"></i>
                            <h3>Portfolio Website</h3>
                            <p>A Ghost Rider themed personal portfolio built with HTML, CSS, and React featuring custom animations and a unique fire cursor effect.</p>
                        </div>
                    ) : (
                        projects.map((project) => (
                            <div key={project.id} className="project-card">
                                {project.imageUrl ? (
                                    <img src={project.imageUrl} alt={project.title} className="project-image-img" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '1rem' }} />
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

