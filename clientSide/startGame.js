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
    let player = createPlayer(
      sessionStorage.getItem("name"),
      100,
      "assets/player.png",
      2,
      5,
      1,
      { basic: 2, stealth: 0, heavy: 3, range: 0 }
    );
    turnOrder.push(player);
    newEnemy();
  }
  startGame = true;
  setInterval(update, 50);
  startMenu();
}

function beginTurn() {
  let entity = turnOrder[currentTurn];
  if (entity.type == "player") {
    if (entity.weapons.length == 0) {
      entity.weapons.push(getWeapon("rusty broadsword"));
    }
    if (entity.specialCooldown >= 1) {
      entity.specialCooldown--;
    }

    for (let i = 0; i < entity.weapons.length; i++) {
      entity.weapons[i].normal.onBeginTurn();
      entity.weapons[i].special.onBeginTurn();
    }
  }
}
