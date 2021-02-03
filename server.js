const express = require('express')
const mysql      = require('mysql')
require('dotenv').config()

const app = express()
const port = 3333

const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE,
})
 
connection.connect()

connection.query('SELECT * FROM messages', (error, results, fields) => {
  if (error) throw error
  console.log(results)
})

app.use('/', express.static('public'))

app.get('/message', (req, res) => {
  const { message, email } = req.query

  if(!message) return res.status(400).send()
  if(!email) return res.status(400).send()

  res.json({
    message,
    email
  })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})