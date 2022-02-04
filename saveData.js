

function createNewSaveData(){
    
    if (typeof(Storage) !== "undefined") {
        alert("yes");
        localStorage.clear();
        localStorage.setItem("entities",  JSON.stringify(turnOrder));
        alert(JSON.stringify(turnOrder));
    } else {
        alert("We are sorry for the inconvenience your browser will not allow us to save your game");
    }

}

function readSaveData(){
    if(localStorage.getItem("entities") == null){ //if you dont have save data
        alert("you do not have any save data press the save button in the left hand corner of your screen to save");
    } else{ //if you do have save data
        let data = JSON.parse(localStorage.getItem("entities"));
        for(let objectI =0; objectI<data.length; objectI++){
            //giving the entites their image
            addImageElement(data[objectI]);
            //giving the player there weapons image
            if(data[objectI].type == "player"){
                for (let weaponI=0; weaponI<data[objectI].weapons.length; weaponI++){
                    addImageElement(data[objectI].weapons[weaponI]);
                }
                    
            }
        }
        turnOrder = data;
        startMenu();
    }
    
    
}
