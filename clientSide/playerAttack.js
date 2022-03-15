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
      currentWeapon[type].beforeStrike(currentTarget, false);
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
      runningAttack = true;
      console.log("attack ran " + event.target.id);
      var entity = turnOrder[currentTurn];
      //setting just used value
      for (let i = 0; i < entity.weapons.length; i++) {
        entity.weapons[i].justUsed = false;
      }
      currentWeapon.justUsed = true;
      attackState = 1;
      currentAttackType = event.target.id;
      let resultFunc = function (result) {
        //doing some calculations on hitDie to see if it hits
        if (attackState == 1) {
          accuracyDie = result;
          diePaused = true;
          accuracyDie = result;
          let hitRoll = accuracyDie;
          hitRoll +=
            turnOrder[currentTurn].speed +
            turnOrder[currentTurn].skills[currentWeapon.type];

          hitRoll -=
            currentTarget.speed + currentTarget.skills[currentWeapon.type];
          //check if hit
          if (currentWeapon[currentAttackType].accuracy <= hitRoll) {
            setTimeout(function () {
              diePaused = false;
              rollDie(function (result) {
                if (attackState == 2) {
                  damageDie = result;
                  attackState = 0;
                  calculateDamage(
                    currentAttackType,
                    currentWeapon,
                    turnOrder[currentTurn],
                    currentTarget
                  );
                }
              });
              attackState = 2;
            }, 1000);
          } else {
            runningAttack = false;
            diePaused = false;
            currentWeapon[currentAttackType].beforeStrike(currentTarget);
            addLog(turnOrder[currentTurn].name, "your attack missed");
            startMenu();
          }
        }
      }; //end of function im creating
      //calling the roll die with this function
      rollDie(resultFunc);
    }
  }
}

function endAttack(damage) {
  //running attack
  var entity = turnOrder[currentTurn];
  if (currentAttackType == "normal") {
    currentTarget.hp -= damage;
    currentWeapon.normal.afterStrike(currentTarget, damage);
    if (!jQuery.isEmptyObject(turnOrder[currentTurn].effects))
      for (let effectName in turnOrder[currentTurn].effects) {
        turnOrder[currentTurn].effects[effectName].onAttackEnd();
      }
    addLog(currentTarget.name, "current hp is " + currentTarget.hp);
    startMenu();
  } else if (currentAttackType == "special") {
    currentTarget.hp -= damage;
    entity.specialCooldown = currentWeapon.special.cooldown;
    currentWeapon.special.afterStrike(currentTarget, damage);
    if (!jQuery.isEmptyObject(turnOrder[currentTurn].effects))
      for (let effectName in turnOrder[currentTurn].effects) {
        turnOrder[currentTurn].effects[effectName].onAttackEnd();
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
    if (currentTarget.type == "player") {
      for (let i = 0; i < currentTarget.weapons.length; i++) {
        currentTarget.weapons[i].special.onDamageTaken();
        currentTarget.weapons[i].normal.onDamageTaken();
      }
      if (!jQuery.isEmptyObject(turnOrder[currentTurn].effects)) {
        for (let effectName in turnOrder[currentTurn].effects) {
          turnOrder[currentTurn].effects[effectName].onDamageTaken();
        }
      }
    }
    addLog(currentTarget.name, "current hp is " + currentTarget.hp);

    startMenu();
  }
  runningAttack = false;
}

function calculateDamage(type, weapon, attacker, target) {
  //check if hit
  var usedSkill = weapon.type;
  //waiting for hit roll to be finalized

  var damage = weapon[type].damage * (damageDie / 10 + 1);
  damage += attacker.damage * (attacker.skills[usedSkill] / 2.5 + 1);
  damage -= target.defense * (target.skills[usedSkill] / 2.5 + 1);
  //calculate damage

  if (currentWeapon[type].beforeStrike(currentTarget, true) != false) {
    if (jQuery.isEmptyObject(attacker.effects)) {
      endAttack(damage);
    } else {
      let Results = [];
      for (let effectName in attacker.effects) {
        Results.push(attacker.effects[effectName].beforeAttack());
      }
      let canAttack = true;
      for (let i = 0; i < Results.length; i++) {
        if (Results[i] == false) {
          canAttack = false;
        }
      }
      if (canAttack) {
        endAttack(damage);
      } else {
        runningAttack = false;
        startMenu();
      }
    }
  } else {
    runningAttack = false;
    startMenu();
  }
}
