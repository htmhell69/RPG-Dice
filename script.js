let container = document.querySelector(".buttons");

function addBtn(){
  let button = document.createElement("button");
  let buttonText = document.createTextNode("submit");
  button.appendChild(buttonText); 
  button.id="mybutton";
  container.appendChild(button);
  document.getElementById("mybutton").addEventListener("click", add);
}

function rmvBtn(){
  Array.from(document.querySelectorAll('button')).forEach(function (button) {
	button.remove();
});
}

document.getElementById("add").addEventListener("click", addBtn);
document.getElementById("rmv").addEventListener("click", rmvBtn);
