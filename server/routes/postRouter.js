var express = require('express');
var Image = require('../models/uploadModel');
var postRouter = express.Router();

postRouter



// open post
.get("/:id", (req, res) => {
    Image.findById(req.params.id)
    .then(result => {
        res.json({success : true, result : result});
    })
    .catch(err => res.json({success : false, err : err}));
})


// comment add
.post("/comments/:id", (req, res) => {
    const id = req.params.id;
    Image.updateOne({_id : id}, {
        $push : {
            comments : {
                username : req.body.username,
                comment : req.body.comment
            }
        }
    })
    .then(result => res.json({success : true, result : result}))
    .catch(err => res.json(err));
})



module.exports = postRouter