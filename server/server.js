const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const mongoose = require('mongoose');

const session = require('express-session');
const MongoStore = require('express-sessions');

mongoose.connect('mongodb://localhost:27017/hillel');
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
nunjucks.configure(path.join(__dirname, 'client', 'views'), {
    express: app
});

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, 'public')));

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

app.use("/", require('./router'));

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