var nomeProjeto = document.getElementById('nome-projeto');
var nomeAluno = document.getElementById('nome-aluno');
var db = firebase.firestore();
var projectRef = db.collection('projetos');
var id = window.location.href.split('?')[1].split('#')[0].split(',')[0];
var cursos = document.getElementById('cursos');
var btnEntrarProjeto = document.getElementById('btnEntrarProjeto');
var userUid;
var isInProject = false;

var projectName = '';
var participantName = '';
var cursoHTML = '<div class="d-sm-flex align-items-center justify-content-between mt-2 mb-2 mt-2">'+
              '<ul class="pl-1 m-0">'+
                '<i class="fas fa-angle-double-right">'+
                  '<span class="h5 mb-0 text-gray-800 curso"></span>'+
                '</i>'+
              '</ul>'+
            '</div>';
var btnEntrarProjetoHTMLDisabled = '<span class="icon text-white-50">'+
                                        '<i class="fas fa-minus"></i>'+
                                    '</span>'+
                                    '<span class="text">Já solicitado</span>';


function loadPage(id) {
    projectRef.doc(id).get().then(function(doc) {
        data = doc.data();
        projectName = data['nome-projeto'];

        if(doc.data()['id-alunos'] != []){
            participantName = doc.data()['nome-alunos'][0];
        } else participantName = 'Não há alunos!';

        data['curso-necessario'].forEach(element => {
            var container = document.createElement('div');
            container.innerHTML = cursoHTML;
            container.querySelector('.curso').textContent = ' ' + element;
            cursos.innerHTML += container.innerHTML;
        });

    }).then(function() {
        nomeProjeto.innerHTML = projectName;
    });
}

function verifyIfWasInProject(uid){
    firebase.firestore().collection('invites').where('idAluno', '==', uid).get().then(function(docs){
        if(!docs.empty ){
            btnEntrarProjeto.removeAttribute('href');
            btnEntrarProjeto.innerHTML = btnEntrarProjetoHTMLDisabled;
            isInProject = true;
        }
    });
    firebase.firestore().collection('invites').where('idProfessor', '==', uid).get().then(function(docs){
        if(!docs.empty){
            btnEntrarProjeto.removeAttribute('href');
            btnEntrarProjeto.innerHTML = btnEntrarProjetoHTMLDisabled;
            isInProject = true;
        }
    });
}

firebase.auth().onAuthStateChanged(function(authData){
    if(authData != null){
        loadPage(id);
        userUid = authData.uid;
        verifyIfWasInProject(userUid);
    }
});

btnEntrarProjeto.addEventListener('click', function(){
    if(!isInProject){
        var idProfessor;
        firebase.firestore().collection('projetos').doc(id).get().then(function(doc){
            idProfessor = doc.data()['id-professor'];
        }).then(function(){
            firebase.firestore().collection('invites').add({
                idProjeto: id,
                idAluno: userUid,
                idProfessor: idProfessor
            });
        })
    }
});

// projectRef.get().then(function(docs){
//    docs.forEach(function(doc) {
//        nomeProjeto.innerHTML = doc.data()['nome-projeto']
//     })
// })