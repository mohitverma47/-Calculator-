// Get DOM elements
const display = document.getElementById('display');
const clearBtn = document.getElementById('clear');
const backspaceBtn = document.getElementById('backspace');
const divideBtn = document.getElementById('divide');
const multiplyBtn = document.getElementById('multiply');
const subtractBtn = document.getElementById('subtract');
const addBtn = document.getElementById('add');
const equalsBtn = document.getElementById('equals');
const decimalBtn = document.getElementById('decimal');
const numberBtns = document.querySelectorAll('.btn:not(#clear):not(#backspace):not(#equals)');

let currentInput = '0';
let firstOperand = null;
let operator = null;

// Function to update the display with currentInput
function updateDisplay() {
  display.innerText = currentInput;
}

// Function to handle number button clicks
function handleNumberClick(event) {
  const number = event.target.innerText;

  if (currentInput === '0' || currentInput === 'Error') {
    currentInput = number;
  } else {
    currentInput += number;
  }

  updateDisplay();
}

// Function to handle operator button clicks
function handleOperatorClick(event) {
  const newOperator = event.target.innerText;

  if (operator !== null) {
    calculate();
  }

  firstOperand = currentInput;
  operator = newOperator;
  currentInput = '0';
}

// Function to handle decimal button click
function handleDecimalClick() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
    updateDisplay();
  }
}

// Function to handle clear button click
function handleClearClick() {
  currentInput = '0';
  firstOperand = null;
  operator = null;
  updateDisplay();
}

// Function to handle backspace button click
function handleBackspaceClick() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = '0';
  }
  updateDisplay();
}

// Function to perform the calculation
function calculate() {
  const a = parseFloat(firstOperand);
  const b = parseFloat(currentInput);

  switch (operator) {
    case '+':
      currentInput = (a + b).toString();
      break;
    case '-':
      currentInput = (a - b).toString();
      break;
    case '*':
      currentInput = (a * b).toString();
      break;
    case '/':
      if (b === 0) {
        currentInput = 'Error';
      } else {
        currentInput = (a / b).toString();
      }
      break;
    default:
      break;
  }

  firstOperand = null;
  operator = null;
}

// Function to handle equals button click
function handleEqualsClick() {
  if (operator !== null) {
    calculate();
    updateDisplay();
  }
}

// Add event listeners to number buttons
numberBtns.forEach(btn => {
  btn.addEventListener('click', handleNumberClick);
});

// Add event listeners to operator buttons
divideBtn.addEventListener('click', handleOperatorClick);
multiplyBtn.addEventListener('click', handleOperatorClick);
subtractBtn.addEventListener('click', handleOperatorClick);
addBtn.addEventListener('click', handleOperatorClick);

// Add event listener to decimal button
decimalBtn.addEventListener('click', handleDecimalClick);

// Add event listener to clear button
clearBtn.addEventListener('click', handleClearClick);

// Add event listener to backspace button
backspaceBtn.addEventListener('click', handleBackspaceClick);

// Add event listener to equals button
equalsBtn.addEventListener('click', handleEqualsClick);
