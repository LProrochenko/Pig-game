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
let current = 0;

diceElement.classList.add('hidden');
//Roll the dice
btnRoll.addEventListener('click', function () {
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
      document.getElementById('current-0').textContent = current; // change later
    }
});




