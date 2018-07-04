// Pigs.js stores functionality for RoboPigs

var Pigs = {};
var path = "'./resources/images/";

// ------------------------------------------------
// ------- Pig 1 View References ****************
// ------------------------------------------------


// Image frame constructor for storing pig images
var ImageFrame = function(pigImg, pigImgClass, pigRooterImg, pigRooterImgClass, pigTooterImg, pigTooterImgClass, pigArmorImg, pigArmorImgClass, pigEyeImg, pigEyeImgClass) {
  this.clear = `url(${path}trans_wrap.png')`;
  this.pigImg = pigImg;
  this.pigImgClass = pigImgClass;
  this.pigRooterImg = pigRooterImg;
  this.pigRooterImgClass = pigRooterImgClass;
  this.pigTooterImg = pigTooterImg;
  this.pigTooterImgClass = pigTooterImgClass;
  this.pigArmorImg = pigArmorImg;
  this.pigArmorImgClass = pigArmorImgClass;
  this.pigEyeImg = pigEyeImg;
  this.pigEyeImgClass = pigEyeImgClass;
}

//directory of images for pig1
var p1Frame = new ImageFrame(`url(${path}robopig.svg')`, '.pig-1', `url(${path}roborooter.svg')`, '.pig-rooter-1', `url(${path}robotoot.svg')`, '.pig-tooter-1', `url(${path}robocake.svg')`, '.pig-armor-1', `url(${path}pigeye1.png')`, '.pig-eye-1');


//directory of images for pig2
var p2Frame = new ImageFrame(`url(${path}robopig2.svg')`, '.pig-2', `url(${path}roborooter2.svg')`, '.pig-rooter-2', `url(${path}robotoot2.svg')`, '.pig-tooter-2', `url(${path}robocake2.svg')`, '.pig-armor-2', `url(${path}pigeye2.png')`, '.pig-eye-2');



// -----------------------------------
// pig constructor
// -----------------------------------

var Pig = function(number, imageFrame) {
  this.indexNum = number;
  this.statObject = `pig${number}Stats`;
  this.imageFrame = imageFrame;
}

// toggleProp works with Rooter, Tooter, and Pig Armor. to turn each on and off in both the model and the view.
Pig.prototype.toggleProp = function(imgUrl, CSSClass, toggleBool, maxTurns, currentTurns) {
  //assign the relevant DOM object to modObj by looking up its class name
  const modObj = document.querySelector(CSSClass);

  // temporary boolean object for easy reference
  let TtoggleBool = Pigs[this.statObject][toggleBool];

  // if the inventory item was active, set frame to blank PNG, else set the style in the CSS selector passed by CSSClass to the url string indicated by imgUrl
  if (TtoggleBool) {
    modObj.style.backgroundImage = this.imageFrame.clear;
  } else {
    modObj.style.backgroundImage = imgUrl;
  };

  // change the active status of inventory item
  Pigs[this.statObject][toggleBool] = !TtoggleBool;

  // set item use delay to maximum
  if (Pigs[this.statObject][toggleBool]) {
    Pigs[this.statObject][currentTurns] = Pigs[this.statObject][maxTurns];
  }
}


// toggleRooter turns the RoboRooter on and off in the model and the view
Pig.prototype.toggleRooter = function() {

  // create a link to the image frame object for this pig
  const TimgFrame = this.imageFrame;

  // send command to toggleProp
  this.toggleProp(TimgFrame.pigRooterImg, TimgFrame.pigRooterImgClass, 'hasRooter', 'turnsToRoot', 'currentTurnsToRoot');
}


// toggleTooter turns the RoboTooter on and off in the model and the view
Pig.prototype.toggleTooter = function() {

  // create a link to the image frame object for this pig
  const TimgFrame = this.imageFrame;

  // send command to toggleProp
  this.toggleProp(TimgFrame.pigTooterImg, TimgFrame.pigTooterImgClass, 'hasTooter', 'turnsToToot', 'currentTurnsToToot');
}


// toggle Armor turn the RoboCake Pig Armor on and off in the model and the view
Pig.prototype.toggleArmor = function() {

  // create a link to the image frame object for this pig
  const TimgFrame = this.imageFrame;

  // send command to toggleProp
  this.toggleProp(TimgFrame.pigArmorImg, TimgFrame.pigArmorImgClass, 'hasArmor', 'turnsToArmor', 'currentTurnsToArmor');
}


