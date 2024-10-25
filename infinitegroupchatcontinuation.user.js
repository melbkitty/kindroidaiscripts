// ==UserScript==
// @name         Auto Click "Continue Conversation" in GCs
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Automatically clicks "Continue Conversation" on Kindroid.ai group chat
// @author       aeroraphxp
// @match        https://kindroid.ai/groupchat/*
// @grant        none
// ==/UserScript==

console.log("Script started - Listening for specific elements");

=function isStopIconAbsent() {
    const stopIcon = document.querySelector('img[alt="stop"]');
    return !stopIcon; // Returns true if the stop icon does not exist
}

function clickWhenTargetElementsAbsent() {
    if (isStopIconAbsent()) {
        // If stop icon is absent, check for the special target element
        let specialTargetElement = document.querySelector('.css-qwhftf');
        if (specialTargetElement) {
            console.log("Special target element found, clicking it:", specialTargetElement);
            specialTargetElement.click(); // Click the special target element
        } else {
            console.log("Special target element not found");
        }
    } else {
        console.log("Stop icon is present, not clicking any element.");
    }
}

let observer = new MutationObserver(function(mutations) {
    mutations.forEach(function() {
        if (document.querySelector('.css-qwhftf')) {
            console.log("Special target element is present in the DOM");
            observer.disconnect(); // Stop observing if found
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });

// Function to keep checking every few seconds
function startChecking() {
    clickWhenTargetElementsAbsent();
    setTimeout(startChecking, 7500);
}

startChecking();
