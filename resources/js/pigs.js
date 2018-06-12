// Pigs.js stores functionality for RoboPigs

var Pigs = {};
var path = "'./resources/images/";

// ------------------------------------------------
// ------- Pig 1 View References ****************
// ------------------------------------------------



Pigs.pig1 = {
  statObject: 'pig1Stats',
  imageFrame: {
    clear: `url(${path}trans_wrap.png')`,
    pigImg: `url(${path}robopig.svg')`,
    pigImgClass: '.pig-1',
    pigRooterImg: `url(${path}roborooter.svg')`,
    pigRooterImgClass: '.pig-rooter-1',
    pigTooterImg: `url(${path}robotoot.svg')`,
    pigTooterImgClass: '.pig-tooter-1',
    pigArmorImg: `url(${path}robocake.svg')`,
    pigArmorImgClass: '.pig-armor-1',
    pigEyeImg: `url(${path}pigeye1.png')`,
    pigEyeImgClass: '.pig-eye-1'
  },

  // toggleProp works with Rooter, Tooter, and Pig Armor. to turn each on and off in both the model and the view.
  toggleProp: function(imgUrl, CSSClass, toggleBool, maxTurns, currentTurns) {
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

  },

  // toggleRooter turns the RoboRooter on and off in the model and the view
  toggleRooter: function() {

    // create a link to the image frame object for this pig
    const TimgFrame = this.imageFrame;

    // send command to toggleProp
    this.toggleProp(TimgFrame.pigRooterImg, TimgFrame.pigRooterImgClass, 'hasRooter', 'turnsToRoot', 'currentTurnsToRoot');
  },

  // toggleTooter turns the RoboTooter on and off in the model and the view
  toggleTooter: function() {

    // create a link to the pig's stat object
    const TstatObj = Pigs[this.statObject];
    // create a link to the image frame object for this pig
    const TimgFrame = this.imageFrame;

    // send command to toggleProp
    this.toggleProp(TimgFrame.pigTooterImg, TimgFrame.pigTooterImgClass, 'hasTooter', 'turnsToToot', 'currentTurnsToToot');
  },

  // toggle Armor turn the RoboCake Pig Armor on and off in the model and the view
  toggleArmor: function() {

    // create a link to the pig's stat object
    const TstatObj = Pigs[this.statObject];
    // create a link to the image frame object for this pig
    const TimgFrame = this.imageFrame;

    // send command to toggleProp
    this.toggleProp(TimgFrame.pigArmorImg, TimgFrame.pigArmorImgClass, 'hasArmor', 'turnsToArmor', 'currentTurnsToArmor');
  },

  // set the transparency for RoboPig's green eye glow
  setEyeTrans: function(nrg) {
    const eyeObj = document.querySelector(this.imageFrame.pigEyeImgClass);
    eyeObj.style.opacity = `${(nrg/100).toFixed(2)}`;
  }

}


// ------------------------------------------------
// ------- Pig 1 Stats *************************
// ------------------------------------------------


Pigs.pig1Stats = {
  energy: 0,
  hp: 120,
  maxhp: 120,
  hasArmor: false,
  armorAbsorb: 50,
  armorUp: 0,
  turnsToArmor: 5,
  currentTurnsToArmor: 0,
  hasRooter: false,
  turnsToRoot: 3,
  currentTurnsToRoot: 0,
  hasTooter: false,
  turnsToToot: 3,
  currentTurnsToToot: 0,
  turnsToCupcake: 4,
  currentTurnsToCupcake: 4,
  inBattle: false,
  poisonTurns: 0,
  takeTurn: function() {
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
        Battle.addText(`<span>RoboPig 2's poison cloud has dispersed.</span>`);
      }
    }
    if (this.armorUp > 0) {
      this.armorUp --;
      if (this.armorUp === 0) {
        Battle.addText(`<span>RoboPig 1's armor fizzles out!`);
      }
    }
  },
  // apply damage from conText source to pig 1
  takeDamage: function(dam, conText) {
    var Tdamage = dam;
    if (this.armorUp > 0) {
      Tdamage *= (this.armorAbsorb /100);
    }
    this.hp -= Math.floor(Tdamage);
    if (this.hp < 0) {
      this.hp = 0;
      game.battleOver = true;
      game.winner = 'Player 2';
    }
    Battle.addText(`<span>RoboPig 1 takes <span class="damage">${dam} damage</span> from ${conText}</span>`);
    Battle.setHP();
    this.shake();
  },
  doHeal: function(heal, conText) {
    this.hp += heal;
    if (this.hp > this.maxhp) this.hp = this.maxhp;
    Battle.addText(`<p>${conText} heals RoboPig 1 for <span class="healing">${heal} hp</span></p`);
    Battle.setHP();
  }
  ,
  shake: function() {
    var pigTemp = document.querySelector('.pig-back-1');
    pigTemp.classList.toggle('shake');
    window.setTimeout(function(){
      pigTemp.classList.toggle('shake');
    }, 200);
  }
}



