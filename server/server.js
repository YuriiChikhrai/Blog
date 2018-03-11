const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const fileUpload = require('express-fileupload');

const session = require('express-session');
const MongoStore = require('express-sessions');

mongoose.connect('mongodb://test:test@ds211309.mlab.com:11309/blog');
mongoose.set('debug', true);

mongoose.connection.on('open', () => {
    console.log("Connection established");
});
mongoose.connection.on('error', (err) => {
    console.error("Mongoose error:", err);
    process.exit(0);
});

const app = express();

// Configure nunjucks template engine
nunjucks.configure(path.join(__dirname, '..', 'client', 'views'), {
    autoescape: false,
    express: app
});

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const publicPath = path.join(__dirname, '..', 'client', 'public');
app.use("/public", express.static(publicPath));

// add cookie-session
app.use(session({
    name: 'session',
    secret: "SecretSessionString",
    saveUninitialized: false,
    resave: false,

    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    store: new MongoStore({
        storage: 'mongodb',
        instance: mongoose, // optional;)
        collection: 'ExpressSessions',
    })
}));

// File upload
app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    safeFileNames: true,
    preserveExtension: true,
    abortOnLimit: true
}));

require('./router')(app);

app.use(errors());

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(400).send(err.message || err);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server start on port", PORT, "env", process.env.NODE_ENV);
});

module.exports = app;