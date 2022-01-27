let container = document.querySelector(".buttons");
let attacks = ["strike", "strongStrike","normalAttack"]

//this starts up the attack selectors
function attackMenu(event){
  removeButton();
  for(let i=0; i<attacks.length; i++){
  var button = document.createElement("button");
  var buttonText = document.createTextNode(attacks[i]);
  button.appendChild(buttonText); 
  button.id = i;
  container.appendChild(button);
  document.getElementById(i).addEventListener("click", runAttack);
  }
}

//this function runs the attack you chose
function runAttack(event){
  let attack = parseInt(event.target.id,36);
  alert(attack + 1);
}



function removeButton(){
  Array.from(document.querySelectorAll('button')).forEach(function (button) {
	button.remove();
});
}


document.getElementById("add").addEventListener("click", attackMenu);
document.getElementById("remove").addEventListener("click", removeButton);
