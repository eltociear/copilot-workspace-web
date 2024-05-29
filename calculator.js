// Implement the calculator's logic to handle basic arithmetic operations
let currentOperation = null;
let currentInput = "";
let previousInput = "";

const display = document.getElementById('display');

function appendNumber(number) {
    if (currentInput.length < 10) {
        currentInput += number;
        updateDisplay();
    }
}

function chooseOperation(operation) {
    if (currentInput === "") return;
    if (previousInput !== "") {
        compute();
    }
    currentOperation = operation;
    previousInput = currentInput;
    currentInput = "";
}

function compute() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (currentOperation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentInput = computation.toString();
    currentOperation = null;
    previousInput = "";
    updateDisplay();
}

function clearDisplay() {
    currentInput = "";
    previousInput = "";
    currentOperation = null;
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput;
}

// Ensure the calculator updates the display after each operation
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        if (button.innerText === 'C') {
            clearDisplay();
        } else if (button.innerText === '=') {
            compute();
        } else if (['+', '-', '*', '/'].includes(button.innerText)) {
            chooseOperation(button.innerText);
        } else {
            appendNumber(button.innerText);
        }
    });
});
