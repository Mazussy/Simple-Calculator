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
