player1Frame = document.querySelector('.player-1-frame');
pigView1 = document.querySelector('.pig-view-1');

player2Frame = document.querySelector('.player-2-frame');
pigView2 = document.querySelector('.pig-view-2');

diceFrame = document.querySelector('.dice');
diceTooltipFrame = document.querySelector('.tooltip-info-box');
gameView = document.querySelector('.game-unities');


// listen for window resize and set root font size to match
window.addEventListener('resize', resizeText);

resizeText();
// positionDiceGameElements();

// positions frame inside target at vPos % of free vertical space and hPos % of free horizontal space (i.e. 50/50 is centered)
function positionFrame(target, frame, vPos = 50, hPos = 50) {
  const viewPos = target.getBoundingClientRect();
  frame.style.transform = 'translate(0,0)';
  const changePos = frame.getBoundingClientRect();
  const vOffset = (changePos.top) - viewPos.top - ((viewPos.height - changePos.height)*(vPos/100));
  const hOffset = (changePos.left) + viewPos.left + ((viewPos.width - changePos.width)*(hPos/100));

  frame.style.transform = `translate(${hOffset}px, ${-vOffset}px)`;
}

// reset the root font size
function resizeText() {
  var baseH = window.innerHeight;
  var root = document.querySelector('html');
  var fontFactor = (baseH / 45).toFixed(2);
  root.style.fontSize = `${fontFactor.toString()}px`;
  positionDiceGameElements();
}

function positionDiceGameElements() {
  positionFrame(pigView1, player1Frame);
  positionFrame(pigView2, player2Frame);
  positionFrame(gameView, diceFrame, 10, 50);
  positionFrame(gameView, diceTooltipFrame, 70, 50);
}
