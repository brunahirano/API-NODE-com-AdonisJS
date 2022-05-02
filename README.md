
# Be Mobile - Desafio Back-end

O desafio de back-end da Be Mobile consiste em estruturar uma API RESTful e um banco de dados ligado a esta API. Trate-se de um sistema que permite cadastrar usuários externamente e, ao realizarem login, poderão registrar clientes, produtos e vendas. O(a) candidato(a) poderá escolher desenvolver em Node.js (Adonis) ou PHP (Laravel).


## Requisitos

- Node.js instalado
    - Esta API foi desenvolvida com o node v16.13.0
- AdonisJs instalado


## Variáveis de Ambiente

Para conectar ao banco de dados MySql, você vai precisar consfigurar as variáveis de ambiente no seu .env

- Utilize o arquivo .env.example para configurar e após renomei o arquivo para .env;



## Iniciando o projeto
- Clonar ou baixar esse projeto para seu computador;
- Digite no terminal o comando `npm install`, assim instalará todas as dependências necessárias para rodar a API; 
- Digite o comando `adonis serv --dev` ou `npm start` para iniciar o server, geralmente `http://127.0.0.1:3333` é o server inicializado.

## Modelagem do Banco de Dados - MySQL
![](https://github.com/brunahirano/API_Be_mobile/blob/main/model_db/print_Model_db.png)


## Modelo banco de dados
- Caso tenha interesse:
    - Faça o import no MySQLWorkbench do documento chamado `model_db.sql` que está pasta `model_db` para acessar a modelagem do banco de dados da API.
    
- Ou digite no terminal: `adonis migration:run`, para fazer a migração das tabelas para o seu banco de dados automaticamente.
  
## Documentação da API


#### Cadastro do usuário 
```http
  POST/SEU-SERVER/users/register
```
Passar parâmetros no body da requisição em formato JSON:

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `username` | `string` | **Obrigatório** |
| `email` | `string` | **Obrigatório** |
| `password` | `string` | **Obrigatório** |

#### Autenticação do usuário
```http
  POST/SEU-SERVER/users/authenticate
```
Passar parâmetros no body da requisição em formato JSON:

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório** |
| `password` | `string` | **Obrigatório** |

Na resposta desse requisição você terá acesso ao ***token*** JWT, tipo bearer para ter permissão de acesso para as demais rotas da aplicação.

## Rota Clientes
Não esqueça de configurar a Authorization tipo Bearer token, senão você não terá acesso a essas rotas.

#### Retorna todos os clientes (index)

```http
  GET/SEU-SERVER/clients
```

#### Retorna um cliente

```http
  GET/SEU-SERVER/clients/id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `INT` | **Obrigatório** passar como parâmetro na URL da requisição. O ID do cliente que você quer detalhar|

#### Cadastrar um cliente (store)

```http
  POST/SEU-SERVER/clients
```
Passar parâmetros no body da requisição em formato JSON:

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `username` | `string` | **Obrigatório** |
| `cpf` | `string` | **Obrigatório** |
| `email` | `string` | **Obrigatório** |


#### Editar um cliente (update)

```http
  PUT/SEU-SERVER/clients/id
```
Passar parâmetros no body da requisição em formato JSON:

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
|`id`      | `INT` | **Obrigatório** passar como parâmetro na URL da requisição. O ID do cliente que você quer editar|
| `username` | `string` | **Obrigatório** |
| `cpf` | `string` | **Obrigatório** |
| `email` | `string` | **Obrigatório** |


#### Excluir um cliente (delete)
```http
  DELETE/SEU-SERVER/clients/id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `INT` | **Obrigatório** passar como parâmetro na URL da requisição. O ID do cliente que você quer excluir|

## Rota Produtos
Não esqueça de configurar a Authorization tipo Bearer token, senão você não terá acesso a essas rotas.

#### Retorna todos os produtos (index)

```http
  GET/SEU-SERVER/products
```

#### Retorna um produto

```http
  GET/SEU-SERVER/products/id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `INT` | **Obrigatório** passar como parâmetro na URL da requisição. O ID do produto que você quer detalhar|


#### Cadastrar um cliente (store)

```http
  POST/SEU-SERVER/products
```
Passar parâmetros no body da requisição em formato JSON:

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | **Obrigatório** |
| `author` | `string` | **Obrigatório** |
| `genre` | `string` | **Obrigatório** |
| `year` | `INT` | **Obrigatório** |
| `price` | `double` | **Obrigatório** |

#### Editar um cliente (update)

```http
  PUT/SEU-SERVER/products/id
```
Passar parâmetros no body da requisição em formato JSON:


| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
|`id`      | `INT` | **Obrigatório** passar como parâmetro na URL da requisição. O ID do produto que você quer editar|
| `title` | `string` | **Obrigatório** |
| `author` | `string` | **Obrigatório** |
| `genre` | `string` | **Obrigatório** |
| `year` | `INT` | **Obrigatório** |
| `price` | `double` | **Obrigatório** |


#### Excluir um produto (delete)
```http
  DELETE/SEU-SERVER/products/id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `INT` | **Obrigatório** passar como parâmetro na URL da requisição. O ID do produto que você quer excluir|


## Rotas de compras
Não esqueça de configurar a Authorization tipo Bearer token, senão você não terá acesso a essas rotas.

#### Retorna todos as compras (index)

```http
  GET/SEU-SERVER/sales
```

#### Retorna uma compra

```http
  GET/SEU-SERVER/sales/id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `INT` | **Obrigatório** passar como parâmetro na URL da requisição. O ID da compra que você quer detalhar|

#### Cadastrar uma venda com  1 produto e 1 cliente  (store)

```http
  POST/SEU-SERVER/sales
```
Passar parâmetros no body da requisição em formato JSON:

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `amount` | `INT` | **Obrigatório** |
| `unit_price` | `double` | **Obrigatório** |
| `total_price` | `double` | **Obrigatório** |
| `product_id` | `INT` | **Obrigatório** |
| `client_id` | `INT` | **Obrigatório** |


## Modelo Postman
- Caso tenha interesse:
    - Faça o import no Postman do documento chamado `model_postman_collection.json` que está pasta `postman` para acessar o modelo de rotas da API testadas no Postman


## Funcionalidades não atendidas e dificuldades encontradas

- Da rota Listar todos os clientes cadastrados (index) não consegui manipular as compras do cliente.
    Consegui somente mostrá-las.

    Como exemplo abaixo:

        {
        "id": 1,
        "name": "Nome cliente",
        "cpf": "8833336566",
        "email": "client@mail.com",
        "created_at": "2022-05-01 21:16:24",
        "updated_at": "2022-05-01 21:16:24",
        "sales": [
        {
            "id": 1,
            "amount": 5,
            "unit_price": 20,
            "total_price": 100,
            "client_id": 1,
            "product_id": 1,
            "created_at": "2022-05-01 21:27:55",
            "updated_at": "2022-05-01 21:27:55"
        },
        {
            "id": 2,
            "amount": 5,
            "unit_price": 30,
            "total_price": 150,
            "client_id": 1,
            "product_id": 2,
            "created_at": "2022-05-01 21:28:57",
            "updated_at": "2022-05-01 21:28:57"
        } 
        ]}

    **Dificuldades**: não conhecia o framework AdonisJs, foi a minha primeira aplicação feita com ele, além ser iniciante na área e ainda precisar me desenvolver tecnicamente.
## Referência

 - [Documentação oficial AdonisJS](https://docs.adonisjs.com/guides/introduction)
 - [NPM AdonisJS](https://www.npmjs.com/package/@adonisjs/cli)
 

## Autora

- [Bruna Hirano](https://github.com/brunahirano)

## Considerações finais
- Gostaria de agradecer a oportunidade de realizar este desafio técnico, pois com ele conheci um framework que nunca havia trabalhado, me desafiei e pude aprender e treinar minhas habilidades com Node.js.
