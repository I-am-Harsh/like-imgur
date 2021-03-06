var express = require('express');
var router = express.Router();
var formidable = require('formidable');
const User = require('../models/userModel');


router

// login
.post('/login', async (req,res) => {
  var data = '';
  const form = new formidable.IncomingForm();
  await form.parse(req, (err, fields, files) => {
    if(err) {
      res.json(err)
      return;
    }
    else{
      data = fields;
    }
  })
  console.log("Data : ",data);
  User.find({email : data.email})
  .then((result) => {
    if(result.length !== 0){
      if(result[0].password === data.password){
        res.json({success : true, 
          token : "send token", 
          username : result[0].userName, 
          email : result[0].email
        })
      }
      else{
        res.json({success : false})
      }
    }
    else{
      res.json({success : undefined});
    }
  })
  .catch(err => res.json(err));
})


// signup
.post('/signup', async (req,res) => {
  var data = '';
  const form = new formidable.IncomingForm();
  await form.parse(req, (err, fields, files) => {
    if(err) {
      res.json(err)
      return;
    }
    else{
      data = fields;
    }
  })
  
  User.find({email : data.email})
  .then((result) => {  
    if(result.length === 0){
      User.create(data)
      .then((result) => {
        res.json({
          success : true, 
          username : result.userName, 
          email : result.email,
          message : ''
        })
      })
      .catch(err => res.json(err))
    }
      else{
        console.log("rejected");
        res.json({success : true, message : "The user already exists"});
      }
  })
  .catch(err => res.json(err));
})


module.exports = router;
