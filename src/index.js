require('sexy-require');
require('$sequelize');
const express = require('express');
const app = express();
const router = require('$router');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const morgan = require('morgan');
const favicon = require('serve-favicon')
const path = require('path');
const timeout = require('connect-timeout')


app.use(timeout('30s'));
app.use(morgan('combined'));
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('src/static'));
app.use('/', router);
app.use(errorhandler());


const server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});