import React from 'react';

const About = () => {
    return (
        <section id="about" className="about">
            <div className="about-container">
                <div className="about-left">
                    <h2>About <span className="accent">Me</span></h2>
                    <div className="about-title">Passionate Web Developer & IT Student</div>
                    <p>With keen interest in web development from various learning experiences, I am eager to learn more about modern web technologies, frameworks, and best practices. I am also willing to work and grow with a team.</p>
                    <p>I'm passionate about learning and exploring new technologies that interest me, especially in web development and IT. My goal is to finish my studies and achieve my dreams so I can contribute meaningfully to the tech industry.</p>
                    <a href="#contact-info" className="btn-secondary" onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('contact-info')?.scrollIntoView({ behavior: 'smooth' });
                    }}>Information</a>
                </div>
                <div className="about-right">
                    <div className="expertise-list">
                        <div className="expertise-item">
                            <i className="expertise-icon fas fa-code"></i>
                            <h3>Web Development</h3>
                            <p>Creating responsive websites and web applications with modern frameworks.</p>
                        </div>
                        <div className="expertise-item">
                            <i className="expertise-icon fas fa-laptop-code"></i>
                            <h3>Computer Programming</h3>
                            <p>Proficient in multiple languages and eager to master new frameworks.</p>
                        </div>
                        <div className="expertise-item">
                            <i className="expertise-icon fas fa-graduation-cap"></i>
                            <h3>Continuous Learning</h3>
                            <p>Always exploring new technologies and best practices in IT.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
