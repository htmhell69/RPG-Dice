//this js file creates the functions needed to make the player/enemy objects
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
    type: "enemy",
    moves: moves,
    effects: {},
  };
  enemy.img.src = enemy.imgSrc;
  return enemy;
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

function enemyDrops(object) {}

function newEnemy(heal = new Boolean()) {
  Enemy = createEnemy(
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
    [assignMove("ram", false, null, false)]
  );
  turnOrder.push(Enemy);
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
