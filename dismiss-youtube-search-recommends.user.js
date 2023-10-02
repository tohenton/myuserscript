// ==UserScript==
// @name         Dismiss youtube search recommend
// @namespace    https://github.com/tohenton/myuserscript
// @version      1.1
// @description  Dismiss "あなたへのおすすめ" in youtube search result
// @author       tohenton
// @match        https://www.youtube.com/results*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const RECOMMENDATION_TITLES = ['あなたへのおすすめ'];

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
