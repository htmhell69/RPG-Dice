var currentWeapon;
var currentTarget;
var currentAttackType;
var runningAttack = false;
/* 0 = off
 * 1 = accuracy roll
 * 2 = damage roll
 */

var attackState;
function startAttack(event) {
  if (turnOrder[currentTurn].type == "player") {
    if (turnOrder.length > currentTurn + 1) {
      let attackId = parseInt(event.target.id, 36);
      if (turnOrder.length == 2) {
        currentWeapon = turnOrder[currentTurn].weapons[attackId];
        currentTarget = turnOrder[currentTurn + 1];
        weaponMenu(currentWeapon);
      }
    }
  }
}

function runAttack(event) {
  if (!runningAttack) {
    if (
      turnOrder[currentTurn].specialCooldown > 0 &&
      event.target.id == "special"
    ) {
      runningAttack = false;
      if (turnOrder[currentTurn].specialCooldown == 1) {
        alert("you cant use this move for " + 1 + " more turn");
      } else {
        alert(
          "you cant use this move for " +
            turnOrder[currentTurn].specialCooldown +
            " more turns"
        );
      }
    } else {
      removeButton();
      currentAttackType = event.target.id;
      runningAttack = true;
      console.log("attack ran " + event.target.id);
      var entity = turnOrder[currentTurn];
      /*setting just used value
      calling all weapons before attack*/
      for (let i = 0; i < entity.weapons.length; i++) {
        entity.weapons[i].normal.beforeAttack();
        entity.weapons[i].special.beforeAttack();
        if (
          !entity.weapons[i][currentAttackType] ===
          currentWeapon[currentAttackType]
        ) {
          entity.weapons[i][currentAttackType].justUsed = 0;
        }
      }
      currentWeapon[currentAttackType].justUsed += 1;
      attackState = 1;
      currentAttackType = event.target.id;
      let resultFunc = function (result) {
        //doing some calculations on hitDie to see if it hits
        if (attackState == 1) {
          let hitRoll = result;
          hitRoll = calculateHit(hitRoll, currentWeapon);

          //go through effects and stuff to check if it is stopped by that
          let canAttack;
          if (
            currentWeapon[currentAttackType].beforeStrike(
              currentTarget,
              hitRoll
            ) != false
          ) {
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
          if (
            currentWeapon[currentAttackType].accuracy <= hitRoll &&
            canAttack == true
          ) {
            setTimeout(function () {
              rollDie(function (result) {
                if (attackState == 2) {
                  attackState = 0;
                  console.log(result);
                  let damage = calculateDamage(
                    result,
                    true,
                    currentWeapon,
                    turnOrder[currentTurn],
                    currentTarget,
                    currentAttackType
                  );
                  endAttack(damage, result);
                }
              });
              attackState = 2;
            }, 1000);
          } else {
            runningAttack = false;
            for (let effectName in turnOrder[currentTurn].effects) {
              turnOrder[currentTurn].effects[effectName].onAttackEnd(
                false,
                0,
                0
              );
            }
            currentWeapon[currentAttackType].afterStrike(
              currentTarget,
              false,
              0,
              0
            );
            addLog(turnOrder[currentTurn].name, "your attack missed");
            if (!currentTurn == turnOrder.length - 1) {
              currentTurn++;
            } else {
              currentTurn = 0;
            }
            startMenu();
          }
        }
      }; //end of function im creating
      //calling the roll die with this function
      rollDie(resultFunc);
    }
  }
}

function endAttack(damage = new Number(), damageRoll = new Number()) {
  //running attack
  var entity = turnOrder[currentTurn];
  if (currentAttackType == "normal") {
    currentTarget.hp -= damage;
    currentWeapon.normal.afterStrike(currentTarget, true, damage, damageRoll);
    if (!jQuery.isEmptyObject(turnOrder[currentTurn].effects))
      for (let effectName in turnOrder[currentTurn].effects) {
        turnOrder[currentTurn].effects[effectName].onAttackEnd();
      }
  } else if (currentAttackType == "special") {
    currentTarget.hp -= damage;
    entity.specialCooldown = currentWeapon.special.cooldown;
    currentWeapon.special.afterStrike(currentTarget, true, damage, damageRoll);
    if (!jQuery.isEmptyObject(turnOrder[currentTurn].effects))
      for (let effectName in turnOrder[currentTurn].effects) {
        turnOrder[currentTurn].effects[effectName].onAttackEnd(
          true,
          damage,
          damageRoll
        );
      }
    if (entity.specialCooldown - 1 == 1) {
      addLog(
        entity.name,
        "you must wait " +
          (entity.specialCooldown - 1) +
          " more turn before you can use your special agian"
      );
    } else {
      addLog(
        entity.name,
        "you must wait " +
          (entity.specialCooldown - 1) +
          " more turns before you can use your special"
      );
    }
  }
  if (currentTarget.type == "player") {
    for (let i = 0; i < currentTarget.weapons.length; i++) {
      currentTarget.weapons[i].special.onDamageTaken(damage, damageRoll);
      currentTarget.weapons[i].normal.onDamageTaken(damage, damageRoll);
    }
  } else {
    for (let i = 0; i < currentTarget.moves.length; i++) {
      currentTarget.moves[i].onDamageTaken(damage, damageRoll);
    }
  }
  if (!jQuery.isEmptyObject(turnOrder[currentTurn].effects)) {
    for (let effectName in turnOrder[currentTurn].effects) {
      turnOrder[currentTurn].effects[effectName].onDamageTaken(
        damage,
        damageRoll
      );
    }
  }

  startMenu();
  runningAttack = false;
  if (!currentTurn == turnOrder.length - 1) {
    currentTurn++;
  } else {
    currentTurn = 0;
  }
}

function calculateDamage(
  damageRoll = new Number(),
  isPlayerAttack = new Boolean(),
  attack = new Object(),
  attacker = new Object(),
  target = new Object(),
  playerAttackType = ""
) {
  //check if hit
  var usedSkill = attack.type;
  if (isPlayerAttack) {
    var damage = attack[playerAttackType].damage * (damageRoll / 10 + 1);
  } else {
    var damage = attack.damage * (damageRoll / 10 + 1);
  }

  //waiting for hit roll to be finalized

  damage += attacker.damage * (attacker.skills[usedSkill] / 2.5 + 1);
  damage -= target.defense * (target.skills[usedSkill] / 2.5 + 1);
  return Math.floor(damage);
  //calculate damage
}

function calculateHit(hitRoll, move) {
  let hit = hitRoll;
  hit +=
    turnOrder[currentTurn].speed + turnOrder[currentTurn].skills[move.type];

  hit -= currentTarget.speed + currentTarget.skills[move.type];
  return hit;
}
