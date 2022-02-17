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
    currentTarget.hp -= currentWeapon.normal.damage;
    alert(currentTarget.hp);
    currentWeapon.normal.afterStrike(currentTarget.name);
    startMenu();
  } else if (event.target.id == "special") {
    if (entity.specialCooldown == 0) {
      currentWeapon.special.beforeStrike(currentTarget.name);
      currentTarget.hp -= currentWeapon.special.damage;
      entity.specialCooldown = currentWeapon.special.cooldown;
      alert(entity.specialCooldown);
      alert(currentTarget.hp);
      currentWeapon.special.afterStrike(currentTarget.name);
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
