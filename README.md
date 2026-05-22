# 🛡️ Anti-Redirection Anime-Sama & SmoothPre

Un Userscript léger et performant conçu pour bloquer les redirections agressives, les popups malveillantes et les ouvertures d'onglets intempestives sur le site **Anime-Sama** et ses lecteurs vidéo associés (comme **SmoothPre**).

---

## ✨ Fonctionnalités

* **⚡ Blocage intelligent & Sélectif :** Analyse les URL avant ouverture. Les fonctionnalités et liens légitimes du site restent totalement intacts, seules les requêtes vers des domaines publicitaires ou suspects sont interceptées.
* **🎯 Surcharge de `window.open` par Proxy :** Utilise un proxy JavaScript pour intercepter et neutraliser les scripts publicitaires cachés qui tentent de contourner le bloqueur natif de votre navigateur.
* **🪶 Ultra-léger :** Écrit en JavaScript natif (Vanilla JS), sans aucune dépendance externe, garantissant un impact nul sur les performances de votre navigateur.

---

## 🛠️ Installation

### Étape 1 : Installer un gestionnaire de scripts

Si ce n'est pas déjà fait, installez une extension compatible avec votre navigateur :

* [Tampermonkey](https://www.tampermonkey.net/) (Recommandé)
* [Violentmonkey](https://violentmonkey.github.io/)

### Étape 2 : Installer le script

Choisissez l'une des deux méthodes ci-dessous :

#### 🚀 Méthode 1 : Installation automatique (Recommandée)

Cliquez simplement sur le lien ci-dessous. Votre extension devrait intercepter le script et vous proposer l'installation immédiate :
👉 **[Installer Anti-Redirection Anime-Sama](https://github.com/Xougui/Anti-Redirection-Anime-Sama/raw/refs/heads/master/anti-redirection.user.js)**

#### 🔧 Méthode 2 : Importation manuelle

Si votre navigateur télécharge le fichier au lieu de l'installer automatiquement :

1. Copiez ce lien : `https://github.com/Xougui/Anti-Redirection-Anime-Sama/raw/refs/heads/master/anti-redirection.user.js`
2. Ouvrez le **Tableau de bord** de Tampermonkey.
3. Allez dans l'onglet **Utilitaires** (Utilities).
4. Dans la section **"Importer à partir d'une URL"**, collez le lien et cliquez sur **Installer**. (Voir ci-dessous)

![Procédure d'aide à l'installation](https://github.com/Xougui/Anti-Redirection-Anime-Sama/blob/master/img/aide.png?raw=true)

---

## 📄 Licence

Ce projet est distribué sous la licence **MIT**. Consultez le fichier [LICENSE](LICENSE) pour plus d'informations.
