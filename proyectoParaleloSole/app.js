const express = require('express')
const app = express()
const port = 3030
const path = require('path')

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'views/index.html'))
})
app.get('/ProductCart', function(request, response) {
    response.sendFile(path.join(__dirname, 'views/productCart.html'))
})

app.get('/productDetail', function(request, response) {
    response.sendFile(path.join(__dirname, 'views/productDetail.html'))
})
app.get('/login', function(request, response) {
    response.sendFile(path.join(__dirname, 'views/login.html'))
})
app.get('/register', function(request, response) {
    response.sendFile(path.join(__dirname, 'views/register.html'))
})

app.use(express.static('public'))

app.get('*', function(request, response) {
    response.send('NOT FOUND', 404)
})

app.listen(port, () => {
    console.log('La app esta funcionado en http://localhost:' + port)
})