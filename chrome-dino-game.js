// JavaScript logic for the Chrome Dino game

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameRunning = true;
let dino = {
    x: 50,
    y: 200,
    width: 50,
    height: 50,
    velocityY: 0,
    jumpPower: -10,
    gravity: 0.5
};
let obstacles = [];
let score = 0;

function drawDino() {
    ctx.fillStyle = 'green';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function updateDino() {
    dino.velocityY += dino.gravity;
    dino.y += dino.velocityY;

    if (dino.y > canvas.height - dino.height) {
        dino.y = canvas.height - dino.height;
        dino.velocityY = 0;
    }
}

function handleJump(e) {
    if (e.code === 'Space' && dino.y === canvas.height - dino.height) {
        dino.velocityY = dino.jumpPower;
    }
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.fillStyle = 'red';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function updateObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.x -= 5;
    });

    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);

    if (Math.random() < 0.01) {
        obstacles.push({
            x: canvas.width,
            y: canvas.height - 50,
            width: 20,
            height: 50
        });
    }
}

function checkCollision() {
    obstacles.forEach(obstacle => {
        if (dino.x < obstacle.x + obstacle.width &&
            dino.x + dino.width > obstacle.x &&
            dino.y < obstacle.y + obstacle.height &&
            dino.y + dino.height > obstacle.y) {
            gameRunning = false;
        }
    });
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function updateScore() {
    score++;
}

function gameLoop() {
    if (!gameRunning) {
        ctx.fillStyle = 'black';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDino();
    updateDino();
    drawObstacles();
    updateObstacles();
    checkCollision();
    drawScore();
    updateScore();

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', handleJump);
requestAnimationFrame(gameLoop);
