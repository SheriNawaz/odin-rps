function getComputerChoice(){     
    let choice = Math.floor(Math.random()*3);     
    if(choice==0){         
        return "Rock";     
    } else if (choice == 1){         
        return "Paper";     
    } else {         
        return "Scissors";     
    } 
}

let humanScore = 0; 
let computerScore = 0;
let gameOver = false;

// Get DOM elements
const choiceText = document.getElementById('choice-text');
const scoreText = document.getElementById('score-text');
const rockBtn = document.getElementById('rock-btn');
const paperBtn = document.getElementById('paper-btn');
const scissorsBtn = document.getElementById('scissors-btn');
const resetBtn = document.getElementById('reset-button');

function updateScoreDisplay() {
    scoreText.textContent = `Computer Score: ${computerScore} | Your Score: ${humanScore}`;
}

function disableButtons() {
    rockBtn.disabled = true;
    paperBtn.disabled = true;
    scissorsBtn.disabled = true;
}

function enableButtons() {
    rockBtn.disabled = false;
    paperBtn.disabled = false;
    scissorsBtn.disabled = false;
}

function checkGameEnd() {
    if (humanScore === 5 || computerScore === 5) {
        gameOver = true;
        disableButtons();
        resetBtn.style.display = 'inline-block';
        
        if (humanScore === 5) {
            choiceText.innerHTML = '<div class="winner">🎉 Congratulations! You won the game! 🎉</div>';
        } else {
            choiceText.innerHTML = '<div class="winner">😞 Computer wins the game! Better luck next time!</div>';
        }
    }
}

function playRound(humanChoice, computerChoice){     
    if (gameOver) return;
    
    humanChoice = humanChoice.toLowerCase();     
    computerChoice = computerChoice.toLowerCase();      

    let resultMessage = `Computer chose: ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} | You chose: ${humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1)}<br>`;

    if (humanChoice == computerChoice){         
        resultMessage += "It's a DRAW!";
    } else if(humanChoice == "rock" && computerChoice == "paper"){         
        resultMessage += "You lose! Paper beats Rock.";
        computerScore++;     
    } else if (humanChoice == "rock" && computerChoice == "scissors"){         
        resultMessage += "You win! Rock beats Scissors.";
        humanScore++;     
    } else if(humanChoice == "paper" && computerChoice == "scissors"){         
        resultMessage += "You lose! Scissors beats Paper.";
        computerScore++;     
    } else if (humanChoice == "paper" && computerChoice == "rock"){         
        resultMessage += "You win! Paper beats Rock.";
        humanScore++;     
    } else if(humanChoice == "scissors" && computerChoice == "paper"){         
        resultMessage += "You win! Scissors beats Paper.";
        humanScore++;     
    } else if (humanChoice == "scissors" && computerChoice == "rock"){         
        resultMessage += "You lose! Rock beats Scissors.";
        computerScore++;     
    }

    choiceText.innerHTML = resultMessage;
    updateScoreDisplay();
    checkGameEnd();
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    gameOver = false;
    choiceText.textContent = "Make your choice to start the game!";
    updateScoreDisplay();
    enableButtons();
    resetBtn.style.display = 'none';
}

// Add event listeners to buttons
rockBtn.addEventListener('click', function() {
    const computerSelection = getComputerChoice();
    playRound('Rock', computerSelection);
});

paperBtn.addEventListener('click', function() {
    const computerSelection = getComputerChoice();
    playRound('Paper', computerSelection);
});

scissorsBtn.addEventListener('click', function() {
    const computerSelection = getComputerChoice();
    playRound('Scissors', computerSelection);
});

resetBtn.addEventListener('click', resetGame);