// ==UserScript==
// @name         Redirect to puzz.link
// @namespace    https://github.com/tohenton/myuserscript
// @version      1.0
// @description  Auto redirect to puzz.link
// @author       tohenton
// @match        http://pzv.jp/p.html?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pzv.jp
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const newDomain = 'https://puzz.link';
    const currentPathAndQuery = window.location.pathname + window.location.search;
    document.location = newDomain + currentPathAndQuery;
})();
