// ==UserScript==
// @name         Auto Play Generated Audio on Message
// @namespace    https://github.com/bearudev/kindroidaiscripts/
// @version      1.2
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
    const POLL_INTERVAL = 500;     // Interval in milliseconds to poll for message readiness
    const CLICK_DELAY = 200;      // Delay in milliseconds before clicking the play button
    const RECLICK_DELAY = 1000;     // Delay in milliseconds between repeated clicks

    // Function to check if the browser is Safari on iOS
    function isSafariIOS() {
        return /iP(hone|od|ad)/.test(navigator.platform) &&
               /^((?!CriOS).)*Safari/.test(navigator.userAgent);
    }

    // Function to unlock audio playback by simulating a user interaction
    function unlockAudioPlayback() {
        document.body.addEventListener('touchstart', () => {
            const tempAudio = new Audio();
            tempAudio.play().catch(() => {
                // Ignored intentionally, this is just to "unlock" audio playback
            });
        }, { once: true });
    }

    // Function to click the play button until it changes to stop button
    function clickPlayButtonUntilStopped(playIcon) {
        const checkIcon = () => {
            const newStopIcon = document.querySelector('img[src*="stopIcon"]');

            console.log(playIcon); //first play icon of loaded page for some reason
            console.log(newStopIcon);

            if (newStopIcon) {
                console.log('Play icon changed to stop icon.');
                return true; // Stop clicking
            }

            // Simulate a click event
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            playIcon.dispatchEvent(clickEvent);

            console.log('Simulated click on play icon.');
            if(isSafariIOS())
            {
               setTimeout(() => {
                      const audioToPlay = lastContainer.querySelector('audio')
                      audioToPlay.play() //I have to do this on Safari and iOS browsers due to webkit limitations.
                      //The button will not change to indicate something is playing, but whatever.
                  }, 3000)
                return true;
            }
            return false; // Continue clicking
        };

        // Initial click and then continue clicking if needed
        if (checkIcon()) return;
        const interval = setInterval(() => {
            if (checkIcon()) {
                clearInterval(interval);
            }
        }, RECLICK_DELAY);
    }

    // Function to check for new messages and play audio
    function checkForNewMessage() {
        const messageContainers = document.querySelectorAll('.css-70qvj9');

        if (messageContainers.length > 0) {
            const lastContainer = messageContainers[messageContainers.length - 1];

            if (lastContainer === lastPlayedMessage) {
                return;
            }

            console.log('Checking message container:', lastContainer);

            const pollMessageReadiness = setInterval(() => {
                  clearInterval(pollMessageReadiness);

                  // Wait before clicking the play icon
                  setTimeout(() => {
                      const playIcon = lastContainer.querySelector('img[src*="playIcon"]');
                      if (playIcon) {
                          console.log('Found play icon:', playIcon);
                          clickPlayButtonUntilStopped(playIcon); // Click the play button until it changes
                          lastPlayedMessage = lastContainer;
                      } else {
                          console.log('Play icon not found in message container.');
                      }
                  }, CLICK_DELAY);

            }, POLL_INTERVAL);

            return; // Exit after initiating polling
        }
    }

    // Attempt to unlock audio playback if on Safari iOS
    if (isSafariIOS()) {
        unlockAudioPlayback();
    }

    // Observe changes to the DOM
    const observer = new MutationObserver(checkForNewMessage);
    observer.observe(document.body, { childList: true, subtree: true });

})();
