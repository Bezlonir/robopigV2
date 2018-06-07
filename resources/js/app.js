var viewDice = document.querySelector('.dice');
var currentDice = 0;

var baseH = window.innerHeight;
var root = document.querySelector('html');
var fontFactor = (baseH / 45).toFixed(2);
root.style.fontSize = `${fontFactor.toString()}px`;

var dice = document.querySelector('.dice');

window.addEventListener('keypress', function(k) {
  if (k.charCode === 100) {
    Pigs.pig1.toggleTooter();
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
