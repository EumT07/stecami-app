"use-strict"
const express = require('express');
const engine = require("ejs-mate");
const colors = require('colors');
const path = require('path');
const morgan = require('morgan');
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");//Send messages like mult pages


//initialization
const app = express();
require("./database");//To start database in our app
require("./passport/app");//To use in our app
// Setting
app.set('views', path.join(__dirname, './views'));
app.engine("ejs", engine);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);//html file insted of ejs
app.set('PORT', process.env.PORT || 3000);

//middlewaes (function will work before routes)
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: "mysecretsession",
    resave: false,
    saveUninitialized: false
}))
app.use(flash());
app.use(passport.initialize());//Start passport
app.use(passport.session());//database on the page

app.use((req, res, next)=>{
    app.locals.signupMessage = req.flash("signupMessage");
    app.locals.signinMessage = req.flash("signinMessage");
    app.locals.user = req.user;
    next();
});

//ruta contact
app.use("/", require('./routes/app'));

//static files
app.use(express.static(path.join(__dirname, './public')));
//Server 3000
app.listen(app.get('PORT'), (err)=>{
    if(err){
         throw err
    }else{
        console.log('This server is creating by'.bgBlue + 'eumt07 '.bgGreen);
        console.log('Server on port'.bgRed, app.get('PORT'));
}
});
