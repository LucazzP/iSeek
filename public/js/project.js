var nomeProjeto = document.getElementById('nome-projeto')
var db = firebase.firestore();
var projectRef = db.collection('projetos')
var id = window.location.href.split('?')[1]

function loadPage(id){
    projectRef.doc(id).get().then(function(doc){
        data = doc.data();
        nomeProjeto.innerHTML = data['nome-projeto']
    })
}

loadPage(id)

// projectRef.get().then(function(docs){
//    docs.forEach(function(doc) {
//        nomeProjeto.innerHTML = doc.data()['nome-projeto']
//     })
// })