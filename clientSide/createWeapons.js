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
  normalBeforeAttack = function () {},
  normalBeforeStrike = function (
    target = new Object(),
    hitRoll = new Number()
  ) {},
  normalAfterStrike = function (
    target = new Object(),
    hit = new Boolean(),
    damage = new Number(),
    damageRoll = new Number()
  ) {
    if (hit) {
      addLog(
        turnOrder[currentTurn].name,
        "dealt " + damage + " damage to " + target.name
      );

      addLog(currentTarget.name, "current hp is " + currentTarget.hp);
    }
  },
  normalOnDamageTaken = function () {},
  specialInitilization = function () {},
  specialTurnStart = function () {},
  specialBeforeAttack = function () {},
  specialBeforeStrike = function (
    target = new Object(),
    hitRoll = newNumber
  ) {},
  specialAfterStrike = function (
    target = new Object(),
    hit = new Boolean(),
    damage = new Number(),
    damageRoll = new Number()
  ) {
    addLog(
      turnOrder[currentTurn].name,
      "dealt " + damage + " damage to " + target.name
    );
    addLog(currentTarget.name, "current hp is " + currentTarget.hp);
  },
  specialOnDamageTaken = function () {}
) {
  newWeapon = {
    name: name,
    type: type,
    imgSrc: img,
    description: description,
    img: new Image(),
    normal: {
      name: normalName,
      damage: normalDamage,
      accuracy: normalAccuracy,
      description: normalDescription,
      justUsed: 0,
      initilization: normalInitilization,
      onBeginTurn: normalTurnStart,
      beforeAttack: normalBeforeAttack,
      beforeStrike: normalBeforeStrike,
      afterStrike: normalAfterStrike,
      onDamageTaken: normalOnDamageTaken,
    },

    special: {
      name: specialName,
      damage: specialDamage,
      accuracy: specialAccuracy,
      cooldown: cooldown,
      description: specialDescription,
      justUsed: 0,
      initilization: specialInitilization,
      onBeginTurn: specialTurnStart,
      beforeAttack: specialBeforeAttack,
      beforeStrike: specialBeforeStrike,
      afterStrike: specialAfterStrike,
      onDamageTaken: specialOnDamageTaken,
    },
    init() {
      this.normal.parent = this;
      this.special.parent = this;
      delete this.init;
      return this;
    },
  }.init();
  newWeapon.img.src = newWeapon.imgSrc;
  if (addToArray) {
    allWeapons.push(newWeapon);
  } else {
    return newWeapon;
  }
}

//function to give the player a certain weapon
function getWeapon(weaponName, give = true, reciever, log = true) {
  for (let i = 0; i < allWeapons.length; i++) {
    if (weaponName == allWeapons[i].name) {
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
        weaponIndex.normal.beforeAttack,
        weaponIndex.normal.beforeStrike,
        weaponIndex.normal.afterStrike,
        weaponIndex.normal.onDamageTaken,
        weaponIndex.special.initilization,
        weaponIndex.special.onBeginTurn,
        weaponIndex.special.beforeAttack,
        weaponIndex.special.beforeStrike,
        weaponIndex.special.afterStrike,
        weaponIndex.special.onDamageTaken
      );
      if (give) {
        if (log) {
          addLog(reciever.name, "got the weapon " + weaponName);
        }
        let image = new Image();
        image.src = Weapon.imgSrc;
        addToInventory("weapons", image, Weapon.description);
        Weapon.normal.initilization();
        Weapon.special.initilization();
        reciever.weapons.push(Weapon);
      } else {
        return Weapon;
      }
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
