/* ========================================
   ZEUSS DASHBOARD SCRIPT
   ======================================== */

class ZeusDashboard {
    constructor() {
        // Check authentication
        if (!sessionStorage.getItem(CONFIG.SESSION_KEY)) {
            window.location.href = 'login.html';
            return;
        }

        this.pdfjslib = window.pdfjslib;
        this.pdfjslib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js';
        
        this.currentPage = 1;
        this.totalPages = 0;
        this.pdfDoc = null;
        this.isAnimating = false;
        
        this.initElements();
        this.init();
    }

    initElements() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.pdfViewer = document.getElementById('pdfViewer');
        this.prevBtn = document.getElementById('prevPageBtn');
        this.nextBtn = document.getElementById('nextPageBtn');
        this.pageInfo = document.getElementById('pageInfo');
        this.currentPageSpan = document.getElementById('currentPage');
        this.totalPagesSpan = document.getElementById('totalPages');
        this.mainVideo = document.getElementById('mainVideo');
        this.videoSection = document.getElementById('videoSection');
        this.contentSection = document.getElementById('pdfSection');
        this.statusUser = document.getElementById('statusUser');
        this.cursorFollower = document.getElementById('cursorFollower');
        this.navBtns = document.querySelectorAll('.nav-btn');
    }

    init() {
        this.loadPDF();
        this.setupEventListeners();
        this.setupCursorFollower();
        this.animatePageEntry();
        this.hideLoadingScreen();
    }

    loadPDF() {
        const pdfUrl = 'assets/pdf/ZEUSS-INTERCEPTOR.pdf';

        this.pdfjslib.getDocument(pdfUrl).promise.then(pdf => {
            this.pdfDoc = pdf;
            this.totalPages = pdf.numPages;
            this.totalPagesSpan.textContent = this.totalPages;
            this.renderPage(this.currentPage);
        }).catch(err => {
            console.log('PDF loading: Place ZEUSS-INTERCEPTOR.pdf in assets/pdf/ folder');
            this.pdfViewer.innerHTML = '<div style="color: #00ff00; text-align: center; padding: 50px;">PDF will load when placed in assets/pdf/ZEUSS-INTERCEPTOR.pdf</div>';
        });
    }

    renderPage(pageNum) {
        if (this.isAnimating || !this.pdfDoc) return;
        
        this.isAnimating = true;

        this.pdfDoc.getPage(pageNum).then(page => {
            const scale = window.innerWidth < 768 ? 1.5 : 2;
            const viewport = page.getViewport({ scale });

            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const renderContext = {
                canvasContext: canvas.getContext('2d'),
                viewport: viewport
            };

            page.render(renderContext).promise.then(() => {
                // Clear previous content
                this.pdfViewer.innerHTML = '';
                this.pdfViewer.appendChild(canvas);

                // Animate page entry
                gsap.fromTo(canvas,
                    { opacity: 0, rotateY: 90, scale: 0.8 },
                    { 
                        opacity: 1, 
                        rotateY: 0, 
                        scale: 1, 
                        duration: 0.8,
                        ease: 'elastic.out(1.2, 0.75)',
                        onComplete: () => { this.isAnimating = false; }
                    }
                );

                this.currentPageSpan.textContent = pageNum;
                this.updateButtonStates();
            });
        });
    }

    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.previousPage());
        this.nextBtn.addEventListener('click', () => this.nextPage());

        // Navigation buttons
        this.navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = btn.dataset.section;
                const action = btn.dataset.action;

                if (section === 'home') {
                    this.scrollToSection(this.videoSection);
                } else if (section === 'content') {
                    this.scrollToSection(this.contentSection);
                } else if (action === 'logout') {
                    this.logout();
                }

                this.updateActiveNav(btn);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousPage();
            if (e.key === 'ArrowRight') this.nextPage();
        });
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.renderPage(this.currentPage);
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.renderPage(this.currentPage);
        }
    }

    updateButtonStates() {
        this.prevBtn.disabled = this.currentPage === 1;
        this.nextBtn.disabled = this.currentPage === this.totalPages;
    }

    updateActiveNav(activeBtn) {
        this.navBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    scrollToSection(section) {
        gsap.to(window, {
            scrollTo: { y: section, offsetY: 0 },
            duration: 1,
            ease: 'power2.inOut'
        });
    }

    setupCursorFollower() {
        if (!this.cursorFollower) return;

        document.addEventListener('mousemove', (e) => {
            gsap.to(this.cursorFollower, {
                left: e.clientX - 10,
                top: e.clientY - 10,
                duration: 0.1,
                overwrite: 'auto'
            });
        });

        // Hide on mobile
        if (window.innerWidth < 768) {
            this.cursorFollower.style.display = 'none';
        }
    }

    animatePageEntry() {
        // Animate video section
        gsap.fromTo('.video-section',
            { opacity: 0 },
            { opacity: 1, duration: 1, delay: 0.5 }
        );

        // Animate floating nav
        gsap.fromTo('.floating-nav',
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'back.out(1.7)', delay: 0.8 }
        );

        // Animate decorations
        gsap.fromTo('.decoration',
            { opacity: 0, scale: 0, rotate: -45 },
            { opacity: 1, scale: 1, rotate: 0, duration: 0.8, stagger: 0.1, ease: 'elastic.out(1.2, 0.75)', delay: 1 }
        );

        // Animate status panel
        gsap.fromTo('.status-panel',
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)', delay: 0.6 }
        );
    }

    hideLoadingScreen() {
        if (this.loadingScreen) {
            setTimeout(() => {
                gsap.to(this.loadingScreen,
                    { opacity: 0, duration: 0.8, pointerEvents: 'none' }
                );
            }, 1500);
        }
    }

    logout() {
        gsap.to('body', {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                sessionStorage.removeItem(CONFIG.SESSION_KEY);
                window.location.href = 'login.html';
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Enable GSAP ScrollToPlugin
    if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
        gsap.registerPlugin(ScrollToPlugin);
    }
    
    new ZeusDashboard();
});
