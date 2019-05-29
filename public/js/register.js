var nameRegister = document.getElementById('FirstName');
var lastNameRegister = document.getElementById('LastName');
var emailRegister = document.getElementById('InputEmail');
var passwordRegister = document.getElementById('InputPassword');
var passwordRegister2 = document.getElementById('RepeatPassword');
var btnRegi = document.getElementById('registerBtn');
var timestamp = firebase.firestore.FieldValue.serverTimestamp()



//Adicionando usuario e senha
btnRegi.addEventListener('click', function() {
    //Usuario e senha
    if(passwordRegister.value == passwordRegister2.value){
        firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRegister.value).then(function(result){

            console.log("Sucess")
            //enviando informacoes para o db
            var uid = firebase.auth().currentUser.uid;
            firebase.firestore().collection('users').doc(uid).set({
                nome: nameRegister.value,
                sobrenome: lastNameRegister.value,
                email: emailRegister.value,
                dataconta: timestamp
        })
        .then(function(){
            console.log("arquivo gravado com sucesso!");
            window.location.replace('index.html');
        })
            
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            if(emailRegister.value != ''){
            alert("email ja cadastrado");
            alert("Codigo de erro " + errorCode);
            }
            else{
            alert("Digite um E-mail e Senha válidos")
            alert("Codigo de erro " + errorCode);
            console.log("error")
            }
        });
        
    }
    else{
       alert("Digite uma senha válida!")
    }     

});
