let login = window.sessionStorage.getItem('login');

if(!login){
    window.location = "./index.html";
}

let usuario = window.sessionStorage.getItem('usuario');
let listaUsuarios = JSON.parse(window.localStorage.getItem('usuarios'));
let indiceUsuario;

for (const indice in listaUsuarios) {
    if(listaUsuarios[indice].username == usuario){
        indiceUsuario = indice;
    }
}

let listaRecados = listaUsuarios[indiceUsuario].recados;

let descricao = document.getElementById('descricao');
let detalhadamento = document.getElementById('detalhamento');
let formulario = document.getElementById('criar-recado');
let tabela = document.getElementById('recados');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    let infoDescricao = descricao.value;
    let infoDetalhadamento = detalhadamento.value;
    let recado = {
        indice:null,
        descricao:infoDescricao,
        detalhadamento:infoDetalhadamento
    }
    listaRecados.push(recado);

    window.localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));

    window.location.reload();
})

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

        let apagar = document.createElement('input');
        let editar = document.createElement('input');

        colunaTabela4.setAttribute('style', 'display: flexbox');
        let botaoApagar = colunaTabela4.appendChild(apagar);
        let botaoEditar = colunaTabela4.appendChild(editar);

        botaoApagar.setAttribute('type', 'button');
        botaoApagar.setAttribute('class', 'apagar');
        botaoApagar.setAttribute('value', 'Apagar');

        botaoEditar.setAttribute('type', 'button');
        botaoEditar.setAttribute('class', 'editar');
        botaoEditar.setAttribute('value', 'Editar');
    }
}

let botaoSair = document.getElementById('botaoSair');

botaoSair.addEventListener('click', function(){
    window.sessionStorage.removeItem('login');
    window.sessionStorage.removeItem('login');
    window.location = "./index.html";
})