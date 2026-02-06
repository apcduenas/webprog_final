import React from 'react';

/**
 * A container component that simulates the look of a piece of paper
 * whose edges have been organically scorched by hellfire.
 */
const BurnedPaper = ({ children, className = "" }) => {
    return (
        <div className={`relative p-8 md:p-14 transition-all duration-500 my-8 ${className}`}>
            {/* Outer Glow / Char Shadow - This gives the silhouette a burned look */}
            <div className="absolute inset-2 bg-black opacity-40 blur-xl rounded-lg"></div>

            {/* The Paper Layer with SVG Filtered Edges */}
            <div
                className="absolute inset-4 burned-paper-container"
                style={{
                    backgroundColor: '#c4b391', // Fallback color
                    boxShadow: `
            inset 0 0 10px 2px rgba(0,0,0,0.8),
            inset 0 0 30px 10px rgba(60,20,0,0.6),
            inset 0 0 60px 20px rgba(0,0,0,0.4)
          `,
                    backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 80%),
            url("https://www.transparenttextures.com/patterns/paper-fibers.png")
          `
                }}
            >
                {/* Organic Scorched Border Layer */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        border: '8px solid rgba(20, 5, 0, 0.9)',
                        filter: 'blur(3px)',
                        opacity: 0.9
                    }}
                />

                {/* Ember Heat Layer */}
                <div
                    className="absolute inset-0 pointer-events-none animate-pulse"
                    style={{
                        border: '4px solid rgba(255, 69, 0, 0.3)',
                        filter: 'blur(8px)',
                        mixBlendMode: 'color-dodge'
                    }}
                />

                {/* Ash Layer (Subtle graying on edges) */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, transparent 70%, rgba(40,40,40,0.4) 100%)',
                    }}
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 text-stone-950 font-medium font-body">
                {/* Small "burnt holes" decoration */}
                <div className="absolute -top-6 -left-6 w-12 h-10 bg-black opacity-80 blur-md rounded-full burned-paper-container pointer-events-none"></div>
                <div className="absolute -bottom-4 right-10 w-8 h-8 bg-black opacity-90 blur-sm rounded-full burned-paper-container pointer-events-none"></div>

                <div className="px-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default BurnedPaper;
