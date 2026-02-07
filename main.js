
let translations = {};
let currentLanguage = 'en'; // Default language

const fortuneButton = document.getElementById('fortune-button');
const fortuneText = document.getElementById('fortune-text');
const langEnButton = document.getElementById('lang-en');
const langKoButton = document.getElementById('lang-ko');

async function loadLanguage(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        translations = await response.json();
        currentLanguage = lang;
        applyTranslations();
        updateLanguageButtons();
    } catch (error) {
        console.error('Error loading language file:', error);
    }
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
        const key = element.getAttribute('data-i18n-aria-label');
        if (translations[key]) {
            element.setAttribute('aria-label', translations[key]);
        }
    });

    // Update the document title
    const titleElement = document.querySelector('title');
    const titleKey = titleElement.getAttribute('data-i18n');
    if (translations[titleKey]) {
        titleElement.textContent = translations[titleKey];
    }
}

function updateLanguageButtons() {
    langEnButton.classList.remove('active');
    langKoButton.classList.remove('active');
    if (currentLanguage === 'en') {
        langEnButton.classList.add('active');
    } else {
        langKoButton.classList.add('active');
    }
}

langEnButton.addEventListener('click', () => loadLanguage('en'));
langKoButton.addEventListener('click', () => loadLanguage('ko'));

fortuneButton.addEventListener('click', () => {
    // Fortunes will now come from the translation file
    const fortunesArray = translations.fortunes || []; // Ensure fortunes exist
    if (fortunesArray.length === 0) {
        console.warn("No fortunes found for the current language.");
        return;
    }
    const randomIndex = Math.floor(Math.random() * fortunesArray.length);
    const randomFortune = fortunesArray[randomIndex];

    fortuneText.classList.remove('fade-in');

    // Trigger a reflow to restart the animation
    void fortuneText.offsetWidth;

    setTimeout(() => {
        fortuneText.style.opacity = 1;
        fortuneText.textContent = randomFortune;
        fortuneText.classList.add('fade-in');
    }, 100);
});

// Load default language on page load
loadLanguage(localStorage.getItem('language') || 'en');
