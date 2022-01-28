function runAttack(event){
    if(turn == "player"){
        turn = "enemy";
        let attack = parseInt(event.target.id,36);
        alert(attack + 1);
    }
  }