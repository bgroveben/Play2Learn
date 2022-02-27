window.addEventListener('load', function (e) {
    const startButton = document.getElementById("startbutton");
    const operation = document.getElementById("operation");
    const calculator = document.getElementById("calculator");
    const resultsForm = document.getElementById('resultsform');
    const timer = document.getElementById('timer');
    const score = document.getElementById('score');
    const enterButton = document.getElementById("enterbutton");
    const clearButton = document.getElementById('clearbutton');
    const numberButtons = document.querySelectorAll('[data-number]');
    const userInput = document.getElementById('userinput');
    const finalScore = document.getElementById('finalscore');
    const playAgain = document.getElementById('playagain');
    let displayEquation = document.getElementById('displayequation');

    function startGame() {
        operation.classList.replace("visible", "invisible");
        calculator.classList.replace("invisible", "visible");
        resultsForm.classList.replace("visible", "invisible");
        let timeleft = 30;
        timer.value = "Go!"
        let gameTimer = setInterval(function () {
            if (timeleft <= 0) {
                clearInterval(gameTimer);
                resultsForm.classList.replace("invisible", "visible");
                calculator.classList.replace("visible", "invisible");
                finalScore.value = score.value;
            }
            timer.value = timeleft;
            timeleft -= 1;
        }, 1000);
    }

    function restartGame() {
        operation.classList.replace("invisible", "visible");
        calculator.classList.replace("visible", "invisible");
        resultsForm.classList.replace("visible", "invisible");
        score.value = 0;
        displayEquation.value = null; // Set to 0?
        userInput.value = null; // Set to 0?
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateEquation(operator) {
        const n1 = getRandomInt(1, 10);
        const n2 = getRandomInt(1, 10);
        let result;
        switch (operator) {
            case "+":
                result = n1 + n2;
                checkEquation();
                break;
            case "-":
                result = n1 - n2;
                checkEquation();
                break;
            case "*":
                result = n1 * n2;
                checkEquation();
                break;
            case "/":
                result = n1 / n2;
                // alert(parseFloat((result).toFixed(1))) to display answer;   
                checkDivision();
                break;
        }
        displayEquation.value = (n1 + ' ' + operator + ' ' + n2);
    }

    function checkEquation() {
        let equationAnswer = eval(displayEquation.value);
        let userAnswer = userInput.value;
        if (equationAnswer == userAnswer) {
            score.value++;
        }
    }

    function checkDivision() {
        let equationAnswer = eval(displayEquation.value);
        let userAnswer = userInput.value;
        // Compare floating point numbers for division
        // Round to one decimal place and check the numbers before and after the decimal point
        let userAnswerAfterDecimal = parseInt((userAnswer % 1).toFixed(1).substring(2));
        let userAnswerBeforeDecimal = Math.trunc(userAnswer);
        let equationAnswerAfterDecimal = parseInt((equationAnswer % 1).toFixed(1).substring(2));
        let equationAnswerBeforeDecimal = Math.trunc(equationAnswer);
        if (equationAnswerBeforeDecimal == userAnswerBeforeDecimal && equationAnswerAfterDecimal == userAnswerAfterDecimal) {
            score.value++;
        }
    }

    function clearAndFocus() {
        userInput.value = '';
        userInput.focus();
    }

    startButton.addEventListener('click', function () {
        startGame();
        generateEquation(operators.value);
        clearAndFocus();
    });

    enterButton.addEventListener('click', function () {
        generateEquation(operators.value);
        clearAndFocus();
    });

    userInput.addEventListener('keypress', function (e) {
        if (e.key == "Enter") {
            generateEquation(operators.value);
            clearAndFocus();
        }
    });

    clearButton.addEventListener('click', function () {
        clearAndFocus();
    });

    playAgain.addEventListener('click', function () {
        restartGame();
    });

    numberButtons.forEach(button => {
        button.addEventListener('click', function () {
            userInput.value += button.value;
        });
    });
});
