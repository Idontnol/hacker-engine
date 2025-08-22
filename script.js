const startButton = document.getElementById('startButton');
const setupScreen = document.getElementById('setup-screen');
const blastingScreen = document.getElementById('blasting-screen');
const digitBoxes = document.querySelectorAll('.digit-box');
const currentGuessDisplay = document.getElementById('currentGuess');
const progressBar = document.querySelector('.progress-bar');
const statusText = document.getElementById('statusText');
const mainContainer = document.querySelector('.container');

let correctCode = '';
let guessCounter = 0;
let intervalId;

digitBoxes.forEach((box, index) => {
    box.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < digitBoxes.length - 1) {
            digitBoxes[index + 1].focus();
        }
    });

    box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && index > 0 && e.target.value.length === 0) {
            digitBoxes[index - 1].focus();
        }
    });
});

startButton.addEventListener('click', () => {
    let code = '';
    digitBoxes.forEach(box => {
        code += box.value;
    });

    if (code.length === 3) {
        correctCode = code;
        setupScreen.classList.remove('active');
        blastingScreen.classList.add('active');
        runBlaster();
    } else {
        alert("Please enter a 3-digit code.");
    }
});



function runBlaster() {
    guessCounter = 0;
    intervalId = setInterval(() => {
       
        const currentGuess = String(guessCounter).padStart(3, '0');
        currentGuessDisplay.textContent = currentGuess;

       
        const progress = (guessCounter / 999) * 100;
        progressBar.style.width = `${progress}%`;

        if (currentGuess === correctCode) {
            clearInterval(intervalId);
            statusText.textContent = "Code Found! The Hacker Wins! Try Again";
            progressBar.style.backgroundColor = 'red';
            let tryAgainButton = document.createElement('button');
            let tryContent=document.createElement('p');
            tryContent.textContent = "Try Again";
            tryContent.style.fontSize = "1.2em";
            tryContent.style.color = "white";
            tryAgainButton.appendChild(tryContent);
            let tryEmoji = document.createElement('img');
            tryEmoji.src = "reload3.png";
            tryEmoji.alt = "Try Again";
            tryEmoji.classList.add("short2");
            tryAgainButton.appendChild(tryEmoji)
            //tryAgainButton.className = "try-again-button";
            blastingScreen.appendChild(tryAgainButton);
            tryAgainButton.addEventListener('click', () => {
                location.reload();
            });
        }

        guessCounter++;
        if (guessCounter > 999) {
            clearInterval(intervalId);
        }
    }, 6); 
}
