
//this js file creates the functions needed to make the player/enemy objects
function createPlayer(hp, img, defense, attack){
  let player = {
    maxHp:hp,
    hp:3,
    imgSrc:img,
    img: new Image(),
    weapons: [],
    materials: {},
    defense:defense,
    attack:attack,
    specialCooldown: 0,
    type:"player"
  };
  player.img.src = player.imgSrc;
  player.weapons.push(getWeapon("generic"));
  player.weapons[0].number = 1;
  alert(player.weapons[0].number);
  alert(getWeapon("generic").number);
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




//event handling
  setInterval(update, 50);

  function update(){
    checkIfDead();
  }



  function checkIfDead(){
    for(let i=0; i<turnOrder.length; i++){
      let currentObject = turnOrder[i];
      if(currentObject.type == "player" && currentObject.hp <= 0){
        alert("you died");
        location.reload();

      } else if(currentObject.type == "enemy" && currentObject.hp <= 0){
          turnOrder.splice(i);
          enemyDrops(currentObject);
          newEnemy(currentObject);
        


        }

    }
  }


  function enemyDrops(object){

  }


  function newEnemy(){

  }









