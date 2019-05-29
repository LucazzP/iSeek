var nameRegister = document.getElementById('FirstName');
var lastNameRegister = document.getElementById('LastName');
var emailRegister = document.getElementById('InputEmail');
var passwordRegister = document.getElementById('InputPassword');
var passwordRegister2 = document.getElementById('RepeatPassword');
var btnRegi = document.getElementById('registerBtn');
var db = firebase.firestore();
var timestamp = firebase.firestore.FieldValue.serverTimestamp()


//Adicionando usuario e senha
btnRegi.addEventListener('click', function() {
    //Usuario e senha
    if(passwordRegister.value == passwordRegister2.value){
        firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRegister.value).then(function(result){
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
        //enviando informacoes para o db
        db.collection("users").doc().set({
            nome: nameRegister.value,
            sobrenome: lastNameRegister.value,
            email: emailRegister.value,
            dataconta: timestamp
        })
        .then(function(){
            console.log("arquivo gravado com sucesso!");
        })
        .catch(function(error){
            console.error("Error! codigo:", error);
        })
    }
    else{
       alert("Digite uma senha válida!")
    }     


});
