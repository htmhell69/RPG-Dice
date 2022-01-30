let currentWeapon;
let currentTarget;
function startAttack(event){
    if(turnOrder[currentTurn].type == "player"){
        if(turnOrder.length > currentTurn + 1){
            let attackId = parseInt(event.target.id,36);
            if(turnOrder.length == 2){
                alert(attackId);
                currentWeapon = turnOrder[currentTurn].weapons[attackId];
                currentTarget = turnOrder[currentTurn + 1];
                weaponMenu(currentWeapon);
            }
        }
    }
  }

  function runAttack(event){
      if(event.target.id == "normal"){
        currentTarget.hp -= currentWeapon.normal.damage;
      } else if(event.target.id == "special"){
        
      }
  }