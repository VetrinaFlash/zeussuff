/* ========================================
   ZEUSS BACKGROUND & ANIMATION EFFECTS
   ======================================== */

class BackgroundEffects {
    constructor() {
        this.canvas = document.getElementById('backCanvas') || document.getElementById('starsCanvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;

        this.initCanvas();
        this.createParticles();
        this.animate();
        this.setupEventListeners();
    }

    initCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }

    createParticles() {
        const particleCount = window.innerWidth < 768 ? 30 : 50;

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomColor(),
                pulseSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }

    getRandomColor() {
        const colors = ['#00ff00', '#00ffff', '#ff00ff', '#00ff4133'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        // Clear canvas with gradient
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, 'rgba(10, 10, 10, 0.1)');
        gradient.addColorStop(0.5, 'rgba(10, 20, 40, 0.1)');
        gradient.addColorStop(1, 'rgba(10, 10, 10, 0.1)');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off walls
            if (particle.x - particle.radius < 0 || particle.x + particle.radius > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y - particle.radius < 0 || particle.y + particle.radius > this.canvas.height) {
                particle.vy *= -1;
            }

            // Gravity towards mouse
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const angle = Math.atan2(dy, dx);
                const force = (150 - distance) / 150;
                particle.vx += Math.cos(angle) * force * 0.1;
                particle.vy += Math.sin(angle) * force * 0.1;
            }

            // Draw particle
            this.drawParticle(particle);
        });

        // Draw connections between nearby particles
        this.drawConnections();

        requestAnimationFrame(() => this.animate());
    }

    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = particle.color;
        this.ctx.globalAlpha = particle.opacity;
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.strokeStyle = `rgba(0, 255, 0, ${(1 - distance / 100) * 0.3})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        document.addEventListener('mouseleave', () => {
            this.mouseX = this.canvas.width / 2;
            this.mouseY = this.canvas.height / 2;
        });
    }
}

/* Advanced Animation Utilities */
class AnimationUtils {
    static morphShape(element, fromShape, toShape) {
        gsap.fromTo(element,
            { '--shape': fromShape },
            { '--shape': toShape, duration: 1, ease: 'elastic.out(1.2, 0.75)' }
        );
    }

    static floatIn(element, delay = 0) {
        gsap.fromTo(element,
            { opacity: 0, y: 50, scale: 0.8, rotation: -45 },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                rotation: 0, 
                duration: 0.8,
                ease: 'elastic.out(1.2, 0.75)',
                delay: delay
            }
        );
    }

    static slideIn(element, direction = 'left', delay = 0) {
        const fromObj = direction === 'left' 
            ? { x: -100, opacity: 0 }
            : { x: 100, opacity: 0 };

        gsap.fromTo(element,
            fromObj,
            { 
                x: 0, 
                opacity: 1, 
                duration: 0.8,
                ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                delay: delay
            }
        );
    }

    static rotateIn(element, delay = 0) {
        gsap.fromTo(element,
            { opacity: 0, rotation: -180, scale: 0 },
            { 
                opacity: 1, 
                rotation: 0, 
                scale: 1, 
                duration: 1,
                ease: 'elastic.out(1.2, 0.75)',
                delay: delay
            }
        );
    }

    static glitchEffect(element, duration = 0.5) {
        gsap.timeline()
            .to(element, { x: -5, duration: 0.05 }, 0)
            .to(element, { x: 5, duration: 0.05 })
            .to(element, { x: -3, duration: 0.05 })
            .to(element, { x: 0, duration: 0.05 });
    }

    static neonGlow(element, color = '#00ff00', intensity = 1) {
        gsap.to(element, {
            boxShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`,
            textShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
            duration: 0.3,
            repeat: -1,
            yoyo: true
        });
    }

    static staggerText(element) {
        const text = element.innerText;
        let html = '';
        for (let i = 0; i < text.length; i++) {
            html += `<span style="display: inline-block;">${text[i]}</span>`;
        }
        element.innerHTML = html;

        gsap.fromTo(element.querySelectorAll('span'),
            { opacity: 0, y: 20 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.4,
                stagger: 0.05,
                ease: 'back.out(1.7)'
            }
        );
    }

    static slideCounter(element, from, to, duration = 1) {
        const obj = { value: from };
        gsap.to(obj, {
            value: to,
            duration: duration,
            ease: 'power2.out',
            onUpdate: () => {
                element.innerHTML = Math.floor(obj.value);
            }
        });
    }
}

// Initialize background effects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BackgroundEffects();
});

// Export to window
window.AnimationUtils = AnimationUtils;
