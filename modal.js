var modal = document.getElementById("modal-signup");
var modal2 = document.getElementById("modal-login");

// Get the button that opens the modal
var btn = document.getElementById("signup");
var btn2 = document.getElementById("login");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal

btn.onclick = function() {
  modal.style.display = "block";
  modal.preventDefault()
}
btn2.onclick = function() {
    modal2.style.display = "block";
    
  }



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}