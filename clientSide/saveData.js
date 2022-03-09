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

  grecaptcha.ready(function () {
    // do request for recaptcha token
    // response is promise with passed token
    grecaptcha
      .execute("6LfT48MeAAAAACnhcmiQY8HQpsjxjdqG-uLOPyua", {
        action: "create_comment",
      })
      .then(function (token) {
        // add token to form

        $.post("serverSide/addData.php", {
          token: token,
          save: data,
          name: playerName,
          password: playerPassword,
          type: "save",
        });
      });
  });
}
function readSaveData() {
  //if you dont have save data
  fetch(
    "serverSide/readData.php?name=" +
      sessionStorage.getItem("name") +
      "&password=" +
      sessionStorage.getItem("password")
  )
    .then((response) => response.json())
    .then((data) => {
      let save = JSON.parse(data.SAVE1);
      alert(save);
      for (let objectI = 0; objectI < save.length; objectI++) {
        //giving the entites their image
        addImageElement(save[objectI]);
        //giving the player their weapons image

        if (save[objectI].type == "player") {
          let weaponsToAdd = [];
          for (
            let weaponI = 0;
            weaponI < save[objectI].weapons.length;
            weaponI++
          ) {
            weaponsToAdd.push(getWeapon(save[objectI].weapons[weaponI], false));
          }

          save[objectI].weapons = weaponsToAdd;
        }
      }
      turnOrder = save;
      alert("i ran ");
      singlePlayer(null, false);
    })
    .catch((error) => {
      console.log(error);
    });

  //if you do have save data
}

url = new URL(window.location);
var playerName = url.searchParams.get("name");
var playerPassword = url.searchParams.get("password");
sessionStorage.setItem("name", playerName);
sessionStorage.setItem("password", playerPassword);
