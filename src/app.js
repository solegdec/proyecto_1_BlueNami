var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const methodOverride=require("method-override")
const session = require('express-session');

//heroku
const port = process.env.PORT || 3030
// Para que funcione nodemon, comentar  la linea 12- Para heroku sacar el comentario
//app.listen(process.env.PORT||3030, function(){console.log("ok")})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride("_method")) //para usar el metodo delete y put
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //captura info de un formulaario
app.use(cookieParser());
app.use(express.static('./public'));
app.use("/styles", express.static(__dirname + "/styles"));
app.use(session({secret:'BlueNami',resave: false,saveUninitialized:false,}));

const productCartRouter = require("./routes/productCartRouter.js")
const clientRouter = require("./routes/clientRouter.js")
const indexRouter = require("./routes/indexRouter.js")
const productRouter = require("./routes/productRouter.js")
const userRouter = require("./routes/userRouter.js")
const adminRouter = require ("./routes/adminRouter.js")

app.use(indexRouter)
app.use("/productCart",productCartRouter)
app.use("/client",clientRouter)
app.use("/product",productRouter)
app.use("/admin",adminRouter)
app.use("/adminUser",userRouter)
app.use("/product-add-form",adminRouter)
app.use("/user-add-form",userRouter)


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