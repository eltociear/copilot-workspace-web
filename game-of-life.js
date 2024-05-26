// Initialize the canvas and drawing context
const canvas = document.getElementById('gameOfLifeCanvas');
const ctx = canvas.getContext('2d');

// Set the size of the canvas
canvas.width = 800;
canvas.height = 600;

// Define the size of each cell
const cellSize = 10;

// Calculate the number of columns and rows
const cols = Math.floor(canvas.width / cellSize);
const rows = Math.floor(canvas.height / cellSize);

// Generate the grid
let grid = new Array(cols).fill(null)
    .map(() => new Array(rows).fill(false));

// Fill the grid with a random pattern
function initialize() {
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            grid[col][row] = Math.random() > 0.5;
        }
    }
}

// Calculate the next generation
function nextGeneration() {
    let newGrid = new Array(cols).fill(null)
        .map(() => new Array(rows).fill(false));

    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            const alive = grid[col][row];
            const neighbors = countNeighbors(col, row);

            if (alive && (neighbors === 2 || neighbors === 3)) {
                newGrid[col][row] = true;
            } else if (!alive && neighbors === 3) {
                newGrid[col][row] = true;
            }
        }
    }

    grid = newGrid;
}

// Count the alive neighbors of a cell
function countNeighbors(x, y) {
    let count = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue; // Skip the cell itself

            const col = (x + i + cols) % cols;
            const row = (y + j + rows) % rows;

            if (grid[col][row]) count++;
        }
    }

    return count;
}

// Render the grid
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            const alive = grid[col][row];

            ctx.beginPath();
            ctx.rect(col * cellSize, row * cellSize, cellSize, cellSize);
            ctx.fillStyle = alive ? 'black' : 'white';
            ctx.fill();
            ctx.stroke();
        }
    }
}

// Game loop
function gameLoop() {
    nextGeneration();
    render();
    requestAnimationFrame(gameLoop);
}

// Start the game
initialize();
requestAnimationFrame(gameLoop);
