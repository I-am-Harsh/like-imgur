var express = require('express');
var Image = require('../models/uploadModel');
var imageRouter = express.Router();
var formidable = require('formidable');
// const multer = require('multer');
// const Media = require('./Media');

// const storage = multer.diskStorage({
//     destination : (req, file, cb) => {
//         cb(null, './uploads');
//     },
//     filename : (req, file, cb) => {
//         cb(null, Date.now() + file.originalname);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
//         cb(null, true)
//     }
//     else{
//         cb(null, false);
//     }
// }

// const upload = multer({
//     storage : storage,
//     limits : {
//         fileSize : 1024 * 1024 * 5
//     },
//     fileFilter : fileFilter
// });


// imageRouter.post('/', upload.single('imageData') ,(req, res, next) => {
//     console.log(req.body);
//     const newImage = new Image({
//         imageData : req.file.path
//     });

//     newImage.save()
//     .then((result) => {
//         console.log(result);
//         res.send("Uploaded");
//     })
//     .catch(err => res.send(err));
// })

// .get('/thumb', (req, res) => {
//     if(req.query.src) {
//        let image = new Media(req.query.src);
//        image.thumb(req, res);
//     } else {
//         res.sendStatus(403);
//     }
// });


imageRouter.post('/', async (req,res) => {
    image = new formidable.IncomingForm();
    var desc = ''
    var data = ''
    // await image.parse(req, (err, fields, files) => {
    //     if(err) {
    //       console.log(err) 
    //       return;
    //     }
    //     else{
            
    //     }
    //   })
    await image.parse(req);
    image.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
        console.log(file.path);
    })

    image.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
        res.send(file.path);
    });

    
    // console.log(data);
})

module.exports = imageRouter;