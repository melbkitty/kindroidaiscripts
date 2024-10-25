// ==UserScript==
// @name        Infinite Continues (Click based on Element Presence)
// @namespace   Violentmonkey Scripts
// @match       https://kindroid.ai/groupchat/*
// @grant       none
// @version     1.9
// @author      aeroraphxp
// @description 10/25/2024, Click based on element presence
// ==/UserScript==

console.log("Script started - Listening for specific elements");

// Function to check for the absence of the stop icon
function isStopIconAbsent() {
    const stopIcon = document.querySelector('img[alt="stop"]');
    return !stopIcon; // Returns true if the stop icon does not exist
}

// Function to perform action based on the presence of target elements
function clickWhenTargetElementsAbsent() {
    if (isStopIconAbsent()) {
        // Check for the special target element first
        let specialTargetElement = document.querySelector('.css-qwhftf');
        if (specialTargetElement) {
            console.log("Special target element found, clicking it:", specialTargetElement);
            specialTargetElement.click(); // Click the special target element
        } else {
            // If the special target element is not found, check for the fallback element
            let fallbackTargetElement = document.querySelector('.chakra-button.css-snc6k5');
            if (fallbackTargetElement) {
                console.log("Fallback target element found, clicking it:", fallbackTargetElement);
                fallbackTargetElement.click(); // Click the fallback target element
            } else {
                console.log("No target elements found"); // Log if neither element is found
            }
        }
    } else {
        console.log("Stop icon is present, not clicking any element.");
    }
}

// Monitor changes to the DOM in case the target elements are dynamically added
let observer = new MutationObserver(function(mutations) {
    mutations.forEach(function() {
        // Check for the special target element existence
        if (document.querySelector('.css-qwhftf')) {
            console.log("Special target element is present in the DOM");
            observer.disconnect(); // Stop observing if found
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });

// Function to keep checking every few seconds
function startChecking() {
    clickWhenTargetElementsAbsent(); // Run the check immediately
    setTimeout(startChecking, 5000); // Schedule the next check
}

// Start the periodic checking
startChecking();
