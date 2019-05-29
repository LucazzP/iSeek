var nameRegister = document.getElementById('FirstName');
var lastNameRegister = document.getElementById('LastName');
var emailRegister = document.getElementById('InputEmail');
var passwordRegister = document.getElementById('InputPassword');
var passwordRegister2 = document.getElementById('RepeatPassword');
var btnRegi = document.getElementById('registerBtn');
var firestore = firebase.firestore();
var setDoc

//Adicionando usuario e senha
btnRegi.addEventListener('click', function() {
    //Usuario e senha
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
    //Enviando ao firestoreDB os dados do usuario
    setDoc = firestore.collection("users").doc().set({
        nome: nameRegister.value,
        sobrenome: lastNameRegister.value,
        email: emailRegister.value
    })
    .then(function(){
        console.log("arquivos enviandos com sucesso")
    })
    .catch(function(error){
        console.log("erro", error)
    });
    
});
