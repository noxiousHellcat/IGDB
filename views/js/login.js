// Get the modal
var reg_modal = document.getElementById("reg_Modal");
var for_modal = document.getElementById("forgot_Modal");

var regbtn = document.getElementById("reg_mdl");
var forgbtn = document.getElementById("for_mdl");

var span_reg = document.getElementsByClassName("close1")[0];
var span_for = document.getElementsByClassName("close2")[0];


// When the user clicks the button, open the modal 
regbtn.onclick = function() {
  reg_modal.style.display = "block";
}

forgbtn.onclick = function() {
    for_modal.style.display = "block";
  }

// When the user clicks on <span> (x), close the modal
span_reg.onclick = function() {
  reg_modal.style.display = "none";
}

span_for.onclick = function() {
    for_modal.style.display = "none";
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