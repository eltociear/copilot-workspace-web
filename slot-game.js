// Slot game logic implementation

// Elements from the HTML
const spinButton = document.getElementById('spinButton');
const gameResult = document.getElementById('gameResult');
const reels = document.querySelectorAll('.reel');

// Symbols for the slot game
const symbols = ['🍒', '🍋', '🍉', '🍇', '🍓', '🍌', '🍍'];

// Spin the reels
function spinReels() {
    const results = [];
    reels.forEach(reel => {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        reel.textContent = randomSymbol;
        results.push(randomSymbol);
    });
    checkResults(results);
}

// Check the results of the spin
function checkResults(results) {
    if (results.every((val, i, arr) => val === arr[0])) {
        gameResult.textContent = 'Congratulations! You won!';
    } else {
        gameResult.textContent = 'Try again!';
    }
}

// Event listener for the spin button
spinButton.addEventListener('click', spinReels);
