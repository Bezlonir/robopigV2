var Dice = {};

Dice.diceIndex = {
  dice: [
    {
      number: 1,
      index: 0,
      diceIMG: './resources/images/dice-1.png'
    },
    {
      number: 2,
      index: 1,
      diceIMG: './resources/images/dice-2.png'
    },
    {
      number: 3,
      index: 2,
      diceIMG: './resources/images/dice-3.png'
    },
    {
      number: 4,
      index: 3,
      diceIMG: './resources/images/dice-4.png'
    },
    {
      number: 5,
      index: 4,
      diceIMG: './resources/images/dice-5.png'
    },
    {
      number: 6,
      index: 5,
      diceIMG: './resources/images/dice-6.png'
    }
  ],
  rollDice: function() {
    var diceRoll = Math.floor(Math.random() * 6);
    return this.dice[diceRoll];
  }
};
