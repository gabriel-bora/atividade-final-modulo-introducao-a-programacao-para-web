let campoEmail = document.querySelector("#userEmail");
let labelEmail = document.querySelector("#label-userEmail");
let validEmail = false;

let campoSenha = document.querySelector("#userSenha");
let labelSenha = document.querySelector("#label-userSenha");
let validSenha = false;

let campoConfirmaSenha = document.querySelector("#userRepeteSenha");
let labelConfirmaSenha = document.querySelector("#label-userRepeteSenha");
let validConfirmaSenha = false;

let formulario = document.querySelector("#formCadastro");

campoEmail.addEventListener('keyup', verificaEmail);
campoSenha.addEventListener('keyup', verificaSenha);
campoConfirmaSenha.addEventListener('keyup', verificaConfirmaSenha);
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    verificaCampos();
});

let regSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function verificaEmail(){
    if(campoEmail.value === ""){
        labelEmail.setAttribute("style", "color: black");
        labelEmail.innerHTML = "E-mail:";
        validEmail = false;
    }else{
        if(campoEmail.value.length < 10){
            labelEmail.setAttribute("style", "color: red");
            labelEmail.innerHTML = "E-mail: *O e-mail precisa ter mais de 10 caracteres";
            validEmail = false;
        }else{
            labelEmail.setAttribute("style", "color: green");
            labelEmail.innerHTML = "E-mail: *O e-mail tem mais de 10 caracteres";
            validEmail = true;
        }
    }
}

function verificaSenha(){
    let senhaValida = campoSenha.value.match(regSenha);

    if(campoSenha.value === ""){
        labelSenha.setAttribute("style", "color: black");
        labelSenha.innerHTML = "Senha:";
        validSenha = false;
    }else{
        if(campoSenha.value.length < 8){
            labelSenha.setAttribute("style", "color: red");
            labelSenha.innerHTML = "Senha: *A senha precisa ter mais de 8 caracteres"
            validSenha = false;
        }else if(senhaValida === null){
            labelSenha.setAttribute("style", "color: red");
            labelSenha.innerHTML = 'Senha: <span style="font-size: 12px">*Deve conter: minúscula, maiúscula, número e caracter especial</span>'; 
            validSenha = false;
        }else{
            labelSenha.setAttribute("style", "color: green");
            labelSenha.innerHTML = "Senha: *Senha apta";
            validSenha = true;
        }
    }
}

function verificaConfirmaSenha(){
    if(campoConfirmaSenha.value === ""){
        labelConfirmaSenha.setAttribute("style", "color: black");
        labelConfirmaSenha.innerHTML = "Repetir Senha:";
        validConfirmaSenha = false;
    }else{
        if(campoSenha.value !== campoConfirmaSenha.value){
            labelConfirmaSenha.setAttribute("style", "color: red");
            labelConfirmaSenha.innerHTML = "Repetir Senha: *A senha digitada não corresponde";
            validConfirmaSenha = false;
        }else{
            labelConfirmaSenha.setAttribute("style", "color: green");
            labelConfirmaSenha.innerHTML = "Repetir Senha: *As senhas correspondem";
            validConfirmaSenha = true;
        }
    }
}

function verificaCampos(){
        if(campoEmail.value === '' || campoSenha.value === ''  || campoConfirmaSenha.value === ''){
        alert('Algo deu errado! Por favor verifique se você preencheu todos os campos.');
        return;
       
    }else if(!validEmail || !validSenha || !validConfirmaSenha){
        alert('Campos incorretos! Por favor verifique se você preencheu todos os campos corretamente.');
        return;
        
    }else {
        let listaUsuarios = JSON.parse(window.localStorage.getItem('usuarios'));
        
        if(listaUsuarios){
            for (const elemento of listaUsuarios) {
                if(campoEmail.value == elemento.username){
                    alert('E-mail já tinha sido cadastrado. Redirecionando para a página de login.');
                    window.location = "./index.html";
                    return;
                }else{
                    alert('Conta criada com sucesso!');
                    criaUsuario();
                }
            }
        }else{
            alert('Conta criada com sucesso!');
            criaUsuario();
        }
    }
}

function criaUsuario(){
    let listaUsuarios = JSON.parse(window.localStorage.getItem('usuarios'));
    
    if(!listaUsuarios){
        listaUsuarios = []
    }
    
    let usuario = {
        username:campoEmail.value,
        password:campoSenha.value,
        recados:[]
    };

    listaUsuarios.push(usuario);

    window.localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));

    labelEmail.setAttribute("style", "color: black");
    labelEmail.innerHTML = "E-mail:";
    validEmail = false;
    campoEmail.value = ""
    labelSenha.setAttribute("style", "color: black");
    labelSenha.innerHTML = "Senha:";
    validSenha = false;
    campoSenha.value = ""
    labelConfirmaSenha.setAttribute("style", "color: black");
    labelConfirmaSenha.innerHTML = "Repetir Senha:";
    validConfirmaSenha = false;
    campoConfirmaSenha.value = ""
}