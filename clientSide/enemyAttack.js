function startEnemyAttack() {
  if (turnOrder[currentTurn].type == "enemy" && !runningAttack) {
    runningAttack = true;
    move = enemyAi(turnOrder[currentTurn].moves);
    setTimeout(function () {
      rollDie(function () {});
    }, 2500);
  }
}

function enemyAi(moves = new Array()) {
  alert(moves);
  let movesToUse = [];
  if (turnOrder[currentTurn].specialCooldown > 0) {
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].cooldown < 0) {
        movesToUse.push(moves[i]);
      }
    }
  }
  let moveIndex = Math.floor(Math.random() * movesToUse.length);
  return movesToUse[moveIndex];
}
