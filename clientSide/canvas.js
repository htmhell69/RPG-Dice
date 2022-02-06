var width;
var height;
var placements;
var hpBarSize;
var hpGone;
var hpRatio;
var numDice = 1;
var oldWindowWidth = window.innerWidth;
var oldWindowHeight = window.innerHeight;
var gameStart = false;
setInterval(resizingCanvas, 10);

function resizingCanvas(){
   if(gameStart){
      if(oldWindowWidth != canvas.width || Math.floor(oldWindowHeight/1.5) != canvas.height/1.5){
         oldWindowWidth = window.innerWidth;
         oldWindowHeight = window.innerHeight;
         width = (window.innerWidth/(turnOrder.length + 0.5)  + window.innerHeight/(turnOrder.length + 0.5))/2;
         height = (window.innerWidth/(turnOrder.length) + window.innerHeight/(turnOrder.length))/2;
         canvas.height = window.innerHeight/1.5;
         canvas.width = window.innerWidth;
         hpBarSize = width - 100;
         getPosition(turnOrder.length);
      }
    
   
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

}

setInterval(resizingDieCanvas, 10);
function resizingDieCanvas(){
   if(gameStart){
      if(oldWindowWidth != dieCanvas.width || Math.floor(oldWindowHeight/1.5) != dieCanvas.height){
         oldWindowWidth = window.innerWidth;
         oldWindowHeight = window.innerHeight;
         dieCanvas.height = window.innerHeight/1.5;
         dieCanvas.width = window.innerWidth;
         for(let i=0; i<Dice.length; i++)
            Dice[i].x = window.window.innerWidth/2 - i *200;
      }
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

function addImageElement(Object){
    Object.img = new Image();
    Object.img.src = Object.imgSrc;
}

