// RoboPig is a two-stage game of energy aquisition and battle of RoboPigs

////////////////////////////////////////////
// *** function directory
/*

--- Global variable assignment
--- Initial game condition function calls
--- Event Listeners


--- pauseDice()
--- appDiceRoll()
--- setEnergy()
--- positionChargeButton()
--- toggleTurn()
--- pointsToEnergy()
--- setScoreBox()
--- setContextFilters()
--- hideBattle()
--- showBattle()
--- gameModeBattle()
--- populateActionBars()
--- actionBarListeners()
--- setActionBarReady()
--- switchPlayerBattle()
--- announceWinner()
--- hideGameOver()
--- showGameOver()
--- linkNewGame()
--- startNewGame()
--- hidePigStore()
--- showPigStore()


*/
// ---------------------------------
// global variable assignment
// ---------------------------------

// viewDice references the dice image for use as event listener
var viewDice = document.querySelector('.dice');

// hold references the hold buttons for use as event listeners
var hold = document.querySelectorAll('.btn-hold');
var path = "'./resources/images/";

// var storeFronts = document.querySelectorAll('.store-item');

var tooltipBox = document.querySelector('.tooltip-info-box');

var gameOverScreen = document.querySelector('#game-over');
//var pigStore = document.querySelector('#pig-store');

var storeFronts = document.querySelectorAll('.store-item');

// player objects
var player1 = {
  energy: 0,
  points: 0,
  playerNum: 1,
  name: 'Pig',
  energyFillImgClass: '.player-1-frame .energy-inside',
  energyNum: '.player-1-frame .energy-count'
}
var player2 = {
  energy: 0,
  points: 0,
  playerNum: 2,
  name: 'Pig',
  energyFillImgClass: '.player-2-frame .energy-inside',
  energyNum: '.player-2-frame .energy-count'
}

// essentially an enum for game modes
var gameModes = ['pig', 'battle'];

// game variable tracks turns and game mode
var game = {
  maxEnergy: 100,
  started: true,
  mode: 'pig',
  // false for player 1 turn, true for player 2 turn
  turn: false,
  battleOver: false,
  winner: ' '
}

var actionBar1 = document.querySelectorAll('.pig-1-commands button');
var actionBar1dex = Array.from(actionBar1);

var actionBar2 = document.querySelectorAll('.pig-2-commands button');

var actionBar2dex = Array.from(actionBar2);

var battleFrame = document.querySelector('#pig-battle');

// --------------------------------------------
// Set initial game conditions on page load
// (script is at  EOF in index.html, so this is on page load)
// --------------------------------------------



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

// link up actionBarListeners
//actionBarListeners();
// Link new game button
//linkNewGame();

// Hide Battle and Game Over screens (shown on load for event listeners)
//hideBattle();
//hideGameOver();

// temporary Developer commands for testing functionality -- removed. --may reuse to allow key shortcuts for battle mode because this interface sucks and is tedious
window.addEventListener('keypress', function(k) {


});


///////////////////////////////////////
// ******* Event Listeners
///////////////////////////////////////


// listen for a click on the dice image and call the roll dice function

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Main Dice Game functionality is behind this event listener
// ----------------------------------------
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
viewDice.addEventListener('click', function(e) {
  e.preventDefault();
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
      if (player1.points < 100) {
        toggleTurn();
      }
    }
  } else {
    if (player2.points >0) {
      pointsToEnergy(player2);
      setScoreBox(player2);
      if (player2.points < 100) {
        toggleTurn();
      }
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
    Pigs.pig1.setEyeTrans(player1.energy);
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
    Pigs.pig1.setEyeTrans(player1.energy);
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
    Pigs.pig1.setEyeTrans(player1.energy);
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
    Pigs.pig2.setEyeTrans(player2.energy);
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
    Pigs.pig2.setEyeTrans(player2.energy);
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
    Pigs.pig2.setEyeTrans(player2.energy);
  }
});



// -------------------------------------
// -------- dice game functions
// -------------------------------------

