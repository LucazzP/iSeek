// Returns the signed-in user's display name.
function getUserName() {
    var uid = firebase.auth().currentUser.uid;
    var doc = firebase.firestore().collection('users').doc(uid);
    doc.get().then(function(doc) {
        if (doc.exists){
            return doc.data['nome'] + doc.data['sobrenome']
        } else{
            console.log('Erro ao pegar o Nome')
        }
    });
}

// Saves a new message on the Firebase DB.
async function saveMessage(message, recieverUid) {
  console.log(recieverUid);
    var uid = firebase.auth().currentUser.uid;
    var docRef = firebase.firestore().collection('chat');

    return await docRef.add({
        name: 'userName',
        sender: uid,
        reciever: recieverUid, 
        text: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function(error) {
        console.error('Error writing new message to Firebase Database ', error);
    });
}

// Loads chat messages history and listens for upcoming ones.
function loadMessages(uid, selectedReciever) {
  var docRef;

  if(selectedReciever == undefined){
    docRef = firebase.firestore().collection("projetos").where("id-alunos", "array-contains", uid);
  
    // Start listening to the query.
    docRef.onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(data) {
        console.log(data.doc.data());
        displayMessageChatRecent(data.doc.data()['nome-professor'], data.doc.data()['id-professor']);
      });
    });

    docRef = firebase.firestore().collection("projetos").where("id-professor", "==", uid);
  
    // Start listening to the query.
    docRef.onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(data) {
        console.log(data.doc.data());
        displayMessageChatRecent(data.doc.data()['nome-projeto'], data.doc.data()['id-alunos'][0]);
      });
    });
  }
  
  if(selectedReciever != undefined){

    messageListElement.innerHTML = '';
    // Create the query to load the last 12 messages and listen for new ones.
  docRef = firebase.firestore().collection("chat").where("sender", "==", uid).where("reciever", "==", selectedReciever).orderBy('timestamp', 'desc');
  
  // Start listening to the query.
  docRef.onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
      if (change.type === 'removed') {
        deleteMessage(change.doc.id);
      } else {
        var message = change.doc.data();
        displayMessage(change.doc.id, message.timestamp, message.reciever, message.text);
      }
    });
  });

  docRef = firebase.firestore().collection("chat").where("reciever", "==", uid).where("sender", "==", selectedReciever).orderBy('timestamp', 'desc');
  
  // Start listening to the query.
  docRef.onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
      if (change.type === 'removed') {
        deleteMessage(change.doc.id);
      } else {
        var message = change.doc.data();
        displayMessage(change.doc.id, message.timestamp, message.reciever, message.text);
      }
    });
  });
  }
}


// Triggered when the send new message form is submitted.
function onMessageFormSubmit(e) {
  // e.preventDefault();
  // Check that the user entered a message and is signed in.
  if (messageInputElement.value && checkSignedInWithMessage()) {
    console.log(selectedReciever)
    saveMessage(messageInputElement.value, selectedReciever).then(function() {
      // Clear message text field and re-enable the SEND button.
      resetMaterialTextfield(messageInputElement);
      toggleButton();
    });
  }
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}

// Returns true if user is signed-in. Otherwise false and displays a message.
function checkSignedInWithMessage() {
  // Return true if the user is signed in Firebase
  if (isUserSignedIn()) {
    return true;
  }

  // Display a message to the user using a Toast.
  var data = {
    message: 'You must sign-in first',
    timeout: 2000
  };
  signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
  return false;
}

// Resets the given MaterialTextField.
function resetMaterialTextfield(element) {
  element.value = '';
}

// Template for messages.
var MESSAGE_TEMPLATE =
    '<div class="message-container">' +
        '<div class="spacing"><div class="pic"></div></div>' +
        '<div class="message"></div>' +
        '<div class="name"></div>' +
    '</div>';
    

var MESSAGE_TEMPLATE_INCOMING =
    '<div class="incoming_msg">' +
        '<div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>' +
        '<div class="received_msg">' +
        '<div class="received_withd_msg">' +
        '<p class="message"></p>' +
        '<span class="time_date"></span></div>' +
        '</div>' +
    '</div>';
    

var MESSAGE_TEMPLATE_OUTGOING =
    '<div class="outgoing_msg">' +
      '<div class="sent_msg">' +
      '<p class="message"></p>' +
      '<span class="time_date"></span> </div>' +
    '</div>';

