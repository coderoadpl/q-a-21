const express = require('express')
const bodyParser = require('body-parser')
const mysql      = require('mysql')
require('dotenv').config()

const app = express()
app.use(bodyParser.json())
const port = 3333

const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE,
})
 
connection.connect()

app.use('/', express.static('public'))

app.get('/messages', (req, res) => {

  connection.query('SELECT * FROM messages', (error, results, fields) => {
    if (error) throw error
    res.json(results)
  })

})

app.post('/messages', (req, res) => {
  const { message, email } = req.body

  if(!message) return res.status(400).send()
  if(!email) return res.status(400).send()

  connection.query(
    `INSERT INTO \`messages\` (\`id\`, \`email\`, \`message\`) VALUES (NULL, ?, ?)`,
    [
      email,
      message
    ],
    (error, results, fields) => {
      if (error) throw error
      res.json(results)
    }
  )

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})