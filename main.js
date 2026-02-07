
const fortuneButton = document.getElementById('fortune-button');
const fortuneText = document.getElementById('fortune-text');

const fortunes = [
    "A beautiful, smart, and loving person will be coming into your life.",
    "A dubious friend may be an enemy in camouflage.",
    "A faithful friend is a strong defense.",
    "A fresh start will put you on your way.",
    "A friend asks only for your time not your money.",
    "A friend is a present you give yourself.",
    "A golden egg of opportunity falls into your lap this month.",
    "A good time to finish up old tasks.",
    "A hunch is creativity trying to tell you something.",
    "A lifetime of happiness lies ahead of you.",
    "A new perspective will come with the new year.",
    "A person is never too old to learn.",
    "A small donation is call for. It’s the right thing to do.",
    "A smile is your passport into the hearts of others.",
    "A smooth long journey! Great expectations.",
    "A surprise conference call. From an admirer.",
    "A truly rich life contains love and art in abundance.",
    "Accept something that you cannot change, and you will feel better.",
    "Adventure can be real happiness.",
    "Advice is like kissing. It costs nothing and is a pleasant thing to do."
];

fortuneButton.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    const randomFortune = fortunes[randomIndex];

    fortuneText.classList.remove('fade-in');

    // Trigger a reflow to restart the animation
    void fortuneText.offsetWidth;

    setTimeout(() => {
        fortuneText.style.opacity = 1;
        fortuneText.textContent = randomFortune;
        fortuneText.classList.add('fade-in');
    }, 100); // A small delay to ensure the class is removed before adding it again
});
