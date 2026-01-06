# 🎨 Instructions pour le logo Smartpoint

## 📍 Emplacement du logo

Le logo de votre ESN doit être placé dans le dossier `public/` avec le nom :
- **`logosmartpoint.png`** (format recommandé)
- OU **`logosmartpoint.svg`** (fallback automatique)

```
public/
├── logosmartpoint.png    ← Placez votre logo ici (priorité)
├── logosmartpoint.svg    ← Fallback SVG (généré automatiquement)
└── vite.svg
```

---

## 🎯 Spécifications du logo

### Format recommandé : PNG
- **Dimensions** : 200-400px de largeur, 50-100px de hauteur
- **Ratio** : 4:1 ou 3:1 (logo horizontal)
- **Fond** : Transparent (PNG 24-bit avec canal alpha)
- **Résolution** : 72-144 DPI (pour écrans Retina)

### Format alternatif : SVG
- Vectoriel, scalable à toute taille
- Optimisé (pas de métadonnées inutiles)
- Dimensions viewBox appropriées

---

## 📐 Dimensions d'affichage

Le logo sera affiché avec les hauteurs suivantes :

| Device    | Hauteur | Largeur       |
|-----------|---------|---------------|
| **Mobile** | 36px    | Auto (ratio préservé) |
| **Desktop** | 48px    | Auto (ratio préservé) |

**Exemple :** Si votre logo fait 400x100px, il sera affiché :
- Mobile : 36px × 144px (ratio 1:4 préservé)
- Desktop : 48px × 192px (ratio 1:4 préservé)

---

## 🎨 Recommandations de design

### Contraste et lisibilité
- Le header a un **fond blanc** avec **border grise subtile**
- Assurez-vous que votre logo est **visible sur fond blanc**
- Si votre logo est clair, ajoutez un contour ou utilisez une version "light mode"

### Adaptation responsive
- Le logo doit rester lisible à **36px de hauteur** (mobile)
- Évitez les textes trop petits dans le logo
- Privilégiez les formes simples et reconnaissables

### Exemples de logos qui fonctionnent bien
✅ Logo horizontal avec texte à droite de l'icône
✅ Logo simplifié (icon + texte court)
✅ Logo avec bon contraste sur fond blanc

❌ Logo vertical (sera trop haut)
❌ Logo avec texte trop petit
❌ Logo blanc sur fond blanc (invisible)

---

## 🚀 Installation du logo

### Option 1 : Remplacer le SVG temporaire

1. Préparez votre logo au format PNG (200-400px de largeur)
2. Renommez-le en **`logosmartpoint.png`**
3. Placez-le dans le dossier **`public/`**
4. Relancez l'application : `npm run dev`

Le logo apparaîtra automatiquement dans le header !

### Option 2 : Utiliser un SVG

1. Exportez votre logo en SVG (depuis Illustrator, Figma, etc.)
2. Optimisez-le avec [SVGOMG](https://jakearchibald.github.io/svgomg/)
3. Renommez-le en **`logosmartpoint.svg`**
4. Remplacez le fichier dans **`public/`**
5. Relancez : `npm run dev`

---

## 🔧 Comportement du Header

### Détection automatique du logo
Le composant `Header.jsx` détecte automatiquement le logo :

1. ✅ Essaie de charger **`logosmartpoint.png`**
2. ✅ Si échec, essaie **`logosmartpoint.svg`**
3. ✅ Si échec, affiche un **placeholder** (initiales "SP" dans un carré bleu)

### Placeholder actuel
Si aucun logo n'est trouvé, un placeholder s'affiche :
- Carré bleu avec dégradé (primary → secondary)
- Initiales "**SP**" (Smartpoint) en blanc
- Même hauteur que le logo final

---

## 🎭 Personnalisation avancée

### Changer le nom de l'entreprise

Si votre ESN ne s'appelle pas "Smartpoint", modifiez le fichier `src/components/Header.jsx` :

```jsx
// Ligne 39 : Changer le alt text
alt="Logo VotreEntreprise"

// Ligne 46 : Changer les initiales du placeholder
<span className="text-white font-bold text-lg sm:text-2xl">VE</span>
```

### Modifier la hauteur du logo

Dans `src/components/Header.jsx`, ligne 40 :

```jsx
// Hauteur actuelle
className="h-9 sm:h-12 w-auto object-contain"

// Pour un logo plus grand
className="h-11 sm:h-14 w-auto object-contain"

// Pour un logo plus petit
className="h-7 sm:h-10 w-auto object-contain"
```

### Changer la version affichée

Badge "v1.1" dans le header (ligne 62-64) :

```jsx
<span className="hidden md:inline-flex ml-auto px-2.5 py-1 text-xs font-medium bg-blue-100 text-primary rounded-full">
  v1.2  {/* Changez ici */}
</span>
```

---

## 🐛 Troubleshooting

### Le logo ne s'affiche pas
1. ✅ Vérifiez que le fichier est bien nommé **`logosmartpoint.png`** (ou `.svg`)
2. ✅ Vérifiez qu'il est dans **`public/`** (pas dans `src/`)
3. ✅ Relancez le serveur : `Ctrl+C` puis `npm run dev`
4. ✅ Videz le cache du navigateur : `Ctrl+Shift+R`

### Le logo est déformé
- Le ratio n'est pas préservé : Vérifiez que `object-contain` est bien dans le className
- Le logo est trop grand/petit : Ajustez `h-9 sm:h-12`

### Le logo apparaît pixelisé
- Votre logo PNG est trop petit : Utilisez au moins 200px de largeur
- Solution : Exportez une version @2x (400px) ou utilisez un SVG

### Le placeholder "SP" s'affiche au lieu du logo
- Le fichier n'est pas trouvé
- Vérifiez le chemin : `/logosmartpoint.png` (doit être à la racine de `public/`)
- Ouvrez la console du navigateur (F12) pour voir les erreurs

---

## 📝 Checklist finale

- [ ] Logo préparé (PNG ou SVG)
- [ ] Dimensions correctes (200-400px largeur, ratio 3:1 ou 4:1)
- [ ] Fond transparent (pour PNG)
- [ ] Fichier renommé en `logosmartpoint.png`
- [ ] Fichier placé dans `public/`
- [ ] Serveur relancé (`npm run dev`)
- [ ] Logo visible dans le header sur toutes les pages
- [ ] Logo responsive sur mobile (36px) et desktop (48px)

---

## 🎨 Logo SVG temporaire fourni

Un logo SVG temporaire est déjà fourni dans `public/logosmartpoint.svg` :
- Dégradé bleu (primary → secondary)
- Texte "Smartpoint" + "AI Consulting"
- Icône abstraite (3 cercles connectés)

**Remplacez-le par votre vrai logo dès que possible !**

---

## 💡 Besoin d'aide ?

Si vous avez besoin d'un logo optimisé :
1. Contactez votre designer
2. OU utilisez un service comme [Canva](https://www.canva.com) pour créer un logo simple
3. OU gardez le placeholder temporaire

---

**Dernière mise à jour : Janvier 2026**
**Version du header : v1.1**
