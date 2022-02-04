


function createNewSaveData(){
    
    if (typeof(Storage) !== "undefined") {
        localStorage = setItem("entities", turnOrder);
    } else {
        alert("We are sorry for the inconvenience your browser will not allow us to save your game");
    }

}

function readSaveData(){
    alert(localStorage.getItem("entities"));
    
}