// ------------------------------------------------
// ------- Pig 2 View References **************
// ------------------------------------------------




Pigs.pig2 = {
  statObject: 'pig2Stats',
  imageFrame: {
    clear: `url(${path}trans_wrap.png')`,
    pigImg: `url(${path}robopig2.svg')`,
    pigImgClass: '.pig-2',
    pigRooterImg: `url(${path}roborooter2.svg')`,
    pigRooterImgClass: '.pig-rooter-2',
    pigTooterImg: `url(${path}robotoot2.svg')`,
    pigTooterImgClass: '.pig-tooter-2',
    pigArmorImg: `url(${path}robocake2.svg')`,
    pigArmorImgClass: '.pig-armor-2',
    pigEyeImg: `url(${path}pigeye2.png')`,
    pigEyeImgClass: '.pig-eye-2'
  },
  // toggleProp works with Rooter, Tooter, and Pig Armor to turn each on and off in both the model and the view.
  toggleProp: function(imgUrl, CSSClass, toggleBool, maxTurns, currentTurns) {
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

  },

  // toggleRooter turns the RoboRooter on and off in the model and the view
  toggleRooter: function() {

    // create a link to the image frame object for this pig
    const TimgFrame = this.imageFrame;

    // send command to toggleProp
    this.toggleProp(TimgFrame.pigRooterImg, TimgFrame.pigRooterImgClass, 'hasRooter', 'turnsToRoot', 'currentTurnsToRoot');
  },

  // toggleTooter turns the RoboTooter on and off in the model and the view
  toggleTooter: function() {

    // create a link to the pig's stat object
    const TstatObj = Pigs[this.statObject];
    // create a link to the image frame object for this pig
    const TimgFrame = this.imageFrame;

    // send command to toggleProp
    this.toggleProp(TimgFrame.pigTooterImg, TimgFrame.pigTooterImgClass, 'hasTooter', 'turnsToToot', 'currentTurnsToToot');
  },

  // toggle Armor turn the RoboCake Pig Armor on and off in the model and the view
  toggleArmor: function() {

    // create a link to the pig's stat object
    const TstatObj = Pigs[this.statObject];
    // create a link to the image frame object for this pig
    const TimgFrame = this.imageFrame;

    // send command to toggleProp
    this.toggleProp(TimgFrame.pigArmorImg, TimgFrame.pigArmorImgClass, 'hasArmor', 'turnsToArmor', 'currentTurnsToArmor');
  },

  // set the transparency for RoboPig's green eye glow
  setEyeTrans: function(nrg) {
    const eyeObj = document.querySelector(this.imageFrame.pigEyeImgClass);
    eyeObj.style.opacity = `${(nrg/100).toFixed(2)}`;
  }


}


// ------------------------------------------------
// ------- Pig 2 Stats **************
// ------------------------------------------------


Pigs.pig2Stats = {
  energy: 0,
  hp: 120,
  maxhp: 120,
  hasArmor: false,
  armorAbsorb: 50,
  armorUp: 0,
  turnsToArmor: 5,
  currentTurnsToArmor: 5,
  hasRooter: false,
  turnsToRoot: 3,
  currentTurnsToRoot: 3,
  hasTooter: false,
  turnsToToot: 3,
  currentTurnsToToot: 3,
  turnsToCupcake: 4,
  currentTurnsToCupcake: 4,
  inBattle: false,
  poisonTurns: 0,
  takeTurn: function() {
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
        Battle.addText(`<span>RoboPig 1's poison cloud has dispersed.</span>`)
      }
    }
    if (this.armorUp > 0) {
      this.armorUp --;
      if (this.armorUp === 0) {
        Battle.addText(`<span>RoboPig 2's armor fizzles out!`);
      }
    }
  },
  // apply damage from conText source to pig 1
  takeDamage: function(dam, conText) {
    var Tdamage = dam;
    if (this.armorUp > 0) {
      Tdamage *= (this.armorAbsorb /100);
    }
    this.hp -= Math.floor(Tdamage);
    if (this.hp < 0) {
      this.hp = 0;
      game.battleOver = true;
      game.winner = 'Player 1';
    }
    Battle.addText(`<p>RoboPig 2 takes <span class="damage">${dam} damage</span> from ${conText}</p>`);
    Battle.setHP();
    this.shake();
  },
  doHeal: function(heal, conText) {
    this.hp += heal;
    if (this.hp > this.maxhp) this.hp = this.maxhp;
    Battle.addText(`<p>${conText} heals RoboPig 2 for <span class="healing">${heal} hp</span></p`);
    Battle.setHP();
  },
  shake: function() {
    var pigTemp = document.querySelector('.pig-back-2');
    pigTemp.classList.toggle('shakeRev');
    window.setTimeout(function(){
      pigTemp.classList.toggle('shakeRev');
    }, 200);
  }
}
