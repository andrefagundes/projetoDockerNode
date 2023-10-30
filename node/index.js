const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)
const sql = `INSERT INTO people(name) VALUES ('Full Cycle Rocks!')`
connection.query(sql)
connection.end()

app.get('/', (req, res) => {
  
  const connection = mysql.createConnection(config)
  const selectQuery = 'SELECT * FROM people'
  connection.query(selectQuery, (err, results) => {
    if (err) {
      connection.end()
      res.status(500).send(err)
      return
    }

    const data = results[0]
    if (!data) {
      res.send('Nenhum dado encontrado!')
    } else {
      res.send(`<h1>${data.name}</h1>`)
    }
    connection.end()
  })
})

app.listen(port, () => {
  console.log('Rodando na porta 3000!!!')
})
