var nameRegister = document.getElementById('FirstName');
var lastNameRegister = document.getElementById('LastName');
var emailRegister = document.getElementById('InputEmail');
var passwordRegister = document.getElementById('InputPassword');
var passwordRegister2 = document.getElementById('RepeatPassword');
var btnRegi = document.getElementById('registerBtn');
var timestamp = firebase.firestore.FieldValue.serverTimestamp();
var dropCursos = document.getElementById('dropCursos');
var dropCursosButton = document.getElementById('dropdownMenuButton');


//Adicionando usuario e senha
btnRegi.addEventListener('click', function() {
    var typeUser = $("input[name='typeUser']:checked");
    //Usuario e senha
    if(passwordRegister.value == passwordRegister2.value){
        if(nameRegister.value != ''){
            if(lastNameRegister.value != ''){
                if(emailRegister.value != ''){
                    if(dropCursosButton.innerText != 'Selecione seu curso '){

                        firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRegister.value).then(function(result){
                            console.log("Success");
                            //enviando informacoes para o db
                            var uid = firebase.auth().currentUser.uid;
                            firebase.firestore().collection('users').doc(uid).set({
                                nome: nameRegister.value,
                                sobrenome: lastNameRegister.value,
                                email: emailRegister.value,
                                dataconta: timestamp,
                                curso:dropCursosButton.innerHTML,
                                typeUser: typeUser.val()
                            })
                            .then(function(){
                                console.log("Arquivo gravado com sucesso!");
                                window.location.replace('plataform.html');
                            });
                            
                        }).catch(function(error) {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            alert("Codigo de erro " + errorCode + '#' + errorMessage);
                        });
                        
                    } else alert('Selecione seu curso!');
                } else alert('Digite um email válido!');
            } else alert('Digite um sobrenome válido!');
        } else alert('Digite um nome válido!');
    } else alert("Digite uma senha válida!");

});

dropCursos.addEventListener('click', function(value){
    dropCursosButton.innerHTML = value.target.innerHTML;
});