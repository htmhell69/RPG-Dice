
//this js file creates the functions needed to make the player/enemy objects
function createPlayer(hp, img, defense, attack){
  let player = {
    maxHp:hp,
    hp:3,
    imgSrc:img,
    img: new Image(),
    weapons: [],
    defense:defense,
    attack:attack,
    specialCooldown: 0,
    type:"player"
  };
  player.img.src = player.imgSrc;
  player.weapons.push(getWeapon("generic"));
  return player;
}

function createEnemy(hp, img, defense, attack){
  let enemy = {
    maxHp:hp,
    hp:hp,
    imgSrc: img,
    img: new Image(),
    defense: defense,
    attack: attack,
    type:"enemy"
  }
  enemy.img.src = enemy.imgSrc;
  return enemy
}





