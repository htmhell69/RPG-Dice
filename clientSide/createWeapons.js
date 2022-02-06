//base weapon
let allWeapons = [];
function weaponConstructor(addToArray,name,type,img,normalName, normalDamage, normalDescription, specialName, specialDamage, cooldown, specialDescription, 
    normalInitilization = function(){}, normalTurnStart = function(){}, normalBeforeStrike = function(){}, normalAfterStrike = function(){}, 
    specialInitilization = function(){}, specialTurnStart = function(){}, specialBeforeStrike = function(){}, specialAfterStrike = function(){}, )
    {
    newWeapon = {
        name: name,
        type: type,
        imgSrc: img,
        img: new Image(),
        justUsed: false,
        normal: {
            name: normalName,
            damage: normalDamage,
            description: normalDescription,
            initilization: normalInitilization,
            onBeginTurn: normalTurnStart,
            beforeStrike: normalBeforeStrike,
            afterStrike: normalAfterStrike
            
        },

        special: {
            name: specialName,
            damage: specialDamage,
            cooldown: cooldown,
            description: specialDescription,
            initilization: specialInitilization,
            onBeginTurn: specialTurnStart,
            beforeStrike: specialBeforeStrike,
            afterStrike: specialAfterStrike
        }

        
    }
        newWeapon.img.src = newWeapon.imgSrc;   

        if(addToArray){
            allWeapons.push(newWeapon);
        } else{
            return newWeapon;
        }
    
}


//function to give the player a certain weapon
function getWeapon(name){
    for (let i=0; i < allWeapons.length; i++){
        if(name == allWeapons[i].name){
            weaponIndex = allWeapons[i];
            let Weapon = weaponConstructor(false, weaponIndex.name, weaponIndex.type, weaponIndex.imgSrc, weaponIndex.normal.name, weaponIndex.normal.damage, weaponIndex.normal.description,
                weaponIndex.special.name,weaponIndex.special.damage,weaponIndex.special.cooldown,weaponIndex.special.description,weaponIndex.normal.initilization,weaponIndex.normal.onBeginTurn,
                weaponIndex.normal.beforeStrike,weaponIndex.normal.afterStrike,weaponIndex.special.initilization,weaponIndex.special.onBeginTurn,weaponIndex.special.beforeStrike,weaponIndex.special.afterStrike
                );
            Weapon.normal.initilization();
            Weapon.special.initilization();
            return Weapon;
        }
    }
}




//create generic weapon
weaponConstructor(true,"generic","none","assets/item.png", "normal", 10, "10 damage", "special", 20, 2, "20 damage 2 turn cooldown", function(){}, function(){},
function(){
    alert("generic weapon is running normal attack");
});

//create complex item
weaponConstructor(true, "complex","none","assets/item.png", "normal", 10, "10 damage", "special", 20, 3, "20 damage 3 turn cooldown", function(){}, function(){},function(){});
//special initilization


