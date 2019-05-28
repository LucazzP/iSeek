var nameRegister = document.getElementById('FirstName');
var lastNameRegister = document.getElementById('LastName');
var emailRegister = document.getElementById('InputEmail');
var passwordRegister = document.getElementById('InputPassword');
var passwordRegister2 = document.getElementById('RepeatPassword');
var btnRegi = document.getElementById('registerBtn');


btnRegi.addEventListener('click', function() {
    firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRegister.value).then(function(result){
        alert("Usuario Conectado!")
        console.log("Sucess")
        window.location.replace('login.html');
        
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        alert(errorMessage);
        alert("Codigo de erro " + errorCode);
        console.log("error")
      });


});
