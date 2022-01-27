let container = document.querySelector(".buttons");
let attacks = ["strike", "strongStrike","normalAttack"]


function attackMenu(event){
  rmvBtn();
  for(let i=0; i<attacks.length; i++){
  var button = document.createElement("button");
  var buttonText = document.createTextNode(attacks[i]);
  button.appendChild(buttonText); 
  button.id=i;
  container.appendChild(button);
  document.getElementById(i).addEventListener("click", runAttack);
  }
}

function runAttack(event){
  var attack = parseInt(event.target.id);
  alert(attack + 1);
}



function removeBtn(){
  Array.from(document.querySelectorAll('button')).forEach(function (button) {
	button.remove();
});
}



document.getElementById("add").addEventListener("click", attackMenu);
document.getElementById("remove").addEventListener("click", removeBtn);
