// // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD6l1OmJEArC-M8ZddQrmdQdmbd9igst-E",
    authDomain: "iseek-fb.firebaseapp.com",
    databaseURL: "https://iseek-fb.firebaseio.com",
    projectId: "iseek-fb",
    storageBucket: "iseek-fb.appspot.com",
    messagingSenderId: "508344161281",
    appId: "1:508344161281:web:c3824c7acfc1f027"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

var isProfessor;
var navHTML = '<!-- Divider -->'+
                '<hr class="sidebar-divider">'+
    
                '<!-- Heading -->'+
                '<div class="sidebar-heading">'+
                    'Gerir projetos'+
                '</div>'+
                
                '<!-- Nav Item - Novo projeto -->'+
                '<li class="nav-item active" id="newProjectNav">'+
                '</li>'+
    
                '<!-- Nav Item - Meus projetos -->'+
                '<li class="nav-item">'+
                    '<a class="nav-link" href="#" id="navMyProjects">'+
                    '<i class="fas fa-fw fa-table"></i>'+
                    '<span>Meus projetos</span></a>'+
                '</li>'+
    
                '<!-- Nav Item - Novo projeto -->'+
                '<li class="nav-item">'+
                    '<a class="nav-link" href="#" id="navChat">'+
                    '<i class="fas fa-fw fa-chart-area"></i>'+
                    '<span>Chat</span></a>'+
                '</li>';

function iniciar(){
    $.

    firebase.auth().onAuthStateChanged(function(authData){
        var page = window.location.pathname.split('/');
        page = page[page.length - 1];
    
        if(page == 'index.html' || page == 'register.html'){
            if(authData != null && page == 'index.html'){
                window.location.assign('plataform.html');
            }
        } else {
            if(authData == null){
                window.location.assign('index.html');
            }
            checkIfIsProfessor(authData.uid);
            getUsernameAndSubstitute();
            try {
                var btnSair = document.getElementById('btn-sair');
                btnSair.addEventListener('click', function(){
                firebase.auth().signOut();
                });
            } catch (error) {}
            // init();
        }
    });
}

function getUsernameAndSubstitute(){
    var username = document.getElementById('username');
    var uid = firebase.auth().currentUser.uid;
    firebase.firestore().collection('users').doc(uid).get().then(function(doc){
        username.innerText = doc.data()['nome'] + ' ' + doc.data()['sobrenome'];
    });
}

function checkIfIsProfessor(uid){
    firebase.firestore().collection('users').doc(uid).get().then(function(data){
        if(data.data()['typeUser'] == 'souAluno'){
            isProfessor = false;
        } else {
            var newProjectNav = document.getElementById('newProjectNav');
            newProjectNav.innerHTML = '<a class="nav-link" href="new-project.html"> <i class="fas fa-fw fa-chart-area"></i> <span>Novo projeto</span></a>';
            isProfessor = true;
        }
    });
}

function checkIfHaveProjects(uid){
    firebase.firestore().collection('projetos').where('id-alunos', "array-contains", uid).get().then(function(data){
        var nav = document.getElementById('gerirProjectosNav');
        if(!data.empty){
            nav.innerHTML = navHTML;
            return true;
        }
    });
}

iniciar();