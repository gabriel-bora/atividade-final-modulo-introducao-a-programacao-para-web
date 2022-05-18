let login = window.sessionStorage.getItem('login');

if(!login){
    alert('Você precisa estar logado para acessar essa página')
    window.location = './index.html';
}

let usuario = window.sessionStorage.getItem('usuario');
let listaUsuarios = JSON.parse(window.localStorage.getItem('usuarios'));
let indiceUsuario;
    for (const indice in listaUsuarios) {
        if(listaUsuarios[indice].username == usuario){
            indiceUsuario = indice;
        }
    };
let listaRecados = listaUsuarios[indiceUsuario].recados;
let descricao = document.querySelector('#descricao');
let detalhadamento = document.querySelector('#detalhamento');
let formulario = document.querySelector('#criar-recado');
let tabela = document.querySelector('#recados');
let botaoSair = document.querySelector('#botaoSair');

document.addEventListener('DOMContentLoaded', carregarConteudo(listaRecados));
formulario.addEventListener('submit', criarRecado);
botaoSair.addEventListener('click', logOut);

function criarRecado(e){
    e.preventDefault();

    let infoDescricao = descricao.value;
    let infoDetalhadamento = detalhadamento.value;
    let recado = {
        indice:null,
        descricao:infoDescricao,
        detalhadamento:infoDetalhadamento
    };

    listaRecados.unshift(recado);

    window.localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));

    window.location.reload();
};

function carregarConteudo(listaRecados){
    let nomeUsuario = listaUsuarios[indiceUsuario].nome;
    let tituloPagina = document.querySelector('#titulo-2');
    
    tituloPagina.innerHTML = 'Recados de ' + nomeUsuario;

    descricao.focus();
    
    if(listaRecados.length > 0) {    
        for (const indice in listaRecados) {
            listaRecados[indice].indice = indice;
            window.localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
    
            let linha = document.createElement('tr');
            let coluna1 = document.createElement('td');
            let coluna2 = document.createElement('td');
            let coluna3 = document.createElement('td');
            let coluna4 = document.createElement('td');
    
            let linhaTabela = tabela.appendChild(linha);
            let colunaTabela1 = linhaTabela.appendChild(coluna1);
            let colunaTabela2 = linha.appendChild(coluna2);
            let colunaTabela3 = linha.appendChild(coluna3);
            let colunaTabela4 = linha.appendChild(coluna4);
    
            colunaTabela1.innerText = (Number(indice) + 1);
            colunaTabela2.innerText = listaRecados[indice].descricao;
            colunaTabela3.innerText = listaRecados[indice].detalhadamento;
            colunaTabela2.setAttribute('style', 'width: 20vw; word-break: break-word');
            colunaTabela3.setAttribute('style', 'width: 62vw; word-break: break-word');
    
            let apagar = document.createElement('input');
            let editar = document.createElement('input');
    
            colunaTabela4.setAttribute('style', 'display: flexbox');
            let botaoApagar = colunaTabela4.appendChild(apagar);
            let botaoEditar = colunaTabela4.appendChild(editar);
    
            botaoApagar.setAttribute('type', 'button');
            botaoApagar.setAttribute('class', 'apagar');
            botaoApagar.setAttribute('value', 'Apagar');
            botaoApagar.setAttribute('onclick', `apagarRecado(${indice})`);
    
            botaoEditar.setAttribute('type', 'button');
            botaoEditar.setAttribute('class', 'editar');
            botaoEditar.setAttribute('value', 'Editar');
            botaoEditar.setAttribute('onclick', `editarRecado(${indice})`);
        }
    }
};

function logOut(){
    window.sessionStorage.removeItem('login');
    window.sessionStorage.removeItem('usuario');
    window.location = './index.html';
};

function apagarRecado(indice){
    let confirmaApagar = window.confirm('Quer apagar o recado?');
        if(confirmaApagar){
            listaRecados.splice(indice, 1);
            window.localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
            window.location.reload();
            return;
        }else{
            return;
        }
};

function editarRecado(indice){
    descricao.value = listaRecados[indice].descricao;
    detalhadamento.value = listaRecados[indice].detalhadamento;
    let botaoSalvar = document.querySelector('#salvar');
    botaoSalvar.value = 'Atualizar';
    botaoSalvar.setAttribute('style', 'padding-left: 3px');
    formulario.removeEventListener('submit', criarRecado);
    let recadoEditado = listaRecados[indice];
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        recadoEditado.descricao = descricao.value;
        recadoEditado.detalhadamento = detalhadamento.value;
        listaRecados.splice(indice, 1, recadoEditado);
        window.localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
        window.location.reload();
    })
}