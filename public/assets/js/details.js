const API_URL =
    "http://localhost:3000/lugares";

async function fetchItemById(id) {

    const response =
        await fetch(`${API_URL}/${id}`);

    return await response.json();
}

function mostrarErro(container, titulo, mensaje) {
    container.innerHTML = `
        <div class="alert alert-warning text-center my-5 rounded-3 shadow-sm">
            <i class="fa-solid fa-triangle-exclamation fs-1 d-block mb-2"></i>
            <h4 class="fw-bold">${titulo}</h4>
            <p>${mensaje}</p>
            <a href="index.html" class="btn btn-dark btn-sm rounded-pill px-4">Voltar ao Início</a>
        </div>
    `;
}

function renderizarPagina(container, lugar) {
    const tagsHTML = lugar.tags.map(tag => `<span class="badge bg-secondary me-1 py-1 px-2 rounded-pill">${tag}</span>`).join('');

    container.innerHTML = `
        <div class="row g-4 align-items-start">
            <div class="col-lg-7">
                <div class="card border-0 shadow rounded-4 overflow-hidden bg-white">
                    <img src="${lugar.imagem_principal}" class="main-detail-img img-fluid" alt="${lugar.nome}">
                    <div class="card-body p-4">
                        <span class="badge bg-info text-dark text-uppercase fw-bold mb-2">${lugar.categoria}</span>
                        <h1 class="display-5 fw-bold text-dark mb-3">${lugar.nome}</h1>
                        <p class="lead text-secondary" style="font-style: italic;">"${lugar.descricao}"</p>
                        <div class="mb-3">${tagsHTML}</div>
                        <hr>
                        <h4 class="fw-bold text-dark">História e Potencial Turístico</h4>
                        <p class="text-secondary lh-lg">${lugar.conteudo}</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-5">
                <h5 class="fw-bold text-dark mb-3"><i class="fa-solid fa-images text-info me-2"></i>Atrações</h5>
                <div class="row row-cols-1 g-3" id="atracoes-list"></div>
            </div>
        </div>
    `;

    const atracoesList = document.getElementById("atracoes-list");
    if (lugar.atracoes && lugar.atracoes.length > 0) {
        lugar.atracoes.forEach(atracao => {
            const div = document.createElement("div");
            div.className = "col";
            div.innerHTML = `
                <div class="card border-0 shadow-sm rounded-3 bg-white p-3">
                    <h6 class="fw-bold mb-1">${atracao.nome}</h6>
                    <p class="card-text text-muted small mb-0">${atracao.descricao}</p>
                </div>
            `;
            atracoesList.appendChild(div);
        });
    } else {
        atracoesList.innerHTML = `<p class="text-muted small text-secondary">Nenhuma atração cadastrada para este destino.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("detalhe-container");

    const idParam = window.location.hash.substring(1);

    if (!idParam) {
        mostrarErro(container, "Identificador ausente", "Nenhum destino foi selecionado.");
        return;
    }

    try {
        const lugar = await fetchItemById(idParam);

        if (!lugar) {
            mostrarErro(container, "Destino não encontrado", "O destino solicitado não existe na nossa base.");
            return;
        }

        renderizarPagina(container, lugar);

    } catch (error) {
        console.error(error);
        mostrarErro(container, "Erro de Carregamento", "Ocorreu uma falha ao renderizar os detalhes.");
    }
});