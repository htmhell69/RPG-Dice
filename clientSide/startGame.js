var turnOrder = [];
var currentTurn = 0;
var Enemy;
var enemyImage;
var gameType = "singlePlayer";
var canvas;
var ctx;
var dieCanvas;
var dieCtx;
var difficulty;

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
dieCanvas = document.getElementById("dieCanvas");
dieCtx = dieCanvas.getContext("2d");

function singlePlayer(event, newGame = true) {
  if (newGame) {
    let player = createPlayer(100, "assets/player.png", 0, 0);
    turnOrder.push(player);
  }
  newEnemy();
  setInterval(update, 50);
  startMenu();
}

function beginTurn() {
  let entity = turnOrder[currentTurn];
  if (entity.type == "player") {
    if (entity.specialCooldown >= 1) {
      entity.specialCooldown--;
    }
    for (let i = 0; i < entity.weapons.length; i++) {
      entity.weapons[i].normal.onBeginTurn();
      entity.weapons[i].special.onBeginTurn();
    }
  }
}