// make the dice unclickable for set time upon request
function pauseDice() {
  viewDice.classList.add('dice-inactive');
  window.setTimeout(function(){
    viewDice.classList.remove('dice-inactive');
  }, 500)
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

      pauseDice();

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
  var energyFill = document.querySelector(`${player.energyFillImgClass}`);

  // set the height of the container based on the energy to clip off the top of the energy bar
  energyFill.style.height = `${(player.energy / 100) * game.maxEnergy}%`;

  var energyNum = document.querySelector(`${player.energyNum}`);

  energyNum.innerText = `${player.energy.toString()}`;
  // if (player.energy <= 90) {
  //   energyFill.style.width = '3.8rem';
  //
  // } else {
  //   energyFill.style.width = '3rem';
  // }

  setContextFilters();

}


// positionChargeButton toggles one of two duplicate buttons inside each players' frames, so that the active player has a charge button by their score
function positionChargeButton() {

  var playerIndex = '';
  var oppPlayerIndex = '';
  // set strings to be used in a query selector to determine the root from which to search for the button
  if (!game.turn) {
    playerIndex = '.player-1-frame';
    oppPlayerIndex = '.player-2-frame';

  } else {
    playerIndex = '.player-2-frame';
    oppPlayerIndex = '.player-1-frame';
  }

  // grab objects for each players' charge button in order to apply visibilty styling
  var playerButton = document.querySelector(`${playerIndex} .btn-hold`);
  var oppPlayerButton = document.querySelector(`${oppPlayerIndex} .btn-hold`);

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
  var oldTurn = document.querySelector(`.player-${turnNum}-frame .player-name`);
  oldTurn.classList.toggle('active');

  //change the turn in the game object
  game.turn = !game.turn;
  if (!game.turn) turnNum = 1; else turnNum = 2;

  // toggle the 'active' class on in the player's panel whose turn is beginning
  var newTurn = document.querySelector(`.player-${turnNum}-frame .player-name`);
  newTurn.classList.toggle('active');
  if (game.mode === gameModes[0]) { // if game.mode = 'pig'
    // set the charge button visibility
    positionChargeButton();
  } else if (game.mode === gameModes[1]) { //if game.mode = 'battle'
    if (game.battleOver) {
      hideBattle();
      announceWinner();
    }
    setActionBarReady();
    switchPlayerBattle();
  }

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
  var scoreDOM = document.querySelector(`.player-${player.playerNum}-frame .player-current-score`);

  scoreDOM.innerText = player.points;
}

// set the color of context filters in the store so that they will show red if the player doesn't have enough energy to buy an item and grey if they already have the item
function setContextFilters() {
  var filters = document.querySelectorAll('.context-filter');
  for (i = 0; i < filters.length; i++) {
    // check if the player has enough energy for each item
    // the first three store items reference player one's store
    if (i <3) {
      if (Store.storeInfo.storeItems[i].cost > player1.energy) {
        if (!filters[i].classList.contains('trop')){
          filters[i].classList.toggle('trop');
        }
      } else {
        if (filters[i].classList.contains('trop')){
          filters[i].classList.toggle('trop');
        }
      }
    // the last three store items reference player two's store
    } else {
      if (Store.storeInfo.storeItems[i].cost > player2.energy) {
        if (!filters[i].classList.contains('trop')){
          filters[i].classList.toggle('trop');
        }
      } else {
        if (filters[i].classList.contains('trop')){
          filters[i].classList.toggle('trop');
        }
      }
    }

  } // <-- for loop

}


function hideBattle() {
  battleFrame.style.display = 'none';
  battleFrame.firstElementChild.style.pointerEvents = 'none';
}

function showBattle() {
  battleFrame.style.display = 'block';
  battleFrame.firstElementChild.style.pointerEvents = 'auto';
}

function gameModeBattle() {
  window.setTimeout(function(){
    // set the mode to battle in the game object
    game.mode = 'battle';

    // show the battle window
    showBattle();

    // hide the pig store
    hidePigStore();

    // set the action bars with the abilities earned
    populateActionBars();

    // set the activation color filter for buttons
    setActionBarReady();

    // set the current player's action bar to green
    switchPlayerBattle()
    Battle.setHP();

  },1000);
}

