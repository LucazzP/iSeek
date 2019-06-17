var btnlog = document.getElementById('login-btn');
var email = document.getElementById('Email');
var password = document.getElementById('Password');




btnlog.addEventListener('click', function() {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(function(result){
        //alert("Usuario Conectado!")
        console.log("Sucess")
        window.location.replace("plataform.html");
        
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert("e-mail ou senha invalidos")
        alert("Codigo de erro " + errorCode);
        console.log("error");
      });
});

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
    return firebase.auth().currentUser.photoURL;
}

// Returns the signed-in user's display name.
function getUserName() {
    return firebase.auth().currentUser.displayName;
}

// Returns the signed-in user's display name.
function getUserUid() {
    return firebase.auth().currentUser.uid.toString;
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}

// Saves a new message on the Firebase DB.
function saveMessage(messageText) {
    var userID = getUserUid;
    console.log(userID)
    // Add a new message entry to the Firebase database.
    return firebase.firestore().collection('chat').doc(userID).add({
        name: getUserName(),
        text: messageText,
        profilePicUrl: getProfilePicUrl(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function(error) {
        console.error('Error writing new message to Firebase Database ', error);
    });
}