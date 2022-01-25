let container = document.querySelector(".buttons");

function add(){
  let button = document.createElement("button");
  let buttonText = document.createTextNode("submit");
  button.appendChild(buttonText); 
  container.appendChild(button);
  button.onclick = add;
}

function rmv(){
  Array.from(document.querySelectorAll('button')).forEach(function (button) {
	button.remove();
});
}
