const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const express = require('express');
const app = express();
const config  = require('./config/config');
const auth  = require('./auth');
const appController = require('./controllers/AppController');
const expressValidator = require('express-validator');


app.use(expressValidator());
app.use(cors());
app.options('*',cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Use helmet to secure Express headers
app.use(helmet());
app.disable('x-powered-by');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/login', appController.login);
app.get('/countries', auth.isAuthenticated ,appController.getCountries);
app.put('/countries', auth.isAuthenticated , appController.addCountry);
app.delete('/countries', auth.isAuthenticated , appController.deleteCountry);

app.listen(config.init_port, function () {
    console.log("Server running on port ", config.init_port)
});
