let container = document.getElementById('container')

toggle = () => {
	container.classList.toggle('sign-in')
	container.classList.toggle('sign-up')
}

setTimeout(() => {
	container.classList.add('sign-in')
}, 200)

document.getElementById("signinbutton").addEventListener("click", function() {
    // Call the signIn function to change the user icon
    signIn();
});

function signIn() {
    var userIcon = document.getElementById('icon');
    userIcon.src = "../../images/dog.jpg"; // Change the source to the signed-in user icon image path
}
function loadFile(event) {
	var reader = new FileReader();
	reader.onload = function(){
	  var output = document.getElementById('profilePic');
	  output.src = reader.result;
	};
	reader.readAsDataURL(event.target.files[0]);
  }
  
  document.querySelector('.form.sign-in button').addEventListener('click', function() {
	setTimeout(function() {
	  document.getElementById('popup-1').classList.add('active');
	}, 2000); 
  });
  