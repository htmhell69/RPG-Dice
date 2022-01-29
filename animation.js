setInterval(resizingCanvas, 10);
function resizingCanvas(){
   let width = (window.innerWidth/3 + window.innerHeight/3)/2;
   let height = (window.innerWidth/2 + window.innerHeight/2)/2;
   canvas.height = window.innerHeight/1.5;
   canvas.width = window.innerWidth;
   ctx.drawImage(Enemy.img, window.innerWidth-window.innerWidth/3.5 - 10, 10, width, height);
   ctx.drawImage(player.img, 10, 10, width, height);
}