var selectChatHTML = 
    '<div class="chat_list chat">'+
    '<a>' +
      '<div class="chat_people">'+
      '<div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>'+
      '<div class="chat_ib">'+
        '<h5><span class="user"></span></h5>'+
        '<p id="lastmessage"></p>'+
      '</div>'+
      '</div>'+
      '</a>'+
    '</div>';

// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
}

// A loading image URL.
var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

// Delete a Message from the UI.
function deleteMessage(id) {
  var div = document.getElementById(id);
  // If an element for that message exists we delete it.
  if (div) {
    div.parentNode.removeChild(div);
  }
}

// Displays a Message in the UI.
function displayMessageChatRecent(nome, id) {
  console.log(nome);
  var div = document.getElementById('chats');
  // If an element for that message does not exists yet we create it.
  var container = document.createElement('div');
  container.innerHTML = selectChatHTML;
  var nameElement = container.querySelector('.user');
  var linkElement = container.querySelector('a');
  var chatElement = container.querySelector('.chat');
  chatElement.setAttribute('id', id);
  nameElement.textContent = nome;
  linkElement.setAttribute('onclick', 'changeActive("' + id + '")');
  if(window.location.pathname.split('?')[1] == id){
    chatElement.className = 'chat_list chat active_chat';
  }
  div.innerHTML += container.innerHTML;
  window.history.pushState("teste", "teste", "index.html?" + id);
  selectedReciever = id;
  // // Show the card fading-in and scroll to view the new message.
  // setTimeout(function() {div.classList.add('visible')}, 1);
  // messageListElement.scrollTop = messageListElement.scrollHeight;
  // messageInputElement.focus();
}

function changeActive(id){
  window.history.pushState("teste", "teste", "index.html?" + id);
  $(id).attr('active_chat');
  selectedReciever = id;
  loadMessages(firebase.auth().currentUser.uid, id);
};

// Displays a Message in the UI.
function displayMessage(id, timestamp, uidReciever, text) {
  var div = document.getElementById(id);
  var uid = firebase.auth().currentUser.uid;
  // If an element for that message does not exists yet we create it.
  if (!div) {
    var container = document.createElement('div');
    if (uid == uidReciever){
        container.innerHTML = MESSAGE_TEMPLATE_INCOMING;
    } else{
        container.innerHTML = MESSAGE_TEMPLATE_OUTGOING;
    }
    div = container.firstChild;
    div.setAttribute('id', id);
    div.setAttribute('timestamp', timestamp);
    for (var i = 0; i < messageListElement.children.length; i++) {
      var child = messageListElement.children[i];
      var time = child.getAttribute('timestamp');
      if (time && time > timestamp) {
        break;
      }
    }
    messageListElement.insertBefore(div, child);
  }
  var messageElement = div.querySelector('.message');
    messageElement.textContent = text;
    // Replace all line breaks by <br>.
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
    var messageElement = div.querySelector('.time_date');
    messageElement.textContent = new Date(timestamp['seconds'] * 1000).toLocaleDateString() + ' ' + new Date(timestamp['seconds'] * 1000).toLocaleTimeString();
  // Show the card fading-in and scroll to view the new message.
  setTimeout(function() {div.classList.add('visible')}, 1);
  messageListElement.scrollTop = messageListElement.scrollHeight;
  messageInputElement.focus();
}

// Enables or disables the submit button depending on the values of the input
// fields.
function toggleButton() {
  if (messageInputElement.value) {
    submitButtonElement.removeAttribute('disabled');
  } else {
    submitButtonElement.setAttribute('disabled', 'true');
  }
}

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
  }
}

function verifyButtonAndSend(event){
  if (event.keyCode == 13) {
    onMessageFormSubmit();
  }
}

firebase.auth().onAuthStateChanged(function(authData){
  selectedReciever = window.location.pathname.split('?')[1];
  loadMessages(authData.uid, selectedReciever);
});

// Checks that Firebase has been imported.
checkSetup();

// Shortcuts to DOM Elements.
var messageListElement = document.getElementById('messages');
var messageInputElement = document.getElementById('inputMsgChat');
var submitButtonElement = document.getElementById('buttomSendMessage');
var chats = document.getElementById('chats');
var selectedReciever;

// Saves message on form submit.
submitButtonElement.addEventListener('click', onMessageFormSubmit);

// Toggle for the button.
messageInputElement.addEventListener('keyup', toggleButton);
messageInputElement.addEventListener('change', toggleButton);

// Remove the warning about timstamps change. 
var firestore = firebase.firestore();