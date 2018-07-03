//                          mainView
// css store-1      | pig-view-1 | game-unities | ...
// js (storeView1)  | (pigView1) | (gameView)   | ...
//                  |            |              |
//                  |            |              |
//                  |            |              |
//                  |            |              |
//                  |            |              |


var mainView = document.querySelector('#main-view');
var objectPool = document.querySelector('#object-pool');

var player1Frame = document.querySelector('.player-1-frame');
var pigView1 = document.querySelector('.pig-view-1');

var player2Frame = document.querySelector('.player-2-frame');
var pigView2 = document.querySelector('.pig-view-2');

var diceFrame = document.querySelector('.dice');
var diceTooltipFrame = document.querySelector('.tooltip-info-box');
var gameView = document.querySelector('.game-unities');

var player1Store = document.querySelector('.pig-1-store');
var storeView1 = document.querySelector('.store-1');
var player2Store = document.querySelector('.pig-2-store');
var storeView2 = document.querySelector('.store-2');

var inTransition = false;
var init = false;

var animStates = {
  diceSlide: false,
  slidePos: false
}



mainView.addEventListener('transitionend', endAnimation);

// listen for window resize and set root font size to match
window.addEventListener('resize', resizeText);

resizeText();



// positions frame inside target at vPos % of free vertical space and hPos % of free horizontal space (i.e. 50/50 is centered)
function positionFrame(target, frame, vPos = 50, hPos = 50) {
  const viewPos = target.getBoundingClientRect();
  frame.style.transform = 'translate(0,0)';
  const changePos = frame.getBoundingClientRect();
  const vOffset = (changePos.top) - viewPos.top - ((viewPos.height - changePos.height)*(vPos/100));
  const hOffset = (changePos.left) + viewPos.left + ((viewPos.width - changePos.width)*(hPos/100));

  frame.style.transform = `translate(${hOffset}px, ${-vOffset}px)`;

}

function positionFrameInterior(target, frame, vPos = 50, hPos = 50) {

  const viewPos = target.getBoundingClientRect();
  frame.style.transform = 'translate(0,0)';
  const changePos = frame.getBoundingClientRect();

  const vOffset = (changePos.y) - viewPos.y - ((viewPos.height - changePos.height)*(vPos/100));
  const hOffset = (changePos.x) - viewPos.x + ((viewPos.width - changePos.width)*(hPos/100));

  frame.style.transform = `translate(${hOffset}px, ${-vOffset}px)`;

}

// reset the root font size
function resizeText() {
  var baseH = window.innerHeight;
  var root = document.querySelector('html');
  var fontFactor = (baseH / 45).toFixed(2);
  root.style.fontSize = `${fontFactor.toString()}px`;

  // if window is wider than 767 and main view has expanded classs, remove the class and transition the view to the wider screen format
  if (window.innerWidth >= 767 && document.querySelector('.expanded')) {
    if (mainView.classList.contains('expanded')) {
      mainView.classList.remove('expanded');
      if (mainView.classList.contains('shift-left')) {
        mainView.classList.remove('shift-left');
      }
    }
    mainView.style.width = null;
    mainView.childNodes.forEach(function(pane){
      if (!pane.style) return; // skip non DOM childNodes
      pane.style.flexBasis = null;
    });

  }
  if (game.mode === 'pig') {
    if (init === false) {
      init = true;
      positionDiceGameElements();
    } else {
      trackAnimation(mainView);
    }
  }
}

function positionDiceGameElements() {

  // check if view is in expanded mode (screen is under 767px width and user has expanded a store tab)
  if (!mainView.classList.contains('expanded') && window.innerWidth < 767) {
    // if store-view-1 frame doesn't contain collapsed class, add it
    if(!storeView1.classList.contains('collapsed')) {
      storeView1.classList.add('collapsed');
    }
    if(!storeView2.classList.contains('collapsed')) {
      storeView2.classList.add('collapsed');
    }
  }

  if (window.innerWidth >= 767) {
    if (storeView1.classList.contains('collapsed')) {
      storeView1.classList.remove('collapsed');
    }
    if (storeView2.classList.contains('collapsed')) {
      storeView2.classList.remove('collapsed');
    }
  }

  //position player 1 frame
  animStates.diceSlide ? positionFrameInterior(pigView1, player1Frame) : positionFrame(pigView1, player1Frame);
  // position player 2 frame
  animStates.diceSlide ? positionFrameInterior(pigView2, player2Frame) : positionFrame(pigView2, player2Frame);
  // position dice frame
  animStates.diceSlide ? positionFrameInterior(gameView, diceFrame, 10, 50) : positionFrame(gameView, diceFrame, 10, 50);
  // position tooltip frame
  animStates.diceSlide ? positionFrameInterior(gameView, diceTooltipFrame, 90, 50) : positionFrame(gameView, diceTooltipFrame, 90, 50);

  if (!storeView1.classList.contains('collapsed') && !animStates.diceSlide) {
    positionFrame(storeView1, player1Store);
  } else if (!animStates.diceSlide) {
    player1Store.style.transform = 'translate(0,0)';
  }
  if (!storeView2.classList.contains('collapsed') && !animStates.diceSlide) {
    positionFrame(storeView2, player2Store);
  } else if (!animStates.diceSlide) {
    player2Store.style.transform = 'translate(0,0)';
  }

}

