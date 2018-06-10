var viewDice = document.querySelector('.dice');
var currentDice = 0;

var baseH = window.innerHeight;
var root = document.querySelector('html');
var fontFactor = (baseH / 45).toFixed(2);
root.style.fontSize = `${fontFactor.toString()}px`;

var dice = document.querySelector('.dice');
var hold = document.querySelectorAll('.btn-hold');
var path = "'./resources/images/";


// player objects
var player1 = {
  energy: 0,
  points: 0,
  playerNum: 1,
  name: 'Pig',
  energyFillImgClass: '.player-1-energy-fill'
}
var player2 = {
  energy: 0,
  points: 0,
  playerNum: 2,
  name: 'Pig',
  energyFillImgClass: '.player-2-energy-fill'
}

// clear both players' energy bars on page load
setEnergy(player1);
setEnergy(player2);
Pigs.pig1.setEyeTrans(0);
Pigs.pig2.setEyeTrans(0);

// essentially an enum for game modes
var gameModes = ['pig', 'battle'];

// game variable tracks turns and game mode
var game = {
  started: true,
  mode: 'pig',
  // false for player 1 turn, true for player 2 turn
  turn: false
}

// set the charge button visibilty based on initial game conditions
positionChargeButton();

setScoreBox(player1);
setScoreBox(player2);

// temporary Developer commands for testing functionality
window.addEventListener('keypress', function(k) {
  if (k.charCode === 100) {
    Pigs.pig2.toggleTooter();
  } else if (k.charCode === 97) {
    Pigs.pig2.toggleRooter();
  } else if (k.charCode === 115) {
    Pigs.pig2.toggleArmor();
  } else if (k.charCode === 101) {
    if (player2.energy < 91) {
      player2.energy += 10;
      Pigs.pig2.setEyeTrans(player2.energy);
      setEnergy(player2);
    }
  } else if (k.charCode === 113) {
    if (player2.energy > 11) {
      player2.energy -= 10;
      Pigs.pig2.setEyeTrans(player2.energy);
      setEnergy(player2);
    }
  } else if (k.charCode === 114) {
    toggleTurn();
  }

});

// listen for a click on the dice image and call the roll dice function
dice.addEventListener('click', function() {
  appDiceRoll();
});

// Listen for a click on one of the hold buttons and convert any points to energy and toggle the turn in that event
hold.forEach(holdBtn => holdBtn.addEventListener('click', function() {
  if (!game.turn) {
    if (player1.points > 0) {
      pointsToEnergy(player1);
      setScoreBox(player1);
      toggleTurn();
    }
  } else {
    if (player2.points >0) {
      pointsToEnergy(player2);
      setScoreBox(player2);
      toggleTurn();
    }
  }
}));


// listen for window resize and set root font size to match
window.addEventListener('resize', resizeText);


// -------------------------------------
// -------- dice game portion
// -------------------------------------





// reset the root font size
function resizeText() {
  var baseH = window.innerHeight;
  var root = document.querySelector('html');
  var fontFactor = (baseH / 45).toFixed(2);
  root.style.fontSize = `${fontFactor.toString()}px`;
}

// roll the dice and return the appropriate image and score
function appDiceRoll() {
  // if game mode is 'pig', the dice game portion of game, roll the dice on player clicking on dice
  if (game.mode === 'pig') {
    var roll = Dice.diceIndex.rollDice();
    viewDice.src = Dice.diceIndex.dice[roll.index].diceIMG;

    // if the roll is one, the player's turn ends
    if (roll.number === 1) {
      // if it's player one's turn, set their points to zero, otherwise, set player two's points to zero
      if (!game.turn) {
        player1.points = 0;
        setScoreBox(player1);
      } else {
        player2.points = 0;
        setScoreBox(player2);
      }
      toggleTurn();
    } else {
      var pointDOM = '';
      // if it's player one's turn, add to their points, otherwise, add to player two's points
      if (!game.turn) {
        player1.points += roll.number;
        setScoreBox(player1);
      } else {
        player2.points += roll.number;
        setScoreBox(player2);
      }

    }

  }
}

// set the size of the player's energy bar
function setEnergy(player) {
  // get the container for filled graphic in the energy meter
  var energyFill = document.querySelector(`${player.energyFillImgClass} .fill`);

  // set the height of the container based on the energy to clip off the top of the energy bar
  energyFill.style.height = `${(player.energy)}%`;
  if (player.energy <= 90) {
    energyFill.style.width = '3.8rem';

  } else {
    energyFill.style.width = '3rem';
  }

}


// positionChargeButton toggles one of two duplicate buttons inside each players' frames, so that the active player has a charge button by their score
function positionChargeButton() {

  var playerIndex = '';
  var oppPlayerIndex = '';
  // set strings to be used in a query selector to determine the root from which to search for the button
  if (!game.turn) {
    playerIndex = '.player-1-panel';
    oppPlayerIndex = '.player-2-panel';

  } else {
    playerIndex = '.player-2-panel';
    oppPlayerIndex = '.player-1-panel';
  }

  var playerButton = document.querySelector(`${playerIndex} .player-current-box .btn-hold`);
  var oppPlayerButton = document.querySelector(`${oppPlayerIndex} .player-current-box .btn-hold`);

  // toggle visibility
  playerButton.style.visibility = 'visible';
  oppPlayerButton.style.visibility = 'hidden';
}

function toggleTurn() {
  var turnTum = 0;
  if (!game.turn) turnNum = 1; else turnNum = 2;
  var oldTurn = document.querySelector(`.player-${turnNum}-panel`);
  oldTurn.classList.toggle('active');
  game.turn = !game.turn;
  if (!game.turn) turnNum = 1; else turnNum = 2;
  var newTurn = document.querySelector(`.player-${turnNum}-panel`);
  newTurn.classList.toggle('active');
  positionChargeButton();
}

function pointsToEnergy(player) {
  player.energy += player.points;

  if (player.energy > 100) player.energy = 100;
  player.points = 0;
  setEnergy(player);

  // if it is player one's turn, set the alpha for pig 1's eyes, else set the alpha for pig 2's eyes
  if (!game.turn) {
    Pigs.pig1.setEyeTrans(player1.energy);
  } else {
    Pigs.pig2.setEyeTrans(player2.energy);
  }

  // go into battle mode if player's energy is equal to 100
  if (player.energy === 100) {
    gameModeBattle();
  }
}

function setScoreBox(player) {
  var scoreDOM = document.querySelector(`.player-${player.playerNum}-panel .player-current-score`);

  scoreDOM.innerText = player.points;
}

function gameModeBattle() {

}
