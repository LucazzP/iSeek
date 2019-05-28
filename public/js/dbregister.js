var btnRegi = document.getElementById('registerBtn');
var nameRegister = document.getElementById('FirstName').value;
var lastNameRegister = document.getElementById('LastName').value;
var emailRegister = document.getElementById('InputEmail').value;
var db = firebase.firestore();

btnRegi.addEventListener('click', function(){

    db.collection("users").doc().set({
        nome: nameRegister,
        sobrenome: lastNameRegister,
        email: emailRegister
    })
    .then(function(){
        console.log("arquivo gravado com sucesso!");
    })
    .catch(function(error){
        console.error("Error! codigo:", error);
    })
}); 
