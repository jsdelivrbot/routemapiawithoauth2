var express = require('express');

var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

var ObjectID = require('mongodb').ObjectID;

var urls = require('../config');
 
var url = urls.url; 

var bcrypt = require('bcrypt');

// get customer
router.get('/getcustomer',function(req,res,next){
    // find everything 


MongoClient.connect(url, function (err, db) {
  if (err) throw err

  db.collection('users').find({usertype:2}).toArray(function (err, result) {
    if (err) throw err

    res.json(result);
    
  })
})

});


// single task
router.get('/getcustomer/:id',function(req,res,next){
    // find everything 


MongoClient.connect(url, function (err, db) {
  if (err) throw err

  db.collection('users').findOne({_id: ObjectID(req.params.id)} ,function (err, results) {
    if (err) throw err

    res.json(results);
    
  })
})

});



// save task
router.post('/addcustomer',function(req,res,next){
res.setHeader('Content-Type', 'application/json')
var task = req.body;
var username = req.body['name'];
var password = req.body['password'];
var email = req.body['email'];
var code = req.body['code'];
var address = req.body['address'];
var phone = req.body['phone'];
var location = req.body['location'];
var api = req.body['api'];
 


if((!task.code) || (!task.name)|| (!task.location)|| (!task.phone)|| (!task.password)|| (!task.api)||(!task.address))
{

res.status(400)
res.json({
    "error":"bad data"}


)
}else{


bcrypt.hash(password, 11, function (err, hash) {
                    
                  
MongoClient.connect(url, function (err, db) {
  if (err) throw err
db.collection('users').findOne({username: username}, function (err, user) {
            if(user) {
                res.send("Username is already taken", 422)
            }else{

  db.collection('users').save({username: username, password: hash , code : code,email:email,address:address,phone:phone,location:location,usertype:2,api:api} ,function (err, results) {
    if (err) throw err

    res.json(results);
    
  })
            }
})
  })
               })  
 }

});

// delete task
router.delete('/removecustomer/:id',function(req,res,next){
    // find everything 


MongoClient.connect(url, function (err, db) {
  if (err) throw err

  db.collection('users').remove({_id: ObjectID(req.params.id)} ,function (err, results) {
    if (err) throw err

    res.json(results);
    
  })
})

});


// update customer

router.put('/updatecustomer/:id',function(req,res,next){

var task = req.body;

var username = req.body['name'];
var password = req.body['password'];
var email = req.body['email'];
var code = req.body['code'];
var address = req.body['address'];
var phone = req.body['phone'];
var location = req.body['location'];
var api = req.body['api'];


if((!task.code) || (!task.name)|| (!task.location)|| (!task.phone)|| (!task.password)|| (!task.api)||(!task.address))
{
res.status(400)
res.json({
"error":"Bad data"
}
)
}else{

bcrypt.hash(password, 11, function (err, hash) {
MongoClient.connect(url, function (err, db) {
  if (err) throw err

  db.collection('users').update({_id: ObjectID(req.params.id)},{$set:{username: username, password: hash , code : code,email:email,address:address,phone:phone,location:location,usertype:2,api:api}} ,function (err, results) {
    if (err) throw err

    res.json(results);
    
  })
})
})
}

});

module.exports = router;