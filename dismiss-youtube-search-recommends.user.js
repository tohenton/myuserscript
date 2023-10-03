// ==UserScript==
// @name         Dismiss youtube search recommend (ja)
// @namespace    https://github.com/tohenton/myuserscript
// @version      1.3
// @description  Dismiss "recommendation" in youtube search result
// @author       tohenton
// @match        https://www.youtube.com/results*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    const RECOMMENDATION_TITLES = ['あなたへのおすすめ', '他の人はこちらも視聴しています'];

    let hideRecommendations = () => {
        const recommendationTitles = document.querySelectorAll('h2 span#title');
        recommendationTitles.forEach(title => {
            if (RECOMMENDATION_TITLES.includes(title.textContent.trim())){
                const dismissibleDiv = title.closest('div#dismissible');
                if (dismissibleDiv) {
                    dismissibleDiv.style.display = 'none';
                }
            }
        });
    };
    hideRecommendations();

    const observer = new MutationObserver(hideRecommendations);
    observer.observe(document.body, {
        childList: true, subtree: true
    });
})();
