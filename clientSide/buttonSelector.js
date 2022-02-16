let container = document.querySelector(".menu");
let save = document.querySelector(".save");
let log = document.querySelector(".log-content");

//this starts up the attack selectors
function attackMenu() {
  if (turnOrder[currentTurn].type == "player") {
    let weapons = turnOrder[currentTurn].weapons;
    removeButton();
    //back
    let button = document.createElement("button");
    let buttonText = document.createTextNode("Back");
    button.style.width = "100%";
    button.style.height = "15%";
    button.style.fontSize = "90%";
    button.style.backgroundColor = "orange";

    button.appendChild(buttonText);
    button.className = "button";
    button.id = "back";
    container.appendChild(button);
    $("#back").click(startMenu);
    $("#back").mouseover(description);

    for (let i = 0; i < weapons.length; i++) {
      button = document.createElement("button");
      buttonText = document.createTextNode(weapons[i].name);
      button.style.width = "100%";
      button.style.height = "15%";
      button.style.fontSize = "90%";
      button.appendChild(buttonText);
      button.id = i;
      button.className = "button";
      container.appendChild(button);
      document.getElementById(i).addEventListener("click", startAttack);
      $("#" + i).click(startAttack);
      $("#" + i).mouseover(description);
    }
  }
}

//this shows you the attacks you can preform with that weapon
function weaponMenu(weapon) {
  removeButton();
  let normal = weapon.normal;
  let special = weapon.special;
  //normal button
  let button = document.createElement("button");
  let buttonText = document.createTextNode(normal.name);
  button.style.width = "100%";
  button.style.height = "40%";
  button.style.fontSize = "90%";
  button.id = "normal";
  button.className = "button";
  button.appendChild(buttonText);
  container.appendChild(button);
  $("#normal").click(runAttack);
  $("#normal").mouseover(description);

  //special
  button = document.createElement("button");
  buttonText = document.createTextNode(special.name);
  button.style.width = "100%";
  button.style.height = "40%";
  button.style.fontSize = "90%";
  button.id = "special";
  button.className = "button2";
  button.appendChild(buttonText);
  container.appendChild(button);
  $("#special").click(runAttack);
  $("#special").mouseover(description);
}

function removeButton() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function startMenu() {
  beginTurn();
  gameStart = true;
  removeButton();
  //shop
  let button = document.createElement("button");
  let buttonText = document.createTextNode("Shop");
  button.style.width = "100%";
  button.style.height = "40%";
  button.style.fontSize = "90%";
  button.style.fontWeight = "bold";
  button.id = "shop";
  button.className = "button";
  button.appendChild(buttonText);
  container.appendChild(button);
  $("#shop").click(removeButton);
  $("#shop").mouseover(description);

  //attack button
  button = document.createElement("button");
  buttonText = document.createTextNode("Attack");
  button.style.width = "100%";
  button.style.height = "40%";
  button.style.fontSize = "90%";
  button.style.fontWeight = "bold";
  button.id = "attack";
  button.className = "button";
  button.appendChild(buttonText);
  container.appendChild(button);
  $("#attack").click(attackMenu);
  $("#attack").mouseover(description);
}

function saveMenu() {
  removeButton();
  //load save data button
  let button = document.createElement("button");
  let buttonText = document.createTextNode("Load Save");
  button.style.width = "100%";
  button.style.height = "40%";
  button.style.fontSize = "90%";
  button.style.fontWeight = "bold";
  button.id = "load";
  button.className = "button";
  button.appendChild(buttonText);
  container.appendChild(button);
  $("#load").click(readSaveData);
  $("#load").mouseover(description);
  //new game
  button = document.createElement("button");
  buttonText = document.createTextNode("New Game");
  button.style.width = "100%";
  button.style.height = "40%";
  button.style.fontSize = "90%";
  button.style.fontWeight = "bold";
  button.id = "new";
  button.className = "button";
  button.appendChild(buttonText);
  container.appendChild(button);
  $("#new").click(singlePlayer);
  $("#new").mouseover(description);
}
//online menus
function onlineMenu() {
  document.body.innerHTML = "";
  document.body.innerHTML = "<img src='assets/online.png' class='cloud'>";
}

function addLog(source, message) {
  log.append(source + ": " + message);
}

document
  .getElementById("saveGame")
  .addEventListener("click", createNewSaveData);
$(".online").click(onlineMenu);
saveMenu();
