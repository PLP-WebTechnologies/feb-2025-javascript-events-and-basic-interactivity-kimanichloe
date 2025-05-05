// script.js

// --------------------------------------------------------------------------
// 1. Event Handling 🎈
// --------------------------------------------------------------------------

// --- Button Click ---
const clickMeButton = document.getElementById('clickMeButton'); // Assuming this button exists in index.html
if (clickMeButton) {
    clickMeButton.addEventListener('click', () => {
        console.log('Button clicked!');
        alert('You clicked the button! 🎉');
    });
}

// --- Hover Effects ---
const hoverTarget = document.getElementById('hoverTarget'); // Assuming this element exists
if (hoverTarget) {
    hoverTarget.addEventListener('mouseover', () => {
        hoverTarget.style.backgroundColor = 'lightblue';
        hoverTarget.style.cursor = 'pointer';
    });
    hoverTarget.addEventListener('mouseout', () => {
        hoverTarget.style.backgroundColor = ''; // Revert to original
        hoverTarget.style.cursor = 'default';
    });
}

// --- Keypress Detection ---
document.addEventListener('keypress', (event) => {
    console.log(`Key pressed: ${event.key}`);
    const keyPressDisplay = document.getElementById('keyPressDisplay'); // Assuming a <div id="keyPressDisplay"> exists
    if (keyPressDisplay) {
        keyPressDisplay.textContent = `Last key pressed: ${event.key}`;
    }
});

// --- Bonus: Double-Click Secret Action ---
const doubleClickTarget = document.getElementById('doubleClickTarget'); // Assuming this exists
if (doubleClickTarget) {
    doubleClickTarget.addEventListener('dblclick', () => {
        alert('Secret double-click action triggered! 🤫');
        // Maybe change some styles dramatically or show a hidden element
        doubleClickTarget.classList.toggle('secret-style'); // Assuming 'secret-style' is defined in style.css
    });
}

// --- Bonus: Long Press Secret Action (Simple Implementation - might not be perfect) ---
const longPressTarget = document.getElementById('longPressTarget'); // Assuming this exists
if (longPressTarget) {
    let pressTimer;
    const longPressDuration = 1000; // 1 second

    longPressTarget.addEventListener('mousedown', () => {
        pressTimer = setTimeout(() => {
            alert('Long press detected! ✨');
            longPressTarget.classList.add('long-press-effect'); // Assuming 'long-press-effect' in style.css
        }, longPressDuration);
    });

    longPressTarget.addEventListener('mouseup', () => {
        clearTimeout(pressTimer);
        longPressTarget.classList.remove('long-press-effect');
    });

    longPressTarget.addEventListener('mouseleave', () => {
        clearTimeout(pressTimer);
        longPressTarget.classList.remove('long-press-effect');
    });
}

// --------------------------------------------------------------------------
// 2. Interactive Elements 🎮
// --------------------------------------------------------------------------

// --- Button that changes text or color ---
const changeButton = document.getElementById('changeButton'); // Assuming this exists
if (changeButton) {
    let isText = true;
    changeButton.addEventListener('click', () => {
        if (isText) {
            changeButton.textContent = 'Color Changed!';
            changeButton.style.backgroundColor = 'lightgreen';
            isText = false;
        } else {
            changeButton.textContent = 'Change Me!';
            changeButton.style.backgroundColor = ''; // Revert
            isText = true;
        }
    });
}

// --- Image Gallery/Slideshow (Basic - requires images in HTML) ---
const galleryImages = document.querySelectorAll('.gallery-image'); // Assuming images have this class
let currentIndex = 0;
const nextButton = document.getElementById('nextImage'); // Assuming this button exists
const prevButton = document.getElementById('prevImage'); // Assuming this button exists

function showImage(index) {
    galleryImages.forEach((img, i) => {
        img.style.display = i === index ? 'block' : 'none';
    });
}

if (galleryImages.length > 0 && nextButton && prevButton) {
    showImage(currentIndex);

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        showImage(currentIndex);
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentIndex);
    });
}

