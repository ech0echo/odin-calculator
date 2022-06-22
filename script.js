let firstNum = '';
let secondNum = '';
let currentOperation = null;
let resetDisplay = false;

const button = document.querySelectorAll('.button');
const numBtn = document.querySelectorAll('.digit');
const opBtn = document.querySelectorAll('.operand');
const equalBtn = document.getElementById('equal');
const decBtn = document.getElementById('decimal');
const signBtn = document.getElementById('sign');
const ACBtn = document.getElementById('AC');
const CBtn = document.getElementById('C');
const mainNumDisplay = document.getElementById('main-display');
const subNumDisplay = document.getElementById('sub-display');

ACBtn.addEventListener('click', allClear);
CBtn.addEventListener('click', () => mainNumDisplay.textContent = '0');
equalBtn.addEventListener('click', evaluate);
signBtn.addEventListener('click', changeSign);
decBtn.addEventListener('click', addDot);

numBtn.forEach((button) => 
    button.addEventListener('click', () => appendNumber(button.textContent))
)

opBtn.forEach((button) => {
    button.addEventListener('click', () => setOperation(button.textContent));
})

function appendNumber(number) {
    if (mainNumDisplay.textContent === '0' || resetDisplay) {
        zeroDisplay();
    }
    mainNumDisplay.textContent += number;
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    if (mainNumDisplay.textContent === 'ERR') {
        mainNumDisplay.textContent = firstNum;
    }
    firstNum = mainNumDisplay.textContent;
    currentOperation = operator;
    subNumDisplay.textContent = `${firstNum} ${currentOperation} `
    resetDisplay = true;
}

function evaluate() {
    if (currentOperation === null || resetDisplay) return;
    if (currentOperation === '/' && mainNumDisplay.textContent === '0') {
        mainNumDisplay.textContent = 'ERR';
        resetDisplay = true;
        return;
    }
    secondNum = mainNumDisplay.textContent;
    subNumDisplay.textContent = `${firstNum} ${currentOperation} ${secondNum} = `
    mainNumDisplay.textContent = doMath(currentOperation, firstNum, secondNum);
    currentOperation = null;
    resetDisplay = true;
}

function doMath(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) return null;
            return a / b;
    }
}

function zeroDisplay() {
    mainNumDisplay.textContent = ''
    resetDisplay = false;
}

function allClear() {
    mainNumDisplay.textContent = '0';
    subNumDisplay.textContent = '';
    firstNum = '';
    secondNum = '';
    currentOperation = null;
}

function changeSign() {
    if (mainNumDisplay.textContent === '0') return;
    if (mainNumDisplay.textContent.charAt(0) === '-') {
        mainNumDisplay.textContent = mainNumDisplay.textContent.substring(1);
    } else {
        mainNumDisplay.textContent = '-' + mainNumDisplay.textContent;
    }
}

function addDot() {
    if (resetDisplay) zeroDisplay;
    if (mainNumDisplay.textContent === '')
        mainNumDisplay.textContent = '0';
    if (mainNumDisplay.textContent.includes('.'))
        return;
    mainNumDisplay.textContent += '.';
}