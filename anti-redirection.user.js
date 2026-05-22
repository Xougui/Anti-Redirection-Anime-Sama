// ==UserScript==
// @name         Anti-Redirection Anime-Sama
// @namespace    https://github.com/Xougui/Anti-Redirection-Anime-Sama
// @version      1.1.0
// @description  Bloque les popups, les redirections agressives et les fenêtres publicitaires tierces sur Anime-Sama et ses lecteurs associés.
// @author       Xougui
// @include      *://*.anime-sama.*/*
// @include      *://anime-sama.*/*
// @include      *://*.animes-sama.*/*
// @include      *://animes-sama.*/*
// @match        *://smoothpre.com/*
// @match        *://*.smoothpre.com/*
// @run-at       document-start
// @grant        none
// @license      MIT
// @downloadURL  https://github.com/Xougui/Anti-Redirection-Anime-Sama/raw/refs/heads/master/anti-redirection.user.js
// @updateURL    https://github.com/Xougui/Anti-Redirection-Anime-Sama/raw/refs/heads/master/anti-redirection.user.js
// ==/UserScript==

(function () {
    'use strict';

    const TRUSTED_EXTERNAL = ['smoothpre.com', 't.me', 'discord.gg', 'discord.com', 'twitter.com', 'x.com'];
    const ANIME_SAMA_REGEX = /^([^\/]+\.)?animes?-sama\.[a-z0-9\-]+$/;

    const LOG_PREFIX = '%c[Anti-Redirection Anime-Sama Extension]';
    const STYLE_ALLOWED = 'color: #2ecc71; font-weight: bold;';
    const STYLE_BLOCKED = 'color: #e74c3c; font-weight: bold;';
    const STYLE_INFO = 'color: #3498db; font-weight: bold;';

    console.log(`${LOG_PREFIX}%c Script initialisé et actif sur ${window.location.hostname}`, STYLE_INFO, 'color: inherit;');

    function isAllowed(url) {
        if (!url) return true;

        if (url.startsWith('/') || url.startsWith(window.location.origin)) {
            return true;
        }

        try {
            const hostname = new URL(url).hostname;
            if (ANIME_SAMA_REGEX.test(hostname)) return true;
            return TRUSTED_EXTERNAL.some(domain => hostname === domain || hostname.endsWith('.' + domain));
        } catch (e) {
            console.error(`${LOG_PREFIX} Erreur lors de l'analyse de l'URL : ${url}`, STYLE_BLOCKED, e);
            return false;
        }
    }

    const originalWindowOpen = window.open;
    window.open = function (url, target, features) {
        if (isAllowed(url)) {
            console.log(`${LOG_PREFIX} window.open() AUTORISÉ pour : ${url}`, STYLE_ALLOWED);
            return originalWindowOpen.apply(this, arguments);
        }

        console.warn(`${LOG_PREFIX} window.open() BLOQUÉ pour : ${url}`, STYLE_BLOCKED);
        return new Proxy({}, {
            get: (_, prop) => {
                if (prop === 'closed') return false;
                return function () { };
            }
        });
    };

    document.addEventListener('click', function (e) {
        let target = e.target.closest('a');
        if (target && target.tagName === 'A') {
            const url = target.href;

            if (!isAllowed(url)) {
                console.warn(`${LOG_PREFIX} Clic sur lien BLOQUÉ vers : ${url}`, STYLE_BLOCKED);
                e.preventDefault();
                e.stopPropagation();
            } else {
                console.log(`${LOG_PREFIX} Clic sur lien AUTORISÉ vers : ${url}`, STYLE_ALLOWED);
            }
        }
    }, true);
})();