// --- Tabs or Accordion-Style Content (Basic Tabs - requires HTML structure) ---
const tabButtons = document.querySelectorAll('.tab-button'); // Assuming buttons have this class
const tabContents = document.querySelectorAll('.tab-content'); // Assuming content divs have this class

function showTab(tabId) {
    tabContents.forEach(content => {
        content.style.display = 'none';
    });
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    const selectedTab = document.getElementById(tabId);
    const selectedButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);

    if (selectedTab && selectedButton) {
        selectedTab.style.display = 'block';
        selectedButton.classList.add('active');
    }
}

if (tabButtons.length > 0) {
    // Show the first tab by default
    showTab(tabButtons[0].getAttribute('data-tab'));

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabToShow = button.getAttribute('data-tab');
            showTab(tabToShow);
        });
    });
}

// --- Bonus: Add some animation using JS or CSS ✨ (Simple JS Fade In) ---
const animatedElement = document.getElementById('animatedElement'); // Assuming this exists
if (animatedElement) {
    animatedElement.style.opacity = 0;
    let opacity = 0;
    const fadeInInterval = setInterval(() => {
        opacity += 0.05;
        animatedElement.style.opacity = opacity;
        if (opacity >= 1) {
            clearInterval(fadeInInterval);
        }
    }, 100); // Adjust interval for speed
}

// --------------------------------------------------------------------------
// 3. Form Validation 📋✅
// --------------------------------------------------------------------------

const signupForm = document.getElementById('signupForm'); // Assuming a <form id="signupForm"> exists
if (signupForm) {
    signupForm.addEventListener('submit', (event) => {
        let isValid = true;
        const requiredFields = signupForm.querySelectorAll('[required]');
        const emailInput = signupForm.querySelector('input[type="email"]');
        const passwordInput = signupForm.querySelector('input[type="password"]');
        const passwordRulesDisplay = document.getElementById('passwordRules'); // Assuming this exists

        // --- Required Field Checks ---
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error'); // Assuming 'error' class in style.css
                // You might want to display an error message next to the field
            } else {
                field.classList.remove('error');
            }
        });

        // --- Email Format Validation ---
        if (emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            isValid = false;
            emailInput.classList.add('error');
            // Display email format error
        } else if (emailInput) {
            emailInput.classList.remove('error');
        }

        // --- Password Rules (min 8 characters) ---
        if (passwordInput && passwordInput.value.length < 8) {
            isValid = false;
            passwordInput.classList.add('error');
            if (passwordRulesDisplay) {
                passwordRulesDisplay.textContent = 'Password must be at least 8 characters long.';
            }
        } else if (passwordInput && passwordRulesDisplay) {
            passwordInput.classList.remove('error');
            passwordRulesDisplay.textContent = '';
        }

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if validation fails
            alert('Please fix the errors in the form.');
        } else {
            alert('Form submitted successfully! 🎉 (Not really, this is just validation)');
            // In a real scenario, you would submit the form data here
        }
    });

    // --- Bonus: Real-time Feedback While Typing (Password Rules) ---
    if (passwordInput && passwordRulesDisplay) {
        passwordInput.addEventListener('input', () => {
            if (passwordInput.value.length < 8) {
                passwordInput.classList.add('warning'); // Assuming 'warning' class in style.css
                passwordRulesDisplay.textContent = 'Password should be at least 8 characters.';
            } else {
                passwordInput.classList.remove('warning');
                passwordRulesDisplay.textContent = '';
            }
        });
    }
}

// --------------------------------------------------------------------------
// 🧙‍♂️ Pro Tips Reminder (for the developer looking at this code)
// --------------------------------------------------------------------------
// - Code is commented to explain functionality.
// - User experience is considered with feedback and interactivity.
// - Encourage Googling and experimentation!
// --------------------------------------------------------------------------

console.log('JavaScript wizardry loaded! ✨ Running from Kitengela, Kajiado County, Kenya at 11:57 AM EAT on Monday, May 5, 2025.');