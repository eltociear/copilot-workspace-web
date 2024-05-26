// Initialize the canvas and drawing context for Pacman game
const canvas = document.getElementById('pacmanCanvas');
const ctx = canvas.getContext('2d');

// Set the size of the canvas
canvas.width = 800;
canvas.height = 600;

// Define Pacman's initial position and radius
let pacmanX = canvas.width / 2;
let pacmanY = canvas.height / 2;
const pacmanRadius = 20;

// Define the movement speed
const speed = 5;

// Define the score
let score = 0;

// Handle keyboard inputs for movement
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            pacmanY -= speed;
            break;
        case 'ArrowDown':
            pacmanY += speed;
            break;
        case 'ArrowLeft':
            pacmanX -= speed;
            break;
        case 'ArrowRight':
            pacmanX += speed;
            break;
    }
});

// Draw Pacman
function drawPacman() {
    ctx.beginPath();
    ctx.arc(pacmanX, pacmanY, pacmanRadius, 0.2 * Math.PI, 1.8 * Math.PI); // Mouth open to the right
    ctx.lineTo(pacmanX, pacmanY);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

// Implement basic game logic
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPacman();
    // Implement collision detection with walls (simple example)
    if (pacmanX + pacmanRadius > canvas.width || pacmanX - pacmanRadius < 0) {
        score -= 10; // Penalize for hitting a wall
    }
    if (pacmanY + pacmanRadius > canvas.height || pacmanY - pacmanRadius < 0) {
        score -= 10; // Penalize for hitting a wall
    }
    // Update and display the score
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 10, 20);
    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
