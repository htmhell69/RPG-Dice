


function createNewSaveData(){
    
    if (typeof(Storage) !== "undefined") {
        localStorage = setItem("turns", turnOrder);
        alert(localStorage.getItem("turns"))
    } else {
        alert("We are sorry for the inconvenience your browser will not allow us to save your game");
    }

}
