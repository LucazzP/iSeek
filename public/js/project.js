var nomeProjeto = document.getElementById('nome-projeto');
var nomeAluno = document.getElementById('nome-aluno');
var db = firebase.firestore();
var projectRef = db.collection('projetos');
var id = window.location.href.split('?')[1];

var projectName = '';
var participantName = '';

function loadPage(id) {
    projectRef.doc(id).get().then(function(doc) {
        data = doc.data();
        projectName = data['nome-projeto'];

        if(doc.data()['id-alunos'] != []){
            participantName = doc.data()['nome-alunos'][0];
        } else participantName = 'Não há alunos!';

    }).then(function() {
        nomeProjeto.innerHTML = projectName;
    });
}

function resolverDepoisDe1Segundos() {
    return new Promise(resolve => {
      setTimeout(() => {
        loadPage(id);
      }, 1000);
    });
}

resolverDepoisDe1Segundos();

// projectRef.get().then(function(docs){
//    docs.forEach(function(doc) {
//        nomeProjeto.innerHTML = doc.data()['nome-projeto']
//     })
// })