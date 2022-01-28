var turnOrder = [];
var Enemy;
var enemyImage;
var player = createPlayer(10, "assets/player.png", 10, 10);
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//drawing player/enemy
var playerImage = new Image();
playerImage.src = player.img;
playerImage.onload = drawPlayer;
turnOrder.push(player);


 
function checkIfNoEnemy(){
    if(turnOrder.length < 2){
        enemyImage = new Image();
        Enemy = createEnemy(100, "assets/enemy.png" , 10, 10);
        enemyImage.src = Enemy.img;
        turnOrder.push(Enemy);   
    } 
}
setInterval(checkIfNoEnemy, 50);
checkIfNoEnemy();

function drawPlayer(){
    
}



