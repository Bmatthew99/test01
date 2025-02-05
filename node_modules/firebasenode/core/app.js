const initFramework = require('./global');
initFramework();
// console.log(framework);
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const serverConfig = require('../config/server.json');
//configs 
const app = express();
app.use(express.json());
app.set('port', serverConfig.port || 3000);
app.set('host', serverConfig.host || 'localhost');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',

}));
app.set('view engine', '.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes 
// require('./routes');
app.use(require('./routes'));

//static paths
app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;