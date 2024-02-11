let Game = {
    name: "",
    champ: "",
    lch: "",
    year: "",
    country: ""
}
function req() {
    Game.name = document.getElementById("name").value;
    Game.year = document.getElementById("year").value;
    Game.lch = document.getElementById("lch").value;
    Game.champ = document.getElementById("chemp").value;
    Game.country = document.getElementById("country").value;

    var json = JSON.stringify(Game)
    var xhr=new XMLHttpRequest()
    var url ="hello-servlet"
    xhr.open("POST",url,true)
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange=function (){
        if(xhr.readyState==XMLHttpRequest.DONE){
            console.log(xhr.responseText)
        }
    }
    xhr.send(json)
}