// ==UserScript==
// @name         Auto Play Generated Audio on Message
// @namespace    https://github.com/bearudev/kindroidaiscripts/
// @version      1.0
// @description  Automatically play generated audio when a new message is fully generated
// @author       Raph
// @match        https://kindroid.ai/*
// @grant        none
// @updateURL    https://github.com/bearudev/kindroidaiscripts/raw/main/autoplayvoice.user.js
// @downloadURL  https://github.com/bearudev/kindroidaiscripts/raw/main/autoplayvoice.user.js
// @homepageURL  https://github.com/bearudev/kindroidaiscripts/
// ==/UserScript==

(function() {
    'use strict';

    let lastPlayedMessage = null;  // Variable to store the last played message container

    // Function to check if the browser is Safari on iOS
    function isSafariIOS() {
        return /iP(hone|od|ad)/.test(navigator.platform) && 
               /^((?!CriOS).)*Safari/.test(navigator.userAgent);
    }

    // Function to check for the audio element or play icon
    function checkForNewMessage() {
        const messageContainers = document.querySelectorAll('.css-70qvj9');

        if (messageContainers.length > 0) {
            const lastContainer = messageContainers[messageContainers.length - 1];

            if (lastContainer === lastPlayedMessage) {
                return;
            }

            const playIcon = lastContainer.querySelector('img[src*="playIcon"]');

            if (playIcon) {
                if (isSafariIOS()) {
                    alert('Play icon detected! Click to play the audio.');
                } else {
                    playIcon.click();
                }
                lastPlayedMessage = lastContainer;
                return;
            }

            const audioElement = lastContainer.querySelector('audio');
            if (audioElement) {
                if (isSafariIOS()) {
                    alert('Audio element detected! Click to play.');
                    audioElement.play().catch(() => {
                        alert('Audio playback failed due to restrictions.');
                    });
                } else {
                    audioElement.play();
                }
                lastPlayedMessage = lastContainer;
            }
        }
    }

    // Observe changes to the DOM
    const observer = new MutationObserver(checkForNewMessage);
    observer.observe(document.body, { childList: true, subtree: true });

})();
