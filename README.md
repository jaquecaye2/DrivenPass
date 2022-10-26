<h1 align="center">
    <img  src="https://cdn-icons-png.flaticon.com/128/5410/5410234.png" width="100"> 
    <p>Driven Pass</p>
</h1>

<h3 align="center">
   🔑 Seu sistema para gerenciar suas senhas 🔑
</h3>

<h4 align="center">
	🚧 Concluído 🚀 🚧
</h4>

<h4 align="center">
	🌐 Link para o deploy: 🌐
</h4>

### 💻 Sobre o projeto
Navegar na internet pode ser uma atividade muito divertida, mas ao mesmo tempo, muito perigosa. Inúmeros estudos e levantamentos (nacionais e internacionais) mostram que o número de golpes virtuais não para de crescer. O que levanta a questão: como nos proteger?

Existem várias formas diferentes de se proteger. Tudo começa com o uso de senhas diferentes e seguras. Para uma senha ser segura, ela deve conter vários caracteres e números misturados, sem contar que o quanto mais longa ela for, melhor.

*Só que como vamos memorizar senhas gigantes e sem significado semântico?* É para resolver essa dor que os gerenciadores de senhas surgiram! Com eles, criamos apenas uma senha “mestra” e todas as outras senhas ficam gravadas em segredo! Logo, quando precisamos dela, basta lembrar da senha “mestra”!

### ⚙️ Funcionalidades

- [x] Usuários podem se cadastrar e logar no sistema
- [x] Usuários podem fazer a criação de credenciais, buscá-las ou deletá-las
- [x] Usuários podem fazer a criação de notas, buscá-las ou deletá-las
- [x] Usuários podem fazer a criação de cartões, buscá-los ou deletá-los
- [x] Usuários podem fazer a criação de senhas de wi-fi, buscá-las ou deletá-las

### 🚀 Como executar o projeto

Este projeto é composto pelo back-end

#### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [PostgreSQL](https://www.postgresql.org/). 
Além disto é bom ter um editor para trabalhar com o código, como [VSCode](https://code.visualstudio.com/).

#### 🎲 Rodando o servidor

```bash

# Clone este repositório
$ git clone https://github.com/jaquecaye2/DrivenPass-Back.git

# Acesse a pasta do projeto no terminal/cmd

# Instale as dependências
$ npm install

# Crie um arquivo .env e use o .env.example como base

# Informe a porta, a url para acesso ao banco de dados e uma chave-secreta no arquivo
const PORT = 4000;
const DATABASE_URL = postgres://{user}:{password}@{hostname}:{port}/{database-name};
const SECRET_KEY = nome_da_chave

# Execute a criação do banco de dados local
$ npx prisma migrate dev

# Execute a aplicação em modo de desenvolvimento
$ npm run dev
```

### 🛠 Tecnologias

Segue abaixo algumas das tecnologias utilizadas neste projeto:

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

### 📄 Documentação da API


### 👨‍💼 Fluxo de cadastro e login e logout

➡️ <span style="color:yellow"> **POST** </span> `/signup`

Nessa rota, usuários podem se cadastrar utilizando e-mail e senha.

O Body da requisição deve ser feito no seguinte formato:

```bash
{
   "email": "fulano@gmail.com", #string
   "password": "0123456789" #string com no mínimo 10 caracteres
}
```

➡️ <span style="color:yellow"> **POST** </span> `/signin`

Nessa rota, usuários podem logar utilizando o e-mail e senha cadastrados.

O Body da requisição deve ser feito no seguinte formato:

```bash
{
   "email": "fulano@gmail.com", #string
   "password": "0123456789" #string com no mínimo 10 caracteres
}
```

A resposta da requisição virá no seguinte formato: `Token`

```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjYzNDIyMzg0LCJleHAiOjE2NjM1MDg3ODR9.mMHu75gEifwiHTPz34fQT18D1-jdoPRTmpi7TgL_gEs
```

Importante salvar a resposta da requisição, visto que ela deverá ser utilizada nas demais rotas

➡️ <span style="color:yellow"> **DELETE** </span> `/logout`

Nessa rota, usuários podem se sair do sistema.


### 🌐 Fluxo de cadastro, busca e deleção de credenciais

OBS: Todas as rotas abaixo exigem que seja passado um parâmetro no Headers, com o seguinte formato:

```bash
header: Authorization
value: Bearer {{token}} #obtido como resposta na rota de login
```

➡️ <span style="color:green"> **POST** </span> `/credentials`

Nesta rota o usuário poderá registrar uma nova credencial, para isso, ele deverá fornecer uma url, um nome de usuário e uma senha. 

O usuário também precisa informar um título/nome/rótulo para essa credencial, uma vez que é possível cadastrar duas credenciais para um mesmo site.

Cada credencial deve possuir um título/nome/rótulo único, ou seja, se o usuário tentar criar duas credenciais com o mesmo nome, a aplicação deve impedi-lo (o que não impede que outras pessoas usem esse título).

O Body da requisição deve ser feito no seguinte formato:

```bash
{
  "title": "Titulo da credencial", #string
  "url": "http://www.nome_site.com.br", #string com no formato de URL
  "user_name": "Nome do usuário", #string
  "password": "Senha do usuário" #string
}
```

➡️ <span style="color:yellow"> **GET** </span> `/credentials`

Nessa rota, é possível acessar todos as credenciais cadastradas pelo usuário.

A resposta da requisição virá no seguinte formato:

```bash
[
  {
    "id": 1,
    "user_id": 1,
    "title": "Credencial Instagram",
    "url": "https://www.instagram.com/",
    "user_name": "Fulano de tal",
    "password": "0123456789",
    "created_at": "2022-09-11T22:02:52.654Z"
  },
  {
    "id": 1,
    "user_id": 1,
    "title": "Credencial Facebook",
    "url": "https://www.facebook.com",
    "user_name": "Fulano",
    "password": "456789",
    "created_at": "2022-10-26T19:46:01.413Z"
  }
]
```

➡️ <span style="color:yellow"> **GET** </span> `/credentials/:id`

Nessa rota, é possível acessar uma credencial específica que foi cadastrada pelo usuário.

O "id" passado na rota é o id da credencial desejada.

A resposta da requisição virá no seguinte formato:

```bash
{
  "id": 1,
  "user_id": 1,
  "title": "Credencial Instagram",
  "url": "https://www.instagram.com/",
  "user_name": "Fulano de tal",
  "password": "0123456789",
  "created_at": "2022-09-11T22:02:52.654Z"
}
```

➡️ <span style="color:yellow"> **DELETE** </span> `/credentials/:id`

Nessa rota, é possível deletar uma credencial específica que foi cadastrada pelo usuário.

O "id" passado na rota é o id da credencial desejada.

A resposta da requisição virá no seguinte formato:

```bash
Credencial deletada com sucesso
```

### 📝 Fluxo de cadastro, busca e deleção de notas seguras

OBS: Todas as rotas abaixo exigem que seja passado um parâmetro no Headers, com o seguinte formato:

```bash
header: Authorization
value: Bearer {{token}} #obtido como resposta na rota de login
```

➡️ <span style="color:green"> **POST** </span> `/notes`

Nesta rota o usuário poderá registrar uma nova nota, para isso, ele deverá fornecer um título e anotação si.

Cada anotação deve possuir um título único, ou seja, se o usuário tentar criar duas anotações com o mesmo nome, a aplicação deve impedi-lo (o que não impede que outras pessoas usem esse título).

O Body da requisição deve ser feito no seguinte formato:

```bash
{
  "title": "Nome da nota", #string com no máximo 50 caracteres
  "note": "Descrição da nota" #string com no máximo 1000 caracteres
}
```

➡️ <span style="color:yellow"> **GET** </span> `/notes`

Nessa rota, é possível acessar todas as notas seguras cadastradas pelo usuário.

A resposta da requisição virá no seguinte formato:

```bash
[
  {
    "id": 1,
    "user_id": 1,
    "title": "Nota 1",
    "note": "Descrição da nota 1",
    "created_at": "2022-09-10T21:45:53.997Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "title": "Nota 2",
    "note": "Descrição da nota 2",
    "created_at": "2022-09-11T22:09:10.976Z"
  },
  {
    "id": 3,
    "user_id": 1,
    "title": "Nota 3",
    "note": "Descrição da nota 3",
    "created_at": "2022-10-26T19:50:10.831Z"
  }
]
```

➡️ <span style="color:yellow"> **GET** </span> `/notes/:id`

Nessa rota, é possível acessar uma nota específica que foi cadastrada pelo usuário.

O "id" passado na rota é o id da nota desejada.

A resposta da requisição virá no seguinte formato:

```bash
{
  "id": 1,
  "user_id": 1,
  "title": "Nota 1",
  "note": "Descrição da nota 1",
  "created_at": "2022-09-10T21:45:53.997Z"
}
```

➡️ <span style="color:yellow"> **DELETE** </span> `/notes/:id`

Nessa rota, é possível deletar uma nota específica que foi cadastrada pelo usuário.

O "id" passado na rota é o id da nota desejada.

A resposta da requisição virá no seguinte formato:

```bash
Nota deletada com sucesso
```

### 💳 Fluxo de cadastro, busca e deleção de cartões

OBS: Todas as rotas abaixo exigem que seja passado um parâmetro no Headers, com o seguinte formato:

```bash
header: Authorization
value: Bearer {{token}} #obtido como resposta na rota de login
```

➡️ <span style="color:green"> **POST** </span> `/cards`

Nesta rota o usuário poderá registrar um novo cartão, para isso, ele deverá fornecer o número do cartão, o nome impresso, o código de segurança, a data de expiração, a senha, se ele é virtual e o seu tipo (crédito, débito ou ambos).

Cada cartão deve possuir um título/nome/rótulo único, ou seja, se o usuário tentar criar dois cartões com o mesmo nome, a aplicação deve impedi-lo (o que não impede que outras pessoas usem esse título).

O Body da requisição deve ser feito no seguinte formato:

```bash
{
  "title": "Título do cartão", #string
  "number": "0123456789012345", #string com tamanho de 16 caracteres
  "name": "Nome que esta no cartão", #string
  "security_code": "012", #string com tamanho de 3 caracteres
  "expiration_date": "12/25", #data
  "password": "0123", #string com tamanho de 4 caracteres
  "isVirtual": true, #boleano
  "type": "both", #string do tipo "credit", "debit" ou "both"
}
```

➡️ <span style="color:yellow"> **GET** </span> `/cards`

Nessa rota, é possível acessar todos os cartões cadastrados pelo usuário.

A resposta da requisição virá no seguinte formato:

```bash
[
  {
    "id": 1,
    "user_id": 1,
    "title": "Cartão de débito Mastercard",
    "number": "1234567890123456",
    "name": "FULANO S. SILVA",
    "security_code": "013",
    "expiration_date": "12/25",
    "password": "2567",
    "isVirtual": false,
    "type": "debit",
    "created_at": "2022-09-11T21:58:38.212Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "title": "Cartão de crédito Mastercard",
    "number": "0124478914567894",
    "name": "CLICLANO S. PEREIRA",
    "security_code": "058",
    "expiration_date": "05/29",
    "password": "1234",
    "isVirtual": false,
    "type": "credit",
    "created_at": "2022-10-26T19:52:50.901Z"
  }
]
```

➡️ <span style="color:yellow"> **GET** </span> `/cards/:id`

Nessa rota, é possível acessar um cartão específico que foi cadastrado pelo usuário.

O "id" passado na rota é o id do cartão desejado.

A resposta da requisição virá no seguinte formato:

```bash
{
  "id": 1,
  "user_id": 1,
  "title": "Cartão de débito Mastercard",
  "number": "1234567890123456",
  "name": "FULANO S. SILVA",
  "security_code": "013",
  "expiration_date": "12/25",
  "password": "2567",
  "isVirtual": false,
  "type": "debit",
  "created_at": "2022-09-11T21:58:38.212Z"
}
```

➡️ <span style="color:yellow"> **DELETE** </span> `/cards/:id`

Nessa rota, é possível deletar um cartão específico que foi cadastrado pelo usuário.

O "id" passado na rota é o id do cartão desejado.

A resposta da requisição virá no seguinte formato:

```bash
Cartão deletado com sucesso
```

### 📶 Fluxo de cadastro, busca e deleção de redes wi-fi

OBS: Todas as rotas abaixo exigem que seja passado um parâmetro no Headers, com o seguinte formato:

```bash
header: Authorization
value: Bearer {{token}} #obtido como resposta na rota de login
```

➡️ <span style="color:green"> **POST** </span> `/wifi`

Nesta rota o usuário poderá registrar uma nova rede wi-fi, para isso, ele deverá fornecer o nome da rede e senha da rede.

Para diferenciar as redes entre si, o usuário deverá também informar um título/nome/rótulo para cada uma delas (Ex: Wifi do vizinho). Esse dado pode se repetir.

O Body da requisição deve ser feito no seguinte formato:

```bash
{
  "title": "Titulo para a rede wi-fi", #string
  "name_wifi": "Nome da rede wi-fi", #string
  "password": "Senha da rede wi-fi" #string
}
```

➡️ <span style="color:yellow"> **GET** </span> `/wifi`

Nessa rota, é possível acessar todas as redes wi-fi cadastradas pelo usuário.

A resposta da requisição virá no seguinte formato:

```bash
[
  {
    "id": 1,
    "user_id": 1,
    "title": "Rede apartamento 1102",
    "name_wifi": "Claro apto_1102",
    "password": "58963",
    "created_at": "2022-09-11T22:05:05.601Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "title": "Rede vizinho",
    "name_wifi": "Rede Claro 350",
    "password": "senha-segura",
    "created_at": "2022-10-26T19:55:48.404Z"
  }
]
```

➡️ <span style="color:yellow"> **GET** </span> `/wifi/:id`

Nessa rota, é possível acessar uma rede wi-fi específica que foi cadastrada pelo usuário.

O "id" passado na rota é o id da rede wi-fi desejada.

A resposta da requisição virá no seguinte formato:

```bash
{
  "id": 1,
  "user_id": 1,
  "title": "Rede apartamento 1102",
  "name_wifi": "Claro apto_1102",
  "password": "58963",
  "created_at": "2022-09-11T22:05:05.601Z"
}
```

➡️ <span style="color:yellow"> **DELETE** </span> `/wifi/:id`

Nessa rota, é possível deletar uma rede wi-fi específica que foi cadastrada pelo usuário.

O "id" passado na rota é o id da rede wi-fi desejada.

A resposta da requisição virá no seguinte formato:

```bash
Wifi deletado com sucesso
```

### 👩🏻 Autora
<img style="border-radius: 200" src="https://avatars.githubusercontent.com/u/102393976?s=400&u=aba5f19bf20b58d80146b343326cdb4fac491351&v=4" width="100" alt=""/>          |           <b>Jaqueline Caye</b>

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=for-the-badge&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/jaqueline-caye-614449137/)](https://www.linkedin.com/in/jaqueline-caye-614449137/)
