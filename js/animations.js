/* ========================================
   ZEUSS ANIMATIONS ENGINE
   ======================================== */

class ZeussAnimations {
    constructor() {
        this.timeline = gsap.timeline();
        this.registerCustomEases();
        this.setupScrollAnimations();
    }

    registerCustomEases() {
        // Custom ease functions
        gsap.registerEffect({
            name: 'bounce',
            effect: (targets, config) => {
                return gsap.to(targets, {
                    y: -config.distance || 50,
                    duration: config.duration || 0.4,
                    ease: 'power2.out',
                    yoyo: true,
                    repeat: 1
                });
            },
            extendTimeline: true
        });
    }

    setupScrollAnimations() {
        // Register ScrollTrigger if available
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // Animate elements on scroll
            gsap.utils.toArray('[data-scroll-animate]').forEach(element => {
                gsap.fromTo(element,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'elastic.out(1.2, 0.75)',
                        scrollTrigger: {
                            trigger: element,
                            start: 'top 80%',
                            end: 'top 20%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        }
    }

    /* HIGH-END ANIMATIONS */

    lineReveal(element, duration = 1) {
        gsap.fromTo(element,
            { width: 0, opacity: 0 },
            { width: '100%', opacity: 1, duration: duration, ease: 'power2.out' }
        );
    }

    textReveal(element, duration = 0.8) {
        const text = element.innerText;
        element.innerHTML = text
            .split('')
            .map(char => `<span style="opacity: 0;">${char}</span>`)
            .join('');

        gsap.to(element.querySelectorAll('span'),
            { 
                opacity: 1, 
                duration: duration / text.length,
                stagger: {
                    amount: duration,
                    from: 'random'
                },
                ease: 'power2.out'
            }
        );
    }

    wordReveal(element, duration = 0.8) {
        const words = element.innerText.split(' ');
        element.innerHTML = words
            .map(word => `<span style="display: inline-block; opacity: 0; margin-right: 5px;">${word}</span>`)
            .join('');

        gsap.to(element.querySelectorAll('span'),
            { 
                opacity: 1, 
                duration: duration / words.length,
                stagger: {
                    amount: duration,
                    from: 'start'
                },
                ease: 'back.out(1.7)'
            }
        );
    }

    parallaxLayer(element, offset = 50) {
        gsap.to(element, {
            y: offset,
            scrollTrigger: {
                trigger: element,
                scrub: true
            },
            ease: 'none'
        });
    }

    hexShift(element, duration = 1) {
        gsap.timeline({ repeat: -1 })
            .to(element, { rotation: 360, duration: duration, ease: 'none' })
            .to(element, { rotation: 0, duration: 0 }, 0);
    }

    magneticCursor(element) {
        const elementBounds = element.getBoundingClientRect();
        const magneticX = elementBounds.width / 2;
        const magneticY = elementBounds.height / 2;

        element.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX - elementBounds.left - magneticX;
            const mouseY = e.clientY - elementBounds.top - magneticY;

            gsap.to(element, {
                x: mouseX * 0.3,
                y: mouseY * 0.3,
                duration: 0.5,
                overwrite: 'auto'
            });
        });

        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.3
            });
        });
    }

    liquidSwipe(element, duration = 0.8) {
        const svgWave = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgWave.setAttribute('viewBox', '0 0 100 100');
        svgWave.setAttribute('preserveAspectRatio', 'none');
        svgWave.style.width = '100%';
        svgWave.style.height = '100%';

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M0,50 Q25,25 50,50 T100,50 L100,100 L0,100');
        path.setAttribute('fill', 'url(#gradient)');

        svgWave.appendChild(path);
        element.style.clip = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

        gsap.to(path, {
            attr: { d: 'M0,50 Q25,75 50,50 T100,50 L100,0 L0,0' },
            duration: duration,
            ease: 'sine.in'
        });
    }

    blurIn(element, duration = 0.8) {
        gsap.fromTo(element,
            { opacity: 0, filter: 'blur(20px)' },
            { opacity: 1, filter: 'blur(0px)', duration: duration, ease: 'power2.out' }
        );
    }

    splitType(element, duration = 0.8) {
        const lines = element.innerText.split('\n');
        element.innerHTML = lines
            .map(line => `<div style="overflow: hidden;"><span style="display: inline-block; opacity: 0; transform: translateY(100%);">${line}</span></div>`)
            .join('');

        gsap.to(element.querySelectorAll('span'),
            { 
                opacity: 1,
                y: 0,
                duration: duration / lines.length,
                stagger: duration / lines.length,
                ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
            }
        );
    }

    sequenceAnimation(elements, duration = 0.6) {
        gsap.fromTo(elements,
            { opacity: 0, y: 30, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: duration,
                stagger: duration / elements.length,
                ease: 'elastic.out(1.2, 0.75)'
            }
        );
    }

    pulseScale(element, maxScale = 1.2, duration = 0.8) {
        gsap.timeline({ repeat: -1 })
            .to(element, { scale: maxScale, duration: duration / 2, ease: 'sine.inOut' })
            .to(element, { scale: 1, duration: duration / 2, ease: 'sine.inOut' });
    }

    rotateCard(element, duration = 0.8) {
        gsap.fromTo(element,
            { rotateY: -90, opacity: 0 },
            { rotateY: 0, opacity: 1, duration: duration, ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
        );
    }

    zoomIn(element, duration = 0.6) {
        gsap.fromTo(element,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: duration, ease: 'back.out(1.7)' }
        );
    }

    slideAndFade(element, direction = 'left', duration = 0.8) {
        const fromX = direction === 'left' ? -100 : 100;
        gsap.fromTo(element,
            { x: fromX, opacity: 0 },
            { x: 0, opacity: 1, duration: duration, ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
        );
    }

    /* INTERACTIVE ANIMATIONS */

    hoverGlow(element, color = '#00ff00') {
        element.addEventListener('mouseenter', () => {
            gsap.to(element, {
                boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
                duration: 0.3
            });
        });

        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                boxShadow: '0 0 0px rgba(0,0,0,0)',
                duration: 0.3
            });
        });
    }

    rippleEffect(element) {
        element.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(0, 255, 0, 0.5)';
            ripple.style.pointerEvents = 'none';

            element.style.position = 'relative';
            element.style.overflow = 'hidden';
            element.appendChild(ripple);

            gsap.to(ripple, {
                scale: 4,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
                onComplete: () => ripple.remove()
            });
        });
    }

    floatingAnimation(element, intensity = 20) {
        gsap.to(element, {
            y: intensity,
            duration: 3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.zeussAnimations = new ZeussAnimations();
});
