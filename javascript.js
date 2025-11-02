// --- IMAGE ARRAY & ASSOCIATED PRIMARY COLORS (LIGHT COLORS ONLY) ---
const slides = [
    // 1. Pale Mint Green
    { url: 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/healthy-eating-ingredients-1296x728-header.jpg?w=1155&h=1528', color: '#6ee7b7' }, 
    
    // 2. Soft Peach Orange
    { url: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg', color: '#fdba74' }, 
    
    // 3. Sky Blue
    { url: 'https://www.ucsfhealth.org/-/media/project/ucsf/ucsf-health/education/hero/top-ten-foods-for-health-2x.jpg?rev=890e0016d9824d5789d4eaa610ce606e', color: '#60a5fa' }, 
    
    // 4. Pale Lavender
    { url: 'https://ukhealthcare.uky.edu/sites/default/files/2024-09/GettyImages-1371124527.jpg', color: '#a78bfa' }  
];

let currentIndex = 0;
const carouselElement = document.getElementById('carousel');
const overlayElement = document.getElementById('overlay');
const containerElement = document.getElementById('main-container');
const buttonElement = document.getElementById('getStartedBtn');
const titleSpan = document.getElementById('nutri-span');

/**
 * Converts a hex color string to an RGB object.
 * @param {string} hex - The hex color code (e.g., '#dc2626').
 * @returns {object} - {r, g, b}
 */
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

/**
 * Applies the new color scheme based on the current slide's color.
 * @param {string} hexColor - The hex color code to use for accents.
 */
function applyColors(hexColor) {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return;

    // 1. Dynamic Overlay Tint (Subtle background blend)
    overlayElement.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`; 

    // 2. Container Border
    containerElement.style.borderColor = hexColor;

    // 3. Title Accent
    titleSpan.style.color = hexColor;

    // 4. Button Color and Shadow
    const shadowRgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;
    
    buttonElement.style.backgroundColor = hexColor;
    buttonElement.style.boxShadow = `0 6px 20px ${shadowRgba}`;
    
    // Re-apply hover behavior dynamically
    buttonElement.onmouseover = () => {
        buttonElement.style.backgroundColor = hexColor; // Prevent flicker
        buttonElement.style.filter = 'brightness(90%)'; // Darker on hover
    };
    buttonElement.onmouseout = () => {
        buttonElement.style.backgroundColor = hexColor;
        buttonElement.style.filter = 'brightness(100%)';
    };
}

/**
 * Initializes the carousel by creating image elements.
 */
function initializeCarousel() {
    if (!carouselElement) return;

    slides.forEach((slide, index) => {
        const imgDiv = document.createElement('div');
        imgDiv.className = 'carousel-image';
        imgDiv.style.backgroundImage = `url('${slide.url}')`;
        imgDiv.id = `img-${index}`;
        carouselElement.appendChild(imgDiv);
    });
    
    // Set the first image and colors immediately
    if (slides.length > 0) {
         document.getElementById(`img-0`).classList.add('active');
         applyColors(slides[0].color);
    }
}

/**
 * Cycles to the next image in the carousel with a fade effect.
 */
function nextImage() {
    // Hide current image
    const currentImage = document.getElementById(`img-${currentIndex}`);
    if (currentImage) {
        currentImage.classList.remove('active');
    }
    
    // Calculate next index
    currentIndex = (currentIndex + 1) % slides.length;
    
    // Show next image
    const nextImage = document.getElementById(`img-${currentIndex}`);
    if (nextImage) {
        nextImage.classList.add('active');
    }
    
    // Apply new colors
    applyColors(slides[currentIndex].color);
}

// Event listener for the main button
document.getElementById('getStartedBtn').addEventListener('click', () => {
    window.location.href = 'auth_page.js'; 
});

// Initialize and start the carousel on window load
window.onload = function() {
    initializeCarousel();
    // Start the rotation every 5 seconds (5000 milliseconds)
    setInterval(nextImage, 5000); 
};
// Event listener for the main button
document.getElementById('getStartedBtn').addEventListener('click', () => {
    // This is incorrect: it should be .jsx, not .js
    window.location.href = 'login.html';

});
