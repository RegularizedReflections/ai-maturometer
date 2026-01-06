# Guide de déploiement - AI-Maturometer

## 🚀 Déploiement rapide

### Option 1 : Vercel (Recommandé)

1. Connectez votre repository GitHub à Vercel
2. Configurez le projet :
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. Déployez automatiquement

### Option 2 : Netlify

1. Connectez votre repository à Netlify
2. Configuration :
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Déployez

### Option 3 : GitHub Pages

```bash
# Installer gh-pages
npm install -D gh-pages

# Ajouter au package.json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Mettre à jour vite.config.js
export default defineConfig({
  base: '/ai-maturometer/',
  plugins: [react()],
})

# Déployer
npm run deploy
```

### Option 4 : Serveur local avec Docker

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 📊 Monitoring & Analytics (À ajouter en v2)

### Google Analytics

```javascript
// src/main.jsx
import ReactGA from 'react-ga4';

ReactGA.initialize('G-XXXXXXXXXX');

// Track page views
ReactGA.send({ hitType: "pageview", page: window.location.pathname });
```

### Sentry (Error tracking)

```bash
npm install @sentry/react

# src/main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

## 🔒 Variables d'environnement

Créez un fichier `.env.local` pour les configurations :

```env
VITE_APP_NAME=AI-Maturometer
VITE_VERSION=1.0.0
VITE_ANALYTICS_ID=G-XXXXXXXXXX
```

Accès dans le code :
```javascript
const appName = import.meta.env.VITE_APP_NAME;
```

## 🧪 Tests (À implémenter en v2)

```bash
# Installer Vitest
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Lancer les tests
npm run test
```

## 📦 Build optimisé

Pour améliorer les performances :

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'charts': ['recharts'],
          'icons': ['lucide-react']
        }
      }
    }
  }
})
```

## 🔄 CI/CD GitHub Actions

Créez `.github/workflows/deploy.yml` :

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 📈 Performance

Objectifs à atteindre (Lighthouse) :
- Performance : > 90
- Accessibility : > 95
- Best Practices : > 95
- SEO : > 90

## 🌐 Domaine personnalisé

Pour Vercel/Netlify :
1. Achetez un domaine (ex: `ai-maturometer.com`)
2. Configurez les DNS :
   - A record → IP du provider
   - CNAME → alias du provider
3. Ajoutez le domaine dans les settings du provider
4. Activez HTTPS (automatique)

## 🔐 Sécurité

Headers recommandés (à configurer sur le serveur) :

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```
