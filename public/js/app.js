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
                '<li class="nav-item" id="newProjectNav">'+
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
    firebase.auth().onAuthStateChanged(function(authData){
        var page = window.location.pathname.split('/');
        page = page[page.length - 1];
    
        if(page == 'login.html' || page == 'register.html'){
            if(authData != null && page == 'login.html'){
                window.location.assign('index.html');
            }
        } else {
            if(authData == null){
                window.location.assign('login.html');
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
    checkIfHaveProjects(uid);
    firebase.firestore().collection('users').doc(uid).get().then(function(data){
        if(data.data()['typeUser'] == 'souAluno'){
            isProfessor = false;
        } else {
            var newProjectNav = document.getElementById('newProjectNav');
            newProjectNav.innerHTML = '<a class="nav-link" href="#"> <i class="fas fa-fw fa-chart-area"></i> <span>Novo projeto</span></a>';
            isProfessor = true;
        }
    }).then(function(){
        loadLinks();
    });
}

function checkIfHaveProjects(uid){
    firebase.firestore().collection('projetos').where('id-alunos', "array-contains", uid).get().then(function(data){
        var nav = document.getElementById('gerirProjectosNav');
        if(!data.empty){
            nav.innerHTML = navHTML;
        }
    });
    firebase.firestore().collection('projetos').where('id-professor', "==", uid).get().then(function(data){
        var nav = document.getElementById('gerirProjectosNav');
        if(!data.empty){
            nav.innerHTML = navHTML;
        }
    });
}

function loadLinks(){
    $.ajax("index.html").done(function(){
        var link = window.location.href.split('?');
        if(link.length >= 2) {
            if(link.toString().split(',')[2] == 'project'){
                $("#body").load("project.html");
            } else if(link.toString().split(',')[2] == 'my-project'){
                $("#body").load("my-project.html");
            }
        }
        else{
            $("#body").load("plataform.html");
        }
        $("#navIndex").click(function(){
            $("#body").load("plataform.html");
            window.history.pushState('teste', 'teste', 'index.html');
        });
        $("#navProjetos").click(function(){
            $("#body").load("plataform.html");
            window.history.pushState('teste', 'teste', 'index.html');
        });
        $("#newProjectNav").click(function(){
            $("#body").load("new-project.html");
            window.history.pushState('teste', 'teste', 'index.html');
        });
        $("#navMyProjects").click(function(){
            $("#body").load("my-projects.html");
            window.history.pushState('teste', 'teste', 'index.html');
        });
        $("#navChat").click(function(){
            $("#body").load("chat.html");
            window.history.pushState('teste', 'teste', 'index.html');
        });
    });
}

iniciar();