storeView1.addEventListener('click', storeExpand.bind(null, storeView1));
storeView2.addEventListener('click', storeExpand.bind(null, storeView2));

gameView.addEventListener('click', checkCollapse);
pigView1.addEventListener('click', checkCollapse);
pigView2.addEventListener('click', checkCollapse);
player1Frame.addEventListener('click', checkCollapse);
player2Frame.addEventListener('click', checkCollapse);

function storeExpand(store) {
  animStates.diceSlide = true;

  // if store is not collapsed, exit function
  if (!store.classList.contains('collapsed') || window.innerWidth >= 767) {
    return;
  }
  // remove collapsed class
  if (store.classList.contains('collapsed')) {
    store.classList.remove('collapsed');
  }
  // set the main view
  if (!mainView.classList.contains('expanded')) {
    mainView.classList.add('expanded');
  }

  // expand all parts of the game view
  mainView.childNodes.forEach(function(pane){
    if (pane.style) pane.style.flexBasis = '20%';
  });

  // expand total view so that one pane of the view will be offscreen
  mainView.style.width = '125vw';

  // if rightmost pane is expanded, shift the entire view to pop the leftmost pane offscreen
  if (store.classList.contains('store-2')) {
    if (!mainView.classList.contains('shift-left')) {
      mainView.classList.add('shift-left');
    }
  }

  trackAnimation(mainView);
}

function checkCollapse(e) {
  if (!game.mode === 'pig') return;
  
  if (document.querySelector('.expanded')) {
    if (document.querySelector('.shift-left')) {
      player2Store.style.transform = 'translate(0,0)';
      storeCollapse(storeView2);
    } else {
      player1Store.style.transform = 'translate(0,0)';
      storeCollapse(storeView1);
    }
  }
}


function storeCollapse(store) {
  animStates.diceSlide = true;

  // if the store has a collapsed class, exit
  if (store.classList.contains('collapsed') || window.innerWidth >= 767) {
    return;
  }

  // if the store doesn't have the collapsed class, add it
  if (!store.classList.contains('collapsed')) {
    store.classList.add('collapsed');
  }

  // if the main view is expanded, remove expanded class
  if (mainView.classList.contains('expanded')) {
    mainView.classList.remove('expanded');
  }

  mainView.childNodes.forEach(function(pane){
    if (pane.style) pane.style.flexBasis = null;
  });
  mainView.style.width = '100vw';

  if (mainView.classList.contains('shift-left')) {
    mainView.classList.remove('shift-left');
  }

  trackAnimation(mainView);
}

function trackAnimation(e) {
  if (inTransition) {
    return;
  }

  if (animStates.diceSlide && !animStates.slidePos) {
    socketFrame(pigView1, player1Frame);
    socketFrame(pigView2, player2Frame);
    socketFrame(gameView, diceTooltipFrame);
    socketFrame(gameView, diceFrame);

    positionDiceGameElements();
    animStates.slidePos = true;
  }
  inTransition = true;

}

function endAnimation() {
  inTransition = false;

  setTimeout(function() {
    if (inTransition === false) {
      if (animStates.diceSlide) {
        socketFrame(objectPool, player1Frame);
        socketFrame(objectPool, player2Frame);
        socketFrame(objectPool, diceFrame);
        socketFrame(objectPool, diceTooltipFrame);
        animStates.diceSlide = false;
        animStates.slidePos = false;
      }
      positionDiceGameElements();
    }
  }, 30);

}

function socketFrame(target, frame) {
  target.append(frame);
}
