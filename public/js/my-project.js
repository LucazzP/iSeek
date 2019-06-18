var nomeProjeto = document.getElementById('nome-projeto');
var nomeAluno = document.getElementById('participante1');
var db = firebase.firestore();
var projectRef = db.collection('projetos');
var id = window.location.href.split('?')[1].split('#')[0].split(',')[0];
var projectName = '';
var participantName = 'Não há participantes';
var btnCreateCard = document.getElementById('btn-createCard');
var btnSaveTask = document.getElementById('btn_save');
var divAfazer = document.getElementById('divAfazer');
var divEmProgresso = document.getElementById('divEmProgresso');
var divPronto = document.getElementById('divPronto');
var divFinalizado = document.getElementById('divFinalizado');
var hasItemsinCard = [false, false, false, false];

function loadPage(id) {
    projectRef.doc(id).get().then(function(doc) {
        data = doc.data();
        projectName = data['nome-projeto'];

        if (doc.data()['id-alunos'] != []) {
            participantName = doc.data()['nome-alunos'][0];
        } else participantName = 'Não há alunos!';

        if(participantName == undefined){
            participantName = 'Não há participantes';
        }

    }).then(function() {
        nomeAluno.innerText = participantName;
        nomeProjeto.innerHTML = projectName;
    });
}

const drag = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
}

const allowDrop = (ev) => {
    ev.preventDefault();
    if (hasClass(ev.target, "dropzone")) {
        addClass(ev.target, "droppable");
    }
}

const clearDrop = (ev) => {
    removeClass(ev.target, "droppable");
}

const drop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const element = document.querySelector(`#${data}`);
    try {
        // remove the spacer content from dropzone
        event.target.removeChild(event.target.firstChild);
        $('.blocNoItem').remove();

        // add the draggable content
        event.target.appendChild(element);


        // remove the dropzone parent
        unwrap(event.target);
    } catch (error) {
        console.warn("can't move the item to the same place");
    }
    updateDropzones();
};

const updateDropzones = () => {
    /* after dropping, refresh the drop target areas
    so there is a dropzone after each item
    using jQuery here for simplicity */

    var dz = $('<div class="dropzone rounded" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="clearDrop(event)"> &nbsp; </div>');

    // updateEmpthyFields();

    // delete old dropzones
    // $('.dropzone').remove();

    // insert new dropdzone after each item   
    dz.insertAfter('.card.draggable');

    // insert new dropzone in any empty swimlanes
    // $(".items:not(:has(.card.draggable))").append(dz);
};

// helpers
function hasClass(target, className) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

function unwrap(node) {
    node.replaceWith(...node.childNodes);
}

const blocNoItemKanban = '<div class="card shadow-sm blocNoItem" id="cd2" draggable="false">' +
    '<div class="card-body p-2">' +
    '<p style="text-align: center">' +
    'Não há nenhuma tarefa cadastrada!' +
    '</p>' +
    '</div>' +
    '</div>' +
    '<div class="dropzone rounded" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="clearDrop(event)"> &nbsp; </div>';

const blocItemKanban = '<div class="card draggable shadow-sm" id="cd1" draggable="true" ondragstart="drag(event)">' +
    '<div class="card-body p-2">' +
    '<div class="card-title">' +
    '<a "" class="lead font-weight-light">Tarefa</a>' +
    '</div>' +
    '<p>' +
    '<input type="text" class="form-control form-control-user" id="content" placeholder="Digite o conteudo">' +
    '</p>' +
    '<button id="btn_save" class="btn btn-primary btn-sm">Salvar</button>' +
    '</div>' +
    '</div>' +
    '<div class="dropzone rounded" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="clearDrop(event)"> &nbsp; </div>';

const dropZone = '<div class="dropzone rounded" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="clearDrop(event)"> &nbsp; </div>';

function addCard(field) {
    switch (field) {
        case 0:
            if (divAfazer.innerHTML == '') {
                divAfazer.innerHTML = blocNoItemKanban;
            } else {
                if (hasItemsinCard[field]) {
                    divAfazer.innerHTML += blocItemKanban;
                } else {
                    hasItemsinCard[field] = true;
                    divAfazer.innerHTML = blocItemKanban;
                }
            }
            break;
        case 1:
            if (divEmProgresso.innerHTML == '') {
                divEmProgresso.innerHTML = blocNoItemKanban;
            } else {
                if (hasItemsinCard[field]) {
                    divEmProgresso.innerHTML += blocItemKanban;
                } else {
                    hasItemsinCard[field] = true;
                    divEmProgresso.innerHTML = blocItemKanban;
                }
            }
            break;
        case 2:
            if (divPronto.innerHTML == '') {
                divPronto.innerHTML = blocNoItemKanban;
            } else {
                if (hasItemsinCard[field]) {
                    divPronto.innerHTML += blocItemKanban;
                } else {
                    hasItemsinCard[field] = true;
                    divPronto.innerHTML = blocItemKanban;
                }
            }
            break;
        case 3:
            if (divFinalizado.innerHTML == '') {
                divFinalizado.innerHTML = blocNoItemKanban;
            } else {
                if (hasItemsinCard[field]) {
                    divFinalizado.innerHTML += blocItemKanban;
                } else {
                    hasItemsinCard[field] = true;
                    divFinalizado.innerHTML = blocItemKanban;
                }
            }
            break;
       }
    }
//});


function updateEmpthyFields() {
    var fields = [0, 1, 2, 3];
    fields.forEach(function(field) {
        switch (field) {
            case 0:
                if (divAfazer.innerHTML == dropZone) {
                    console.log(divAfazer.innerHTML);

                    console.log(divAfazer.innerHTML);
                    hasItemsinCard[field] = false;
                } else {
                    $('.blocNoItem').remove();
                    hasItemsinCard[field] = true;
                }
                break;
            case 1:
                if (divEmProgresso.innerHTML == dropZone) {
                    // console.log(divEmProgresso.innerHTML);
                    divEmProgresso.innerHTML = blocNoItemKanban;
                    hasItemsinCard[field] = false;
                } else {
                    $('.blocNoItem').remove();
                    hasItemsinCard[field] = true;
                }
                break;
            case 2:
                if (divPronto.innerHTML == dropZone) {
                    divPronto.innerHTML = blocNoItemKanban;
                    hasItemsinCard[field] = false;
                } else {
                    $('.blocNoItem').remove();
                    hasItemsinCard[field] = true;
                }
                break;
            case 3:
                if (divFinalizado.innerHTML == dropZone) {
                    divFinalizado.innerHTML = blocNoItemKanban;
                    hasItemsinCard[field] = false;
                } else {
                    $('.blocNoItem').remove();
                    hasItemsinCard[field] = true;
                }
                break;
        }
    });
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

addCard(0);
addCard(1);
addCard(2);
addCard(3);

firebase.auth().onAuthStateChanged(function(authData) {
    loadPage(id);
});

// projectRef.get().then(function(docs){
//    docs.forEach(function(doc) {
//        nomeProjeto.innerHTML = doc.data()['nome-projeto']
//     })
// })