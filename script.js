let container = document.querySelector(".container");

function add(){
  let button = document.createElement("button");
  let buttonText = document.createTextNode("submit");
  button.appendChild(buttonText); 
  button.id="mybutton";
  container.appendChild(button);
  document.getElementById("mybutton").addEventListener("click", add);
}

function rmv(){
  Array.from(document.querySelectorAll('button')).forEach(function (button) {
	button.remove();
});
}

document.getElementById("add").addEventListener("click", add);
document.getElementById("rmv").addEventListener("click", rmv);
