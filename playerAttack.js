let currentWeapon;
let currentTarget;
function startAttack(event){
    if(turnOrder[currentTurn].type == "player"){
        if(turnOrder.length > currentTurn + 1){
            let attackId = parseInt(event.target.id,36);
            if(turnOrder.length == 2){
                currentWeapon = turnOrder[currentTurn].weapons[attackId];
                currentTarget = turnOrder[currentTurn + 1];
                weaponMenu(currentWeapon);
            }
        }
    }
  }

  function runAttack(event){
      if(event.target.id == "normal"){
        startMenu();
        currentTarget.hp -= currentWeapon.normal.damage;
        alert(currentTarget.hp);
      } else if(event.target.id == "special"){
        
      }
  }