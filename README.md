# Anti-Redirection-Anime-Sama

Un Userscript léger conçu pour bloquer les redirections agressives, les popups publicitaires et les ouvertures d'onglets intempestives lors de l'utilisation du site Anime-Sama et de ses lecteurs vidéo (SmoothPre, etc.).

## ✨ Fonctionnalités

- **Blocage intelligent :** Analyse les URL avant ouverture. Les fonctionnalités légitimes du site restent intactes, seules les requêtes vers des domaines publicitaires tiers sont bloquées.
- **Surcharge de `window.open` via Proxy :** Empêche les scripts publicitaires cachés de contourner le bloqueur de popups natif du navigateur.
- **Zero Dépendance :** Écrit en JavaScript vanilla, ultra-léger et rapide.

## 🛠️ Installation

1. Installez une extension de gestion de scripts comme [Tampermonkey](https://www.tampermonkey.net/) (recommandé), Violentmonkey ou Greasemonkey.
2. Copiez ce lien : `https://raw.githubusercontent.com/Xougui/Anti-Redirection-Anime-Sama/main/anti-redirection.user.js`
3. Ouvrez le **Tableau de bord** de Tampermonkey.
4. Allez dans l'onglet **Utilitaires** (Utilities).
5. Dans la section **"Importer à partir d'une URL"**, collez le lien et cliquez sur **Installer**.

![Aide](https://www.markdownlang.com/markdown-logo.png)

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
