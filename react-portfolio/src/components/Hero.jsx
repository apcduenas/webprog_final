import React from 'react';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="hero-content">
                <h1>Hi, I'm <span className="highlight-text">Anthony Duenas</span></h1>
                <p>A second-year Information Technology student at Asia Pacific College. I'm passionate about web development and continuously improving my technical skills.</p>
                <a href="#projects" className="btn-primary" onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}>View My Works</a>
            </div>
            <div className="scroll-indicator">
                <span>Scroll</span>
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </section>
    );
};

export default Hero;
