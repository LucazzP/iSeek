var btnSair = document.getElementById('btn-sair');

btnSair.addEventListener('click', function(){
    firebase.auth().signOut();
});


function resolverDepoisDe1Segundos() {
    return new Promise(resolve => {
      setTimeout(() => {
        if(firebase.auth().currentUser == null){
            window.location.assign('index.html');
        }
      }, 1000);
    });
}

resolverDepoisDe1Segundos();