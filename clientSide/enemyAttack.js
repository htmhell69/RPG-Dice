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
  let moveIndex = Math.floor(Math.random() * moves.length);
  return moves[moveIndex];
}
