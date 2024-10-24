'use strict';

// DOM Nodes
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const player0Element = document.querySelector('.player-0');
const player1Element = document.querySelector('.player-1');
const current0Element = document.getElementById('current-0');
const current1Element = document.getElementById('current-1');
const score0Element = document.getElementById('score-0');
const score1Element = document.getElementById('score-1');
const btnInstruction = document.querySelector('.btn-instruction');
const btnCloseModalWindow = document.querySelector('.close-modal-window');
const btnOk = document.querySelector('.btn-ok');
const modalElement = document.querySelector('.modal');

let currentScore, current, score, totalScores, activePlayer, isPlaying, winnerSign;

// Initialize game
initGame();

// Event Listeners
btnRoll.addEventListener('click', handleRollDice);
btnHold.addEventListener('click', handleHold);
btnNew.addEventListener('click', initGame);
btnInstruction.addEventListener('click', showModal);
btnCloseModalWindow.addEventListener('click', closeModalWindow);
btnOk.addEventListener('click', closeModalWindow);

window.addEventListener('click', function (e) {
  if (e.target === modalElement) {
    closeModalWindow();
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModalWindow();
  }
});

// Functions
function initGame() {
  currentScore = 0;
  totalScores = [0, 0];
  activePlayer = 0;
  isPlaying = true;

  diceElement.classList.add('hidden');
  winnerSign?.remove();

  // Reset UI
  current0Element.textContent ='0';
  current1Element.textContent = '0';
  score0Element.textContent = '0';
  score1Element.textContent = '0';
  player0Element.classList.add('player-active');
  player1Element.classList.remove('player-active');
  document.querySelectorAll('.player').forEach(player => {
    player.classList.remove('player-winner');
  });
};

function handleRollDice() {
  if (!isPlaying) return;

  playSound('audio/dice.mp3');
  diceElement.classList.add('dice-rotate');
  setTimeout(() => diceElement.classList.remove('dice-rotate'), 1000);

  const diceRoll = Math.trunc(Math.random() * 6) + 1;
  diceElement.src = `img/dice${diceRoll}.png`;
  diceElement.classList.remove('hidden');

  if (diceRoll !== 1) {
    currentScore += diceRoll;
    document.getElementById(`current-${activePlayer}`).textContent = currentScore;
  } else {
    switchPlayer();
  }
}

function handleHold() {
  if (!isPlaying) return;

  totalScores[activePlayer] += currentScore;
  document.getElementById(`score-${activePlayer}`).textContent = totalScores[activePlayer];

  if (totalScores[activePlayer] >= 20) {
    endGame();
  } else {
    switchPlayer();
  }
}

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player-active');
  player1Element.classList.toggle('player-active');
};

function showModal() {
    modalElement.classList.remove('hidden');
  }

function closeModalWindow() {
  modalElement.classList.add('hidden');
};

function endGame() {
  isPlaying = false;
  playSound('audio/fanfare.mp3');
  document.querySelector(`.player-${activePlayer}`).classList.add('player-winner');
  document.querySelector(`.player-${activePlayer}`).classList.remove('player-active');
  displayWinnerSign();
}

function displayWinnerSign() {
  winnerSign = document.createElement('div');
  winnerSign.classList.add('winnerSign');
  winnerSign.textContent = '🏆';
  document.querySelector(`.player-${activePlayer}`).appendChild(winnerSign);
}

function playSound(src) {
  const sound = new Audio(src);
  sound.play();
}
