function startEnemyAttack() {
  if (!jQuery.isEmptyObject(turnOrder[currentTurn].effects)) {
    for (let effectName in turnOrder[currentTurn].effects) {
      Results.push(turnOrder[currentTurn].effects[effectName].onBeginTurn());
    }
  }
  if (turnOrder[currentTurn].type == "enemy" && !runningAttack) {
    runningAttack = true;
    let move = enemyAi(turnOrder[currentTurn].moves);

    let currentTarget = turnOrder[Math.floor(Math.random() * turnOrder.length)];
    while (currentTarget == turnOrder[currentTurn]) {
      currentTarget = turnOrder[Math.floor(Math.random() * turnOrder.length)];
    }
    for (let i = 0; turnOrder[currentTurn].moves.length > i; i++) {
      turnOrder[currentTurn].moves[i].beforeAttack();
      if (!turnOrder[currentTurn].moves[i] === move) {
        turnOrder[currentTurn].moves[i].justUsed = 0;
      }
    }
    move.justUsed += 1;
    setTimeout(function () {
      let resultFunc = function (result) {
        let hitRoll = result;
        hitRoll = calculateHit(hitRoll, move);
        let canAttack;
        if (move.beforeStrike(currentTarget, hitRoll) != false) {
          if (jQuery.isEmptyObject(turnOrder[currentTurn].effects)) {
            canAttack = true;
          } else {
            let Results = [];
            for (let effectName in turnOrder[currentTurn].effects) {
              Results.push(
                turnOrder[currentTurn].effects[effectName].beforeAttack()
              );
            }
            canAttack = true;
            for (let i = 0; i < Results.length; i++) {
              if (Results[i] == false) {
                canAttack = false;
              }
            }
          }
        } else {
          canAttack = false;
        }
        if (canAttack && move.accuracy <= hitRoll) {
          if (move.cooldown > 0) {
            turnOrder[currentTurn].specialCooldown = move.cooldown;
          }
          setTimeout(function () {
            rollDie(function (result) {
              let damage = calculateDamage(
                result,
                false,
                move,
                turnOrder[currentTurn],
                currentTarget
              );
              currentTarget.hp -= damage;
              move.afterStrike(currentTarget, true, damage, result);
              if (!jQuery.isEmptyObject(turnOrder[currentTurn].effects)) {
                for (let effectName in turnOrder[currentTurn].effects) {
                  turnOrder[currentTurn].effects[effectName].onAttackEnd(
                    true,
                    damage,
                    result
                  );
                }
              }
              if (!jQuery.isEmptyObject(currentTarget.effects)) {
                for (let effectName in currentTarget.effects) {
                  currentTarget.effects[effectName].onDamageTaken(
                    damage,
                    result
                  );
                }
              }
              if (!currentTurn == turnOrder.length - 1) {
                currentTurn++;
              } else {
                currentTurn = 0;
              }
              runningAttack = false;
            });
          }, 1500);
        } else {
          runningAttack = false;
          if (!jQuery.isEmptyObject(turnOrder[currentTurn].effects)) {
            for (let effectName in turnOrder[currentTurn].effects) {
              Results.push(
                turnOrder[currentTurn].effects[effectName].afterStrike(
                  false,
                  0,
                  0
                )
              );
            }
          }
          move.afterStrike(currentTarget, false, 0, 0);
          if (!currentTurn == turnOrder.length - 1) {
            currentTurn++;
          } else {
            currentTurn = 0;
          }
        }
      };

      rollDie(resultFunc);
    }, 1500);
  }
}

function enemyAi(moves = new Array()) {
  let movesToUse = [];
  if (turnOrder[currentTurn].specialCooldown > 0) {
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].cooldown < 0) {
        movesToUse.push(moves[i]);
      }
    }
  } else {
    movesToUse = moves;
  }
  let moveIndex = Math.floor(Math.random() * movesToUse.length + 1) - 1;
  alert(JSON.stringify(movesToUse[moveIndex]));
  return movesToUse[moveIndex];
}