// determine which buttons appear in the action bars in the view
function populateActionBars() {
  actionBar1.forEach(function(button){
    button.style.display = 'block';
  });
  actionBar2.forEach(function(button){
    button.style.display = 'block';
  });
  actionBar1.forEach(function(button){
    switch (actionBar1dex.indexOf(button)) {
      case 1:
          if (Pigs.pig1Stats.hasRooter) {
            actionBar1[1].style.display = 'block';
          }
          else {
            actionBar1[1].style.display = 'none';
          }
        break;
      case 2:
          if (Pigs.pig1Stats.hasTooter) {
            actionBar1[2].style.display = 'block';
          }
          else {
            actionBar1[2].style.display = 'none';
          }
        break;
      case 3:
          if (Pigs.pig1Stats.hasArmor) {
            actionBar1[3].style.display = 'block';
          }
          else {
            actionBar1[3].style.display = 'none';
          }
        break;
    }
    actionBar2.forEach(function(button){
      switch (actionBar2dex.indexOf(button)) {
        case 1:
            if (Pigs.pig2Stats.hasRooter) {
              actionBar2[1].style.display = 'block';
            }
            else {
              actionBar2[1].style.display = 'none';
            }
          break;
        case 2:
            if (Pigs.pig2Stats.hasTooter) {
              actionBar2[2].style.display = 'block';
            }
            else {
              actionBar2[2].style.display = 'none';
            }
          break;
        case 3:
            if (Pigs.pig2Stats.hasArmor) {
              actionBar2[3].style.display = 'block';
            }
            else {
              actionBar2[3].style.display = 'none';
            }
          break;
      }
    });
  });
}

// add event listeners to buttons on each action bar.
function actionBarListeners() {
  actionBar1.forEach(function(button){
    button.style.display = 'block';
  });
  actionBar2.forEach(function(button){
    button.style.display = 'block';
  });

  // add event listeners to buttons on action bar for pig 2
  actionBar1.forEach(function(button){
    var buttonIndex = actionBar1dex.indexOf(button);
    actionBar1[buttonIndex].addEventListener('mouseover', function(){
      var tooltipRef = document.querySelector('.battle-wrapper .tooltip-info-box');
      var tipText = Battle.pig1Data.hoverText[buttonIndex];
      tooltipRef.innerHTML = tipText;
    });
    actionBar1[buttonIndex].addEventListener('click',function(){
      switch (buttonIndex) {
        case 0:
          if (!game.turn) {
            Battle.pig1Data.doAttack();
          }
          break;
        case 1:
          if (!game.turn) {
            if (Pigs.pig1Stats.currentTurnsToRoot === 0) {
              if (player1.energy >= 20) {
                player1.energy -= 20;
                setEnergy(player1);
                Battle.pig1Data.doRoboRooter();
              }
            }
          }
          break;
        case 2:
          if (!game.turn) {
            if (Pigs.pig1Stats.currentTurnsToToot === 0) {
              if (player1.energy >= 25) {
                player1.energy -= 25;
                setEnergy(player1);
                Battle.pig1Data.doRoboTooter();
              }
            }
          }
          break;
        case 3:
          if (!game.turn) {
            if (Pigs.pig1Stats.currentTurnsToArmor === 0) {
              if (player1.energy >= 25) {
                player1.energy -= 25;
                setEnergy(player1);
                Battle.pig1Data.doRoboArmor();
              }
            }
          }
          break;
        case 4:
          if (!game.turn) {
            if (Pigs.pig1Stats.currentTurnsToCupcake === 0) {
              player1.energy += 5;
              if (player1.energy > game.maxEnergy) {
                player1.energy = game.maxEnergy;
              }
              Battle.pig1Data.doCupcake();
              setEnergy(player1);
              Pigs.pig1.setEyeTrans();
            }
          }
          break;
        default:
          console.log('something went wrong on pig 1!');
          break;
      }
    });
  });

  // add event listeners to buttons on action bar for pig 2
  actionBar2.forEach(function(button){
    var buttonIndex = actionBar2dex.indexOf(button);
    actionBar2[buttonIndex].addEventListener('mouseover', function(){
      var tooltipRef = document.querySelector('.battle-wrapper .tooltip-info-box');
      var tipText = Battle.pig2Data.hoverText[buttonIndex];
      tooltipRef.innerHTML = tipText;
    });
    actionBar2[buttonIndex].addEventListener('click',function(){
      switch (buttonIndex) {
        case 0:
          if (game.turn) {
            Battle.pig2Data.doAttack();
          }
          break;
        case 1:
          if (game.turn) {
            if (Pigs.pig2Stats.currentTurnsToRoot === 0) {
              if (player2.energy >= 20) {
                player2.energy -= 20;
                setEnergy(player2);
                Battle.pig2Data.doRoboRooter();
              }
            }
          }
          break;
        case 2:
          if (game.turn) {
            if (Pigs.pig2Stats.currentTurnsToToot === 0) {
              if (player2.energy >= 25) {
                player2.energy -= 25;
                setEnergy(player2);
                Battle.pig2Data.doRoboTooter();
              }
            }
          }
          break;
        case 3:
          if (game.turn) {
            if (Pigs.pig2Stats.currentTurnsToArmor === 0) {
              if (player2.energy >= 25) {
                player2.energy -= 25;
                setEnergy(player2);
                Battle.pig2Data.doRoboArmor();
              }
            }
          }
          break;
        case 4:
          if (game.turn) {
            if (Pigs.pig2Stats.currentTurnsToCupcake === 0) {
              player2.energy += 5;
              if (player2.energy > game.maxEnergy) {
                player2.energy = game.maxEnergy;
              }
              Battle.pig2Data.doCupcake();
              setEnergy(player2);
              Pigs.pig2.setEyeTrans();
            }
          }
          break;
        default:
          console.log('something went wrong on pig 2!');
          break;
      }
    });
  });
}

