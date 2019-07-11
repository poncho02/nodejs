const express = require('express');
const app = express();

const config = require('./config.js');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.set('Secret', config.secret);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


require('./routes.js')(app);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.Promise = global.Promise;

mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Conexion DB exitosa");    
}).catch(err => {
    console.log('No se ha podido hacer conexion a db', err);
    process.exit();
});

app.listen(config.serverport, () => {
    console.log("Servidor node listo en puerto 3000");
});