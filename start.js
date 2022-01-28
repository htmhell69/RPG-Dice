let turn = "player";
let player = createPlayer(10, "player.png", 10, 10);
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
//drawing player/enemy
let playerImage = new Image();
playerImage.src = "assets/player.png";
playerImage.onload = drawPlayer;

function drawPlayer(){
    ctx.drawImage(playerImage, 10, 10, 520, 520);
}



enemyImage = new Image();
enemyImage.src = "assets/enemy.png";
enemyImage.onload = drawEnemy;

function drawEnemy(){
    ctx.drawImage(enemyImage, 750, 10, 520, 520);
}


