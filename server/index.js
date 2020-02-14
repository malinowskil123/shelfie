require('dotenv').config()
const express = require('express')
const massive = require('massive')
const app = express()
const ctrl = require('./controller')

const { SERVER_PORT, CONNECTION_STRING } = process.env

app.use(express.json())

// ---endpoints
app.get(`/api/inventory`, ctrl.getProducts)
app.get(`/api/inventory/:id`, ctrl.getProduct)
app.post('/api/inventory', ctrl.addNewProduct)
app.put('/api/inventory/:id', ctrl.updateProduct)
app.delete('/api/inventory/:id', ctrl.deleteProduct)

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    recjectUnauthorized: false
  }
})
  .then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT || 4040, () =>
      console.log(`|----Server Running On Port: ${SERVER_PORT}----|`)
    )
  })
  .catch(err => console.log(`db connection err: ${err}`))
