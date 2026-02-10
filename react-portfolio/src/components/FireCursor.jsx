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
                this.size = Math.random() * 4 + 2;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * -2 - 0.5;
                this.life = 1;
                this.decay = Math.random() * 0.03 + 0.01;

                if (isLightMode) {
                    this.color = Math.random() > 0.5 ? '#0066cc' : '#00bfff';
                } else {
                    this.color = Math.random() > 0.5 ? '#FF4500' : '#FFD700';
                }
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= this.decay;
                this.size *= 0.96;
            }

            draw() {
                ctx.globalAlpha = this.life;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        let lastSpawnTime = 0;
        const spawnInterval = 16; // Spawn at most every 16ms (~60fps)

        const handleMouseMove = (e) => {
            const now = Date.now();
            if (now - lastSpawnTime < spawnInterval) return;
            lastSpawnTime = now;

            for (let i = 0; i < 2; i++) {
                particles.push(new Particle(e.clientX, e.clientY));
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        let animationFrameId;

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Limited particle count
            if (particles.length > 100) {
                particles.splice(0, particles.length - 100);
            }

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
