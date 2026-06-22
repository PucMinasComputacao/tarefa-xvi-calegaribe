# Guia Turístico de Sete Lagoas

## Autor

**Nome:** Bernardo Calegari de Oliveira Simeão
**Curso:** Engenharia de Software
**Código de Pessoa:** 915110

---

## Descrição do Projeto

O projeto Guia Turístico de Sete Lagoas tem como objetivo apresentar informações sobre destinos turísticos de Minas Gerais de forma dinâmica e interativa.

A aplicação utiliza HTML, CSS, JavaScript e JSON Server para disponibilizar operações CRUD (Create, Read, Update e Delete) sobre os destinos cadastrados.

---

## Tecnologias Utilizadas

* HTML5
* CSS3
* Bootstrap 5
* JavaScript ES6
* JSON Server
* API Fetch
* Node.js
* Git e GitHub

---

## Estrutura do Banco de Dados

Arquivo: `db/db.json`

```json
{
  "usuarios": [
    {
      "id": 1,
      "login": "admin",
      "senha": "123456",
      "nome": "Administrador"
    }
  ],
  "lugares": [
    {
      "id": 1,
      "nome": "Sete Lagoas",
      "categoria": "Ecoturismo",
      "preco": "Gratuito"
    }
  ]
}
```

---

## Funcionalidades

* Listagem de destinos turísticos
* Visualização de detalhes
* Cadastro de novos destinos
* Edição de destinos
* Exclusão de destinos
* Sistema de favoritos
* Sistema de login

---

## Página Inicial

![Página Inicial](prints/home.png)

---

## Página de Detalhes

![Página de Detalhes](prints/detalhes.png)

---

## Testes da API

### GET

![GET](prints/get.png)

### POST

![POST](prints/post.png)

### PUT

![PUT](prints/put.png)

### DELETE

![DELETE](prints/delete.png)

---

## Requisições Fetch (Network)

### GET e POST

![Network](prints/network.png)

---

## Como Executar

### Instalar dependências

```bash
npm install
```

### Executar JSON Server

```bash
npm run server
```

### Abrir a aplicação

Abrir o arquivo `index.html` utilizando o Live Server do VS Code.

---

## Endpoints da API

### Listar destinos

```http
GET /lugares
```

### Cadastrar destino

```http
POST /lugares
```

### Atualizar destino

```http
PUT /lugares/:id
```

### Excluir destino

```http
DELETE /lugares/:id
```

---

## Versionamento

### v1.0

Ambiente inicial do projeto.

### v2.0

Criação da API REST com JSON Server.

### v3.0

Implementação do CRUD completo.

### v4.0

Atualização da documentação.
