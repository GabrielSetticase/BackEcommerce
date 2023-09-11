const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Productos = require("./src/models/productos")
const Usuarios = require("./src/models/usuarios")
const cors = require('cors')
const usuariosRouter = require('./routes/Usuarios');
const productosRouter = require('./routes/productos');
const sessions = require('express-session');
const unDia = 1000 * 60 * 60 * 24;


const { sequelize } = require("./src/libs");

const app = express();

app.use(cors("*"))

try {
  sequelize.sync({ force: false })
    .then(() => console.log("conexion exitosa con la base de datos"))
} catch (error) { console.log("no se ha podido realizar la conexion a la base de datos") }



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessions({
  secret: "123456",
  saveUninitialized: true,
  cookie: { maxAge: unDia },
  resave: false
}));



app.use('/usuarios', usuariosRouter);
app.use('/productos', productosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
