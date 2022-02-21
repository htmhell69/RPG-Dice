function checkIfName(name, password) {
  fetch("serverSide/checkIfName.php?name=" + name)
    .then((response) => response.text())
    .then((data) => {
      if (data == "true") {
        //creating error message
        let error = document.createElement("P");
        error.style.color = "red";
        error.innerHTML = "&#9888; this name already exists";
        //appending it to the div
        let div = $(".signin-text");
        div.empty();
        div.append(error);
      } else {
        createPlayerData(name, password);
      }
    });
}

function createPlayerData(name, password) {
  fetch("serverSide/addData.php?name=" + name + "&password=" + password);
  alert("successfully added player data " + name + " " + password);
}
