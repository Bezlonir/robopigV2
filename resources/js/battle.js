var Battle = {}

Battle.attack1 = document.querySelector('.attack-1');

Battle.setHP = function() {
  var hp1 = document.querySelector('.pig-1-commands h3');
  var hp2 = document.querySelector('.pig-2-commands h3');
  hp1.innerText = Pigs.pig1Stats.hp.toString();
  hp2.innerText = Pigs.pig1Stats.hp.toString();
}
