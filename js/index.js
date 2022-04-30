const form = document.getElementById('entrar');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = document.getElementById('user')
    const password = document.getElementById('password')

    let username = user.value;
    let senha = password.value;

    console.log(username + " + " + senha)
});



