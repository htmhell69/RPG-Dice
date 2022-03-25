//this js file creates the functions needed to make the player/enemy objects
let allEnemys = [];
function createPlayer(
  name = new String(),
  hp = new Number(),
  img = new String(),
  defense = new Number(),
  damage = new Number(),
  speed = new Number(),
  skills = new Array()
) {
  let player = {
    name: name,
    maxHp: hp,
    hp: 3,
    imgSrc: img,
    img: new Image(),
    weapons: [],
    tools: [],
    materials: {},
    defense: defense,
    damage: damage,
    speed: speed,
    skills: skills,
    specialCooldown: 0,
    type: "player",
    effects: {},
  };
  player.img.src = player.imgSrc;
  return player;
}

function createEnemy(
  addToArray = new Boolean(),
  name = new String(),
  hp = new Number(),
  img = new String(),
  defense = new Number(),
  damage = new Number(),
  speed = new Number(),
  skills = new Array(4),
  moves = new Array(6)
) {
  let enemy = {
    name: name,
    maxHp: hp,
    hp: hp,
    imgSrc: img,
    img: new Image(),
    defense: defense,
    damage: damage,
    speed: speed,
    skills: skills,
    specialCooldown: 0,
    type: "enemy",
    moves: moves,
    effects: {},
  };
  enemy.img.src = enemy.imgSrc;
  if (addToArray) {
    allEnemys.push(enemy);
  } else {
    return enemy;
  }
}

//event handling

function update(updateFunction) {
  updateFunction();
}

function checkIfDead() {
  for (let i = 0; i < turnOrder.length; i++) {
    let currentObject = turnOrder[i];
    if (currentObject.type == "player" && currentObject.hp <= 0) {
      alert("you died");
      location.reload();
    } else if (currentObject.type == "enemy" && currentObject.hp <= 0) {
      turnOrder.splice(i);
      enemyDrops(currentObject);
      difficulty += 1;
      newEnemy(false);
    }
  }
}

function newEnemy(heal = new Boolean()) {
  turnOrder.push(getEnemy(false, null, 0));
}

function getEnemy(
  useName = new Boolean(),
  name = new String(),
  index = new Number()
) {
  let foundItem = false;
  for (let i = 0; i < allEnemys.length; i++) {
    if (useName) {
      if (name == allEnemys[i].name) {
        foundItem = true;
      }
    } else {
      if (index == i) {
        foundItem = true;
      }
    }
    if (foundItem) {
      let enemy = createEnemy(
        false,
        allEnemys[i].name,
        allEnemys[i].hp,
        allEnemys[i].imgSrc,
        allEnemys[i].defense,
        allEnemys[i].damage,
        allEnemys[i].speed,
        allEnemys[i].skills,
        allEnemys[i].moves
      );

      return enemy;
    }
  }
}

function applyEffect(
  name = "",
  target = turnOrder[currentTurn],
  description = "",
  onBeginTurn = function () {},
  beforeAttack = function () {},
  onAttackEnd = function () {},
  onDamageTaken = function () {}
) {
  let effect = {};
  effect.onBeginTurn = onBeginTurn;
  effect.beforeAttack = beforeAttack;
  effect.onAttackEnd = onAttackEnd;
  effect.onDamageTaken = onDamageTaken;
  target.effects[name] = effect;
}

createEnemy(
  true,
  "boring enemy",
  100,
  "assets/enemy.png",
  10,
  10,
  2,
  {
    basic: 2,
    stealth: 3,
    heavy: 1,
    range: 1,
  },
  [assignMove("round kick", false, null, false)]
);
