let usuarios = [];

async function carregarUsuarios() {
    const resposta = await fetch("http://localhost:3000/usuarios");
    usuarios = await resposta.json();
}

async function loginUser() {
    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;

    const usuario = usuarios.find(
        u => u.login === login && u.senha === senha
    );

    if (!usuario) {
        alert("Login ou senha inválidos");
        return;
    }

    sessionStorage.setItem(
        "usuarioCorrente",
        JSON.stringify(usuario)
    );

    window.location.href = "../../../index.html";
}

window.onload = async () => {
    await carregarUsuarios();

    document
        .getElementById("btnLogin")
        .addEventListener("click", loginUser);
};