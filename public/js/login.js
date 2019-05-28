var email = document.getElementById('exampleInputEmail');
var password = document.getElementById('exampleInputPassword');
var btnlog = document.getElementById('login-btn');


btnlog.addEventListener('click', function() {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(function(result){
        alert("Usuario Conectado!")
        console.log("Sucess")
        window.location.replace('index.html');
        
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
