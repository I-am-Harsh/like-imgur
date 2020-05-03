var express = require('express');
var Image = require('../models/uploadModel');
var imageRouter = express.Router();
var formidable = require('formidable');
var fs = require('fs');


// post an image
imageRouter.post('/', async (req,res) => {
    form = new formidable.IncomingForm();
    await form.parse(req, (err, fields, file) => {
        if(err) {
        res.json(err);
        return;
        }
        else{
            const name = Date.now() + file.image.name;
            path =  __dirname + '/../public/uploads/' + name;
            fs.readFile(file.image.path, (err, data) => {
                fs.writeFile(path, data, (err) => {
                    if(err) res.json({success : false, err : err});
                    else{
                        var nsfw = undefined;
                        if(fields.nsfw){
                            nsfw = true
                        }
                        
                        Image.create({
                            username : fields.username,
                            description : fields.desc,
                            imagePath : name,
                            nsfw : nsfw
                        })
                        .then(result => {
                            res.json({success : true, image : result})
                        })
                        .catch(err => res.json({success : false, err : err}));
                    }
                })
            })
        }
    })
})

// profile comp images
.get("/:username", (req, res) => {
    Image.find({username : req.params.username})
    .sort({ createdAt: -1 })
    .exec(function(err, docs) {
        if(err) res.json(err);
        res.json(docs);
    })
    .catch(err => res.json(err))
})

// home comp images
.get('/', (req, res) => {
    Image.find({}).sort({ createdAt: -1 }).exec(function(err, docs) {
        if(err) console.log(err);
        res.json(docs);
    });
})

// delete images
.delete('/:id', (req, res) => {
    console.log(req.params.id);
    Image.deleteOne({_id : req.params.id})
    .then(result => {
        res.json({success : true});
    })
    .catch(err => res.json({success : false, err : err}));
    
})

// like image
.post("/like/:id", (req, res) => {
    console.log(req.body);
    const id = req.params.id;
    Image.updateOne({_id : id}, {$push : {likes : req.body.username}} )
    .then(result => res.json({success : true}))
    // .then(result => console.log(result))
    .catch(err => res.json({success : false, err : err}));
})

// delete like
.delete('/like/:id/:username', (req, res) => {
    const id = req.params.id;
    Image.updateOne({_id : id},{
        $pullAll : {
            likes : [req.params.username]
        }
    })
    .then(result => res.json({success : true}))
    .catch(err => res.json({succes : false, err : err}));
})





module.exports = imageRouter;