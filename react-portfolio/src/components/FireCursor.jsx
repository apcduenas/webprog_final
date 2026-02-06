import React, { useEffect, useRef } from 'react';

const FireCursor = ({ isLightMode }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 5 + 2;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * -3 - 1;
                this.life = 1;
                this.decay = Math.random() * 0.02 + 0.01;

                if (isLightMode) {
                    // Light mode: Blue flames
                    this.color = Math.random() > 0.5 ? '#0066cc' : '#00bfff'; // Blue tones
                } else {
                    // Dark mode: Orange/Gold flames
                    this.color = Math.random() > 0.5 ? '#FF4500' : '#FFD700'; // Hellfire Orange or Success Gold
                }
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= this.decay;
                this.size *= 0.97;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.life;
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 15;
                ctx.shadowColor = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        let mouseX = 0;
        let mouseY = 0;

        // We need to handle mouse move to spawn particles. 
        // Since this effect relies on mouse movement, we'll add the listener to window.
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            for (let i = 0; i < 3; i++) {
                particles.push(new Particle(mouseX, mouseY));
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        let animationFrameId;

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw();

                if (particles[i].life <= 0 || particles[i].size < 0.5) {
                    particles.splice(i, 1);
                }
            }

            animationFrameId = requestAnimationFrame(animateParticles);
        };

        animateParticles();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isLightMode]); // Re-run effect when isLightMode changes to update particle color logic for NEW particles

    return (
        <canvas
            ref={canvasRef}
            id="fireCanvas"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
            }}
        />
    );
};

export default FireCursor;
