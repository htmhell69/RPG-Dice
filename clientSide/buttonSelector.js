let container = document.querySelector(".menu");
let save = document.querySelector(".save");
//this starts up the attack selectors
function attackMenu(){
  if(turnOrder[currentTurn].type == "player"){
    let weapons = turnOrder[currentTurn].weapons;
    removeButton();
    //back
    let button = document.createElement("button");
    let buttonText = document.createTextNode("Back");
    button.style.width = "200px";
    button.style.height = "105px";
    button.style.backgroundColor = "orange";
    
    button.appendChild(buttonText); 
    button.className = "button";
    button.id = "back";
    container.appendChild(button);
    document.getElementById("back").addEventListener("click", startMenu);


    for(let i=0; i<weapons.length; i++){
      button = document.createElement("button");
      buttonText = document.createTextNode(weapons[i].name);
      weapons[i].img.style.width = "10px";
      weapons[i].img.style.height = "10px";
      button.style.width = "200px";
      button.style.height = "105px";
      button.style.backgroundImage = "url('" + weapons[i].imgSrc + "')";
      button.style.backgroundRepeat = "no-repeat";
      button.style.backgroundPosition="center";
      button.appendChild(buttonText); 
      button.id = i;
      button.className = "button";
      container.appendChild(button);
      document.getElementById(i).addEventListener("click", startAttack);
  }

    }
}

//this shows you the attacks you can preform with that weapon
function weaponMenu(weapon){
  removeButton();
  let normal = weapon.normal;
  let special = weapon.special;
  //normal button
  let button = document.createElement("button");
  let buttonText = document.createTextNode(normal.name);
  button.style.width = "290px";
  button.style.height = "150px";
  button.id = "normal";
  button.className = "button";
  button.appendChild(buttonText); 
  container.appendChild(button);
  document.getElementById("normal").addEventListener("click", runAttack);

  //special
  button = document.createElement("button");
  buttonText = document.createTextNode(special.name);
  button.style.width = "290px";
  button.style.height = "150px";
  button.id = "special";
  button.className = "button2";
  button.appendChild(buttonText); 
  container.appendChild(button);
  document.getElementById("special").addEventListener("click", runAttack);

}




function removeButton(){
  while (container.firstChild) {
    container.removeChild(container.firstChild);
}
}


function startMenu(){
  beginTurn();
  gameStart = true;
  removeButton();
  //shop
  let button = document.createElement("button");
  let buttonText = document.createTextNode("Shop");
  button.style.width = "400px";
  button.style.height = "150px";
  button.style.fontSize = "100px";
  button.id = "remove";
  button.className = "button";
  button.appendChild(buttonText); 
  container.appendChild(button);
  document.getElementById("remove").addEventListener("click", removeButton);
  
  //attack button
  button = document.createElement("button");
  buttonText = document.createTextNode("Attack");
  button.style.width = "400px";
  button.style.height = "150px";
  button.style.fontSize = "100px";
  button.id = "attack";
  button.className = "button";
  button.appendChild(buttonText); 
  container.appendChild(button);
  document.getElementById("attack").addEventListener("click", attackMenu);
}


  function saveMenu(){
    removeButton();
    //load save data button
    let button = document.createElement("button");
    let buttonText = document.createTextNode("Load Save");
    button.style.width = "400px";
    button.style.height = "150px";
    button.style.fontSize = "70px";
    button.id = "load";
    button.className = "button";
    button.appendChild(buttonText); 
    container.appendChild(button);
    document.getElementById("load").addEventListener("click", readSaveData);


    //new game
    button = document.createElement("button");
    buttonText = document.createTextNode("New Game");
    button.style.width = "400px";
    button.style.height = "150px";
    button.style.fontSize = "75px";
    button.id = "new";
    button.className = "button";
    button.appendChild(buttonText); 
    container.appendChild(button);
    document.getElementById("new").addEventListener("click", singlePlayer);
  }


  document.getElementById("saveGame").addEventListener("click", createNewSaveData);


