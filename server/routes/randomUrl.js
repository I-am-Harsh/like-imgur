const express = require('express');
const randomURL = express.Router();
const mongoose = require('mongoose');
const Data = require('../models/pasteModel');

randomURL
.get('/:url', (req, res) => {
    Data.find({url : req.params.url})
    .then((result) => {
        if(result.length !== 0){
            res.json(result);
        }
        else{
            res.json(result);
        }
    })
    .catch(err => res.json(err))
})

.post('/:url', (req, res) => {
    console.log(req.body.text);
    Data.create({url : req.params.url, text : req.body.text})
    .then(result =>  {
        console.log(result);
        res.json({success : true});
    })
    .catch(err => res.json({success : false}));
})

.put('/:url', (req,res) => {
    console.log("Put req text :",req.body.text);
    Data.findOneAndUpdate({url : req.params.url}, {text : req.body.text})
    .then(result => res.json({success : true}))
    .catch(err => res.json(err))
})

// check if url has somethin
// if not then cool
// create when paste
// if it has then give that
// update when paste

module.exports = expenseRouter = randomURL;