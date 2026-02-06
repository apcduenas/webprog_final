import React, { useState } from 'react';

const Skills = () => {
    const [filter, setFilter] = useState('all');

    const skills = [
        { name: 'JavaScript', category: 'frontend', icon: 'devicon-javascript-plain', color: '#F7DF1E' },
        { name: 'GitHub', category: 'tools', icon: 'devicon-github-original', color: '#ffffff' },
        { name: 'VS Code', category: 'tools', icon: 'devicon-vscode-plain', color: '#007ACC' },
        { name: 'MySQL', category: 'backend', icon: 'devicon-mysql-plain', color: '#4479A1' },
        { name: 'Vue.js', category: 'frontend', icon: 'devicon-vuejs-plain', color: '#4FC08D' },
        { name: 'Figma', category: 'tools', icon: 'devicon-figma-plain', color: '#F24E1E' }
    ];

    const filteredSkills = filter === 'all'
        ? skills
        : skills.filter(skill => skill.category === filter);

    return (
        <section id="skills" className="skills">
            <div className="skills-container">
                <h2><span className="accent">Experience</span></h2>
                <div className="skills-filter">
                    {['all', 'frontend', 'backend', 'tools'].map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="skills-grid">
                    {filteredSkills.map((skill, idx) => (
                        <div key={idx} className="skill-card">
                            <i className={`skill-icon ${skill.icon}`} style={{ color: skill.color }}></i>
                            <h4>{skill.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
