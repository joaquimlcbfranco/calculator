let firstNumber = undefined;
let secondNumber = undefined;
let totalResult = 0;
let operator = '';

function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    if (n2 === 0) return 'invalid';
    else return Math.round((n1 / n2) * 100) / 100;
}

function operate(n1, operator, n2) {
    if (operator === '+') return add(n1, n2);
    else if (operator === '-') return subtract(n1, n2);
    else if (operator === 'x') return multiply(n1, n2);
    else if (operator === '/') return divide(n1, n2);
}

// Fetch all digits
const digits = document.querySelectorAll('.digit');

// Add event listener for clicks on each digit
digits.forEach(digit => digit.addEventListener('click', () => {
    assignNumbers(+digit.textContent);
}));

function assignNumbers(number) {
    // Check if firstNumber variable is 0. If it is set it to the number given
    if (firstNumber === undefined) { 
        firstNumber = number;
        setDisplay(firstNumber);
        console.log('First number: ' + firstNumber);
    }

    else if (firstNumber !== undefined && totalResult === 0) {
        // After the first number is registered, if there is an operator chosen, set the second number
        if (operator !== '') {
            if (secondNumber === undefined) { 
                secondNumber = number;
                setDisplay(secondNumber);
                console.log('Second number: ' + secondNumber);
            }
            else if (secondNumber !== undefined) {
                secondNumber = +(`${secondNumber}${number}`);
                setDisplay(secondNumber);
                console.log('Second number: ' + secondNumber);
            }
        }
        else {
            // If first number is not 0, append the number clicked to it, instead of '4' it becomes '45', for example
            firstNumber = +(`${firstNumber}${number}`);
            setDisplay(firstNumber);
            console.log('First number: ' + firstNumber);
        }
    }
    // If there is already a totalResult running (which means the first operation is done), don't change the firstNumber inside this function
    else if (firstNumber !== undefined && totalResult !== 0) {
        if (operator !== '') {
            if (secondNumber === undefined) { 
                secondNumber = number;
                setDisplay(secondNumber);
            }
            else if (secondNumber !== undefined) {
                secondNumber = +(`${secondNumber}${number}`);
                setDisplay(secondNumber);
            }
        }
    }
}

// Fetch all operators besides clear and submit (equals operator)
const operators = document.querySelectorAll('.operator');

// Add event listener for clicks on each digit
operators.forEach(op => op.addEventListener('click', () => {
    if (firstNumber !== undefined) {
        assignOperator(op.textContent);
        // Enables submit button after pressing an operation
        submit.disabled = false;
    }
}));

// Call operate function using and set the totalResult to it. After that set operator to the newly clicked one
function assignOperator(op) {
    if (firstNumber !== undefined && secondNumber !== undefined) {
        totalResult = operate(firstNumber, operator, secondNumber);
        if (totalResult === 'invalid') {
            setDisplay('nice try');
            firstNumber = undefined;
            secondNumber = undefined;
            op = '';
            totalResult = 0;
        }
        else {
            setDisplay(totalResult);
            firstNumber = totalResult;
            secondNumber = undefined;
        }
    }
    operator = op;
}

// Fetch equal button
const submit = document.querySelector('.calculator-submit');
submit.addEventListener('click', () => {
    if (firstNumber !== undefined && secondNumber === 0 && !submit.disabled && operator === '/') {
        setDisplay('nice try');
        firstNumber = undefined;
        secondNumber = undefined;
        operator = '';
        totalResult = 0;
        // Disables submit after clicking the first time
        submit.disabled = true;
    }
    // Only enters condition if submit button is enabled and both numbers are provided
    else if (firstNumber !== undefined && secondNumber !== undefined && !submit.disabled) {
        totalResult = operate(firstNumber, operator, secondNumber);
        setDisplay(totalResult);
        firstNumber = totalResult;
        secondNumber = undefined;
        operator = '';
        // Disables submit after clicking the first time
        submit.disabled = true;
    }
});


// Fetch clear button
const clear = document.querySelector('.calculator-clear');
// When clear button is clicked, set every variable to 0
clear.addEventListener('click', () => {
    firstNumber = undefined;
    secondNumber = undefined;
    operator = '';
    totalResult = 0;
    setDisplay(0);
})


// Get element that contains the display value
const displayNumber = document.querySelector('.display-result');
// Sets display value element to parameter given
function setDisplay(n1) {
    displayNumber.textContent = n1;
}