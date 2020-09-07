var modal = document.getElementById("makenew");
var btn = document.getElementById("addnew");
var ers = document.getElementById("filter");
var span = document.getElementsByClassName("close")[0];


// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";

    ers.style.display = "block";
  }


  
span.onclick = function() {
    modal.style.display = "none";
    ers.style.display = "none";

  }

 /* window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  } */