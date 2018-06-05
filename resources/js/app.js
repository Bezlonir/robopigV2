console.log(Pigs.pig1Stats);
Pigs.pig1Stats.hp -= 20;
console.log(Pigs.pig1Stats);

var viewDice = document.querySelector('.dice');
var currentDice = 0;
console.log(viewDice);
viewDice.src = Dice.diceIndex.dice[0].diceIMG;
window.addEventListener('keypress', function(k) {
  console.log(k);
  if (k.charCode === 100) {
    if (currentDice <5) {
      currentDice++;
    } else {
      currentDice = 0;
    }
    viewDice.src = Dice.diceIndex.dice[currentDice].diceIMG;
  }
  if (k.charCode === 97) {
    if (currentDice >0) {
      currentDice--;
    } else {
      currentDice = 5;
    }
    viewDice.src = Dice.diceIndex.dice[currentDice].diceIMG;
  }
});
