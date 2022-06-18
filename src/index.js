const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');


const app = express();


//----------------------------------------configuraciones----------------------------------------//
app.set("port", process.env.PORT || 4000);


//----------------------------------------motor de plantillas----------------------------------------//
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
  }))
app.set('view engine', '.hbs');

//----------------------------------------Middlewares----------------------------------------//

app.use(morgan("dev"));


//----------------------------------------variables globales----------------------------------------//

//----------------------------------------rutas----------------------------------------//
const router = require('./routes/index');
app.use(router);

//----------------------------------------conexion----------------------------------------//
const conexion= require ('./js/conexion_slq');


//----------------------------------------publico----------------------------------------//

//----------------------------------------server----------------------------------------//
app.listen(app.get("port"), ()=>{
    console.log("server on", app.get("port"));
});



