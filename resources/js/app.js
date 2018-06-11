// RoboPig is a two-stage game of energy aquisition and battle of RoboPigs

// ---------------------------------
// global variable assignment
// ---------------------------------

// viewDice references the dice image for use as event listener
var viewDice = document.querySelector('.dice');

// hold references the hold buttons for use as event listeners
var hold = document.querySelectorAll('.btn-hold');
var path = "'./resources/images/";

var storeFronts = document.querySelectorAll('.store-item');

var tooltipBox = document.querySelector('.tooltip-info-box');


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

// essentially an enum for game modes
var gameModes = ['pig', 'battle'];

// game variable tracks turns and game mode
var game = {
  maxEnergy: 100,
  started: true,
  mode: 'pig',
  // false for player 1 turn, true for player 2 turn
  turn: false
}


// --------------------------------------------
// Set initial game conditions on page load
// (script is at  EOF in index.html, so this is on page load)
// --------------------------------------------

// set the Root font size on page load (script is referenced at end of HTML file, so this is on page load)
resizeText();

// clear both players' energy bars on page load
setEnergy(player1);
setEnergy(player2);
// set the eye glow opacity to zero on both pig views
Pigs.pig1.setEyeTrans(0);
Pigs.pig2.setEyeTrans(0);

// set the charge button visibilty based on initial game conditions
positionChargeButton();

// set the score view for both players to zero
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


///////////////////////////////////////
// ******* Event Listeners
///////////////////////////////////////


// listen for a click on the dice image and call the roll dice function

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Main Dice Game functionality is behind this event listener
// ----------------------------------------
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
viewDice.addEventListener('click', function() {
  appDiceRoll();
});
// ^^^^^^^^ dice game MAIN ^^^^^^^^^^^^^^^^


