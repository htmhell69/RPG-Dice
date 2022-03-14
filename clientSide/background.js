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

function createBackground(
  addToArray = false,
  name = "",
  img = new Image(),
  lootTable = {}
) {
  let newBackground = {
    name: name,
    imgSrc: img,
    img: new Image(),
    lootTable: lootTable,
  };
  newBackground.img.src = img;
  if (addToArray) {
    allBackgrounds.push(newBackground);
  } else {
    return newBackground;
  }
}

function harvest(useTool = false, tool = {}) {
  let lootTable;
  if (useTool) {
    lootTable = background.lootTable[tool.type];
    for (let resource in lootTable) {
      if (Math.random() <= lootTable[resource].chance) {
        let max = lootTable[resource].max + tool.modifier;
        let min = lootTable[resource].min + Math.floor(tool.modifier / 2);
        let amount = Math.floor(Math.random() * (max - min + 1)) + min;
        getMaterial(resource, turnOrder[currentTurn], amount);
      }
    }
  } else {
    lootTable = background.lootTable["none"];
    for (let resource in lootTable) {
      if (Math.random() <= lootTable[resource].chance) {
        let max = lootTable[resource].max;
        let min = lootTable[resource].min;
        let amount = Math.floor(Math.random() * (max - min + 1)) + min;
        getMaterial(resource, turnOrder[currentTurn], amount);
      }
    }
  }
}

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
        addToInventory(
          "resources",
          allMaterials[i].img,
          allMaterials[i].description,
          "set",
          amount,
          allMaterials[i].name
        );
      } else {
        reciever.materials[material] += amount;
        addToInventory(
          "resources",
          allMaterials[i].img,
          allMaterials[i].description,
          "modify",
          amount,
          allMaterials[i].name
        );
      }
    }
  }
}

createBackground(true, "forest", "assets/forestBackground.png", {
  none: {},
  axe: {
    wood: { chance: 0.2, min: 1, max: 3 },
  },
  shovel: {},
  hoe: {},
  pickaxe: {
    metal: { chance: 75, min: 1, max: 3 },
    fineMetal: { chance: 25, min: 1, max: 2 },
  },
});
background = setBackground(false, "forest");

createMaterial(true, "wood", "assets/logResource.png", "wood");
createMaterial(true, "fineMetal", "assets/fineMetalResource.png", "fineMetal");
createMaterial(true, "metal", "assets/scrapMetalResource.png", "metal");
