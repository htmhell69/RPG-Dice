//die face drawings
var keyPressed = false;
var canvasHeight = dieCanvas.getBoundingClientRect().height;
var canvasWidth = dieCanvas.getBoundingClientRect().width;
var Dice = [];
var ch;
var dieResultFunc;
var damageDie;
var accuracyDie;
var diePaused = false;

function draw1(die) {
  dieCtx.beginPath();
  let dotX = die.x + 0.5 * die.width;
  let dotY = die.y + 0.5 * die.height;
  dieCtx.arc(dotX, dotY, die.dotSize, 0, Math.PI * 2, true);
  dieCtx.closePath();
  dieCtx.fill();
}

function draw2(die) {
  dieCtx.beginPath();
  var dotX = die.x + 3 * die.dotSize;
  var dotY = die.y + 3 * die.dotSize;
  dieCtx.arc(dotX, dotY, die.dotSize, 0, Math.PI * 2);
  dotX = die.x + die.width - 3 * die.dotSize;
  dotY = die.y + die.height - 3 * die.dotSize;
  dieCtx.arc(dotX, dotY, die.dotSize, 0, Math.PI * 2);
  dieCtx.closePath();
  dieCtx.fill();
}

function draw4(die) {
  //2 diagonal dots
  dieCtx.beginPath();
  //top left
  var dotX = die.x + 3 * die.dotSize;
  var dotY = die.y + 3 * die.dotSize;
  dieCtx.arc(dotX, dotY, die.dotSize, 0, Math.PI * 2, true);
  //bottom right
  dotX = die.x + die.width - 3 * die.dotSize;
  dotY = die.y + die.height - 3 * die.dotSize;
  dieCtx.arc(dotX, dotY, die.dotSize, 0, Math.PI * 2, true);
  //drawing the 2 dots
  dieCtx.closePath();
  dieCtx.fill();
  //2 more diagonal dots
  dieCtx.beginPath();
  //top right
  dotX = die.x + 3 * die.dotSize;
  dotY = die.y + die.height - 3 * die.dotSize;
  dieCtx.arc(dotX, dotY, die.dotSize, 0, Math.PI * 2);
  //bottom left
  dotX = die.x + die.width - 3 * die.dotSize;
  dotY = die.y + 3 * die.dotSize;
  dieCtx.arc(dotX, dotY, die.dotSize, 0, Math.PI * 2, true);
  //drawing the 2 dots
  dieCtx.closePath();
  dieCtx.fill();
}

function draw2mid(die) {
  dieCtx.beginPath();
  var dotX = die.x + 3 * die.dotSize;
  var dotY = die.y + 0.5 * die.height;
  dieCtx.arc(dotX, dotY, die.dotSize, 0, Math.PI * 2);
  dotX = die.x + die.width - 3 * die.dotSize;
  dotY = die.y + 0.5 * die.height;
  dieCtx.arc(dotX, dotY, die.dotSize, 0, Math.PI * 2);
  dieCtx.closePath();
  dieCtx.fill();
}

function rollDie() {
  if (diePaused == false) {
    console.log(attackState + " " + keyPressed);
    let dieResult = 0;
    updateDie();
    dieCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let i = 0; i < Dice.length; i++) {
      ch = Math.floor(1 + Math.random() * 6);
      Dice[i].lastRoll = ch;
      dieResult += ch;
      drawDots(ch, Dice[i]);
    }

    if (!keyPressed) {
      setTimeout(rollDie, 10);
    } else {
      dieResultFunc(dieResult);
    }
  }
}

function createDie(x, y, height, width, dotSize) {
  var die = {
    x: x,
    y: y,
    height: height,
    width: width,
    dotSize: dotSize,
    lastRoll: null,
  };

  Dice.push(die);
}

function drawDots(num, die) {
  dieCtx.clearRect(die.x, die.y, die.width, die.height);
  dieCtx.fillStyle = "white";
  dieCtx.fillRect(die.x, die.y, die.width, die.height);
  dieCtx.lineWidth = 5;
  dieCtx.strokeRect(die.x, die.y, die.width, die.height);
  dieCtx.fillStyle = "#009966";
  switch (num) {
    case 1:
      draw1(die);
      break;
    case 2:
      draw2(die);
      break;
    case 3:
      draw2(die);
      draw1(die);
      break;
    case 4:
      draw4(die);
      break;
    case 5:
      draw4(die);
      draw1(die);
      break;
    default:
      draw4(die);
      draw2mid(die);
      break;
  }
}

createDie(400, 250, 100, 100, 8.5);
createDie(400, 250, 100, 100, 8.5);
for (let i = 0; i < Dice.length; i++) {
  Dice[i].x = window.window.innerWidth / 2 - i * 200;
}

document.onkeydown = function () {
  keyPressed = true;
  setTimeout(function () {
    keyPressed = false;
  }, 25);
};
