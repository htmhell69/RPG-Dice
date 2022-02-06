function httpRequest() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", xhtmlLoad, false);
    xhr.open('GET', "serverSide/index.php");
    xhr.send();
}

function xhtmlLoad(xhr){
    data = xhr.target.responseText;
    alert(data);

}

httpRequest();