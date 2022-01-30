var width;
var height;
var placements;
var hpBarSize;
var hpGone;
var hpRatio;
setInterval(resizingCanvas, 10);
function resizingCanvas(){
   width = (window.innerWidth/(turnOrder.length + 0.5)  + window.innerHeight/(turnOrder.length + 0.5))/2;
   height = (window.innerWidth/(turnOrder.length) + window.innerHeight/(turnOrder.length))/2;
   canvas.height = window.innerHeight/1.5;
   canvas.width = window.innerWidth;
   hpBarSize = width - 100;
   getPosition(turnOrder.length);
   
   for(let i=0; i<turnOrder.length; i++){
      hpRatio = turnOrder[i].hp / turnOrder[i].maxHp * hpBarSize;
      ctx.drawImage(turnOrder[i].img, placements[i], 10, width, height); //the image itself
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.rect((placements[i] + width/2)  - (hpBarSize/2), 0, hpBarSize, 20);
      ctx.closePath();
      ctx.fill();
      

      ctx.beginPath();
      ctx.fillStyle = "green";
      ctx.rect((placements[i] + width/2) - (hpBarSize/2) , 0,  hpRatio, 20);
      ctx.closePath();
      ctx.fill();
      
   }

}

function getPosition(numOfPictures){
   placements = [];
   if (numOfPictures == 2){
      //first image placement
      placements.push(10);
      placements.push(window.innerWidth - (width + 10))
   }
   if (numOfPictures == 3){
      
   }


}

