var nomeProjeto = document.getElementById('nome-projeto');
var nomeAluno = document.getElementById('nome-aluno');
var db = firebase.firestore();
var projectRef = db.collection('projetos');
var id = window.location.href.split('?')[1];
var projectName = '';
var participantName = '';
var btnCreateCard = document.getElementById('btn-createCard');
var divAfazer = document.getElementById('divAfazer');
var divEmProgresso = document.getElementById('divEmProgresso');
var divPronto = document.getElementById('divPronto');
var divFinalizado = document.getElementById('divFinalizado');
var hasItemsinCard = [false,false,false,false];

function loadPage(id){
    projectRef.doc(id).get().then(function(doc){
        data = doc.data();
        projectName = data['nome-projeto'];

        db.collection('users').doc(data['id-alunos'][0]).get().then(function(doc){
            participantName = doc.data()['nome'];
        }).then(function(){
            nomeAluno.innerHTML = participantName;
        });

    }).then(function(){
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

const drag = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
}
  
const allowDrop = (ev) => {
ev.preventDefault();
if (hasClass(ev.target,"dropzone")) {
    addClass(ev.target,"droppable");
}
}

const clearDrop = (ev) => {
    removeClass(ev.target,"droppable");
}

const drop = (event) => {
event.preventDefault();
const data = event.dataTransfer.getData("text/plain");
const element = document.querySelector(`#${data}`);
try {
    // remove the spacer content from dropzone
    event.target.removeChild(event.target.firstChild);
    // add the draggable content
    event.target.appendChild(element);
    // remove the dropzone parent
    unwrap(event.target);
} catch (error) {
    console.warn("can't move the item to the same place")
}
updateDropzones();
}

const updateDropzones = () => {
    /* after dropping, refresh the drop target areas
    so there is a dropzone after each item
    using jQuery here for simplicity */
    
    var dz = $('<div class="dropzone rounded" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="clearDrop(event)"> &nbsp; </div>');


    
    // delete old dropzones
    $('.dropzone').remove();

    // insert new dropdzone after each item   
    dz.insertAfter('.card.draggable');
    
    // insert new dropzone in any empty swimlanes
    $(".items:not(:has(.card.draggable))").append(dz);
};

// helpers
function hasClass(target, className) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
}

function addClass(ele,cls) {
if (!hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
if (hasClass(ele,cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className=ele.className.replace(reg,' ');
}
}

function unwrap(node) {
    node.replaceWith(...node.childNodes);
}  

const blocNoItemKanban = '<div class="card shadow-sm" id="cd2" draggable="false">'+
                                '<div class="card-body p-2">'+
                                    '<p style="text-align: center">'+
                                        'Não há nenhuma tarefa cadastrada!'+
                                    '</p>'+
                                '</div>'+
                            '</div>'+
                            '<div class="dropzone rounded" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="clearDrop(event)"> &nbsp; </div>';

const blocItemKanban = '<div class="card draggable shadow-sm" id="cd1" draggable="true" ondragstart="drag(event)">'+
                        '<div class="card-body p-2">'+
                            '<div class="card-title">'+
                                '<a href="" class="lead font-weight-light">TSK-154</a>'+
                            '</div>'+
                            '<p>'+
                                'This is a description of a item on the board.'+
                            '</p>'+
                            '<button class="btn btn-primary btn-sm">View</button>'+
                        '</div>'+
                    '</div>'+
                    '<div class="dropzone rounded" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="clearDrop(event)"> &nbsp; </div>';

function addCard(field){
    switch (field){
        case 0:
            if(divAfazer.innerHTML == ''){
                divAfazer.innerHTML = blocNoItemKanban;
            } else {
                if(hasItemsinCard[field]){
                    divAfazer.innerHTML += blocItemKanban;
                } else {
                    hasItemsinCard[field] = true;
                    divAfazer.innerHTML = blocItemKanban;
                }
            }
            break;
        case 1:
            if(divEmProgresso.innerHTML == ''){
                divEmProgresso.innerHTML = blocNoItemKanban;
            } else {
                if(hasItemsinCard[field]){
                    divEmProgresso.innerHTML += blocItemKanban;
                } else {
                    hasItemsinCard[field] = true;
                    divEmProgresso.innerHTML = blocItemKanban;
                }
            }
            break;
        case 2:
            if(divPronto.innerHTML == ''){
                divPronto.innerHTML = blocNoItemKanban;
            } else {
                if(hasItemsinCard[field]){
                    divPronto.innerHTML += blocItemKanban;
                } else {
                    hasItemsinCard[field] = true;
                    divPronto.innerHTML = blocItemKanban;
                }
            }
            break;
        case 3:
            if(divFinalizado.innerHTML == ''){
                divFinalizado.innerHTML = blocNoItemKanban;
            } else {
                if(hasItemsinCard[field]){
                    divFinalizado.innerHTML += blocItemKanban;
                } else {
                    hasItemsinCard[field] = true;
                    divFinalizado.innerHTML = blocItemKanban;
                }
            }
            break;
    }
}

function updateEmpthyFields(){
    
}

addCard(0);
addCard(1);
addCard(2);
addCard(3);

resolverDepoisDe1Segundos();

// projectRef.get().then(function(docs){
//    docs.forEach(function(doc) {
//        nomeProjeto.innerHTML = doc.data()['nome-projeto']
//     })
// })