function setActionBarReady() {

  actionBar1.forEach(function(button){
    var buttonIndex = actionBar1dex.indexOf(button);
      switch (buttonIndex) {
        case 0:
          break;
        case 1:
          if (!Pigs.pig1Stats.hasRooter) return;
          if (player1.energy < 20 || Pigs.pig1Stats.currentTurnsToRoot > 0) {
            if (!button.classList.contains('trop')) {
              button.classList.toggle('trop');
            }
          } else if (player1.energy >= 20 && Pigs.pig1Stats.currentTurnsToRoot === 0) {
            if (button.classList.contains('trop')) {
              button.classList.toggle('trop');
            }
          }
          break;
        case 2:
          if (!Pigs.pig1Stats.hasTooter) return;
          if (player1.energy < 25 || Pigs.pig1Stats.currentTurnsToToot > 0) {
            if (!button.classList.contains('trop')) {
              button.classList.toggle('trop');
            }
          } else if (player1.energy >= 25 && Pigs.pig1Stats.currentTurnsToToot === 0) {
            if (button.classList.contains('trop')) {
              button.classList.toggle('trop');
            }
          }
          break;
        case 3:
          if (!Pigs.pig1Stats.hasArmor) return;
          if (player1.energy < 25 || Pigs.pig1Stats.currentTurnsToArmor > 0) {
            if (!button.classList.contains('trop')) {
              button.classList.toggle('trop');
            } else if (player1.energy >= 25 && Pigs.pig1Stats.currentTurnsToArmor === 0) {
              if (button.classList.contains('trop')) {
                button.classList.toggle('trop');
              }
            }
          }
          break;
        case 4:
          if (Pigs.pig1Stats.currentTurnsToCupcake > 0) {
            if (!button.classList.contains('trop')) {
              button.classList.toggle('trop');
            }
          } else {
            if (button.classList.contains('trop')) {
              button.classList.toggle('trop');
            }
          }
          break;
        default:
          break;
      }
  });
  actionBar2.forEach(function(button){
    var buttonIndex = actionBar2dex.indexOf(button);
      switch (buttonIndex) {
        case 0:
          break;
        case 1:
          if (!Pigs.pig2Stats.hasRooter) return;
          if (player2.energy < 20 || Pigs.pig2Stats.currentTurnsToRoot > 0) {
            if (!button.classList.contains('trop')) {
              button.classList.toggle('trop');
            }
          } else if (player2.energy >= 20 && Pigs.pig2Stats.currentTurnsToRoot === 0) {
            if (button.classList.contains('trop')) {
              button.classList.toggle('trop');
            }
          }
          break;
        case 2:
          if (!Pigs.pig2Stats.hasTooter) return;
          if (player2.energy < 25 || Pigs.pig2Stats.currentTurnsToToot > 0) {
            if (!button.classList.contains('trop')) {
              button.classList.toggle('trop');
            }
          } else if (player2.energy >= 25 && Pigs.pig2Stats.currentTurnsToToot === 0) {
            if (button.classList.contains('trop')) {
              button.classList.toggle('trop');
            }
          }
          break;
        case 3:
          if (!Pigs.pig2Stats.hasArmor) return;
          if (player2.energy < 25 || Pigs.pig2Stats.currentTurnsToArmor > 0) {
            if (!button.classList.contains('trop')) {
              button.classList.toggle('trop');
            }
          } else if (player2.energy >= 25 && Pigs.pig2Stats.currentTurnsToArmor === 0) {
            if (button.classList.contains('trop')) {
              button.classList.toggle('trop');
            }
          }
          break;
        case 4:
          if (Pigs.pig2Stats.currentTurnsToCupcake > 0) {
            if (!button.classList.contains('trop')) {
              button.classList.toggle('trop');
            }
          } else {
            if (button.classList.contains('trop')) {
              button.classList.toggle('trop');
            }
          }
          break;
        default:
          break;
      }
  });
}

