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

    function isAllowed(url) {
        if (!url || url.startsWith('/') || url.startsWith(window.location.origin)) return true;
        try {
            const hostname = new URL(url).hostname;
            if (ANIME_SAMA_REGEX.test(hostname)) return true;
            return TRUSTED_EXTERNAL.some(domain => hostname === domain || hostname.endsWith('.' + domain));
        } catch (e) {
            return false;
        }
    }

    const originalWindowOpen = window.open;
    window.open = function (url, target, features) {
        if (isAllowed(url)) {
            return originalWindowOpen.apply(this, arguments);
        }
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
                e.preventDefault();
                e.stopPropagation();
            }
        }
    }, true);
})();