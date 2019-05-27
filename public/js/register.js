var nameRegister = document.getElementById('FirstName');
var lastNameRegister = document.getElementById('LastName');
var emailRegister = document.getElementById('InputEmail');
var passwordRegister = document.getElementById('InputPassword');
//var passwordRegister2 = document.getElementById('RepeatPassword');
var btnRegi = document.getElementById('registerBtn');


//Ao clicar no botao

btnRegi.addEventListener('click', function(){
    create(nameRegister.value, 
            lastNameRegister.value, 
            emailRegister.value,
            passwordRegister.value,);
});



//Empacotando dados para enviar ao firebase
function create(name, lastname, email, password){
    var data = {
        name: name,
        last:lastname,
        email: email,
        password: password
    };

    return firebase.database().ref().child('users').push(data);
}

