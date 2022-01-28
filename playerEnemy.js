let turnOrder = [];
//this js file creates the functions needed to make the player/enemy objects
function createPlayer(hp, img, defense, attack){
  let player = {
    hp:hp,
    img:img,
    items: [],
    defense:defense,
    attack:attack
  };
  player.items.push(getWeapon("generic"));
  return player;
}

function createEnemy(hp, img, defense, attack){
  let Enemy = {
    hp:hp,
    img:img,
    defense,defense,
    attack,attack
  }
  return Enemy
}





