function createNewSaveData() {
  let data = turnOrder;

  //converting the weapon object into a string name to store in localStorage
  for (let entityI = 0; entityI < data.length; entityI++) {
    if (data[entityI].type == "player") {
      for (let i = 0; i < data[entityI].weapons.length; i++) {
        data[entityI].weapons[i] = data[entityI].weapons[i].name;
      }
    }
  }

  fetch(
    "serverSide/addData.php?save=" +
      JSON.stringify(data) +
      "&type=save" +
      "&name=" +
      sessionStorage.getItem("name") +
      "&password=" +
      sessionStorage.getItem("password")
  );
  alert(JSON.stringify(data));
}

function readSaveData() {
  //if you dont have save data
  fetch(
    "serverside/readData.php?name=" +
      sessionStorage.getItem("name") +
      "&password=" +
      sessionStorage.getItem("password")
  )
    .then((response) => response.json())
    .then((data) => {
      let save = data.SAVE1;
      alert(save);
      for (let objectI = 0; objectI < save.length; objectI++) {
        //giving the entites their image
        addImageElement(save[objectI]);
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
    })
    .catch((error) => {
      console.log(error);
    });

  //if you do have save data
}
