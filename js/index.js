let login = window.sessionStorage.getItem('login');

if(login){
    window.location = './meus-recados.html';
}

let form = document.querySelector('#entrar');

let user = document.querySelector('#user');
let password = document.querySelector('#password');

let listaUsuarios = JSON.parse(window.localStorage.getItem('usuarios'));

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    let username = user.value;
    let senha = password.value;

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
            window.location = './meus-recados.html';
            return;
        }else {
            alert('E-mail ou senha incorretos.');
            return;
        }
    }
});