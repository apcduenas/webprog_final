import React from 'react';

/**
 * FlameText splits a string into individual characters and applies
 * a staggered ignite animation (flame effect).
 */
const FlameText = ({ text, className = "", ignite = true }) => {
    if (!text) return null;

    return (
        <span className={`staggered-container ${className}`}>
            {text.split('').map((char, index) => (
                <span
                    key={index}
                    className="stagger-char"
                    style={{
                        animationDelay: `${index * 0.05}s`,
                        whiteSpace: char === ' ' ? 'pre' : 'normal'
                    }}
                >
                    <span className={ignite ? 'ignite-text' : ''}>
                        {char}
                    </span>
                </span>
            ))}
        </span>
    );
};

export default FlameText;
