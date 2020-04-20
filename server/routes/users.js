var express = require('express');
var router = express.Router();
var formidable = require('formidable');
const User = require('../models/userModel');
var util = require('util');


router
/* GET users listing. */
.post('/login', async (req,res) => {
  var data = '';
  form = new formidable.IncomingForm();
  await form.parse(req, (err, fields, files) => {
    if(err) {
      console.log(err) 
      return;
    }
    else{
      data = fields;
    }
  })
  User.find({email : data.email})
  .then((result) => {
    // console.log(result.length);
    if(result.length != 0){
      // console.log(result, data.password);
      if(result[0].password === data.password){
        res.json({success : true, token : "send token", username : result[0].userName})
      }
      else{
        res.json({success : false})
      }
    }
    else{
      res.json({success : undefined});
    }
  })
  .catch(err => console.log(err));
})


// signup
.post('/signup', async (req,res) => {
  var data = '';
  form = new formidable.IncomingForm();
  await form.parse(req, (err, fields, files) => {
    if(err) {
      console.log(err) 
      return;
    }
    else{
      data = fields;
    }
  })
  // console.log(data);
  User.find({email : data.email})
  .then((result) => {  
    if(result.length == 0){
      User.create(data)
      .then((result) => {
        console.log("Result form create : ", result);
        res.json({success : true, username : result.userName, message : ''})
      })
      .catch(err => console.log(err))
    }
      else{
        console.log("rejected");
        res.json({success : true, message : "The user already exists"});
      }
  })
  .catch(err => console.log(err));
})

module.exports = router;
