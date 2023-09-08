// ==UserScript==
// @name         Autofocus Search Box
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically focus on the search box based on domain
// @author       tohenton
// @match        https://*
// @match        http://*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const DOMAIN_FOCUS_IDS = {
        'www.amazon.co.jp': 'twotabsearchtextbox',
    };

    const domain = window.location.hostname;
    const focusId = DOMAIN_FOCUS_IDS[domain];

    if (focusId) {
        const elementToFocus = document.getElementById(focusId);
        if (elementToFocus) {
            elementToFocus.focus();
        }
    }
})();
