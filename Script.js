// JAVASCRIPT START: Custom Frontend Logic

// --- 1. Navigation Logic (Mobile Menu) ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

/**
 * Toggles the visibility of the mobile navigation menu.
 */
mobileMenuButton.addEventListener('click', () => {
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
    });
});


// --- 2. Dynamic Content Logic (Crop Cards) ---
const allCrops = [
    { name: "Rice (Dhan)", icon: "🍚", desc: "The staple food. We offer guidance on high-yield varieties like BRRI Dhan." },
    { name: "Jute (Pat)", icon: "🌿", desc: "The Golden Fibre. Focus on improved retting and industrial processing." },
    { name: "Tea (Cha)", icon: "☕", desc: "For the hill tracts. Best practices in pruning, plucking, and pest management." },
    { name: "Potato (Alu)", icon: "🥔", desc: "A key cash crop. Storage, variety selection, and cold chain logistics." },
    { name: "Wheat (Gom)", icon: "🌾", desc: "Alternative staple. Focus on drought-resistant and high-protein strains." },
    { name: "Lentils (Dal)", icon: "🍲", desc: "Pulse crop for protein. Intercropping and soil health strategies." },
    { name: "Mango (Aam)", icon: "🥭", desc: "Popular fruit. Orchard management, pest control, and export quality." },
    { name: "Vegetables", icon: "🥦", desc: "Year-round production. Season-specific advice for diverse vegetable farming." }
];

const cardsContainer = document.getElementById('crop-cards-container');
let displayedCropCount = 4;

/**
 * Renders a specific number of crop cards to the UI.
 * @param {number} count The number of cards to render.
 */
function renderCropCards(count) {
    cardsContainer.innerHTML = '';
    const cropsToDisplay = allCrops.slice(0, count);

    cropsToDisplay.forEach(crop => {
        const card = document.createElement('div');
        card.className = 'feature-card bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center';
        card.innerHTML = `
            <div class="text-4xl mb-4">${crop.icon}</div>
            <h3 class="text-xl font-bold mb-2 text-green-700">${crop.name}</h3>
            <p class="text-gray-600 text-sm">${crop.desc}</p>
        `;
        cardsContainer.appendChild(card);
    });
}

/**
 * Loads the next set of crop cards (or all remaining ones).
 */
function loadMoreCrops() {
    const nextCount = displayedCropCount + 4;
    displayedCropCount = Math.min(nextCount, allCrops.length);
    renderCropCards(displayedCropCount);

    // Hide the button if all crops are displayed
    const button = document.querySelector('.text-center.mt-12 > button');
    if (displayedCropCount === allCrops.length) {
        button.classList.add('hidden');
    } else {
         button.classList.remove('hidden');
    }
}

// Initial load of crop cards
window.addEventListener('load', () => {
    renderCropCards(displayedCropCount);
});


// --- 3. Form Submission Logic (Simulated) ---
const contactForm = document.querySelector('form');
const formMessage = document.getElementById('form-message');

/**
 * Handles the simulated form submission.
 */
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    formMessage.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');
    formMessage.classList.add('bg-yellow-100', 'text-yellow-700');
    formMessage.innerHTML = 'Sending message... Please wait.';
    formMessage.classList.remove('hidden');


    // Simulate API call delay for 1.5 seconds
    setTimeout(() => {
        const name = document.getElementById('name').value;
        
        // Simulated success
        formMessage.classList.remove('bg-yellow-100', 'text-yellow-700');
        formMessage.classList.add('bg-green-100', 'text-green-700');
        formMessage.innerHTML = `Success! Thank you, ${name}. Your inquiry has been noted. We will respond soon.`;
        
        // Clear the form fields after successful submission
        contactForm.reset();
    }, 1500);
});

// JAVASCRIPT END: Custom Frontend Logic