/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying;


init();

// Button Roll Script
document.querySelector(".btn-roll").addEventListener("click", function(){
  if (gamePlaying) {
    // Generate Random Number
    var dice = Math.floor(Math.random() * 6) +1;

    document.querySelector("#current-" + activePlayer).textContent = dice;


    // display the dice
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.visibility ="visible";


    // Change the dice according to the number generated
    diceDOM.src = "dice-" + dice + ".png";


    // Update the round score and rolled it if equal to 1
    if (dice !== 1) {

      roundScore += dice;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    }else {
      nextPlayer();
    }
  }
});


// Button Hold Script
document.querySelector('.btn-hold').addEventListener('click', function () {

  if (gamePlaying) {
    // Add Current Score to the GLOBAL scores
    scores[activePlayer] += roundScore;


    // Update the Screen & toggle the Players
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


    // Check if player won the Game
    if (scores[activePlayer] >=  100) {
      gamePlaying = false;
      document.querySelector("#name-" + activePlayer).textContent = "Winner!!"
      document.querySelector(".dice").style.visibility ="hidden";
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      // document.querySelector(".btn-hold").style.visibility ="hidden";
      // document.querySelector(".btn-roll").style.visibility ="hidden";

    }
    else {
      // nextPlayer
      nextPlayer();
    }
  }
});

function nextPlayer(){
  //Next Player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // Changing the active screen
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector(".dice").style.visibility ="hidden";
}


// Revoking the init function when New Game is clicked
document.querySelector(".btn-new").addEventListener('click', init);


// Initialize the Initial stage of the Game
function init() {
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  // document.querySelector("#current-" + activePlayer).textContent = dice;
  document.querySelector(".dice").style.visibility ="hidden";
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".btn-hold").style.visibility ="visible";
  document.querySelector(".btn-roll").style.visibility ="visible";

  // Removing all class from the players
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  // Adding Active Class to the Player 1
  document.querySelector('.player-0-panel').classList.add('active');

}
