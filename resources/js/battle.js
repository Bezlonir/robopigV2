var Battle = {}

Battle.attack1 = document.querySelector('.attack-1');
Battle.textBox = document.querySelector('.battle-text');
Battle.textCount = 0;


// Add text to info box in battle mode
Battle.addText = function(textToAdd) {
  Battle.textBox.innerHTML +=  textToAdd;
  Battle.textCount++;
  Battle.textBox.scrollTop = Battle.textBox.scrollHeight;
  if (Battle.textCount > 30) {
    console.log('removing last child of battle text box');
    Battle.textBox.removeChild(Battle.textBox.childNodes[0]);
  }
}

// set the HP for both pigs in battle mode
Battle.setHP = function() {
  var hp1 = document.querySelector('.pig-1-commands h3');
  var hp2 = document.querySelector('.pig-2-commands h3');
  hp1.innerText = `HP: ${Pigs.pig1Stats.hp}/${Pigs.pig1Stats.maxhp} `;
  hp2.innerText = `HP: ${Pigs.pig2Stats.hp}/ ${Pigs.pig2Stats.maxhp}`;
}

// Pig 1 data accessed from button event listeners in battle mode
Battle.pig1Data = {
  hoverText: [
      `
        <div class="tooltip">
          <h3>Attack</h3><p>Cost: Blood, sweat, and tears</p>
          <span>Attack with standard RoboPig ferocity for <span class="damage">10-15 damage.</span></span>
        </div>
      `,

      `<div class="rooter-tooltip tooltip">
        <h3>RoboRooter</h3><p>Cost: 20 energy</p>
        <span>Fires a laser beam for <span class="damage">25 damage</span></span>
        <p>The RoboRooter is equipped to fire the patented TruffleFinder laser beam. Caution: miscallibration could result in deadly force.</p>
      </div>`,

      `<div class="tooter-tooltip tooltip">
        <h3>RoboTooter</h3><p>Cost: 25 energy</p>
        <span>Creates gas cloud at <span class="damage">15 damage/round</span> for 2 rounds</span>
        <p>The RoboTooter uses patented olfactory resonant stinkquency amplification. Was this made as a joke?</p>
      </div>`,

      `<div class="tooter-tooltip tooltip">
        <h3>RoboCake Armor</h3><p>Cost:25 energy</p>
        <span>Electromagnetic nano-mud blocks <span class="damage">50% of damage</span> for 3 rounds.</span>
        <p>The RoboCake nano-mud armor uses nano-mud particles to create an electromagnetic field. Wallowing, with science!</p>
      </div>`,

      `<div class="tooltip">
        <h3>Cupcake</h3><p>Cost: Bit 'o love!</p>
        <span>Heal RoboPig for <span class="healing">20-50 health!</span></span>
        <p>Serve the public trust, protect the innocent, eat cupcakes!</p>
      </div>`
  ],
  // Abilities triggered from button event listeners in app.js
  // perform attack in battle mode
  doAttack: function() {
    Pigs.pig2Stats.takeDamage(Math.floor(Math.random()*5)+10,'attack');
    Pigs.pig1Stats.takeTurn();
    toggleTurn();
  },
  // perform RoboRooter in Battle Mode
  doRoboRooter: function() {
    Pigs.pig2Stats.takeDamage(25,'RoboRooter');
    Pigs.pig1Stats.currentTurnsToRoot = Pigs.pig1Stats.turnsToRoot;
    Pigs.pig1Stats.takeTurn();
    toggleTurn();
  },
  // perform RoboTooter in Battle Mode
  doRoboTooter: function() {
    Battle.addText(`<p>RoboPig 1 unleashes a horrid cloud of gas from the RoboTooter</p>`);
    Pigs.pig2Stats.poisonTurns = 2;
    Pigs.pig1Stats.currentTurnsToToot = Pigs.pig1Stats.turnsToToot;
    Pigs.pig1Stats.takeTurn();
    toggleTurn();
  },
  // use RoboCake Armor in battle mode
  doRoboArmor: function() {
    Battle.addText(`<p>RoboPig 1 activates RoboCake Armor!</p>`);
    Pigs.pig1Stats.armorUp = 3;
    Pigs.pig1Stats.currentTurnsToArmor = Pigs.pig1Stats.turnsToArmor;
    Pigs.pig1Stats.takeTurn();
    toggleTurn();
  },
  // use cupcake in battle mode
  doCupcake: function() {
    Pigs.pig1Stats.doHeal(Math.floor((Math.random() * 30)) + 20, 'Cupcake');
    Pigs.pig1Stats.currentTurnsToCupcake = Pigs.pig1Stats.turnsToCupcake;
    Pigs.pig1Stats.takeTurn();
    toggleTurn();
  }
}

