var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const methodOverride=require("method-override")

//heroku
const port = process.env.PORT || 3030
// Para que funcione nodemon, comentar  la linea 12- Para heroku sacar el comentario
 //app.listen(process.env.PORT||3030, function(){console.log("ok")})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// app use
app.use (methodOverride("_method"))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
 //app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./public'));
app.use("/styles", express.static(__dirname + "/styles"));


//const nuestras
const productCartRouter = require("./routes/productCartRouter.js")
const registerRouter = require("./routes/registerRouter.js")
const loginRouter = require("./routes/loginRouter.js")
const indexRouter = require("./routes/indexRouter.js")
const productRouter = require("./routes/productRouter.js")

const userRouter = require("./routes/userRouter.js")
const adminRouter = require ("./routes/adminRouter.js")
 
// fin const nuestras






// app.use nuestros
app.use(indexRouter)
app.use("/productCart",productCartRouter)
app.use("/login",loginRouter)
app.use("/register",registerRouter)
app.use("/product",productRouter)
//administrador productos
app.use("/admin",adminRouter)
//administrador usuarios
app.use("/adminUser",userRouter)
//formularios edit y add product
//app.use("/product-edit-form",adminRouter)
//app.use("/product-add-form",adminRouter)
//formularios edit y add user
app.use("/user-add-form",userRouter)
app.use ("/user-edit-form",userRouter)




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

module.exports = app;