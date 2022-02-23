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
  let entity = turnOrder[currentTurn];
  //setting just used value
  for (let i = 0; i < entity.weapons.length; i++) {
    entity.weapons[i].justUsed = false;
  }
  currentWeapon.justUsed = true;

  //running attack
  if (event.target.id == "normal") {
    currentWeapon.normal.beforeStrike(currentTarget.name);
    let roll = rollDie();
    currentTarget.hp -= currentWeapon.normal.damage * (roll / 10 + 1);
    currentWeapon.normal.afterStrike(
      currentTarget.name,
      currentWeapon.normal.damage * (roll / 10 + 1)
    );
    addLog(currentTarget.name, "current hp is " + currentTarget.hp);
    startMenu();
  } else if (event.target.id == "special") {
    if (entity.specialCooldown == 0) {
      currentWeapon.special.beforeStrike(currentTarget.name);
      let roll = rollDie();
      currentTarget.hp -= currentWeapon.special.damage * (roll / 10 + 1);
      entity.specialCooldown = currentWeapon.special.cooldown;
      currentWeapon.special.afterStrike(
        currentTarget.name,
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
