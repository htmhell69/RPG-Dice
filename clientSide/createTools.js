var allTools = [];
function createTool(
  addToArray,
  name,
  img,
  type,
  modifier,
  onUse = function () {
    addLog(
      turnOrder[currentTurn].name,
      "harvested some resources what im not going to tell you what i got"
    );
  }
) {
  let newTool = {
    name: name,
    imgSrc: img,
    img: new Image(),
    type: type,
    modifier: modifier,
    onUse: onUse,
  };

  newTool.img.src = newTool.imgSrc;

  if (addToArray == true) {
    allTools.push(newTool);
  } else {
    return newTool;
  }
}

function getTool(toolName, give = true, reciever, log = true) {
  for (let i = 0; i < allTools.length; i++) {
    if (allTools[i].name == toolName) {
      let tool = new createTool(
        false,
        allTools[i].name,
        allTools[i].imgSrc,
        allTools[i].type,
        allTools[i].modifier,
        allTools[i].onUse
      );
      if (give) {
        if (log) {
          addLog(reciever.name, "got the weapon " + toolName);
        }
        reciever.tools.push(tool);
        addToInventory("tools", tool.img, tool.description);
      } else {
        return tool;
      }
    }
  }
}

createTool(true, "crappy axe", "assets/crappyAxe.png", "axe", 2);
