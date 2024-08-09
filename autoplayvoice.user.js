// ==UserScript==
// @name         Auto Play Generated Audio on Message
// @namespace    https://github.com/bearudev/kindroidaiscripts/
// @version      1.0
// @description  Automatically play generated audio when a new message is fully generated
// @author       Raph
// @match        https://kindroid.ai/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let lastPlayedMessage = null;  // Variable to store the last played message container

    // Function to check for the audio element or play icon
    function checkForNewMessage() {
        const messageContainers = document.querySelectorAll('.css-70qvj9');

        if (messageContainers.length > 0) {
            const lastContainer = messageContainers[messageContainers.length - 1];

            // If the last container has already been processed, return
            if (lastContainer === lastPlayedMessage) {
                return;
            }

            // Check if the play icon is present
            const playIcon = lastContainer.querySelector('img[src*="playIcon"]');

            // If the play icon exists, simulate a click to play the audio
            if (playIcon) {
                playIcon.click();
                lastPlayedMessage = lastContainer;  // Update the last played message
                return;
            }

            // Alternatively, if the audio element is available, play it directly
            const audioElement = lastContainer.querySelector('audio');
            if (audioElement) {
                audioElement.play();
                lastPlayedMessage = lastContainer;  // Update the last played message
            }
        }
    }

    // Observe changes to the DOM
    const observer = new MutationObserver(checkForNewMessage);
    observer.observe(document.body, { childList: true, subtree: true });

})();
