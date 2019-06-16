var dropProjetos = document.getElementById('tipoProjeto');
var dropProjetosButton = document.getElementById('btnTipoProjeto');
var duracao = document.getElementById('duracao');
var duracaoBtn = document.getElementById('duracaoBtn');
var temBolsa = document.getElementById('temBolsa');
var temBolsaBtn = document.getElementById('temBolsaBtn');
var aptidaoCurso = document.getElementById('aptidaoCurso');
var aptidaoCursoBtn = document.getElementById('aptidaoCursoBtn');
var nomeProjeto = document.getElementById('nomeProjeto');
var vagas = document.getElementById('vagas');
var registerBtn = document.getElementById('registerBtn');

dropProjetos.addEventListener('click', function(value){
    dropProjetosButton.innerHTML = value.target.innerHTML;
    dropProjetosButton.className = 'btn btn-primary btn-user btn-block col-lg-12 center-block';
});

duracao.addEventListener('click', function(value){
    duracaoBtn.innerHTML = value.target.innerHTML;
    duracaoBtn.className = 'btn btn-terciary btn-user btn-block col-lg-12 center-block';
});

temBolsa.addEventListener('click', function(value){
    temBolsaBtn.innerHTML = value.target.innerHTML;
    temBolsaBtn.className = 'btn btn-terciary btn-user btn-block col-lg-12 center-block';
});

registerBtn.addEventListener('click', function(){
    console.log(dropProjetosButton.innerText);
    if(nomeProjeto.value != ''){
        if(dropProjetosButton.innerText != 'Tipo de projeto '){
            if(duracaoBtn.innerText != 'Período '){
                if(vagas.value != ''){
                    if(temBolsaBtn.innerText != 'Tem Bolsa? '){
                        if(aptidaoCurso.innerText != 'Aptidão de curso '){
                            
                        } else alert("Selecione os cursos requisitatos para a vaga!");
                    } else alert("Selecione se seu projeto possui bolsa!");
                } else alert("Digite a quantidades de vagas para seu projeto!");
            } else alert("Selecione o período do seu projeto!");
        } else alert("Selecione um tipo de projeto!");
    } else alert("Digite um nome para seu projeto!");
});