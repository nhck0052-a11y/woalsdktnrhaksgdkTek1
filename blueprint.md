# Project Blueprint: The Digital Mystic

## Overview

This document outlines the design and development of "The Digital Mystic," a multi-feature web application designed for user engagement and monetization through Google AdSense. The goal is to create a visually bold, interactive, and shareable experience that encourages repeat visits.

## Core Features

1.  **Fortune Cookie:** The original feature. A user clicks a cookie to get a random fortune.
2.  **Tarot Card of the Day:** A user draws a single, beautifully designed tarot card for a quick piece of daily guidance. The card will have a flip animation and a short interpretation.
3.  **The Mystic Orb:** An interactive Magic 8-Ball. A user asks a question, clicks the orb, and receives an animated, mysterious answer.
4.  **Internationalization (i18n):** Users will be able to switch between English and Korean languages for all displayed text content.
5.  **Interactive Face Reading Test:** Integrate a Teachable Machine Image Model directly into the page for an interactive face reading experience.

## Design & Aesthetics (Bold Definition)

*   **Layout:** A single-page application with a clear, icon-based top navigation to switch between the three features. The layout will be responsive for both mobile and desktop.
*   **Color Palette:** A primary palette of deep purple, midnight blue, and gold accents to create a mystical and premium feel.
*   **Typography:** A combination of a serif font like 'Playfair Display' for titles and a clean sans-serif for body text. A cursive font like 'Caveat' for emphasis.
*   **Visual Effects:**
    *   **Depth:** Multi-layered drop shadows on UI elements like cards and buttons to create a sense of depth.
    *   **Glow:** Interactive elements will have a soft "glow" effect on hover to guide the user.
    *   **Texture:** The main background will have a subtle, starry noise texture for a tactile, premium feel.
*   **Interactivity:** Smooth animations for card flips, orb shaking, and content transitions.

## Monetization Strategy

The application is designed with ad placements in mind. The multi-feature layout increases page views and session duration. Potential ad placements include a banner in the header/footer and a content block between sections, ensuring they are visible but not intrusive to the user experience.

## Development Plan

### Current Phase: Feature Expansion & Redesign

*   **Objective:** Transform the single-feature "Cosmic Fortune Cookie" into the multi-feature "The Digital Mystic."
*   **Steps:**
    1.  **Update `index.html`:** Create the new structure including a navigation bar, and sections for each of the three tools.
    2.  **Update `style.css`:** Implement the full "Bold Definition" redesign. Style the navigation and the layout for all three sections.
    3.  **Update `main.js`:** Refactor the code to handle navigation and the logic for all three separate tools.

### Phase: Internationalization (i18n) and Deployment

*   **Objective:** Implement Korean/English language switching and deploy the application.
*   **Steps:**
    1.  **Create Translation Files:** Create `locales/en.json` and `locales/ko.json` to store all translatable strings.
    2.  **Modify `index.html`:**
        *   Add a language selection UI (e.g., toggle buttons).
        *   Add `data-i18n` attributes to elements that need translation.
    3.  **Modify `main.js`:**
        *   Implement a `loadLanguage` function to fetch and apply translations based on the selected language.
        *   Add event listeners for language selection UI.
        *   Initialize the application with a default language.
    4.  **Modify `style.css`:** Add styling for the language selection UI.
    5.  **Test Locally:** Verify that language switching works correctly for all content.
    6.  **Firebase Deployment:**
        *   **Firebase Authentication:** Run `firebase login` in your terminal and follow the instructions to authenticate your Firebase account.
        *   Ensure `firebase.json` is configured correctly for hosting.
        *   Run `firebase deploy` to deploy the updated application.

### Phase: Integrate Interactive Face Reading Test

*   **Objective:** Integrate the Teachable Machine Image Model directly into the page and add an activation button.
*   **Steps:**
    1.  **Modify `index.html`:**
        *   Add the HTML structure (`div` for model title, `button` to start, `div` for webcam, `div` for labels) for the Teachable Machine model.
        *   Add the Teachable Machine script (`tf.js`, `teachablemachine-image.min.js`) and the provided inline JavaScript logic.
        *   Add a button to activate the Face Reading Test, positioned near the language selector.
    2.  **Modify `style.css`:**
        *   Add styling for the new Teachable Machine elements (webcam container, label container, button).
        *   Adjust the layout of the top-right area to accommodate both the language selector and the new "Face Reading Test" button.
    3.  **Update Translation Files:** Add new keys for the "Teachable Machine Image Model" title, "Start" button, and "Face Reading Test" button text in `locales/en.json` and `locales/ko.json`.
    4.  **Test Locally:** Verify the model loads, webcam activates, and predictions are displayed correctly.