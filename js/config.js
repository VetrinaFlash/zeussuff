/* ========================================
   CONFIGURATION & ENVIRONMENT VARIABLES
   ======================================== */

// Credentials (usare da .env in produzione)
const CONFIG = {
    VALID_USERNAME: import.meta.env.VITE_LOGIN_USERNAME || 'zeus',
    VALID_PASSWORD: import.meta.env.VITE_LOGIN_PASSWORD || 'Interceptor2026!',
    SESSION_KEY: 'zeuss_session',
    SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
    ENABLE_DEBUG: false
};

// Colors Palette ZEUSS
const COLORS = {
    primary: '#00ff00',
    secondary: '#00ffff',
    accent: '#ff00ff',
    dark: '#0a0a0a',
    darker: '#000000',
    text: '#ffffff',
    success: '#00ff41',
    warning: '#ffaa00',
    error: '#ff0055'
};

// Animation Config
const ANIMATION_CONFIG = {
    duration: {
        fast: 0.3,
        smooth: 0.6,
        slow: 1.0
    },
    easing: {
        smooth: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        sharp: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
};

// Export for modules
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
    window.COLORS = COLORS;
    window.ANIMATION_CONFIG = ANIMATION_CONFIG;
}
