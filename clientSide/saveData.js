function createNewSaveData() {
  if (typeof Storage !== "undefined") {
    localStorage.removeItem("entities");
    alert(localStorage.getItem("name"));
    let data = turnOrder;
    //converting the weapon object into a string name to store in localStorage
    for (let entityI = 0; entityI < data.length; entityI++) {
      if (data[entityI].type == "player") {
        for (let i = 0; i < data[entityI].weapons.length; i++) {
          data[entityI].weapons[i] = data[entityI].weapons[i].name;
        }
      }
    }

    localStorage.setItem("entities", JSON.stringify(data));
    alert(JSON.stringify(data));
    location.reload();
  } else {
    alert(
      "We are sorry for the inconvenience your browser will not allow us to save your game"
    );
  }
}

function readSaveData() {
  if (localStorage.getItem("entities") == null) {
    //if you dont have save data
    alert(
      "you do not have any save data press the save button in the left hand corner of your screen to save"
    );
  } else {
    //if you do have save data
    let data = JSON.parse(localStorage.getItem("entities"));
    for (let objectI = 0; objectI < data.length; objectI++) {
      //giving the entites their image
      addImageElement(data[objectI]);
      //giving the player their weapons image

      if (data[objectI].type == "player") {
        let weaponsToAdd = [];
        for (
          let weaponI = 0;
          weaponI < data[objectI].weapons.length;
          weaponI++
        ) {
          weaponsToAdd.push(getWeapon(data[objectI].weapons[weaponI], false));
        }

        data[objectI].weapons = weaponsToAdd;
      }
    }
    turnOrder = data;
    singlePlayer(null, false);
  }
}
