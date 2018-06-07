var Pigs = {};

Pigs.pig1 = {
  imageFrame: {
    clear: "url('./resources/images/trans_wrap.png')",
    pigImg: "url('./resources/images/robopig.svg')",
    pigImgClass: '.pig-1',
    pigRooterImg: "url('./resources/images/roborooter.svg')",
    pigRooterImgClass: '.pig-rooter-1',
    pigTooterImg: "url('./resources/images/robotoot.svg')",
    pigTooterImgClass: '.pig-tooter-1',
    pigEyeImg: "url('./resources/images/pigeye1.png')",
    pigEyeImgClass: '.pig-eye-1'
  },
  toggleRooter: function() {
    var pigTemp = document.querySelector(this.imageFrame.pigRooterImgClass);
    var hasRooter = Pigs.pig1Stats.hasRooter;
    if (hasRooter) {
      pigTemp.style.backgroundImage = this.imageFrame.clear;
    } else {
      pigTemp.style.backgroundImage = this.imageFrame.pigRooterImg;
    }
    Pigs.pig1Stats.hasRooter = !hasRooter;
    if (Pigs.pig1Stats.hasRooter) {
      Pigs.pig1Stats.currentTurnsToRoot = Pigs.pig1Stats.turnsToRoot;
    }
  },
  toggleTooter: function() {
    var pigTemp = document.querySelector(this.imageFrame.pigTooterImgClass);
    var hasTooter = Pigs.pig1Stats.hasTooter;
    if (hasTooter) {
      pigTemp.style.backgroundImage = this.imageFrame.clear;
    } else {
      pigTemp.style.backgroundImage = this.imageFrame.pigTooterImg;
    }
    Pigs.pig1Stats.hasTooter = !hasTooter;
    if (Pigs.pig1Stats.hasTooter) {
      Pigs.pig1Stats.currentTurnsToToot = Pigs.pig1Stats.turnsToToot;
    }
  }

}

Pigs.pig1Stats = {
  energy: 0,
  hp: 120,
  hasArmor: false,
  armorAbsorb: 0,
  armorUp: false,
  hasRooter: false,
  turnsToRoot: 3,
  currentTurnsToRoot: 3,
  hasTooter: false,
  turnsToToot: 3,
  currentTurnsToToot: 3,
  turnsToCupcake: 4,
  currentTurnsToCupcake: 4,
  inBattle: false,
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
    if (this.currentTurnsToCupcake > 0) {
      this.currentTurnsToCupcake--;
    }
  }
}

Pigs.pig2 = {
  imageFrame: {
    clear: "url('./resources/images/trans_wrap.png')",
    pigImg: "url('./resources/images/robopig2.svg')",
    pigImgClass: 'pig-2',
    pigRooterImg: "url('./resources/images/roborooter2.svg')",
    pigRooterImgClass: 'pig-rooter-2',
    pigEyeImg: "url('./resources/images/pigeye2.png')",
    pigEyeImgClass: 'pig-eye-2'
  }
}

Pigs.pig2Stats = {
  energy: 0,
  hp: 120,
  hasArmor: false,
  armorAbsorb: 0,
  armorUp: false,
  hasRooter: false,
  turnsToRoot: 3,
  currentTurnsToRoot: 3,
  hasTooter: false,
  turnsToToot: 3,
  currentTurnsToToot: 3,
  turnsToCupcake: 4,
  currentTurnsToCupcake: 4,
  inBattle: false,
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
    if (this.currentTurnsToCupcake > 0) {
      this.currentTurnsToCupcake--;
    }
  }
}
