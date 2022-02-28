let currentWeapon;
let currentTarget;
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
  var entity = turnOrder[currentTurn];
  //setting just used value
  for (let i = 0; i < entity.weapons.length; i++) {
    entity.weapons[i].justUsed = false;
  }
  currentWeapon.justUsed = true;

  //running attack
  if (event.target.id == "normal") {
    var damage = calculateDamage(
      "normal",
      currentWeapon,
      entity,
      currentTarget
    );
    currentTarget.hp -= damage;
    currentWeapon.normal.afterStrike(currentTarget, damage);
    addLog(currentTarget.name, "current hp is " + currentTarget.hp);
    startMenu();
  } else if (event.target.id == "special") {
    if (entity.specialCooldown == 0) {
      var damage = calculateDamage(
        "special",
        currentWeapon,
        entity,
        currentTarget
      );
      currentTarget.hp -= damage;
      entity.specialCooldown = currentWeapon.special.cooldown;
      currentWeapon.special.afterStrike(
        currentTarget,
        currentWeapon.special.damage * (roll / 10 + 1)
      );
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
}

function calculateDamage(type, weapon, attacker, target) {
  //check if hit
  var usedSkill = weapon.type;
  var hitRoll = rollDie();
  alert("weapon accuracy is " + weapon[type].accuracy);
  alert("base hit roll is " + hitRoll);
  hitRoll += attacker.speed + attacker.skills[usedSkill];
  alert(
    "attacker speed = " +
      attacker.speed +
      " attacker prof = " +
      attacker.skills[usedSkill]
  );
  alert("new hit roll is " + hitRoll);
  hitRoll -= target.speed + target.skills[usedSkill];
  alert(
    "target speed = " +
      target.speed +
      " target prof = " +
      target.skills[usedSkill]
  );
  alert("new hit roll is " + hitRoll);

  if (weapon[type].accuracy <= hitRoll) {
    alert("hit");
    var attackRoll = rollDie();
    alert("base damage is " + weapon[type].damage);
    var damage = weapon[type].damage * (attackRoll / 10 + 1);
    alert("attack multiplier from dice is " + (attackRoll / 10 + 1));
    alert("new damage is " + damage);
    damage += attacker.damage * (attacker.skills[usedSkill] / 2.5 + 1);
    alert(
      "attacker damage = " +
        attacker.damage +
        " attacker pref = " +
        attacker.skills[usedSkill]
    );
    alert("new damage = " + damage);
    damage -= target.defense * (target.skills[usedSkill] / 2.5 + 1);
    alert(
      "target damage = " +
        target.damage +
        " target pref = " +
        target.skills[usedSkill]
    );
    alert("new damage = " + damage);
    //calculate damage
    currentWeapon[type].beforeStrike(currentTarget);
    return Math.round(damage);
  } else {
    alert("miss no damage done");
  }
}
