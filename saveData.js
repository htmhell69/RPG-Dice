

function createNewSaveData(){
    
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("entities",  turnOrder.stringify);
    } else {
        alert("We are sorry for the inconvenience your browser will not allow us to save your game");
    }

}

function readSaveData(){
    if(localStorage.getItem("entities") == null){
        alert("you do not have any save data press the save button in the left hand corner of your screen to save");
    } else{
        alert((localStorage.getItem("entities")));
        

        startMenu();
    }
    
    
}
