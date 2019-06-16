var btnSair = document.getElementById('btn-sair');
var username = document.getElementById('username');

btnSair.addEventListener('click', function(){
    firebase.auth().signOut();
});

function resolverDepoisDe1Segundos() {
    return new Promise(resolve => {
      setTimeout(() => {
        if(firebase.auth().currentUser == null){
            window.location.assign('index.html');
        }
        getUsernameAndSubstitute();
      }, 1000);
    });
}

function getUsernameAndSubstitute(){
  var uid = firebase.auth().currentUser.uid;
  firebase.firestore().collection('users').doc(uid).get().then(function(doc){
    username.innerText = doc.data()['nome'] + ' ' + doc.data()['sobrenome'];
  });
}

resolverDepoisDe1Segundos();