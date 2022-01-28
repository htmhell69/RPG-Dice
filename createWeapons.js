//base weapon
let allWeapons = [];
function createWeapon(name,type,damage, description){
    Weapon = {
        name: name,
        type: type,
        damage: damage,
        description: description

    }

    allWeapons.push(Weapon);
}


//function to give the player a certain weapon
function getWeapon(name){
    for (let i=0; i < allWeapons.length; i++){
        if(name == allWeapons[i].name){
            return allWeapons[i];
        }
    }
}

//create generic weapon
createWeapon("generic", "none", 10, "generic");