// set the transparency for RoboPig's green eye glow
Pig.prototype.setEyeTrans = function(nrg) {
  const eyeObj = document.querySelector(this.imageFrame.pigEyeImgClass);
  eyeObj.style.opacity = `${(nrg/100).toFixed(2)}`;
}

// create the pig objects and assign them to the Pigs object that links pigs.js
Pigs.pig1 = new Pig(1, p1Frame);;
Pigs.pig2 = new Pig(2, p2Frame);



// ------------------------------------------------
// ------- Pig Stat Objects ********************
// ------------------------------------------------

var PigStats = function(pigNum) {
  this.number = pigNum;
  this.energy = 0;
  this.hp = 120;
  this.maxhp = 120;
  this.hasArmor = false;
  this.armorAbsorb = 50;
  this.armorUp = 0;
  this.turnsToArmor = 5;
  this.currentTurnsToArmor = 0;
  this.hasRooter = false;
  this.turnsToRoot = 3;
  this.currentTurnsToRoot = 0;
  this.hasTooter = false;
  this.turnsToToot = 3;
  this.currentTurnsToToot = 0;
  this.turnsToCupcake = 4;
  this.currentTurnsToCupcake = 4;
  this.inBattle = false;
  this.poisonTurns = 0;
}


// Derive the opponent's number for reference in message text
PigStats.prototype.getOpponent = function() {
  var oppNum = 0;
  if (this.number === 1) {
    oppNum = 2;
  } else {
    oppNum = 1;
  }
  return oppNum;
}


// Count down cooldowns on RoboPig abilities and debuffs
PigStats.prototype.takeTurn = function() {
  // Derive the opponent's number for reference in message text
  var oppNum = this.getOpponent();

  if (this.hasRooter) {
    if (this.currentTurnsToRoot > 0) {
      this.currentTurnsToRoot--;
    }
  }
  if (this.hasTooter) {
    if (this.currentTurnsToToot > 0) {
      this.currentTurnsToToot--;
    }
  }
  if (this.hasArmor) {
    if (this.currentTurnsToArmor > 0) {
      this.currentTurnsToArmor--;
    }
  }
  if (this.currentTurnsToCupcake > 0) {
    this.currentTurnsToCupcake--;
  }
  if (this.poisonTurns > 0) {
    this.takeDamage(15,'RotoTooter poison cloud');
    this.poisonTurns--;
    if (this.poisonTurn === 0) {
      Battle.addText(`<p>RoboPig ${oppNum}'s poison cloud has dispersed.</p>`);
    }
  }
  if (this.armorUp > 0) {
    this.armorUp --;
    if (this.armorUp === 0) {
      Battle.addText(`<p>RoboPig ${this.number}'s armor fizzles out!</p>`);
    }
  }
}


// apply damage from conText source to pig
PigStats.prototype.takeDamage = function(dam, conText) {
  // Derive the opponent's number for reference in message text
  var oppNum = this.getOpponent();

  var Tdamage = dam;
  if (this.armorUp > 0) {
    Tdamage *= (this.armorAbsorb / 100);
  }
  this.hp -= Math.floor(Tdamage);
  if (this.hp < 0) {
    this.hp = 0;
    game.battleOver = true;
    if (game.winner = ' ') {
      game.winner = `Player ${oppNum}`;
    }
  }
  Battle.addText(`<p>RoboPig ${this.number} takes <span class="damage">${Tdamage} damage</span> from ${conText}</p>`);
  Battle.setHP();
  this.shake();
}


// apply healing to pig from conText source
PigStats.prototype.doHeal = function(heal, conText) {
  this.hp += heal;
  if (this.hp > this.maxhp) this.hp = this.maxhp;

  Battle.addText(`<p>${conText} heals RoboPig ${this.number} for <span class="healing">${heal} hp</span></p`);
  Battle.setHP();
}


// perform a shake animation on pig upon request
PigStats.prototype.shake = function() {
  var pigName = `pig${this.number}`;
  var pigTemp = document.querySelector(Pigs[pigName].imageFrame.pigImgClass);
  pigTemp.classList.toggle('shake');
  window.setTimeout(function(){
    pigTemp.classList.toggle('shake');
  }, 200);
}

// create pig stat objects
Pigs.pig1Stats = new PigStats(1);
Pigs.pig2Stats = new PigStats(2);
