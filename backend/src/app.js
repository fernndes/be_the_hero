const express = require('express') // Importa o modulo express para dentro da variável express
const cors = require('cors')
const { errors } = require('celebrate')
const routes = require('./routes')

const app = express() // Armazena a aplicação

app.use(cors())
app.use(express.json()) // Converte o json em formato JS

// Rota / Recurso

// Métodos HTTP:
// GET: Burcar/Listar uma informação do back-end, navegador sempre procura este método primeiro.
// POST: Criar uma informação no back-end
// PUT: Alterar uma informção no back-end
// DELETE: Deletar uma informação no back-end

// Tipos de parâmetro
// Query: parâmetros nomeados e enviados na rota após "?" (Filtros, paginação)
// Route Params: parâmetros utilizados para identificar recursos "/:id"
// Request Body: corpo da requisição, utilizado para criar ou alterar recursos :
// app.post('/users', (request, response) => {
//     const body = request.body;
//     console.log(body)
// })

// SQL: mySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
// NoSQL: MongoDB, CouchDB ...

// Driver: SELECT * FROM users
// Query Builder: table('users').select('*').where() -> KNEX

app.use(routes)
app.use(errors())

// app.listen(3333) // 'Ouvir a porta 3333'

module.exports = app // Exporta o app