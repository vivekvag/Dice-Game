/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying, lastNum;


init();

// Button Roll Script
document.querySelector(".btn-roll").addEventListener("click", function(){
  if (gamePlaying) {
    // Generate Random Number
    var dice = Math.floor(Math.random() * 6) +1;
    var dice2 = Math.floor(Math.random() * 6) +1;

    document.querySelector("#current-" + activePlayer).textContent = dice;


    // display the dice
    document.getElementById('dice-1').style.visibility ="visible";
    document.getElementById('dice-2').style.visibility ="visible";
    document.getElementById('dice-1').src ="dice-" + dice + ".png";
    document.getElementById('dice-2').src ="dice-" + dice2 + ".png";


    // Change the dice according to the number generated


      if (dice === 6 && lastNum1 ===6 || dice2 == 6 && lastNum2 ==6) {

        console.log("Sixes");
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();

      }else if (dice !=1 && dice2 !=1) {
        roundScore += dice + dice2;
        document.querySelector("#current-" + activePlayer).textContent = roundScore;

      }else {
        nextPlayer();
      }
      lastNum1 = dice;
      lastNum2 = dice2;

  }
});


// Button Hold Script
document.querySelector('.btn-hold').addEventListener('click', function () {

  if (gamePlaying) {
    // Add Current Score to the GLOBAL scores
    scores[activePlayer] += roundScore;

    // Update the Screen & toggle the Players
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector(".user-input").value;
    console.log(input);

    var userValue;
    if (input) {
      userValue = input;
    }else{
      userValue = 1000;
    }

    // Check if player won the Game
    if (scores[activePlayer] >=  userValue) {
      gamePlaying = false;
      document.querySelector("#name-" + activePlayer).textContent = "Winner!!"
      document.getElementById('dice-1').style.visibility ="hidden";
      document.getElementById('dice-2').style.visibility ="hidden";
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      document.querySelector(".user-input").style.visibility ="hidden";
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
  document.getElementById('dice-1').style.visibility ="hidden";
  document.getElementById('dice-2').style.visibility ="hidden";
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
  document.getElementById("dice-1").style.visibility ="hidden";
  document.getElementById("dice-2").style.visibility ="hidden";
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
  document.querySelector(".user-input").style.visibility = "visible";


  // Adding Active Class to the Player 1
  document.querySelector('.player-0-panel').classList.add('active');

}
