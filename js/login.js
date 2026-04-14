/* ========================================
   ZEUSS LOGIN SCRIPT
   ======================================== */

class ZeussLogin {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.errorDiv = document.getElementById('loginError');
        this.pdfCanvas = document.getElementById('pdfCanvas');
        this.pdfjslib = window.pdfjslib;
        this.pdfjslib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadPDFFirstPage();
        this.animateElements();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleLogin(e));
        this.usernameInput.addEventListener('focus', () => this.clearError());
        this.passwordInput.addEventListener('focus', () => this.clearError());
    }

    clearError() {
        if (this.errorDiv) {
            this.errorDiv.textContent = '';
            this.errorDiv.style.opacity = '0';
        }
    }

    loadPDFFirstPage() {
        const pdfUrl = 'assets/pdf/ZEUSS-INTERCEPTOR.pdf';

        this.pdfjslib.getDocument(pdfUrl).promise.then(pdf => {
            pdf.getPage(1).then(page => {
                const scale = window.innerWidth < 768 ? 0.8 : 1.2;
                const viewport = page.getViewport({ scale });

                this.pdfCanvas.width = viewport.width;
                this.pdfCanvas.height = viewport.height;

                const renderContext = {
                    canvasContext: this.pdfCanvas.getContext('2d'),
                    viewport: viewport
                };

                page.render(renderContext).promise.then(() => {
                    gsap.fromTo(this.pdfCanvas, 
                        { opacity: 0, scale: 0.8, rotateY: -90 },
                        { opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: 'elastic.out(1.2, 0.75)' }
                    );
                });
            });
        }).catch(err => {
            console.log('PDF not found or in assets folder yet');
        });
    }

    animateElements() {
        // Animate title
        gsap.fromTo('.brand-title', 
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'elastic.out(1.2, 0.75)', delay: 0.2 }
        );

        // Animate subtitle
        gsap.fromTo('.brand-subtitle', 
            { opacity: 0, y: -30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'elastic.out(1.2, 0.75)', delay: 0.4 }
        );

        // Animate subtitle line
        gsap.fromTo('.subtitle-line',
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease: 'elastic.out(1.2, 0.75)', delay: 0.6 }
        );

        // Animate form groups
        gsap.fromTo('.form-group',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 0.8 }
        );

        // Animate button
        gsap.fromTo('.login-btn',
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 1.2 }
        );

        // Animate status bar
        gsap.fromTo('.status-bar',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'elastic.out(1.2, 0.75)', delay: 1.4 }
        );

        // Corner decorations
        gsap.fromTo('.corner',
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'elastic.out(1.2, 0.75)', delay: 0.5 }
        );
    }

    handleLogin(e) {
        e.preventDefault();
        const username = this.usernameInput.value.trim();
        const password = this.passwordInput.value.trim();

        if (this.validateCredentials(username, password)) {
            this.successLogin();
        } else {
            this.showError('Credenziali non valide');
        }
    }

    validateCredentials(username, password) {
        return username === CONFIG.VALID_USERNAME && password === CONFIG.VALID_PASSWORD;
    }

    showError(message) {
        if (this.errorDiv) {
            this.errorDiv.textContent = '✗ ' + message;
            gsap.fromTo(this.errorDiv,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.3 }
            );

            // Shake animation
            gsap.to(this.form,
                { x: 10, duration: 0.1, repeat: 5, yoyo: true }
            );
        }
    }

    successLogin() {
        // Hide form with animation
        gsap.to('.login-right',
            { opacity: 0, x: 100, duration: 0.8, ease: 'power2.in' }
        );

        gsap.to('.login-left',
            { opacity: 0, x: -100, duration: 0.8, ease: 'power2.in' }
        );

        // Redirect to dashboard
        setTimeout(() => {
            sessionStorage.setItem(CONFIG.SESSION_KEY, JSON.stringify({
                user: this.usernameInput.value,
                loginTime: new Date().getTime()
            }));
            window.location.href = 'dashboard-main.html';
        }, 800);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ZeussLogin();
});
