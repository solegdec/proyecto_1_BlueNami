const express = require('express')
const app = express()
const port = process.env.PORT || 3030
const path = require('path')

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'views/index.html'))
})
app.get('/productCart', function(request, response) {
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
app.use(express.static('views'))

app.get('*', function(request, response) {
    response.send('NOT FOUND', 404)
})

app.listen(port, function() {
    console.log('Servidor corriendo  en el puerto ' + port  );
})
