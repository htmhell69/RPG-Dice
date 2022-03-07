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
  let Tool = {
    name: name,
    imgSrc: img,
    img: new Image(),
    type: type,
    modifier: modifier,
    onUse: onUse,
  };

  Tool.img.src = Tool.imgSrc;

  if (addToArray == true) {
    allTools.push(Tool);
  } else {
    return Tool;
  }
}