function switchPlayerBattle() {
  var p1 = document.querySelector('.pig-1-commands');
  var p2 = document.querySelector('.pig-2-commands');

  if (!game.turn) {
    if (!p1.classList.contains('battle-active')) {
      p1.classList.toggle('battle-active');
    }
    if (p2.classList.contains('battle-active')) {
      p2.classList.toggle('battle-active');
    }
  } else {
    if (p1.classList.contains('battle-active')) {
      p1.classList.toggle('battle-active');
    }
    if (!p2.classList.contains('battle-active')) {
      p2.classList.toggle('battle-active');
    }
  }
}

function announceWinner() {
  showGameOver();
  var winnerText = document.querySelector('.winner');
  winnerText.innerText = `Winner: ${game.winner}`;
}

function hideGameOver() {
  gameOverScreen.style.display = 'none';
  gameOverScreen.style.pointerEvents = 'none';
}

function showGameOver() {
  gameOverScreen.style.display = 'block';
  gameOverScreen.style.pointerEvents = 'auto';
  game.started = false;
}

function linkNewGame() {
  var newGameButton = document.querySelector('.newGame');
  newGameButton.addEventListener('click', function(){
    startNewGame();
  });
}

function startNewGame() {
  // reset player stats
  player1.energy = 0;
  player1.points = 0;
  player2.energy = 0;
  player2.points = 0;

  // reset game mode stats
  game.started = true;
  game.turn = false;
  game.battleOver = false;
  game.winner = ' ';
  game.mode = 'pig';

  // resest battle text box
  Battle.textBox.innerHTML = '';
  Battle.textCount = 0;
  tooltipBox.innerHTML = '';


  // toggle pig stats and reset pig equipment status
  Pigs.pig1Stats.hp = Pigs.pig1Stats.maxhp;
  Pigs.pig2Stats.hp = Pigs.pig2Stats.maxhp;
  if (Pigs.pig1Stats.hasArmor) {
    Pigs.pig1.toggleArmor();
  }
  if (Pigs.pig2Stats.hasArmor) {
    Pigs.pig2.toggleArmor();
  }
  Pigs.pig1Stats.armorUp = 0;
  Pigs.pig2Stats.armorUp = 0;
  if (Pigs.pig1Stats.hasRooter) {
    Pigs.pig1.toggleRooter();
  }
  if (Pigs.pig2Stats.hasRooter) {
    Pigs.pig2.toggleRooter();
  }
  if (Pigs.pig1Stats.hasTooter) {
    Pigs.pig1.toggleTooter();
  }
  if (Pigs.pig2Stats.hasRooter) {
    Pigs.pig2.toggleTooter();
  }
  Pigs.pig1Stats.currentTurnsToCupcake = Pigs.pig1Stats.turnsToCupcake;
  Pigs.pig2Stats.currentTurnsToCupcake = Pigs.pig2Stats.turnsToCupcake;
  Pigs.pig1Stats.poisonTurns = 0;
  Pigs.pig2Stats.poisonTurns = 0;

  hideBattle();
  hideGameOver();
  showPigStore();
  setEnergy(player1);
  setEnergy(player2);
  setScoreBox(player1);
  setScoreBox(player2);
}

function hidePigStore() {
  pigStore.style.visibility = 'hidden';
}

function showPigStore() {
  pigStore.style.visibility = 'visible';
}
