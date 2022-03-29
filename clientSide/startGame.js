var turnOrder = [];
var currentTurn = 0;
var enemyImage;
var gameType;
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
  gameType = "singlePlayer";
  if (newGame) {
    let player = createPlayer(
      sessionStorage.getItem("name"),
      100,
      "assets/player.png",
      2,
      5,
      1,
      { basic: 2, stealth: 1, heavy: 3, range: 1 }
    );
    getMaterial("wood", player, 5);
    getMaterial("wood", player, 5);
    getMaterial("fineMetal", player, 3);

    getWeapon("rusty broadsword", true, player, false);
    getTool("crappy axe", true, player, false);
    turnOrder.push(player);
    newEnemy();
  }
  startGame = true;
  setInterval(function () {
    update(function () {
      checkIfDead();
      startEnemyAttack();
    });
  }, 250);
  if (!newGame) {
    resetInventoryDiv(turnOrder[currentTurn]);
  }
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
  if (!jQuery.isEmptyObject(turnOrder[currentTurn].effects))
    for (let effectName in turnOrder[currentTurn].effects) {
      turnOrder[currentTurn].effects[effectName].onBeginTurn();
    }
}
