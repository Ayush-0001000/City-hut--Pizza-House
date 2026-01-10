/*
    menuToggle.js - Mobile menu toggle behavior
    Purpose: Handles opening/closing the mobile nav menu. Adds click listeners for the menu bar and close button.
    Notes: Safe to include on pages that contain `.mobile-menu` and `.menu-bar` elements.
*/
const mobileMenuSelector = '.mobile-menu';
const menuBarSelector = '.menu-bar';
const closeBtnSelector = '.close-btn';

// Get elements once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuElement = document.querySelector(mobileMenuSelector);
    const menuBarElement = document.querySelector(menuBarSelector);
    const closeBtnElement = document.querySelector(closeBtnSelector);

    // Function to toggle the menu's 'active' class
    function toggleMobileMenu() {
        if (mobileMenuElement) {
            mobileMenuElement.classList.toggle('active');
            console.log('Mobile menu toggled.');
        } else {
            console.warn('Error: .mobile-menu element not found.');
        }
    }

    // 1. Event listener for the OPEN button (menu-bar)
    if (menuBarElement) {
        menuBarElement.addEventListener('click', toggleMobileMenu);
    } else {
        console.warn('Error: .menu-bar element not found. Cannot open menu.');
    }

    // 2. Event listener for the CLOSE button
    if (closeBtnElement) {
        closeBtnElement.addEventListener('click', () => {
            // Simply ensure it's removed if the close button is clicked
            if (mobileMenuElement) {
                mobileMenuElement.classList.remove('active');
                console.log('Mobile menu closed via X button.');
            }
        });
    }

    // Optional: Close when clicking a link *inside* the mobile menu (best practice)
    if (mobileMenuElement) {
        const navLinks = mobileMenuElement.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuElement.classList.remove('active');
            });
        });
    }

});