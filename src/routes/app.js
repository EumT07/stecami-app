const express = require('express');
const router = express.Router();
const passport = require("passport");

router.get('/', (req, res, next)=>{
    res.render('index.html', {title: 'Stecami Tastes Website'});
});
//Sign up
router.get('/signup', (req, res, next)=>{
    res.render("signup.html", {title: "Sign up"});
});
router.post('/signup',  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
    passReqToCallback: true
}));
//Sign in
router.get('/signin', (req, res, next)=>{
    res.render("signin.html", {title: "Sign in"})
});
router.post('/signin', passport.authenticate("local-signin", {
    successRedirect: "/",
    failureRedirect: "/signin",
    passReqToCallback: true
}));

//use a middleware before each route you want to aunthenticated
/*
  router.use((req, res,next){
      isAunthenticated(req, res, next);
      next();
  })
 */
//Home
router.get('/gallery', isAuthenticated, (req, res, next)=>{
    res.render("gallery.html", {title: "gallery"})
});
//PRofile
router.get('/profile', isAuthenticated, (req, res, next)=>{
    res.render("profile.html", {title: "profile"});
});
//Logout
router.get('/logout', (req, res, next)=>{
    req.logout();
    res.redirect("/");
});
//First way
//Function para autenticar al usuario
function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/signin");
    }
}

//Exportar a otros files.
module.exports = router;