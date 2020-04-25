const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var imageSchema = new Schema({
    username : String,
    description : String,
    imagePath : {
        type : String
    },
    comments : [String],
    likes : Number
})

var Image = mongoose.model('Image', imageSchema);

module.exports = Image  ;