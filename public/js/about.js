var art =   document.getElementById("art-container");
var modules = document.getElementById("modules-container");
var information = document.getElementById("information-container");











function typeWriterA() {
    var a = 0;
    var avalue = art.innerHTML;
    var aarr = avalue.split(' ');
    var alength = 0;
    for(var i in aarr){
        alength += aarr[i].length
    }
    if (a < alength) {
      art.innerHTML += txt.charAt(a);
      a++;
      setTimeout(typeWriter, speed);
    }
    art.style.display = "block";
    modules.style.display = "none";
    information.style.display = "none";
  }

  function typeWriterM() {
    var b = 0;
    var mvalue = modules.innerHTML;
    var marr = mvalue.split(' ');
    var mlength = 0;
    for(var j in marr){
        mlength += aarr[j].length
    }
    if (b < mlength) {
      modules.innerHTML += txt.charAt(b);
      b++;
      setTimeout(typeWriter, speed);
    }
    art.style.display = "none";
    modules.style.display = "block";
    information.style.display = "none";
  }

  function typeWriterI() {

var c = 0;
var ivalue = information.innerHTML;
var iarr = ivalue.split(' ');
var ilength = 0;
for(var k in aarr){
    ilength += iarr[k].length
}

    if (c < ilength) {
      modules.innerHTML += txt.charAt(c);
      c++;
      setTimeout(typeWriter, speed);
    }
    art.style.display = "none";
    modules.style.display = "none";
    information.style.display = "block";
  }

