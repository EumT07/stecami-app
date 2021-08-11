const passport = require("passport");//meth auth
const LocalStrategy = require("passport-local").Strategy;
//recibir info del cliente

const User = require("../models/app");

passport.serializeUser((user, done)=>{
    done(null, user.id);
})

passport.deserializeUser(async (id, done)=>{
    const user = await User.findById(id);
    done(null, user);
})
//sign up
//REcibe 2 parametros
//1: Que recibiremos del clientes
//2: Que funcion va suceder con esos datos
passport.use("local-signup", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
   const user = await User.findOne({email: email});
   if(user){
       return done(null, false, req.flash("signupMessage","The Email is already taken"));
   }else{
    const newUser = new User();
    newUser.fullname = req.body.fullname;
    newUser.country = req.body.country;
   newUser.email = email;
   newUser.password = newUser.encryptPassword(password);
   await newUser.save();
   done(null, newUser);
   }
}));

//Signin
passport.use("local-signin", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
   const user = await User.findOne({email: email});
    if(!user){
        return done(null, false, req.flash("signinMessage","No user found"));
    }else if(!user.comparePassword(password)){
        return done(null, false, req.flash("signinMessage", "Incorrect Password"));
    }else{
        done(null, user);
    }
}));