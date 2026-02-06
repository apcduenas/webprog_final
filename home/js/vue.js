if (typeof Vue === 'undefined') {
    console.error("Vue is not defined. Make sure you have <script src='https://unpkg.com/vue@3/dist/vue.global.js'></script> in your HTML.");
    alert("Vue is not loaded. Check the console (F12) for details.");
}

const app = Vue.createApp({
  data() {
    return {
      visitorName: '',
      visitorComment: '',
      isPublic: false,
      guestbookEntries: [
        { name: 'Sample Visitor', comment: 'Great portfolio!', public: true, liked: false }
      ],
      images: [
        { src: './images/Picture1.jpg', alt: 'Picture 1' },
        { src: './images/Picture2.jpg', alt: 'Picture 2' },
        { src: './images/Picture3.jpg', alt: 'Picture 3' },
        { src: './images/Picture4.jpg', alt: 'Picture 4' }
      ],
      selected: null
    }
  }, 
  methods: {
    addEntry() {
      this.guestbookEntries.unshift({
        name: this.visitorName,
        comment: this.visitorComment,
        public: this.isPublic,
        liked: false
      })
      this.visitorName = ''
      this.visitorComment = ''
      this.isPublic = false
    },
    open(index) {
      this.selected = index
    },
    close() {
      this.selected = null
    },
    next() {
      if (this.selected === null) return
      this.selected = (this.selected + 1) % this.images.length
    },
    prev() {
      if (this.selected === null) return
      this.selected = (this.selected - 1 + this.images.length) % this.images.length
    }
  }
})

app.mount('#app')

// INTRO VIDEO INTERACTION
document.addEventListener('DOMContentLoaded', () => {
    // FIRE CURSOR PARTICLE SYSTEM
    const canvas = document.getElementById('fireCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particle array
    const particles = [];
    
    // Particle class
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 2;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * -3 - 1;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.01;
            
            // Check if light mode is active
            const isLightMode = document.documentElement.classList.contains('light-mode');
            
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
    
    // Mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Spawn multiple particles at mouse position
        for (let i = 0; i < 3; i++) {
            particles.push(new Particle(mouseX, mouseY));
        }
    });
    
    // Animation loop
    function animateParticles() {
        // Clear canvas completely for transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            
            // Remove dead particles
            if (particles[i].life <= 0 || particles[i].size < 0.5) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    // Start animation
    animateParticles();
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    const ghostRiderContainer = document.getElementById('ghostRiderContainer');
    const ghostRiderVid = document.getElementById('ghostRiderVid');
    
    if (ghostRiderVid) {
        ghostRiderVid.src = './images/Intro.mp4';
        ghostRiderVid.play().catch(error => {
            console.log("Autoplay prevented:", error);
        });
        
        // Function to skip video
        const skipIntroVideo = () => {
            ghostRiderContainer.style.transition = 'opacity 0.8s ease-out';
            ghostRiderContainer.style.opacity = '0';
            setTimeout(() => {
                ghostRiderContainer.style.display = 'none';
            }, 800);
        };
        
        // Click anywhere to skip
        ghostRiderContainer.style.cursor = 'pointer';
        ghostRiderContainer.addEventListener('click', skipIntroVideo);
        
        // Press any key to skip
        const keySkipHandler = (e) => {
            skipIntroVideo();
            document.removeEventListener('keydown', keySkipHandler);
        };
        document.addEventListener('keydown', keySkipHandler);
        
        // Remove intro video container after it finishes
        ghostRiderVid.onended = () => {
            document.removeEventListener('keydown', keySkipHandler);
            skipIntroVideo();
        };
        
        // Fallback in case onended doesn't fire
        setTimeout(() => {
            if (ghostRiderContainer.style.display !== 'none') {
                document.removeEventListener('keydown', keySkipHandler);
                skipIntroVideo();
            }
        }, 6000);
    }

    // THEME TOGGLE
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        htmlElement.classList.add('light-mode');
        themeToggle.textContent = '☀️';
    } else {
        htmlElement.classList.remove('light-mode');
        themeToggle.textContent = '🌙';
    }
    
    themeToggle.addEventListener('click', () => {
        const isLightMode = htmlElement.classList.contains('light-mode');
        
        if (isLightMode) {
            // Switch to dark mode
            htmlElement.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '🌙';
            
            // Play dark mode effects video (Ghost Rider)
            const animationContainer = document.createElement('div');
            animationContainer.id = 'darkModeAnimation';
            animationContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                background-color: #000;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            const video = document.createElement('video');
            video.src = './images/GhostRiderVid.mp4';
            video.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
            `;
            video.autoplay = true;
            video.muted = true;
            
            animationContainer.appendChild(video);
            document.body.appendChild(animationContainer);
            
            // Function to skip video
            const skipVideo = () => {
                if (animationContainer.parentNode) {
                    animationContainer.remove();
                }
            };
            
            // Click anywhere to skip
            animationContainer.style.cursor = 'pointer';
            animationContainer.addEventListener('click', skipVideo);
            
            // Press any key to skip
            const keySkipHandler = (e) => {
                skipVideo();
                document.removeEventListener('keydown', keySkipHandler);
            };
            document.addEventListener('keydown', keySkipHandler);
            
            video.addEventListener('ended', () => {
                document.removeEventListener('keydown', keySkipHandler);
                animationContainer.remove();
            });
            
            setTimeout(() => {
                document.removeEventListener('keydown', keySkipHandler);
                if (animationContainer.parentNode) {
                    animationContainer.remove();
                }
            }, 6000);
        } else {
            // Switch to light mode - show animation video
            htmlElement.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '☀️';
            
            // Play light mode effects video
            const animationContainer = document.createElement('div');
            animationContainer.id = 'lightModeAnimation';
            animationContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                background-color: #000;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            const video = document.createElement('video');
            video.src = './images/Effect.mp4';
            video.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
            `;
            video.autoplay = true;
            video.muted = true;
            
            animationContainer.appendChild(video);
            document.body.appendChild(animationContainer);
            
            // Function to skip video
            const skipVideo = () => {
                if (animationContainer.parentNode) {
                    animationContainer.remove();
                }
            };
            
            // Click anywhere to skip
            animationContainer.style.cursor = 'pointer';
            animationContainer.addEventListener('click', skipVideo);
            
            // Press any key to skip
            const keySkipHandler = (e) => {
                skipVideo();
                document.removeEventListener('keydown', keySkipHandler);
            };
            document.addEventListener('keydown', keySkipHandler);
            
            // Remove animation container after video ends
            video.addEventListener('ended', () => {
                document.removeEventListener('keydown', keySkipHandler);
                animationContainer.remove();
            });
            
            // Fallback: remove after 3 seconds if video doesn't exist
            setTimeout(() => {
                document.removeEventListener('keydown', keySkipHandler);
                if (animationContainer.parentNode) {
                    animationContainer.remove();
                }
            }, 3000);
        }
    });

    // SKILLS FILTER
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            skillCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (categories.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 0);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // SMOOTH SCROLLING
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});