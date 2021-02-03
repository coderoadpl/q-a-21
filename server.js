const express = require('express')
require('dotenv').config()

const app = express()
const port = 3333

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