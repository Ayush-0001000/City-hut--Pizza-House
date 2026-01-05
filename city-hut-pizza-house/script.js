document.addEventListener('DOMContentLoaded', () => {

    // --- SLIDER UTILITY FUNCTION FOR INFINITE SLIDING ---
    const setupOptimizedSlider = (config) => {
        const { wrapperSelector, slideCommonClass, activeClass, intervalTime } = config;

        const sliderWrapper = document.querySelector(wrapperSelector);
        if (!sliderWrapper) return;

        const section = sliderWrapper.closest('section');
        const slides = Array.from(sliderWrapper.querySelectorAll(`.${slideCommonClass}`));
        const prevButton = section ? section.querySelector('.prev') : null;
        const nextButton = section ? section.querySelector('.next') : null;

        if (slides.length <= 3) {
            console.warn(`Slider needs more than 3 slides to function optimally for ${wrapperSelector}`);
            return;
        }

        let currentIndex = 0; // The index of the slide that is *logically* the center
        let slideInterval;

        // -----------------------------------------------------------
        // 1. Core Visual Update Function
        // -----------------------------------------------------------
        const updateVisuals = () => {
            const total = slides.length;

            slides.forEach((slide, index) => {
                slide.classList.remove(activeClass);

                // Calculate the position difference relative to the current center (currentIndex)
                let diff = index - currentIndex;

                // Use modulo to handle wrapping (infinite loop logic)
                if (diff > total / 2) diff -= total;
                if (diff < -total / 2) diff += total;

                // --- Positioning and Scaling Logic ---
                let transformValue = 'scale(0.85)';
                let opacity = '0.45';
                let zIndex = 1;

                if (diff === 0) {
                    // Center Slide (Active)
                    transformValue = 'translateX(0) scale(1)';
                    opacity = '1';
                    zIndex = 10;
                    slide.classList.add(activeClass);
                } else if (diff === 1 || diff === -2 || diff === total - 2) {
                    // Right Slide
                    transformValue = 'translateX(65%) scale(0.85)';
                    zIndex = 5;
                } else if (diff === -1 || diff === 2 || diff === -(total - 2)) {
                    // Left Slide
                    transformValue = 'translateX(-65%) scale(0.85)';
                    zIndex = 5;
                } else {
                    // Hidden/Out-of-View Slides
                    transformValue = 'scale(0.85)';
                    opacity = '0';
                    zIndex = 0;
                }

                // Apply Styles
                slide.style.transform = transformValue;
                slide.style.opacity = opacity;
                slide.style.zIndex = zIndex;
            });
        };

        // -----------------------------------------------------------
        // 2. Control Functions
        // -----------------------------------------------------------
        const goToNext = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateVisuals();
        };

        const goToPrev = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateVisuals();
        };

        const startSlider = () => {
            slideInterval = setInterval(goToNext, intervalTime);
        };

        const pauseSlider = () => {
            clearInterval(slideInterval);
        };

        // -----------------------------------------------------------
        // 3. Initialization
        // -----------------------------------------------------------
        updateVisuals(); // Set initial state

        // Event Listeners for Manual Control
        if (nextButton) nextButton.addEventListener('click', () => { pauseSlider(); goToNext(); startSlider(); });
        if (prevButton) prevButton.addEventListener('click', () => { pauseSlider(); goToPrev(); startSlider(); });

        // Auto-Slide Start/Stop on Hover
        sliderWrapper.addEventListener('mouseenter', pauseSlider);
        sliderWrapper.addEventListener('mouseleave', startSlider);

        // Start the automatic sliding
        startSlider();
    };

    // --- CONFIGURATION ---
    setupOptimizedSlider({
        wrapperSelector: '.review-section .review-slider',
        slideCommonClass: 'slider-item',
        activeClass: 'active',
        intervalTime: 4000
    });

    setupOptimizedSlider({
        wrapperSelector: '.slider-section .slider-box-wrapper',
        slideCommonClass: 'slider-box',
        activeClass: 'active-slide',
        intervalTime: 5000
    });

    // Small helper: apply a temporary left-aligned state to the main section heading
    // so that when returning from a detail view the heading is brought into focus on the left.
    // Exposed as `window.applyReturnHeadingStick()` for other page scripts to call.
    window.applyReturnHeadingStick = function () {
        // Only target headings inside a menu section (prevents touching index 'Our Speciality')
        const titleDiv = document.querySelector('.menu-section .menu-grid-titlei-div') || document.querySelector('.menu-section .menu-grid-title');
        if (!titleDiv) return;

        // Prevent stacking multiple timers
        if (titleDiv.__stuckTimer) {
            clearTimeout(titleDiv.__stuckTimer);
            titleDiv.__stuckTimer = null;
        }

        titleDiv.classList.add('stuck-left');
        titleDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        titleDiv.__stuckTimer = setTimeout(() => {
            titleDiv.classList.remove('stuck-left');
            titleDiv.__stuckTimer = null;
        }, 2500);
    };

});

