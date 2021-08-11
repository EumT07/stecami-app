const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    password: String,
    fullname: String,
    country: String
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password)
    //1-Password we recibe in ourfuncion, this.password is going to compare with our password in order to have the same password.
}

module.exports = mongoose.model("users", userSchema);
//users --> dataname That we use to save our email, and password