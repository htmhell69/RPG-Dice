//base move
let allMoves = [];
function moveConstructor(
  addToArray = new Boolean(),
  name = new String(),
  type = new String(),
  damage = new Number(),
  accuracy = new Number(),
  cooldown = new Number(),
  Initilization = function () {},
  TurnStart = function () {},
  beforeAttack = function () {},
  BeforeStrike = function (target) {},
  AfterStrike = function (target, hit, damage) {
    if (hit) {
      addLog(
        turnOrder[currentTurn].name,
        "dealt " + damage + " damage to " + target.name
      );

      addLog(currentTarget.name, "current hp is " + currentTarget.hp);
    }
  },
  OnDamageTaken = function () {}
) {
  newMove = {
    name: name,
    type: type,
    justUsed: 0,
    damage: damage,
    accuracy: accuracy,
    initilization: Initilization,
    onBeginTurn: TurnStart,
    beforeAttack: beforeAttack,
    beforeStrike: BeforeStrike,
    afterStrike: AfterStrike,
    onDamageTaken: OnDamageTaken,
    cooldown: cooldown,
  };

  if (addToArray) {
    allMoves.push(newMove);
  } else {
    return newMove;
  }
}

//function to give the player a certain weapon
function assignMove(moveName, give = false, reciever, log = false) {
  for (let i = 0; i < allMoves.length; i++) {
    if (moveName == allMoves[i].name) {
      moveIndex = allMoves[i];
      let move = moveConstructor(
        false,
        allMoves[i].name,
        allMoves[i].type,
        allMoves[i].damage,
        allMoves[i].accuracy,
        allMoves[i].cooldown,
        allMoves[i].initilization,
        allMoves[i].onBeginTurn,
        allMoves[i].beforeStrike,
        allMoves[i].afterStrike,
        allMoves[i].onDamageTaken
      );
      if (give) {
        if (log) {
          addLog(reciever.name, "was assigned the move " + moveName);
        }
        move.initilization();
        reciever.moves.push(move);
      } else {
        return move;
      }
    }
  }
}

//create generic weapon
moveConstructor(true, "ram", "basic", 15, 4, 0);

moveConstructor(
  true,
  "patience",
  "basic",
  0,
  4,
  0,
  function () {},
  function () {},
  function () {
    if (this.justUsed > 0) {
      speed -= 2;
    }
  },
  function (target, hit) {},
  function () {
    speed += 1;
  }
);

//create complex item

//special initilization