// data for pig 2 action bar button accessed through event listener in app.js
Battle.pig2Data = {
  hoverText: [
      `
        <div class="tooltip">
          <h3>Attack</h3><p>Cost: Blood, sweat, and tears</p>
          <span>Attack with standard RoboPig ferocity for <span class="damage">10-15 damage.</span></span>
        </div>
      `,

      `<div class="rooter-tooltip tooltip">
        <h3>RoboRooter</h3><p>Cost: 20 energy</p>
        <span>Fires a laser beam for <span class="damage">25 damage</span></span>
        <p>The RoboRooter is equipped to fire the patented TruffleFinder laser beam. Caution: miscallibration could result in deadly force.</p>
      </div>`,

      `<div class="tooter-tooltip tooltip">
        <h3>RoboTooter</h3><p>Cost: 25 energy</p>
        <span>Creates gas cloud at <span class="damage">15 damage/round</span> for 2 rounds</span>
        <p>The RoboTooter uses patented olfactory resonant stinkquency amplification. Was this made as a joke?</p>
      </div>`,

      `<div class="tooter-tooltip tooltip">
        <h3>RoboCake Armor</h3><p>Cost:30 energy</p>
        <span>Electromagnetic nano-mud blocks <span class="damage">50% of damage</span> for 3 rounds.</span>
        <p>The RoboCake nano-mud armor uses nano-mud particles to create an electromagnetic field. Wallowing, with science!</p>
      </div>`,

      `<div class="tooltip">
        <h3>Cupcake</h3><p>Cost: Bit 'o love!</p>
        <span>Heal RoboPig for <span class="healing">20-50 health!</span></span>
        <p>Serve the public trust, protect the innocent, eat cupcakes!</p>
      </div>`
  ],
  // Abilities triggered from button event listeners in app.js
  // perform attack in battle mode
  doAttack: function() {
    Pigs.pig1Stats.takeDamage(Math.floor(Math.random()*5)+10,'attack');
    Pigs.pig2Stats.takeTurn();
    toggleTurn();
  },
  // perform RoboRooter in battle mode
  doRoboRooter: function() {
    Pigs.pig1Stats.takeDamage(25,'RoboRooter');
    Pigs.pig2Stats.currentTurnsToRoot = Pigs.pig2Stats.turnsToRoot;
    Pigs.pig2Stats.takeTurn();
    toggleTurn();
  },
  // perform RoboTooter in battle mode
  doRoboTooter: function() {
    Battle.addText(`<p>RoboPig 2 unleashes a horrid cloud of gas from the RoboTooter</p>`);
    Pigs.pig1Stats.poisonTurns = 2;
    Pigs.pig2Stats.currentTurnsToToot = Pigs.pig2Stats.turnsToToot;
    Pigs.pig2Stats.takeTurn();
    toggleTurn();
  },
  // use RoboCake Armor
  doRoboArmor: function() {
    Battle.addText(`<p>RoboPig 2 activates RoboCake Armor!</p>`);
    Pigs.pig2Stats.armorUp = 3;
    Pigs.pig2Stats.currentTurnsToArmor = Pigs.pig2Stats.turnsToArmor;
    Pigs.pig2Stats.takeTurn();
    toggleTurn();
  },
  // use cupcake in battle mode
  doCupcake: function() {
    Pigs.pig2Stats.doHeal(Math.floor((Math.random() * 30)) + 20, 'Cupcake');
    Pigs.pig2Stats.currentTurnsToCupcake = Pigs.pig2Stats.turnsToCupcake;
    Pigs.pig2Stats.takeTurn();
    toggleTurn();
  }
}
