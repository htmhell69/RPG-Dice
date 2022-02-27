//base weapon
let allWeapons = [];
function weaponConstructor(
  addToArray,
  name,
  type,
  img,
  description,
  normalName,
  normalDamage,
  normalAccuracy,
  normalDescription,
  specialName,
  specialDamage,
  specialAccuracy,
  cooldown,
  specialDescription,
  normalInitilization = function () {},
  normalTurnStart = function () {},
  normalBeforeStrike = function (target, damage) {},
  normalAfterStrike = function (target, damage) {
    addLog(
      turnOrder[currentTurn].name,
      "dealt " + damage + " damage to " + target
    );
  },
  specialInitilization = function () {},
  specialTurnStart = function () {},
  specialBeforeStrike = function (target, damage) {},
  specialAfterStrike = function (target, damage) {
    addLog(
      turnOrder[currentTurn].name,
      "dealt " + damage + " damage to " + target
    );
  }
) {
  newWeapon = {
    name: name,
    type: type,
    imgSrc: img,
    description: description,
    img: new Image(),
    justUsed: false,
    normal: {
      name: normalName,
      damage: normalDamage,
      accuracy: normalAccuracy,
      description: normalDescription,
      initilization: normalInitilization,
      onBeginTurn: normalTurnStart,
      beforeStrike: normalBeforeStrike,
      afterStrike: normalAfterStrike,
    },

    special: {
      name: specialName,
      damage: specialDamage,
      accuracy: specialAccuracy,
      cooldown: cooldown,
      description: specialDescription,
      initilization: specialInitilization,
      onBeginTurn: specialTurnStart,
      beforeStrike: specialBeforeStrike,
      afterStrike: specialAfterStrike,
    },
  };
  newWeapon.img.src = newWeapon.imgSrc;

  if (addToArray) {
    allWeapons.push(newWeapon);
  } else {
    return newWeapon;
  }
}

//function to give the player a certain weapon
function getWeapon(name, log = true) {
  for (let i = 0; i < allWeapons.length; i++) {
    if (name == allWeapons[i].name) {
      weaponIndex = allWeapons[i];
      let Weapon = weaponConstructor(
        false,
        weaponIndex.name,
        weaponIndex.type,
        weaponIndex.imgSrc,
        weaponIndex.description,
        weaponIndex.normal.name,
        weaponIndex.normal.damage,
        weaponIndex.normal.accuracy,
        weaponIndex.normal.description,
        weaponIndex.special.name,
        weaponIndex.special.damage,
        weaponIndex.special.accuracy,
        weaponIndex.special.cooldown,
        weaponIndex.special.description,
        weaponIndex.normal.initilization,
        weaponIndex.normal.onBeginTurn,
        weaponIndex.normal.beforeStrike,
        weaponIndex.normal.afterStrike,
        weaponIndex.special.initilization,
        weaponIndex.special.onBeginTurn,
        weaponIndex.special.beforeStrike,
        weaponIndex.special.afterStrike
      );
      if (log) {
        addLog(turnOrder[currentTurn].name, "got the weapon " + name);
      }
      Weapon.normal.initilization();
      Weapon.special.initilization();
      return Weapon;
    }
  }
}

//create generic weapon
weaponConstructor(
  true,
  "rusty broadsword",
  "basic",
  "assets/item.png",
  "a weapon that can be used to wipe a donkeys ass dont even try cleaning it",
  "normal",
  10,
  3,
  "10 damage",
  "special",
  20,
  4,
  2,
  "20 damage 2 turn cooldown"
);

//create complex item

//special initilization
