// Initialize the canvas and drawing context for the snake game
const canvas = document.getElementById('snakeGameCanvas');
const ctx = canvas.getContext('2d');

// Set the size of the canvas
canvas.width = 400;
canvas.height = 400;

// Define the snake
let snake = [{ x: 200, y: 200 }];
let snakeSize = 20;
let snakeDirection = 'RIGHT';

// Define the apple
let apple = { x: 300, y: 300 };
let appleSize = 20;

// Define the score
let score = 0;

// Listen for keyboard events
document.addEventListener('keydown', changeDirection);

// Change the direction of the snake
function changeDirection(event) {
    const keyPressed = event.key;
    const goingUp = snakeDirection === 'UP';
    const goingDown = snakeDirection === 'DOWN';
    const goingRight = snakeDirection === 'RIGHT';
    const goingLeft = snakeDirection === 'LEFT';

    if (keyPressed === 'ArrowLeft' && !goingRight) {
        snakeDirection = 'LEFT';
    } else if (keyPressed === 'ArrowUp' && !goingDown) {
        snakeDirection = 'UP';
    } else if (keyPressed === 'ArrowRight' && !goingLeft) {
        snakeDirection = 'RIGHT';
    } else if (keyPressed === 'ArrowDown' && !goingUp) {
        snakeDirection = 'DOWN';
    }
}

// Move the snake
function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    if (snakeDirection === 'RIGHT') head.x += snakeSize;
    else if (snakeDirection === 'LEFT') head.x -= snakeSize;
    else if (snakeDirection === 'DOWN') head.y += snakeSize;
    else if (snakeDirection === 'UP') head.y -= snakeSize;

    snake.unshift(head);

    // Check if the snake has eaten the apple
    if (head.x === apple.x && head.y === apple.y) {
        score += 10;
        generateApple();
    } else {
        snake.pop();
    }
}

// Generate a new apple
function generateApple() {
    apple.x = Math.floor(Math.random() * (canvas.width / appleSize)) * appleSize;
    apple.y = Math.floor(Math.random() * (canvas.height / appleSize)) * appleSize;
}

// Draw the snake and the apple
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    snake.forEach(part => {
        ctx.fillStyle = 'green';
        ctx.fillRect(part.x, part.y, snakeSize, snakeSize);
    });

    // Draw the apple
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, appleSize, appleSize);

    // Draw the score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 20, 30);
}

// Check for game over
function checkGameOver() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > canvas.width - snakeSize;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > canvas.height - snakeSize;

    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

// Main game loop
function gameLoop() {
    if (checkGameOver()) {
        alert('Game Over');
        document.location.reload();
    } else {
        moveSnake();
        draw();
    }
}

// Start the game
setInterval(gameLoop, 100);