// Listen for a click on one of the hold buttons and convert any points to energy and toggle the turn in that event
hold.forEach(holdBtn => holdBtn.addEventListener('click', function() {
  // based on whose turn it is, the active player will be passed to the functions that convert their points to energy, set their energy meter level, reset their score box, and change whose turn it is, in sequence
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

// create storefront event listeners in order to match the DOM sequence taken from querySelectorALL with the sequence designed to match that in Store.storeinfo object.
storeFronts[0].addEventListener('mouseover', function(){

  tooltipBox.innerHTML = Store.storeInfo.storeItems[0].tooltipText;
});
storeFronts[1].addEventListener('mouseover', function(){

  tooltipBox.innerHTML = Store.storeInfo.storeItems[1].tooltipText;
});
storeFronts[2].addEventListener('mouseover', function(){

  tooltipBox.innerHTML = Store.storeInfo.storeItems[2].tooltipText;
});
storeFronts[3].addEventListener('mouseover', function(){

  tooltipBox.innerHTML = Store.storeInfo.storeItems[3].tooltipText;
});
storeFronts[4].addEventListener('mouseover', function(){

  tooltipBox.innerHTML = Store.storeInfo.storeItems[4].tooltipText;
});
storeFronts[5].addEventListener('mouseover', function(){

  tooltipBox.innerHTML = Store.storeInfo.storeItems[5].tooltipText;
});


// create even listeners for storeFront click events that will check if the player has enough energy,
storeFronts[0].addEventListener('click', function(){
  if (game.turn) return;
  var storeX = Store.storeInfo.storeItems[0];
  if (player1.energy >= storeX.cost) {
    if (Pigs.pig1Stats.hasRooter) {
      return;
    }
    Pigs.pig1.toggleRooter();
    player1.energy -= storeX.cost;
    setEnergy(player1);
  }
});
storeFronts[1].addEventListener('click', function(){
  if (game.turn) return;
  var storeX = Store.storeInfo.storeItems[1];
  if (player1.energy >= storeX.cost) {
    if (Pigs.pig1Stats.hasTooter) {
      return;
    }
    Pigs.pig1.toggleTooter();
    player1.energy -= storeX.cost;
    setEnergy(player1);
  }
});
storeFronts[2].addEventListener('click', function(){
  if (game.turn) return;
  var storeX = Store.storeInfo.storeItems[2];
  if (player1.energy >= storeX.cost) {
    if (Pigs.pig1Stats.hasArmor) {
      return;
    }
    Pigs.pig1.toggleArmor();
    player1.energy -= storeX.cost;
    setEnergy(player1);
  }
});
storeFronts[3].addEventListener('click', function(){
  if (!game.turn) return;
  var storeX = Store.storeInfo.storeItems[3];
  if (player2.energy >= storeX.cost) {
    if (Pigs.pig2Stats.hasRooter) {
      return;
    }
    Pigs.pig2.toggleRooter();
    player2.energy -= storeX.cost;
    setEnergy(player2);
  }
});
storeFronts[4].addEventListener('click', function(){
  if (!game.turn) return;
  var storeX = Store.storeInfo.storeItems[4];
  if (player2.energy >= storeX.cost) {
    if (Pigs.pig2Stats.hasTooter) {
      return;
    }
    Pigs.pig2.toggleTooter();
    player2.energy -= storeX.cost;
    setEnergy(player2);
  }
});
storeFronts[5].addEventListener('click', function(){
  if (!game.turn) return;
  var storeX = Store.storeInfo.storeItems[5];
  if (player2.energy >= storeX.cost) {
    if (Pigs.pig2Stats.hasArmor) {
      return;
    }
    Pigs.pig2.toggleArmor();
    player2.energy -= storeX.cost;
    setEnergy(player2);
  }
});




// listen for window resize and set root font size to match
window.addEventListener('resize', resizeText);


// -------------------------------------
// -------- dice game functions
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
    // return a roll object from the Dice script, containing
    // the image URL to place in the dice IMG and the score
    // and array index of the roll
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

      // if the score is 1, the player's turn is over
      toggleTurn();

    } else {

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
  energyFill.style.height = `${(player.energy / 100) * game.maxEnergy}%`;
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

  // grab objects for each players' charge button in order to apply visibilty styling
  var playerButton = document.querySelector(`${playerIndex} .player-current-box .btn-hold`);
  var oppPlayerButton = document.querySelector(`${oppPlayerIndex} .player-current-box .btn-hold`);

  // toggle visibility
  playerButton.style.visibility = 'visible';
  oppPlayerButton.style.visibility = 'hidden';
}

// changes which player's turn it is
function toggleTurn() {
  // turnNum is used in concatenation to reference a player's panel, as the only difference between their class names is a number in the name
  var turnNum = 0;
  if (!game.turn) turnNum = 1; else turnNum = 2;
  // toggle the 'active' class off in the player's panel whose turn is ending
  var oldTurn = document.querySelector(`.player-${turnNum}-panel`);
  oldTurn.classList.toggle('active');

  //change the turn in the game object
  game.turn = !game.turn;
  if (!game.turn) turnNum = 1; else turnNum = 2;

  // toggle the 'active' class on in the player's panel whose turn is beginning
  var newTurn = document.querySelector(`.player-${turnNum}-panel`);
  newTurn.classList.toggle('active');

  // set the charge button visibility
  positionChargeButton();
}

// pointsToEnergy takes the points from the 'player' and adds it to that player's energy
function pointsToEnergy(player) {

  // add player's points to their energy
  player.energy += player.points;

  // cap energy at maximum defined in game object and set the points to zero
  if (player.energy > game.maxEnergy) player.energy = game.maxEnergy;
  player.points = 0;

  // set the energy bar view
  setEnergy(player);

  // if it is player one's turn, set the alpha for pig 1's eyes, else set the alpha for pig 2's eyes
  if (!game.turn) {
    Pigs.pig1.setEyeTrans(player1.energy);
  } else {
    Pigs.pig2.setEyeTrans(player2.energy);
  }

  // go into battle mode if player's energy is equal to maximum defined in game object
  if (player.energy === game.maxEnergy) {
    gameModeBattle();
  } else {

  }

}

// sets the score box view for the player to the player's current score
function setScoreBox(player) {
  var scoreDOM = document.querySelector(`.player-${player.playerNum}-panel .player-current-score`);

  scoreDOM.innerText = player.points;
}

function gameModeBattle() {

}
