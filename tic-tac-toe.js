// Implement the game logic for Tic-Tac-Toe
const cells = document.querySelectorAll('.cell');
let turn = 'X';
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    return winConditions.some(condition => {
        return condition.every(index => {
            return cells[index].classList.contains(turn);
        });
    });
}

function checkDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('X') || cell.classList.contains('O');
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    turn = turn === 'X' ? 'O' : 'X';
}

function handleClick(event) {
    const cell = event.target;
    const currentClass = turn;
    placeMark(cell, currentClass);
    if (checkWin()) {
        alert(`${turn} wins!`);
        resetGame();
    } else if (checkDraw()) {
        alert('Draw!');
        resetGame();
    } else {
        swapTurns();
    }
}

function resetGame() {
    cells.forEach(cell => {
        cell.classList.remove('X');
        cell.classList.remove('O');
    });
    turn = 'X';
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove('X');
        cell.classList.remove('O');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    turn = 'X';
}

startGame();
