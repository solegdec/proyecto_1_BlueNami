var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//heroku
const port = process.env.PORT || 3030

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//rutas nuestras
const productCartRouter = require("./routes/productCartRouter.js")
const registerRouter = require("./routes/registerRouter.js")
const loginRouter = require("./routes/loginRouter.js")
const indexRouter = require("./routes/indexRouter.js")
const productRouter = require("./routes/productRouter.js")
 


// rutas administrador Usuario
 const adminUserRouter = require("./routes/adminUserRouter.js")
// fin rutas nuestras


    // fin rutas nuestras

// app.use nuestros
app.use(indexRouter)
app.use("/productCart",productCartRouter)
app.use("/login",loginRouter)
app.use("/register",registerRouter)
app.use("/product",productRouter)
app.use("/product-edit-form",productRouter)

var app = express();

//app.use administrador Usuario
app.use("/adminUser",adminUserRouter)
// cierre app.use nuestros
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
 //app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./public'));



app.use("/styles", express.static(__dirname + "/styles"));
app.use('/users', usersRouter);

// app.use nuestros
app.use('/', indexRouter)
app.use("/productCart", productCartRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/product', productRouter)
app.use("/productDetail", productDetailRouter)
app.use("/admin",adminRouter)
app.use ("/adminAdd",adminAddRouter)
app.use ("/adminMod",adminModRouter)

    // cierre app.use nuestros




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
