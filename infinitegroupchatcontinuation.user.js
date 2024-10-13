// ==UserScript==
// @name         Auto Click "Continue Conversation" in GCs
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically clicks "Continue Conversation" on Kindroid.ai group chat
// @author       aeroraphxp
// @match        https://kindroid.ai/groupchat/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function checkAndClickButton() {
        // Locate the button by its class
        let button = document.querySelector('.chakra-button.css-snc6k5');

        // Click the button if found
        if (button) {
            button.click();
            console.log('Clicked "Continue Conversation" button');
        }
    }

    // Set an interval to check for the button every 0.5 seconds
    setInterval(checkAndClickButton, 500);

})();
