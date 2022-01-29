
//this js file creates the functions needed to make the player/enemy objects
function createPlayer(hp, img, defense, attack){
  let player = {
    hp:hp,
    imgSrc:img,
    img: new Image(),
    items: [],
    defense:defense,
    attack:attack,
    type:"player"
  };
  player.img.src = player.imgSrc;
  player.items.push(getWeapon("generic"));
  return player;
}

function createEnemy(hp, img, defense, attack){
  let enemy = {
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





