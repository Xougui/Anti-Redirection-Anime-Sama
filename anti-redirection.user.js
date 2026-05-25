// ==UserScript==
// @name         Anti-Redirection Anime-Sama
// @namespace    https://github.com/Xougui/Anti-Redirection-Anime-Sama
// @version      1.2.0
// @description  Bloque les popups, les redirections agressives et alerte en cas de site usurpateur d'Anime-Sama.
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

    const TRUSTED_DOMAINS = [
        'anime-sama.to',
        'anime-sama.si',
        'anime-sama.tv',
        'anime-sama.org',
        'anime-sama.pw',
        'smoothpre.com'
    ];

    const TRUSTED_EXTERNAL = ['t.me', 'discord.gg', 'discord.com', 'twitter.com', 'x.com'];

    const LOG_PREFIX = '%c[Anti-Redirection Anime-Sama Extension]';
    const STYLE_ALLOWED = 'color: #2ecc71; font-weight: bold;';
    const STYLE_BLOCKED = 'color: #e74c3c; font-weight: bold;';
    const STYLE_INFO = 'color: #3498db; font-weight: bold;';

    const currentHostname = window.location.hostname;

    const isOfficialSite = TRUSTED_DOMAINS.some(domain => currentHostname === domain || currentHostname.endsWith('.' + domain));

    function showFraudAlert() {
        const createAlert = () => {
            if (document.getElementById('anime-sama-fraud-warning')) return;

            const container = document.createElement('div');
            container.id = 'anime-sama-fraud-warning';
            container.innerHTML = `
                <style>
                    #anime-sama-fraud-warning {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        background-color: #ffebee;
                        border-bottom: 4px solid #c62828;
                        color: #c62828;
                        font-family: Arial, sans-serif;
                        padding: 15px;
                        box-sizing: border-box;
                        z-index: 9999999;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.4);
                        text-align: center;
                    }
                    #anime-sama-fraud-warning h2 {
                        margin: 0 0 8px 0;
                        font-size: 1.3rem;
                        color: #b71c1c;
                    }
                    #anime-sama-fraud-warning p {
                        margin: 0;
                        font-size: 1rem;
                        font-weight: bold;
                        color: #333;
                    }
                    #anime-sama-fraud-warning a {
                        color: #c62828;
                        text-decoration: underline;
                        font-weight: bold;
                    }
                </style>
                <div>
                    <h2>⚠️ Ce site est une copie frauduleuse qui usurpe l'identité d'Anime-Sama ⚠️</h2>
                    <p>Pour votre sécurité, utilisez uniquement l'adresse officielle principale : <a href="https://anime-sama.to" target="_blank" rel="noopener noreferrer">anime-sama.to</a></p>
                </div>
            `;
            document.body.appendChild(container);
            document.body.style.marginTop = container.offsetHeight + 'px';
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createAlert);
        } else {
            createAlert();
        }
    }

    if (!isOfficialSite) {
        console.warn(`${LOG_PREFIX} URL non reconnue ou domaine inactif détecté. Affichage de l'alerte.`, STYLE_BLOCKED);
        showFraudAlert();
    }

    console.log(`${LOG_PREFIX}%c Script initialisé sur ${currentHostname}`, STYLE_INFO, 'color: inherit;');

    function isAllowed(url) {
        if (!url) return true;

        if (url.startsWith('/') || url.startsWith(window.location.origin)) {
            return true;
        }

        try {
            const hostname = new URL(url).hostname;

            if (TRUSTED_DOMAINS.some(domain => hostname === domain || hostname.endsWith('.' + domain))) return true;
            return TRUSTED_EXTERNAL.some(domain => hostname === domain || hostname.endsWith('.' + domain));
        } catch (e) {
            console.error(`${LOG_PREFIX} Erreur d'analyse URL : ${url}`, STYLE_BLOCKED, e);
            return false;
        }
    }

    const originalWindowOpen = window.open;
    window.open = function (url, target, features) {
        if (isAllowed(url)) {
            console.log(`${LOG_PREFIX} window.open() AUTORISÉ : ${url}`, STYLE_ALLOWED);
            return originalWindowOpen.apply(this, arguments);
        }
        console.warn(`${LOG_PREFIX} window.open() BLOQUÉ : ${url}`, STYLE_BLOCKED);
        return new Proxy({}, { get: (_, prop) => prop === 'closed' ? false : function () {} });
    };

    document.addEventListener('click', function (e) {
        let target = e.target.closest('a');
        if (target && target.tagName === 'A') {
            const url = target.href;
            if (!isAllowed(url)) {
                console.warn(`${LOG_PREFIX} Clic BLOQUÉ vers : ${url}`, STYLE_BLOCKED);
                e.preventDefault();
                e.stopPropagation();
            } else {
                console.log(`${LOG_PREFIX} Clic AUTORISÉ vers : ${url}`, STYLE_ALLOWED);
            }
        }
    }, true);
})();
