const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    email : String,
    password : String,
    fullName : String,
    userName : {
        type : String,
        unique : true
    }
})

var User = mongoose.model('User', userSchema);

module.exports = User;