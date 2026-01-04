// DOM Elements
const weaponButtons = document.querySelectorAll('.weapon-card');
const playerDisplay = document.getElementById('player-choice');
const computerDisplay = document.getElementById('computer-choice');
const timerElement = document.querySelector('.timer');
const titleElement = document.querySelector('h1');
const rules = document.getElementById('rules')
const play = document.getElementById('play')

const rock = document.getElementById('rock')
const paper = document.getElementById('paper')
const scissors = document.getElementById('scissors')

const weapons = ['ROCK', 'PAPER', 'SCISSORS'];

// Event Listeners
weaponButtons.forEach(button => {
    button.addEventListener('click', (e) => {

        const chosen = e.currentTarget.id.toUpperCase(); 
        
        play.addEventListener('click', () => {
            playRound(chosen)
        });
        
        
    });
});

// Main Game Logic
function choice(_this) {
        for (let i of weaponButtons) {
            i.classList.remove("active")
        }
        _this.classList.add("active")
        playerDisplay.textContent = "READY"
        playerDisplay.style.color = "white"
        }

function displayRules() {
    rules.style.display = "flex"
}

function closeRules() {
    rules.style.display = "none"
}

function playRound(playerSelection) {
    computerDisplay.textContent = "CALCULATING...";
    computerDisplay.style.color = 'white';
    titleElement.innerHTML = `CHOOSE YOUR <span class="highlight">WEAPON</span>`;

    const shuffleInterval = setInterval(() => {
        const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
        computerDisplay.textContent = randomWeapon;
    }, 100);
    
    let timeLeft = 3;
    timerElement.textContent = `0:0${timeLeft}`;
    
    const countdown = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `0:0${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            clearInterval(shuffleInterval);
            finalizeRound(playerSelection);
        }
    }, 1000);
}

function finalizeRound(playerSelection) {
    const computerSelection = weapons[Math.floor(Math.random() * weapons.length)];
    computerDisplay.textContent = computerSelection;
    computerDisplay.style.color = 'var(--orange)';
    playerDisplay.textContent = playerSelection;
    playerDisplay.style.color = 'var(--cyan)';
    const result = checkWinner(playerSelection, computerSelection);

    updateStatus(result);
}

function checkWinner(player, computer) {
    if (player === computer) {
        return 'DRAW';
    }
    
    if (
        (player === 'ROCK' && computer === 'SCISSORS') ||
        (player === 'PAPER' && computer === 'ROCK') ||
        (player === 'SCISSORS' && computer === 'PAPER')
    ) {
        return 'WIN';
    } else {
        return 'LOSE';
    }
}

function updateStatus(result) {
    if (result === 'WIN') {
        titleElement.innerHTML = `<span style="color:var(--cyan); text-shadow:0 0 15px var(--cyan); padding-top:30px">YOU WIN!</span>`;
    } else if (result === 'LOSE') {
        titleElement.innerHTML = `<span style="color:var(--orange); text-shadow:0 0 15px var(--orange)">SYSTEM WINS</span>`;
    } else {
        titleElement.innerHTML = `<span>STANDSTILL (DRAW)</span>`;
    }
}
