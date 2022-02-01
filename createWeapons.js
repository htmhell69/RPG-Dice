//base weapon
let allWeapons = [];
function createWeapon(name,type,img,normalName, normalDamage, normalDescription, specialName, specialDamage, cooldown, specialDescription){
    Weapon = {
        name: name,
        type: type,
        imgSrc: img,
        img: new Image(),

        normal: {
            name: normalName,
            damage: normalDamage,
            description: normalDescription
        },

        special: {
            name: specialName,
            damage: specialDamage,
            cooldown: cooldown,
            description: specialDescription
        }

        
    }
    Weapon.img.src = Weapon.imgSrc;
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
createWeapon("generic","none","assets/item.png", "normal", 10, "10 damage", "special", 20, 2, "20 damage 2 turn cooldown");


