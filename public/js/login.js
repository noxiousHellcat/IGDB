// Get the modal
var reg_modal = document.getElementById("register");
var for_modal = document.getElementById("forgot");

var regbtn = document.getElementById("reg_mdl");
var forgbtn = document.getElementById("for_mdl");

// When the user clicks the button, open the modal 
regbtn.onclick = function() {
  reg_modal.style.display = "block";
  reg_modal.style.animation = "fadeIn 1s";
  for_modal.style.display = "none";
  
}

forgbtn.onclick = function() {
    for_modal.style.display = "block"
    for_modal.style.animation = "fadeIn 1s";
    reg_modal.style.display = "none";
  }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == reg_modal) {
    reg_modal.style.display = "none";
  }
  if (event.target == for_modal) {
    for_modal.style.display = "none";
  }
}