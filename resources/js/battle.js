var Battle = {}

Battle.attack1 = document.querySelector('.attack-1');
Battle.textBox = document.querySelector('.battle-text');
Battle.textCount = 0;


// Add text to info box in battle mode
Battle.addText = function(textToAdd) {
  Battle.textBox.innerHTML +=  textToAdd;
  Battle.textCount++;

  if (Battle.textCount > 30) {
    Battle.textBox.removeChild(Battle.textBox.childNodes[0]);
  }
  Battle.textBox.scrollTop = Battle.textBox.scrollHeight - Battle.textBox.clientHeight;

}

// set the HP for both pigs in battle mode
Battle.setHP = function() {
  var hp1 = document.querySelector('.hp-1 .hp-inside');
  var hp2 = document.querySelector('.hp-2 .hp-inside');
  var label1 = document.querySelector('.player-1-frame .player-current-label');
  var label2 = document.querySelector('.player-2-frame .player-current-label');

  var pig1HPfill = (Pigs.pig1Stats.hp / Pigs.pig1Stats.maxhp) * 100;
  var pig2HPfill = (Pigs.pig2Stats.hp / Pigs.pig2Stats.maxhp) * 100;

  label1.innerText = `HP: ${Pigs.pig1Stats.hp}/ ${Pigs.pig1Stats.maxhp}`;
  label2.innerText = `HP: ${Pigs.pig2Stats.hp}/ ${Pigs.pig2Stats.maxhp}`;

  hp1.style.width = `${pig1HPfill}%`;
  hp2.style.width = `${pig2HPfill}%`;
  // hp1.innerText = `HP: ${Pigs.pig1Stats.hp}/${Pigs.pig1Stats.maxhp} `;
  // hp2.innerText = `HP: ${Pigs.pig2Stats.hp}/ ${Pigs.pig2Stats.maxhp}`;
}

var PigData = function(number) {
  this.number = number;
  this.hoverText = [
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
        <span>Heal RoboPig for <span class="healing">20-50 health!</span> Also gives 5 energy.</span>
        <p>Serve the public trust, protect the innocent, eat cupcakes!</p>
      </div>`
  ];
}

// Derive the opponent's number for reference in message text
PigData.prototype.getOpponent = function() {
  var oppNum = 0;
  if (this.number === 1) {
    oppNum = 2;
  } else {
    oppNum = 1;
  }
  return oppNum;
}

// Abilities triggered from button event listeners in app.js
// perform attack in battle mode
PigData.prototype.doAttack = function() {
  var oppNum = this.getOpponent();
  Pigs[`pig${oppNum}Stats`].takeDamage(Math.floor(Math.random()*5)+10,'attack');
  Pigs[`pig${this.number}Stats`].takeTurn();
  toggleTurn();
}

// perform RoboRooter in Battle Mode
PigData.prototype.doRoboRooter = function() {
  var oppNum = this.getOpponent();
  Pigs[`pig${oppNum}Stats`].takeDamage(25,'RoboRooter');
  Pigs[`pig${this.number}Stats`].currentTurnsToRoot = Pigs[`pig${this.number}Stats`].turnsToRoot;
  Pigs[`pig${this.number}Stats`].takeTurn();
  toggleTurn();
}

// perform RoboTooter in Battle Mode
PigData.prototype.doRoboTooter = function() {
  var oppNum = this.getOpponent();
  Battle.addText(`<p>RoboPig ${this.number} unleashes a horrid cloud of gas from the RoboTooter</p>`);
  Pigs[`pig${oppNum}Stats`].poisonTurns = 2;
  Pigs[`pig${this.number}Stats`].currentTurnsToToot = Pigs[`pig${this.number}Stats`].turnsToToot;
  Pigs[`pig${this.number}Stats`].takeTurn();
  toggleTurn();
}

// use RoboCake Armor in battle mode
PigData.prototype.doRoboArmor = function() {
  Battle.addText(`<p>RoboPig ${this.number} activates RoboCake Armor!</p>`);
  Pigs[`pig${this.number}Stats`].armorUp = 3;
  Pigs[`pig${this.number}Stats`].currentTurnsToArmor = Pigs[`pig${this.number}Stats`].turnsToArmor;
  Pigs[`pig${this.number}Stats`].takeTurn();
  toggleTurn();
}

// use cupcake in battle mode
PigData.prototype.doCupcake = function() {
  Pigs[`pig${this.number}Stats`].doHeal(Math.floor((Math.random() * 30)) + 20, 'Cupcake');
  Pigs[`pig${this.number}Stats`].currentTurnsToCupcake = Pigs[`pig${this.number}Stats`].turnsToCupcake;
  Pigs[`pig${this.number}Stats`].takeTurn();
  toggleTurn();
}

Battle.pig1Data = new PigData(1);
Battle.pig2Data = new PigData(2);
