const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema({
    username : String,
    comment : String
}, {
    timestamps : true
})

var imageSchema = new Schema({
    username : String,
    description : String,
    imagePath : {
        type : String
    },
    comments : [commentSchema],
    likes : [String],
    nsfw : {
        type : Boolean,
        default : false
    }

},{
    timestamps : true
})



var Image = mongoose.model('Image', imageSchema);

module.exports = Image  ;