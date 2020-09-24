var art =   document.getElementById("art-container");
var modules = document.getElementById("modules-container");
var information = document.getElementById("information-container");

var artbtn = document.getElementById("button-art");
var modbtn = document.getElementById("button-modules");
var infbtn = document.getElementById("button-information");


function typeWriterA() {
    modbtn.style.backgroundImage = "";
    infbtn.style.backgroundImage = "";
    art.style.display = "block";
    artbtn.style.backgroundColor = "#0000";
    artbtn.style.backgroundImage = "radial-gradient(circle, #ffffff 12%, transparent 10%), radial-gradient(circle, #ffffff 12%, transparent 10%)";
    artbtn.style.backgroundSize =  "10px 10px";
    artbtn.style.backgroundPosition =  "0 0, 50px 50px";

    modules.style.display = "none";
    information.style.display = "none";
  }

  function typeWriterM() {
    artbtn.style.backgroundImage = "";
    infbtn.style.backgroundImage = "";
    modbtn.style.backgroundColor = "#0000";
    modbtn.style.backgroundImage = "radial-gradient(circle, #ffffff 12%, transparent 10%), radial-gradient(circle, #ffffff 12%, transparent 10%)";
    modbtn.style.backgroundSize =  "10px 10px";
    modbtn.style.backgroundPosition =  "0 0, 50px 50px";

    art.style.display = "none";
    modules.style.display = "block";
    information.style.display = "none";
  }

  function typeWriterI() {
    modbtn.style.backgroundImage = "";
    artbtn.style.backgroundImage = "";
    infbtn.style.backgroundColor = "#0000";
    infbtn.style.backgroundImage = "radial-gradient(circle, #ffffff 12%, transparent 10%), radial-gradient(circle, #ffffff 12%, transparent 10%)";
    infbtn.style.backgroundSize =  "10px 10px";
    infbtn.style.backgroundPosition =  "0 0, 50px 50px";

    art.style.display = "none";
    modules.style.display = "none";
    information.style.display = "block";
  }

