let login = window.sessionStorage.getItem('login');

if(login){
    alert('Você já está logado!');
    window.location = './home.html';
}

let form = document.querySelector('#entrar');
let campoUser = document.querySelector('#user');
let campoSenha = document.querySelector('#password');
let listaUsuarios = JSON.parse(window.localStorage.getItem('usuarios'));

form.addEventListener('submit', entrar);

function entrar(e){
    e.preventDefault();
    
    let username = campoUser.value;
    let senha = campoSenha.value;

    if (!listaUsuarios){
        alert('Você não está cadastrado. Redirecionando para página de cadastro.');
        window.location = './cadastro.html';
        return;
    }else{
        let validacao = listaUsuarios.some((valor) => {
            return valor.username === username && valor.password === senha;
        });
    
        if(validacao){
            window.sessionStorage.setItem('login', true);
            window.sessionStorage.setItem('usuario', username);
            window.location = './home.html';
            return;
        }else {
            alert('E-mail ou senha incorretos.');
            campoUser.value = '';
            campoSenha.value = '';
            campoUser.focus();
            return;
        }
    }
}