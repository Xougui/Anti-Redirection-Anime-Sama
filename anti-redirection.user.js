// ==UserScript==
// @name         Anti-Redirection Anime-Sama
// @namespace    https://github.com/Xougui/Anti-Redirection-Anime-Sama
// @version      1.0.0
// @description  Bloque les popups, les redirections agressives et les fenêtres publicitaires tierces sur Anime-Sama et ses lecteurs associés.
// @author       Xougui
// @match        *://*.anime-sama.fr/*
// @match        *://*.animes-sama.fr/*
// @match        *://smoothpre.com/*
// @match        *://*.smoothpre.com/*
// @run-at       document-start
// @grant        none
// @license      MIT
// @downloadURL  https://raw.githubusercontent.com/Xougui/Anti-Redirection-Anime-Sama/main/anti-redirection.user.js
// @updateURL    https://raw.githubusercontent.com/Xougui/Anti-Redirection-Anime-Sama/main/anti-redirection.user.js
// ==/UserScript==

(function() {
    'use strict';

    const ALLOWED_DOMAINS = ['anime-sama.fr', 'animes-sama.fr', 'smoothpre.com'];

    function isAllowed(url) {
        if (!url || url.startsWith('/') || url.startsWith(window.location.origin)) return true;
        try {
            const hostname = new URL(url).hostname;
            return ALLOWED_DOMAINS.some(domain => hostname === domain || hostname.endsWith('.' + domain));
        } catch (e) {
            return false;
        }
    }

    const originalWindowOpen = window.open;
    window.open = function(url, target, features) {
        if (isAllowed(url)) {
            return originalWindowOpen.apply(this, arguments);
        }

        return new Proxy({}, {
            get: (_, prop) => {
                if (prop === 'closed') return false;
                return function() {};
            }
        });
    };

    document.addEventListener('click', function(e) {
        let target = e.target.closest('a');

        if (target && target.tagName === 'A') {
            const url = target.href;

            if (!isAllowed(url) && (target.target === '_blank' || e.button === 1)) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    }, true);
})();