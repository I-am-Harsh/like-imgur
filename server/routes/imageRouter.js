var express = require('express');
var Image = require('../models/uploadModel');
var imageRouter = express.Router();
var formidable = require('formidable');
var util = require('util');
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
                    if(err) console.log(err);
                    else{
                        Image.create({
                            username : fields.username,
                            description : fields.desc,
                            imagePath : name,
                        })
                        .then(result => {
                            res.json({success : true, path : name})
                        })
                        .catch(err => res.json({success : false, path : null}));
                    }
                })
            })
        }
    })

    // console.log("desc : ", data);
 
    // await form.on('fileBegin', (name, file) => {
    //     name = Date.now() + file.name;
    //     file.path =  __dirname + '/uploads/' + name;
        
    //     path = file.path
    //     console.log("on")
    // })
    // console.log("File Path : ", path);

    // Image.create({
    //     author : "asd",
    //     description : data,
    //     imagePath : path,
    // })
    // .then(result => {
    //     // res.json({success : true})
    //     res.json(result);
    //     console.log(result);
    // })
    // .catch(err => console.log("Error : ", err));  
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
    // Image.find()
    // .then(result => res.json(result));
    // Image.find({}).sort({ field: 'desc' })
    // .then(result => res.json(result))
    // .catch(err => console.log(err));
    // res.json("lmao");
    Image.find({}).sort({ createdAt: -1 }).exec(function(err, docs) {
        if(err) console.log(err);
        res.json(docs);
    });
})

module.exports = imageRouter;