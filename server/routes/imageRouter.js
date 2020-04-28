var express = require('express');
var Image = require('../models/uploadModel');
var imageRouter = express.Router();
var formidable = require('formidable');
var fs = require('fs');


imageRouter.post('/', async (req,res) => {
    form = new formidable.IncomingForm();
    await form.parse(req, (err, fields, file) => {
        if(err) {
        console.log(err) 
        return;
        }
        else{
            const name = Date.now() + file.image.name;
            path =  __dirname + '/../public/uploads/' + name;
            fs.readFile(file.image.path, (err, data) => {
                fs.writeFile(path, data, (err) => {
                    if(err) res.json({success : false});
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
                        .catch(err => res.json({success : false}));
                    }
                })
            })
        }
    })
})

.get("/:username", (req, res) => {
    Image.find({username : req.params.username})
    .sort({ createdAt: -1 })
    .exec(function(err, docs) {
        if(err) console.log(err);
        res.json(docs);
    });
})

.get('/', (req, res) => {
    Image.find({}).sort({ createdAt: -1 }).exec(function(err, docs) {
        if(err) console.log(err);
        res.json(docs);
    });
})

.delete('/:imagePath', (req, res) => {
    console.log(req.params.imagePath);
    Image.deleteOne({imagePath : req.params.imagePath})
    .then(result => {
        res.json({success : true});
    })
    .catch(err => res.json({success : false}));
    
})

module.exports = imageRouter;