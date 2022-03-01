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
    dieResultFunc = function (result) {
      if (attackState == 1) {
        accuracyDie = result;
        diePaused = true;
        setTimeout(function () {
          diePaused = false;
          rollDie();
          attackState = 2;
        }, 1000);
      } else if (attackState == 2) {
        damageDie = result;
        attackState = 0;
        calculateDamage(
          currentAttackType,
          currentWeapon,
          turnOrder[currentTurn],
          currentTarget
        );
      }
    };
    rollDie();
  }
}

function endAttack(damage) {
  //running attack
  var entity = turnOrder[currentTurn];
  if (currentAttackType == "normal") {
    currentTarget.hp -= damage;
    currentWeapon.normal.afterStrike(currentTarget, damage);
    addLog(currentTarget.name, "current hp is " + currentTarget.hp);
    startMenu();
  } else if (currentAttackType == "special") {
    if (entity.specialCooldown == 0) {
      currentTarget.hp -= damage;
      entity.specialCooldown = currentWeapon.special.cooldown;
      currentWeapon.special.afterStrike(currentTarget, damage);
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

      addLog(currentTarget.name, "current hp is " + currentTarget.hp);

      startMenu();
    } else {
      if (entity.specialCooldown == 1) {
        alert("you cant use this move for " + 1 + " more turn");
      } else {
        alert(
          "you cant use this move for " + entity.specialCooldown + " more turns"
        );
      }
    }
  }
  runningAttack = false;
}

function calculateDamage(type, weapon, attacker, target) {
  //check if hit
  var usedSkill = weapon.type;
  //waiting for hit roll to be finalized
  hitRoll = accuracyDie;
  hitRoll += attacker.speed + attacker.skills[usedSkill];
  hitRoll -= target.speed + target.skills[usedSkill];
  if (weapon[type].accuracy <= hitRoll) {
    var damage = weapon[type].damage * (damageDie / 10 + 1);
    damage += attacker.damage * (attacker.skills[usedSkill] / 2.5 + 1);
    damage -= target.defense * (target.skills[usedSkill] / 2.5 + 1);
    //calculate damage
    currentWeapon[type].beforeStrike(currentTarget);
    endAttack(damage);
  } else {
    currentWeapon[type].beforeStrike(currentTarget);
    addLog(attacker.name, "your attack missed");
  }
}
