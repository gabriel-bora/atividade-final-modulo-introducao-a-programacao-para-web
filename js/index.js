let login = window.sessionStorage.getItem('login');

if(login){
    window.location = "./meus-recados.html";
}

const form = document.getElementById('entrar');

const user = document.getElementById('user');
const password = document.getElementById('password');

let listaUsuarios = JSON.parse(window.localStorage.getItem('usuarios'));

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    let username = user.value;
    let senha = password.value;

    let validacao = false;

    for (const elemento of listaUsuarios) {
        if ((username == elemento.username) && (senha == elemento.password)) {
            validacao = true;
        }
    }

    if(validacao === true){
        window.sessionStorage.setItem('login', true);
        window.sessionStorage.setItem('usuario', username);
        window.location = "./meus-recados.html";
        return;
    }else {
        alert('E-mail ou senha incorretos.');
        return;
    }
});



