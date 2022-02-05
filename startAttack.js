var turnOrder = [];
var currentTurn = 0;
var Enemy;
var enemyImage;







var player = createPlayer(100, "assets/player.png", 0, 0);
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var dieCanvas = document.getElementById("dieCanvas");
var dieCtx = dieCanvas.getContext("2d");

turnOrder.push(player);


function checkIfNoEnemy(){
    if(turnOrder.length < 2){
        Enemy = createEnemy(100, "assets/enemy.png" , 10, 10);
        turnOrder.push(Enemy);   
    } 
}

function beginTurn(){
    let entity = turnOrder[currentTurn];
    if(entity.type == "player"){
        if(entity.specialCooldown >= 1){
            entity.specialCooldown --;
        }
        for(let i=0; i<entity.weapons.length; i++){
            entity.weapons[i].normal.onBeginTurn();
            entity.weapons[i].special.onBeginTurn();
        }
    }
}



setInterval(checkIfNoEnemy, 50);
checkIfNoEnemy();






