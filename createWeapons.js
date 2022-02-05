//base weapon
let allWeapons = [];
function createWeapon(name,type,img,normalName, normalDamage, normalDescription, specialName, specialDamage, cooldown, specialDescription, 
    normalInitilization = function(){}, normalTurnStart = function(){}, normalBeforeStrike = function(){}, normalAfterStrike = function(){}, 
    specialInitilization = function(){}, specialTurnStart = function(){}, specialBeforeStrike = function(){}, specialAfterStrike = function(){}, )
    {


    Weapon = {
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
    Weapon.img.src = Weapon.imgSrc;
    allWeapons.push(Weapon);
}


//function to give the player a certain weapon
function getWeapon(name){
    for (let i=0; i < allWeapons.length; i++){
        if(name == allWeapons[i].name){
            allWeapons[i].normal.initilization();
            allWeapons[i].special.initilization();
            return allWeapons[i];
        }
    }
}

//create generic weapon
createWeapon("generic","none","assets/item.png", "normal", 10, "10 damage", "special", 20, 2, "20 damage 2 turn cooldown", function(){}, function(){},
function(){
    alert("generic weapon is running normal attack");
});

//create complex item
createWeapon("complex","none","assets/item.png", "normal", 10, "10 damage", "special", 20, 3, "20 damage 3 turn cooldown", function(){}, function(){},function(){});
//special initilization



