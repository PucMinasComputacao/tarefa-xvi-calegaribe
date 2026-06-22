async function fetchItems() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dadosGlobais.lugares);
        }, 50);
    });
}

function logoutUser() {
    sessionStorage.removeItem("usuarioCorrente");

    window.location.href =
        "./modulos/login/index.html";
}

function getUsuarioLogado() {
    return JSON.parse(sessionStorage.getItem("usuarioCorrente"));
}

function getFavoritos() {
    const usuario = getUsuarioLogado();

    if (!usuario) return [];

    return JSON.parse(
        localStorage.getItem(`favoritos_${usuario.id}`)
    ) || [];
}

function salvarFavoritos(lista) {
    const usuario = getUsuarioLogado();

    localStorage.setItem(
        `favoritos_${usuario.id}`,
        JSON.stringify(lista)
    );
}

function createCard(lugar) {

    const favoritos = getFavoritos();

    const favoritado =
        favoritos.includes(lugar.id);

    const cardCol = document.createElement("div");

    cardCol.className = "col";

    cardCol.innerHTML = `
        <div class="card h-100 shadow-sm rounded-3 overflow-hidden card-hover">

            <img src="${lugar.imagem_principal}"
                 class="card-img-top"
                 alt="${lugar.nome}">

            <div class="card-body d-flex flex-column">

                <div class="d-flex justify-content-between align-items-center">

                    <small class="text-uppercase fw-bold text-info">
                        ${lugar.categoria}
                    </small>

                    <button
                        class="btn btn-sm favorito-btn"
                        data-id="${lugar.id}"
                    >
                        <i class="${
                            favoritado
                            ? 'fa-solid'
                            : 'fa-regular'
                        } fa-heart text-danger"></i>
                    </button>

                </div>

                <h5 class="card-title fw-bold text-dark mt-2">
                    ${lugar.nome}
                </h5>

                <p class="card-text text-secondary small flex-grow-1">
                    ${lugar.descricao}
                </p>

                <div class="my-2 small fw-semibold text-muted">
                    Acesso: ${lugar.preco}
                </div>

                <a href="detalhes.html#${lugar.id}"
                   class="btn btn-outline-dark btn-sm rounded-pill mt-3 w-100 fw-medium">
                    Ver detalhes
                </a>

            </div>
        </div>
    `;

    return cardCol;
}
document.addEventListener("DOMContentLoaded", async () => {

    atualizarAreaLogin();
    const lugares = await fetchItems();
    
    const carouselContainer = document.getElementById("carousel-container");
    const cardsContainer = document.getElementById("cards-container");
    
    if (carouselContainer) carouselContainer.innerHTML = "";
    if (cardsContainer) cardsContainer.innerHTML = "";

    const itensDestaque = lugares.filter(lugar => lugar.destaque);
    let primeiroItem = true;

    if (carouselContainer) {
        itensDestaque.forEach(lugar => {
            const itemCarousel = document.createElement("div");
            itemCarousel.className = `carousel-item ${primeiroItem ? 'active' : ''}`;
            primeiroItem = false;

            itemCarousel.innerHTML = `
                <img src="${lugar.imagem_principal}" class="d-block w-100" alt="${lugar.nome}">
                <div class="carousel-caption d-none d-md-block text-start">
                    <span class="badge bg-info text-dark mb-2 text-uppercase fw-bold">${lugar.categoria}</span>
                    <h3 class="fw-bold text-white">${lugar.nome}</h3>
                    <p class="text-light-50">${lugar.descricao}</p>
                    <a href="detalhes.html#${lugar.id}" class="btn btn-info btn-sm rounded-pill px-4 text-dark fw-semibold">Explorar Cidade</a>
                </div>
            `;
            carouselContainer.appendChild(itemCarousel);
        });
    }

    if (cardsContainer) {

    lugares.forEach(lugar => {
        cardsContainer.appendChild(
            createCard(lugar)
        );
    });

    configurarFavoritos();
}

        function atualizarAreaLogin() {
            const area =
        document.getElementById("login-area");

    if (!area) return;

    const usuario = JSON.parse(sessionStorage.getItem("usuarioCorrente"));

    if (usuario) {
        area.innerHTML = `
            <span class="text-white">   
                Olá, ${usuario.nome}
            </span>
            |
            <a href="#" id="logout-link" class="text-warning">
                Sair
            </a>
        `;

        document
            .getElementById("logout-link")
            .addEventListener("click", (e) => {
                e.preventDefault();
                logoutUser();
            });

    } else {
        area.innerHTML = `
         <a href="./modulos/login/index.html"
             class="nav-link">
             Entrar
         </a>
       `;
    }
}
function configurarFavoritos() {

    document
        .querySelectorAll(".favorito-btn")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                const usuario = getUsuarioLogado();

                if (!usuario) {

                   alert("Faça login para favoritar.");

                   window.location.href =
                     "./modulos/login/index.html";

                   return;
}

                const idLugar =
                    Number(btn.dataset.id);

                let favoritos =
                    getFavoritos();

                if (
                    favoritos.includes(idLugar)
                ) {

                    favoritos =
                        favoritos.filter(
                            id => id !== idLugar
                        );

                } else {

                    favoritos.push(idLugar);
                }

                salvarFavoritos(favoritos);

                location.reload();
            });

        });

}
});