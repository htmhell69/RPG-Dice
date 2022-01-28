let container = document.querySelector(".buttons");
//this starts up the attack selectors
function attackMenu(event){
  let items = player.items;
  removeButton();
  for(let i=0; i<items.length; i++){
    let button = document.createElement("button");
    let buttonText = document.createTextNode(items[i].name);
    button.appendChild(buttonText); 
    button.id = i;
    container.appendChild(button);
    document.getElementById(i).addEventListener("click", runAttack);
  }
}

//this function runs the attack you chose




function removeButton(){
  Array.from(document.querySelectorAll('button')).forEach(function (button) {
	button.remove();
});
}


document.getElementById("add").addEventListener("click", attackMenu);
document.getElementById("remove").addEventListener("click", removeButton);