var des = $(".description");
var inventoryDisplay = false;
function description(event) {
  des.empty();
  let id = event.target.id;
  console.log(id);
  switch (id) {
    case "load":
      des.append(
        "<h1 font-size: 150%>Load Save:</h1>" +
          "<p> Clicking on this will start a game with the data you have saved to save data simply press Save Game in the left corner of your screen <p>"
      );
      break;
    case "new":
      des.append(
        "<h1 font-size: 150%>New Game:</h1>" +
          "<p> Clicking on this will start a fresh game doing so will not override your save data<p>"
      );
      break;
    case "shop":
      des.append(
        "<h1 font-size: 150%>Shop:</h1>" +
          "<p> The shop is where you would go if you want to buy weapons items and multiple other things now it is not finished but will be in a later update. <p>"
      );
      break;
    case "attack":
      des.append(
        "<h1 font-size: 150%>Attack:</h1>" +
          "<p> Clicking this will allow you to choose a weapon to strike with.<p>"
      );
      break;
    case "back":
      des.append(
        "<h1 font-size: 150%>Back:</h1>" +
          "<p> Clicking this will send you back to the menu you were last at<p>"
      );
      break;
    default:
      if (!isNaN(id)) {
        if (currentMenu == "weaponSelect") {
          des.append(
            "<h1>" +
              turnOrder[currentTurn].weapons[id].name +
              "</h1>" +
              "<img src=" +
              turnOrder[currentTurn].weapons[id].imgSrc +
              "><img>" +
              "<p>" +
              turnOrder[currentTurn].weapons[id].description +
              "</p>"
          );
        }
      }
  }
}

function addLog(source, message) {
  let newEntry = document.createElement("P");
  newEntry.className = "log-item";
  newEntry.innerHTML = source + ": " + message;
  log.append(newEntry);
}

function clearLogs() {
  while (log.firstChild) {
    log.removeChild(log.lastChild);
  }
}

$("#Inventory").click(function () {
  let container = document.getElementById("Inventory");
  if (turnOrder[currentTurn].type == "player") {
    if (inventoryDisplay) {
      inventoryDisplay = false;
      document.getElementById("Inventory-content").style.display = "none";
      container.removeChild(container.lastChild);
      let newEntry = document.createElement("P");
      newEntry.innerHTML = "Open Inventory";
      container.append(newEntry);
    } else {
      inventoryDisplay = true;
      document.getElementById("Inventory-content").style.display =
        "inline-block";
      container.removeChild(container.lastChild);
      let newEntry = document.createElement("P");
      newEntry.innerHTML = "Close Inventory";
      container.append(newEntry);
    }
  }
});

function addToInventory(
  inventoryGroup,
  content,
  description,
  amount = "no",
  amountNum,
  nameOfInventoryItem
) {
  let container = document.getElementsByClassName(
    "Inventory-" + inventoryGroup
  )[0];
  if (amount != "modify") {
    content.className = "Inventory-item";
    content.title = description;
    container.append(content);
  }

  if (amount == "set") {
    let text = document.createElement("p");
    text.innerHTML = "x" + amountNum;
    text.className = nameOfInventoryItem;
    text.id = amountNum;
    container.append(text);
  } else if (amount == "modify") {
    let text = document.getElementsByClassName(nameOfInventoryItem)[0];
    let newNumber = parseInt(text.id) + amountNum;
    text.id = newNumber;
    text.innerHTML = "x" + newNumber;
  }
}

function clearInventoryDiv() {
  let inventoryItems = document.getElementsByClassName("Inventory-item");
  let amountOfElements = inventoryItems.length;
  for (let i = 0; i < amountOfElements; i++) {
    inventoryItems[0].remove();
  }
}

function resetInventoryDiv(player = turnOrder[currentTurn]) {
  if (player.type == "player") {
    //putting all weapons in inventory div
    clearInventoryDiv();
    for (let i = 0; i < player.weapons.length; i++) {
      let image = new Image();
      image.src = player.weapons[i].imgSrc;
      addToInventory("weapons", image, player.weapons[i].description);
    }
    //putting all tools in inventory div
    for (let i = 0; i < player.tools.length; i++) {
      let image = new Image();
      image.src = player.tools[i].imgSrc;
      addToInventory("tools", image, player.tools[i].description);
    }
    for (const property in player.materials) {
      for (let i = 0; i < allMaterials.length; i++) {
        if (allMaterials[i].name == property) {
          addToInventory(
            "resources",
            allMaterials[i].img,
            allMaterials[i].description,
            "set",
            player.materials[property],
            property
          );
        }
      }
    }
  }
}
