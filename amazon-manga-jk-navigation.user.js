// ==UserScript==
// @name         Amazon Manga j/k Navigation
// @namespace    https://github.com/tohenton/myuserscript
// @version      2.0
// @description  Navigate Amazon Manga Reader with j and k
// @author       tohenton
// @match        https://read.amazon.co.jp/manga/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.co.jp
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const isEditable = (element) => element instanceof HTMLElement && (
        element.isContentEditable ||
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName)
    );

    const isRenderer = (candidate) => candidate
        && typeof candidate.goToNextPage === 'function'
        && typeof candidate.goToPreviousPage === 'function';

    function findRenderer() {
        const root = document.getElementById('mainContainer');
        if (!root) {
            return null;
        }

        const fiberKey = Object.keys(root).find((key) => key.startsWith('__reactFiber') || key.startsWith('__reactContainer'));
        if (!fiberKey) {
            return null;
        }

        let top = root[fiberKey];
        while (top.return) {
            top = top.return;
        }

        let found = null;
        const visit = (fiber) => {
            if (!fiber || found) {
                return;
            }
            if (typeof fiber.type === 'function') {
                let hook = fiber.memoizedState;
                while (hook) {
                    const memo = hook.memoizedState;
                    if (memo && typeof memo === 'object' && 'current' in memo && isRenderer(memo.current)) {
                        found = memo.current;
                        return;
                    }
                    hook = hook.next;
                }
            }
            visit(fiber.child);
            visit(fiber.sibling);
        };
        visit(top);
        return found;
    }

    let cachedRenderer = null;
    function getRenderer() {
        if (cachedRenderer) {
            try {
                if (isRenderer(cachedRenderer) && cachedRenderer.isReady()) {
                    return cachedRenderer;
                }
            } catch (error) {
                cachedRenderer = null;
            }
        }
        cachedRenderer = findRenderer();
        return cachedRenderer;
    }

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

        const key = event.key.toLowerCase();
        if (key !== 'j' && key !== 'k') {
            return;
        }

        const renderer = getRenderer();
        if (!renderer) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();

        if (key === 'j') {
            renderer.goToNextPage();
        } else {
            renderer.goToPreviousPage();
        }
    }, true);
})();
