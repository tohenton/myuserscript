// ==UserScript==
// @name         Amazon Manga j/k Navigation
// @namespace    https://github.com/tohenton/myuserscript
// @version      1.0
// @description  Navigate Amazon Manga Reader with j and k
// @author       tohenton
// @match        https://read.amazon.co.jp/manga/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.co.jp
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const KEY_TO_ARROW = {
        j: 'ArrowLeft',
        k: 'ArrowRight',
    };

    const isEditable = (element) => element instanceof HTMLElement && (
        element.isContentEditable ||
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName)
    );

    window.addEventListener('keydown', (event) => {
        if (
            event.defaultPrevented ||
            event.isComposing ||
            event.ctrlKey ||
            event.altKey ||
            event.metaKey ||
            event.shiftKey ||
            isEditable(event.target)
        ) {
            return;
        }

        const arrowKey = KEY_TO_ARROW[event.key.toLowerCase()];
        if (!arrowKey) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();

        document.dispatchEvent(new KeyboardEvent('keydown', {
            key: arrowKey,
            code: arrowKey,
            bubbles: true,
            cancelable: true,
            repeat: event.repeat,
        }));
    }, true);
})();
