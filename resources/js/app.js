var viewDice = document.querySelector('.dice');
var currentDice = 0;

var baseH = window.innerHeight;
var root = document.querySelector('html');
var fontFactor = (baseH / 45).toFixed(2);
root.style.fontSize = `${fontFactor.toString()}px`;

var dice = document.querySelector('.dice');

var player1 = {
  energy: 0
}

window.addEventListener('keypress', function(k) {
  if (k.charCode === 100) {
    Pigs.pig1.toggleTooter();
  } else if (k.charCode === 97) {
    Pigs.pig1.toggleRooter();
  } else if (k.charCode === 115) {
    Pigs.pig1.toggleArmor();
  } else if (k.charCode === 101) {
    if (player1.energy < 91) {
      player1.energy += 10;
      Pigs.pig1.setEyeTrans(player1.energy);
    }
  } else if (k.charCode === 113) {
    if (player1.energy > 11) {
      player1.energy -= 10;
      Pigs.pig1.setEyeTrans(player1.energy);
    }
  }

});

dice.addEventListener('click', function() {
  var roll = Dice.diceIndex.rollDice();
  viewDice.src = Dice.diceIndex.dice[roll.index].diceIMG;
})

window.addEventListener('resize', resizeText);

function resizeText() {
  var baseH = window.innerHeight;
  var root = document.querySelector('html');
  var fontFactor = (baseH / 45).toFixed(2);
  root.style.fontSize = `${fontFactor.toString()}px`;

}
