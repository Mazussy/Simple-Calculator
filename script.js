document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let firstNumber = '';
    let secondNumber = '';

    const updateDisplay = (value) => {
        display.textContent = value;
    };

    const clear = () => {
        currentInput = '';
        operator = '';
        firstNumber = '';
        secondNumber = '';
        updateDisplay('0');
    };

    const backspace = () => {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || '0');
    };

    const operate = (operator, num1, num2) => {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        switch (operator) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return b === 0 ? 'Error' : a / b;
            default: return 'Error';
        }
    };

    const handleNumberClick = (number) => {
        currentInput += number;
        updateDisplay(currentInput);
    };

    const handleOperatorClick = (op) => {
        if (firstNumber && operator) {
            secondNumber = currentInput;
            firstNumber = operate(operator, firstNumber, secondNumber);
            updateDisplay(firstNumber);
        }
        operator = op;
        firstNumber = currentInput;
        currentInput = '';
    };

    const handleEqualsClick = () => {
        if (firstNumber && operator && currentInput) {
            secondNumber = currentInput;
            const result = operate(operator, firstNumber, secondNumber);
            updateDisplay(result);
            currentInput = result;
            operator = '';
            firstNumber = '';
        }
    };

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.id;
            if (id === 'clear') {
                clear();
            } else if (id === 'backspace') {
                backspace();
            } else if (id === 'equals') {
                handleEqualsClick();
            } else if (['add', 'subtract', 'multiply', 'divide'].includes(id)) {
                handleOperatorClick(button.textContent);
            } else if (id === 'decimal') {
                if (!currentInput.includes('.')) {
                    handleNumberClick('.');
                }
            } else {
                handleNumberClick(button.textContent);
            }
        });
    });
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        handleNumberClick(key);
    } else if (key === '.') {
        document.getElementById('decimal').click();
    } else if (key === '+') {
        document.getElementById('add').click();
    } else if (key === '-') {
        document.getElementById('subtract').click();
    } else if (key === '*') {
        document.getElementById('multiply').click();
    } else if (key === '/') {
        document.getElementById('divide').click();
    } else if (key === 'Enter' || key === '=') {
        document.getElementById('equals').click();
    } else if (key === 'Backspace') {
        document.getElementById('backspace').click();
    } else if (key === 'Escape') {
        document.getElementById('clear').click();
    }
});
