const express = require('express')
const app = express()
const port = 3030
const path = require('path')



app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'views/index.html'))
})

app.use(express.static('public'))

app.get('*', function(request, response) {
    response.send('NOT FOUND', 404)
})

app.listen(port, () => {
    console.log('La app esta funcionado en http://localhost:' + port)
})