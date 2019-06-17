var db = firebase.firestore();
var projectRef = db.collection('projetos');
var projectsDiv = document.getElementById('projectsDiv');
var description;

var cardProject =
    '<div>' +
    '<div class="col-lg-6  mb-4">' +

    '<!-- Card Projeto -->' +
    '<div class="card shadow mb-4">' +
    '<div class="card-header py-3">' +
    '<h6 class="m-0 font-weight-bold text-primary name"></h6>' +
    '</div>' +
    '<div class="card-body border-bottom-primary">' +
    '<div class="row">' +
    '<p class="col-auto mr-auto text-lg text-gray-800">Descrição:</p>' +
    '<div class="col-auto">' +
    '<span class="btn btn-success btn-circle btn-sm"></span>' +
    '<!-- <span class="btn btn-danger btn-circle btn-sm"> </span> -->' +
    '</div>' +
    '</div>' +

    '<p class="description align-justify"></p>' +

    '<div class="row">' +
    '<div class="col-auto mr-auto"></div>' +
    '<div class="text-gray-800">Professor: </div><p class="col-auto professor"></p>' +
    '</div>' +

    '<hr>' +

    '<a class="btn btn-primary btn-icon-split container-fluid">' +
    '<span class="icon">' +
    '<i class="fas fa-arrow-right"></i>' +
    '</span>' +
    '<span class="text container-fluid">Ver mais</span>' +
    '</a>' +
    '</div>' +
    '</div>' +
    '</div>' +

    '</div>';

function createCardProject(id, description, name, professor) {
    var container = document.createElement('div');

    container.innerHTML = cardProject;

    var div = container.firstChild;
    div.setAttribute('id', id);
    div.setAttribute('description', description);
    div.setAttribute('name', name);
    div.setAttribute('professor', professor);

    var descriptionElement = div.querySelector('.description');
    var nameElement = div.querySelector('.name');
    var professorElement = div.querySelector('.professor');
    var verMaisElement = div.querySelector('a')

    descriptionElement.innerHTML = div.getAttribute('description');
    nameElement.innerHTML = div.getAttribute('name');
    professorElement.innerHTML = div.getAttribute('professor');

    // var verMais = document.getElementById('verMais');
    verMaisElement.setAttribute('href', 'index.html?' + id + ',project');
    verMaisElement.setAttribute('onclick', '$("#body").load("project.html);');

    projectsDiv.innerHTML += div.innerHTML;
}

projectRef.get().then(function(docs) {
    docs.forEach(function(doc) {
        var data = doc.data();
        // projectRef.add(doc.data())
        createCardProject(doc.id, data['description'], data['nome-projeto'], data['nome-professor']);
    });
});

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