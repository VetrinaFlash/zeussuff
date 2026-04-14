# ZEUSS Drone Interceptor - Premium Web Platform

Sito web premium per ZEUSS Drone Interceptor con animazioni straordinarie, PDF viewer integrato e login sicuro.

## 📋 Struttura del Progetto

```
zeusssito/
├── index.html                 # Landing page (Redirect a login)
├── login.html                 # Login page con PDF preview
├── dashboard-main.html        # Dashboard principale con PDF viewer
├── login-new.css              # Stili login nero premium
├── js/
│   ├── config.js              # Configurazione e variabili globali
│   ├── login.js               # Logica login e PDF rendering
│   ├── dashboard.js           # Logica dashboard e PDF viewer
│   ├── animations.js          # Engine animazioni avanzate
│   └── background.js          # Effetti canvas background
├── styles/
│   ├── main.css               # Stili base globali
│   ├── animations.css         # Keyframes animazioni premium
│   ├── dashboard.css          # Stili dashboard
│   └── login.css              # Stili login (OLD - usare login-new.css)
├── assets/
│   ├── pdf/
│   │   └── ZEUSS-INTERCEPTOR.pdf    # 📍 CARICA QUI IL PDF
│   └── videos/
│       └── zeuss-demo.mp4           # 📍 CARICA QUI IL VIDEO
├── .env                       # Variabili ambiente
└── package.json               # Dipendenze
```

## 🎬 Dove Caricare i File

### 1. **PDF del ZEUSS**
```
assets/pdf/ZEUSS-INTERCEPTOR.pdf
```
- Crea la cartella `assets/pdf/` se non esiste
- Sposta il tuo PDF ZEUSS in questa cartella
- Il sistema caricherà automaticamente la prima pagina nel login
- Il dashboard mostrerà tutte le pagine del PDF

### 2. **Video Fullscreen**
```
assets/videos/zeusz-demo.mp4
```
- Crea la cartella `assets/videos/` se non esiste
- Carica il video da mostrare a schermo intero dopo il login
- Supportati: MP4, WebM, MOV
- Dimensioni consigliate: 1920x1080 o superiore

## 🔐 Credenziali Login

**Username:** `zeus`
**Password:** `Interceptor2026!`

Puoi cambiare queste credenziali in due modi:

### Opzione 1: File .env (Locale)
```
VITE_USERNAME=zeus
VITE_PASSWORD=Interceptor2026!
```

### Opzione 2: Cloudflare Environment Variables (Produzione)
1. Vai su Cloudflare Dashboard
2. Seleziona il tuo progetto
3. Vai su Settings → Environment Variables
4. Aggiungi:
   ```
   VITE_LOGIN_USERNAME = zeus
   VITE_LOGIN_PASSWORD = Interceptor2026!
   ```

## 🎨 Caratteristiche Premium

✨ **Animazioni Straordinarie:**
- Effetti tipo activetheory.net
- Pagine che entrano con rotazioni 3D
- Transizioni fluide con GSAP
- Canvas particle effects dinamico
- Cursor follower interattivo

📱 **Responsive Design:**
- Desktop ottimizzato (1920px+)
- Tablet (768px-1024px)
- Mobile (fino a 480px)

🎬 **Layout Dinamico:**
- Login: Due colonne (PDF sinistra, form destra)
- Dashboard: Video fullscreen + PDF viewer con controlli
- Navigazione floating con scroll smooth

🔒 **Sicurezza:**
- Session storage per autenticazione
- Protezione dashboard (reindirizza se non loggato)
- Logout con animazione fade

## 🚀 Come Avviare Localmente

### 1. **Con Live Server (VS Code)**
```bash
# Installa l'estensione "Live Server" di Ritwick Dey
# Clicca destro su index.html → "Open with Live Server"
```

### 2. **Con Python**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### 3. **Con Node.js**
```bash
npm install
npm run dev
```

Poi apri: `http://localhost:8000`

## 📤 Deploy su Cloudflare Pages

### 1. **Crea repo GitHub**
```bash
git init
git add .
git commit -m "Initial ZEUSS release"
git branch -M main
git remote add origin https://github.com/tuousername/zeusssito.git
git push -u origin main
```

### 2. **Connetti a Cloudflare**
1. Accedi a [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Vai su "Pages" nel menu laterale
3. Clicca "Create a project"
4. Seleziona il tuo repo GitHub
5. Configurazione Build:
   - **Framework preset:** None
   - **Build command:** (lascia vuoto)
   - **Build output directory:** / (radice)
6. Clicca "Save and Deploy"

### 3. **Aggiorna variabili d'ambiente**
1. Nel tuo progetto Cloudflare Pages
2. Vai su Settings → Environment Variables
3. Aggiungi le credenziali

## 🎯 File Importanti

### Login Page (`login.html`)
- Layout a due colonne
- Sinistra: PDF preview della prima pagina
- Destra: Form login con animazioni
- Credentials dal .env

### Dashboard (`dashboard-main.html`)
- Video fullscreen all'inizio
- PDF viewer scrollabile con pagine
- Controlli navigazione (prev/next)
- Floating navigation bar
- Status panel

### Configurazione (`js/config.js`)
```javascript
VALID_USERNAME: 'zeuss_admin'
VALID_PASSWORD: 'Interceptor2026!'
SESSION_KEY: 'zeuss_session'
```

## 🎨 Personalizzazione Colori

Modifica in `styles/main.css`:
```css
:root {
    --primary-color: #00ff41;      /* Verde neon */
    --secondary-color: #00d9ff;    /* Cyan */
    --accent-color: #ff006e;       /* Magenta */
    --dark-bg: #0a0e27;            /* Blu scuro */
}
```

## 📱 Mobile Optimizations

- Navigazione spostata in basso su mobile
- PDF viewer responsive
- Video adattato agli schermi piccoli
- Touch-friendly buttons
- Scomparsa decorazioni su mobile per performance

## 🐛 Troubleshooting

### PDF non carica
- Verifica che il file sia in `assets/pdf/ZEUSZ-INTERCEPTOR.pdf`
- Controlla la console del browser (F12)
- Assicurati che il PDF non sia corrotto

### Video non parte
- Verificare `assets/videos/zeusz-demo.mp4`
- Provare con un video piccolo per test
- Controllare i CORS su Cloudflare

### Animazioni lente
- Disabilita estensioni browser
- Svuota cache (Ctrl+Shift+Del)
- Prova su browser diverso

## 📚 Librerie Utilizzate

- **GSAP 3.12**: Animazioni professionali
- **PDF.js 4.0**: Rendering PDF
- **ScrollTrigger**: Animazioni su scroll
- **Vanilla JavaScript**: Logica core

## ✅ Checklist Pre-Deploy

- [ ] PDF caricato in `assets/pdf/`
- [ ] Video caricato in `assets/videos/`
- [ ] Credenziali aggiornate nel .env
- [ ] Test login localmente
- [ ] Test PDF viewer e navigazione
- [ ] Test video fullscreen
- [ ] Test responsive su mobile
- [ ] Push su GitHub
- [ ] Deploy su Cloudflare Pages
- [ ] Test su dominio finale

## 📞 Support

Per problemi con:
- **GSAP animations**: https://gsap.com/docs/
- **PDF.js**: https://mozilla.github.io/pdf.js/
- **Cloudflare Pages**: https://developers.cloudflare.com/pages/

---

**Versione:** 1.0.0  
**Ultima modifica:** April 14, 2026  
**Status:** Production Ready 🚀
