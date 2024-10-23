'use strict';

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

//Init game
let current, score, totalScores, activePlayer, isPlaying, winnerSign;

const initGame = function () {
  diceElement.classList.add('hidden');
  current = 0;
  score = 0;
  totalScores = [0, 0];
  activePlayer = 0;
  isPlaying = true;
  current0Element.textContent = current;
  current1Element.textContent = current;
  score0Element.textContent = current;
  score1Element.textContent = current;
};
initGame();

const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player-active');
  player1Element.classList.toggle('player-active');
  current = 0;
  score = 0;
  current0Element.textContent = current;
  current1Element.textContent = current;
};

//Roll the dice
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    const diceSound = new Audio('audio/dice.mp3');
    diceSound.play();
    diceElement.classList.add('dice-rotate');
    setTimeout(() => {
      diceElement.classList.remove('dice-rotate');
    }, 1000);
    //1. Generate a random number
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    //2. Display number on the dice
    diceElement.src = `img/dice${randomNumber}.png`;
    diceElement.classList.remove('hidden');
    //3. If the number is one - switch to the next player, if not - add number to current score
    if (randomNumber !== 1) {
      current += randomNumber;
      document.getElementById(`current-${activePlayer}`).textContent = current;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    //Add current score of active player to total score
    score += current;
    totalScores[activePlayer] += score;
    document.getElementById(`score-${activePlayer}`).textContent =
      totalScores[activePlayer];

    //If totalscore => 100, active player won, if not - switch player
    if (totalScores[activePlayer] < 20) {
      switchPlayer();
    } else {
      isPlaying = false;
      const fanfareSound = new Audio('audio/fanfare.mp3');
      fanfareSound.play();
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('player-winner');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove('player-active');
      winnerSign = document.createElement('div');
      winnerSign.classList.add('winnerSign');
      winnerSign.textContent = '🏆';
      let wonPlayer = document.querySelector(`.player-${activePlayer}`);
      wonPlayer.appendChild(winnerSign);
    }
  }
});

btnNew.addEventListener('click', function () {
  document
  .querySelector(`.player-${activePlayer}`)
  .classList.remove('player-active');
player0Element.classList.add('player-active');
  initGame();
  document
    .querySelector(`.player-${activePlayer}`)
    .classList.remove('player-winner');
  winnerSign.remove();
});


