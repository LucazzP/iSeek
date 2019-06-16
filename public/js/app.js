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

function iniciar(){
    firebase.auth().onAuthStateChanged(function(authData){
        var page = window.location.pathname.split('/');
        page = page[page.length - 1];
    
        if(page == 'index.html' || page == 'register.html'){
            if(authData != null){
                window.location.assign('plataform.html');
            }
        } else {
            if(authData == null){
                window.location.assign('index.html');
            }
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

function verifyFire(){
    if(firebase.auth().currentUser != null){
        
    } else {
        verifyFire();
    }
}

function getUsernameAndSubstitute(){
    var username = document.getElementById('username');
    var uid = firebase.auth().currentUser.uid;
    firebase.firestore().collection('users').doc(uid).get().then(function(doc){
        username.innerText = doc.data()['nome'] + ' ' + doc.data()['sobrenome'];
    });
}

iniciar();