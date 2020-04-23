const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var imageSchema = new Schema({
    author : String,
    description : String,
    imageData : {
        type : String,
        required : true
    },
    comments : [String],
    likes : Number
})

var Image = mongoose.model('Image', imageSchema);

module.exports = Image  ;