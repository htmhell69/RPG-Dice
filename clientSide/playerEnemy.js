//this js file creates the functions needed to make the player/enemy objects
function createPlayer(name, hp, img, defense, attack) {
  let player = {
    name: name,
    maxHp: hp,
    hp: 3,
    imgSrc: img,
    img: new Image(),
    weapons: [],
    materials: {},
    defense: defense,
    attack: attack,
    specialCooldown: 0,
    type: "player",
  };
  player.img.src = player.imgSrc;
  return player;
}

function createEnemy(name, hp, img, defense, attack) {
  let enemy = {
    name: name,
    maxHp: hp,
    hp: hp,
    imgSrc: img,
    img: new Image(),
    defense: defense,
    attack: attack,
    type: "enemy",
  };
  enemy.img.src = enemy.imgSrc;
  return enemy;
}

//event handling

function update() {
  checkIfDead();
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
      newEnemy();
    }
  }
}

function enemyDrops(object) {}

function newEnemy() {
  Enemy = createEnemy("boring enemy", 100, "assets/enemy.png", 10, 10);
  turnOrder.push(Enemy);
}
