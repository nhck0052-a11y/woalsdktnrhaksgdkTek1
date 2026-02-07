let translations = {};
let currentLanguage = 'en'; // Default language

const fortuneButton = document.getElementById('fortune-button');
const fortuneText = document.getElementById('fortune-text');
const langEnButton = document.getElementById('lang-en');
const langKoButton = document.getElementById('lang-ko');
const faceReadingTriggerButton = document.getElementById('face-reading-trigger-button');
const faceReadingAppContainer = document.getElementById('face-reading-app-container');

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

// Dynamic Teachable Machine Loading Logic
faceReadingTriggerButton.addEventListener('click', async () => {
    if (faceReadingAppContainer.style.display === 'none') {
        faceReadingAppContainer.style.display = 'block'; // Show the container

        // Check if scripts are already loaded
        if (!window.tmImage) { // Assuming tmImage is exposed globally
            // Dynamically load TensorFlow.js
            const tfScript = document.createElement('script');
            tfScript.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js";
            document.head.appendChild(tfScript);

            // Dynamically load Teachable Machine Image library
            const tmScript = document.createElement('script');
            tmScript.src = "https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js";
            document.head.appendChild(tmScript);

            // Wait for scripts to load
            await Promise.all([
                new Promise(resolve => tfScript.onload = resolve),
                new Promise(resolve => tmScript.onload = resolve)
            ]);
        }

        // Inject Teachable Machine HTML
        faceReadingAppContainer.innerHTML = `
            <div data-i18n="teachableMachineTitle"></div>
            <button type="button" onclick="init()" data-i18n="tmStartButton"></button>
            <div id="webcam-container"></div>
            <div id="label-container"></div>
        `;

        // Inject Teachable Machine JavaScript logic
        const tmInlineScript = document.createElement('script');
        tmInlineScript.type = "text/javascript";
        tmInlineScript.textContent = `
            const URL = "https://teachablemachine.withgoogle.com/models/BqpR6ZHhi/";
            let model, webcam, labelContainer, maxPredictions;

            async function init() {
                const modelURL = URL + "model.json";
                const metadataURL = URL + "metadata.json";
                model = await tmImage.load(modelURL, metadataURL);
                maxPredictions = model.getTotalClasses();

                const flip = true;
                webcam = new tmImage.Webcam(200, 200, flip);
                await webcam.setup();
                await webcam.play();
                window.requestAnimationFrame(loop);

                document.getElementById("webcam-container").appendChild(webcam.canvas);
                labelContainer = document.getElementById("label-container");
                for (let i = 0; i < maxPredictions; i++) {
                    labelContainer.appendChild(document.createElement("div"));
                }
            }

            async function loop() {
                webcam.update();
                await predict();
                window.requestAnimationFrame(loop);
            }

            async function predict() {
                const prediction = await model.predict(webcam.canvas);
                for (let i = 0; i < maxPredictions; i++) {
                    const classPrediction =
                        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
                    labelContainer.childNodes[i].innerHTML = classPrediction;
                }
            }
        `;
        faceReadingAppContainer.appendChild(tmInlineScript);

        // Call init() from the dynamically loaded script
        // This relies on init being in the global scope or accessible
        // A better way might be to ensure the script itself calls init
        // For simplicity, we assume init is global after injection
        if (typeof init === 'function') {
            init();
        } else {
            // Fallback: wait a bit and try again, or consider a different loading strategy
            setTimeout(() => {
                if (typeof init === 'function') init();
                else console.error("init function not found after dynamic script injection.");
            }, 500); // Give a small delay for the script to parse and define init
        }

    } else {
        faceReadingAppContainer.style.display = 'none'; // Hide if already visible
        // Optionally, stop webcam and clear content
        // if (window.webcam && window.webcam.stop) window.webcam.stop();
        // faceReadingAppContainer.innerHTML = '';
    }
});


// Load default language on page load
loadLanguage(localStorage.getItem('language') || 'en');