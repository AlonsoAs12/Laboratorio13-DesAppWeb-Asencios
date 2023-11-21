const express = require('express');
const conectarDB = require('./config/db')
const config = require('./config/global');
const cors = require('cors');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

const app = express();

//Conectar BD
conectarDB();

app.use(cors())

const multiPartMiddleware = multipart({
    uploadDir: './imagenes'
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/api/subir', multiPartMiddleware, (req, res) => {
    res.json({
        'message': 'Fichero subido correctamente.....!!!'
    })
})

app.use(express.json());

app.use('/api/productos', require('./routes/producto'));
app.use('/api/login', require('./routes/usuario'));
app.use('/api/create-user', require('./routes/usuario'));
app.use('/api/usuarios', require('./routes/usuario'));



app.listen(config.port, () => {
    console.log('El servidor por el puerto 4000')
})