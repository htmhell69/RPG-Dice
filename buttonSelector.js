let container = document.querySelector(".buttons");
//this starts up the attack selectors
function attackMenu(event){
  if(turnOrder[currentTurn].type == "player"){
    let weapons = turnOrder[currentTurn].weapons;
    removeButton();
    for(let i=0; i<weapons.length; i++){
      let button = document.createElement("button");
      let buttonText = document.createTextNode(weapons[i].name);
      weapons[i].img.style.width = "200x";
      weapons[i].img.style.height = "105px";
      container.appendChild(weapons[i].img);
      button.style.width = "200px";
      button.style.height = "105px";
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


document.getElementById("attack").addEventListener("click", attackMenu);
document.getElementById("remove").addEventListener("click", removeButton);