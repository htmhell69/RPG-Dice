var background;
var allBackgrounds = [];

function setBackground(random, name) {
  if (random == true) {
  } else {
    for (let i = 0; i < allBackgrounds.length; i++) {
      if (allBackgrounds[i].name == name) {
        document.getElementById("body").style.backgroundImage =
          "url('" + allBackgrounds[i].imgSrc + "'";

        return allBackgrounds[i];
      }
    }
  }
}

function createBackground(addToArray, name, img) {
  let newBackground = {
    name: name,
    imgSrc: img,
    img: new Image(),
  };
  newBackground.img.src = img;
  if (addToArray) {
    allBackgrounds.push(newBackground);
  } else {
    return newBackground;
  }
}

function harvest() {
  alert("you harvested");
}

createBackground(true, "forest", "assets/forestBackground.png");
background = setBackground(false, "forest");

var allMaterials = [];

function createMaterial(addToArray, name, img, description) {
  let newMaterial = {
    name: name,
    imgSrc: img,
    img: new Image(),
    description: description,
  };
  newMaterial.img.src = newMaterial.imgSrc;
  if (addToArray) {
    allMaterials.push(newMaterial);
  } else {
    return newMaterial;
  }
}

function getMaterial(material, reciever, amount) {
  for (let i = 0; i < allMaterials.length; i++) {
    if (allMaterials[i].name == material) {
      if (reciever.materials[material] == undefined) {
        reciever.materials[material] = amount;
      } else {
        reciever.materials[material] += amount;
      }
      addToInventory(
        "resources",
        allMaterials[i].img,
        allMaterials[i].description,
        "set",
        amount,
        allMaterials[i].name
      );
    }
  }
}

createMaterial(true, "wood", "assets/logResource.png", "wood");
createMaterial(true, "fineMetal", "assets/fineMetalResource.png", "fineMetal");
createMaterial(true, "metal", "assets/scrapMetalResource.png", "metal");
