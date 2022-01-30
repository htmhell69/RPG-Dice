var turnOrder = [];
var currentTurn = 0;
var Enemy;
var enemyImage;
var player = createPlayer(10, "assets/player.png", 10, 10);
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

turnOrder.push(player);
function checkIfNoEnemy(){
    if(turnOrder.length < 2){
        Enemy = createEnemy(100, "assets/enemy.png" , 10, 10);
        turnOrder.push(Enemy);   
    } 
}

setInterval(checkIfNoEnemy, 50);
checkIfNoEnemy();





