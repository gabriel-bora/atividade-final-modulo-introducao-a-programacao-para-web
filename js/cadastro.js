let campoEmail = document.querySelector('#userEmail');
let labelEmail = document.querySelector('#label-userEmail');
let validEmail = false;

let campoSenha = document.querySelector('#userSenha');
let labelSenha = document.querySelector('#label-userSenha');
let validSenha = false;

let campoConfirmaSenha = document.querySelector('#userRepeteSenha');
let labelConfirmaSenha = document.querySelector('#label-userRepeteSenha');
let validConfirmaSenha = false;

let campoNome = document.querySelector('#userName');
let labelNome = document.querySelector('#label-userName');
let validNome = false;

let formulario = document.querySelector('#formCadastro');

campoEmail.addEventListener('keyup', verificaEmail);
campoSenha.addEventListener('keyup', verificaSenha);
campoNome.addEventListener('keyup', verificaNome);
campoConfirmaSenha.addEventListener('keyup', verificaConfirmaSenha);
formulario.addEventListener('submit', verificaCampos);

let regSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function verificaEmail(){
    if(campoEmail.value === ''){
        labelEmail.setAttribute('style', 'color: black');
        labelEmail.innerHTML = 'E-mail:';
        validEmail = false;
    }else{
        if(campoEmail.value.length < 10){
            labelEmail.setAttribute('style', 'color: red');
            labelEmail.innerHTML = 'E-mail: *O e-mail precisa ter mais de 10 caracteres';
            validEmail = false;
        }else{
            labelEmail.setAttribute('style', 'color: green');
            labelEmail.innerHTML = 'E-mail: *O e-mail tem mais de 10 caracteres';
            validEmail = true;
        }
    }
};

function verificaSenha(){
    let senhaValida = campoSenha.value.match(regSenha);

    if(campoSenha.value === ''){
        labelSenha.setAttribute('style', 'color: black');
        labelSenha.innerHTML = 'Senha:';
        validSenha = false;
    }else{
        if(campoSenha.value.length < 8){
            labelSenha.setAttribute('style', 'color: red');
            labelSenha.innerHTML = 'Senha: *A senha precisa ter mais de 8 caracteres';
            validSenha = false;
        }else if(senhaValida === null){
            labelSenha.setAttribute('style', 'color: red');
            labelSenha.innerHTML = 'Senha: <span style="font-size: 12px">*Deve conter: min??scula, mai??scula, n??mero e caracter especial</span>'; 
            validSenha = false;
        }else{
            labelSenha.setAttribute('style', 'color: green');
            labelSenha.innerHTML = 'Senha: *Senha apta';
            validSenha = true;
        }
    }
};

function verificaConfirmaSenha(){
    if(campoConfirmaSenha.value === ''){
        labelConfirmaSenha.setAttribute('style', 'color: black');
        labelConfirmaSenha.innerHTML = 'Repetir Senha:';
        validConfirmaSenha = false;
    }else{
        if(campoSenha.value !== campoConfirmaSenha.value){
            labelConfirmaSenha.setAttribute('style', 'color: red');
            labelConfirmaSenha.innerHTML = 'Repetir Senha: *A senha digitada n??o corresponde';
            validConfirmaSenha = false;
        }else{
            labelConfirmaSenha.setAttribute('style', 'color: green');
            labelConfirmaSenha.innerHTML = 'Repetir Senha: *As senhas correspondem';
            validConfirmaSenha = true;
        }
    }
};

function verificaNome(){
    if(campoNome.value === ''){
        labelNome.setAttribute('style', 'color: black');
        labelNome.innerHTML = 'Nome:';
        validNome = false;
    }else{
        if(campoNome.value.length < 3){
            labelNome.setAttribute('style', 'color: red');
            labelNome.innerHTML = 'Nome: *M??nimo de 3 caracteres';
            validNome = false;
        }else{
            labelNome.setAttribute('style', 'color: green');
            labelNome.innerHTML = 'Nome: *Nome apto';
            validNome = true;
        }
    }
};

function verificaCampos(e){
    e.preventDefault();

    if(campoEmail.value === '' || campoSenha.value === ''  || 
       campoConfirmaSenha.value === '' || campoNome.value === ''){
        alert('Algo deu errado! Por favor verifique se voc?? preencheu todos os campos.');
        return;
    }else if(!validEmail || !validSenha || !validConfirmaSenha || !validNome){
        alert('Campos incorretos! Por favor verifique se voc?? preencheu todos os campos corretamente.');
        return;
    }else {
        let listaUsuarios = JSON.parse(window.localStorage.getItem('usuarios'));
        
        if(listaUsuarios){
            let validaDuplicidade = listaUsuarios.some((valor) => {
                return valor.username === campoEmail.value;
            });

            if(validaDuplicidade){
                alert('E-mail j?? tinha sido cadastrado. Redirecionando para a p??gina de login.');
                window.location = './index.html';
                return;
            }else{
                alert('Conta criada com sucesso!');
                criaUsuario();
                let confirma = window.confirm('Deseja ir para a p??gina de login?')
                if(confirma){
                    window.location = './index.html';
                    return;
                }else{
                    window.location.reload();
                    return;
                }
            }
        }else{
            alert('Conta criada com sucesso!');
            criaUsuario();
            let confirma = window.confirm('Deseja ir para a p??gina de login?');
            if(confirma){
                window.location = './index.html';
            }else{
                window.location.reload();
                return;
            }
        }
    }
};

function criaUsuario(){
    let listaUsuarios = JSON.parse(window.localStorage.getItem('usuarios'));
    
    if(!listaUsuarios){
        listaUsuarios = []
    };
    
    let usuario = {
        username:campoEmail.value,
        password:campoSenha.value,
        nome:campoNome.value,
        recados:[]
    };

    listaUsuarios.push(usuario);

    window.localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
}