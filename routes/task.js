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


// update password

router.put('/updatepassword',function(req,res,next){

var task = req.body;
var password = req.body['password'];
var oldpassword=req.body['oldpassword'];
var username = req.body['name'];
if( (!task.password)||(!task.oldpassword)||(!task.name))
{
res.status(400)
res.json({
"error":"Bad data"
}
)
}else{
  MongoClient.connect(url, function (err, db) {
  if (err) throw err
       


bcrypt.hash(password, 11, function (err, hash) {

 db.collection('users').findOne({username: username}, function (err, userdata) {
        // if (err) throw err
    //  res.json(userdata);

    
     
     bcrypt.compare(oldpassword, userdata.password, function(err, respons) {
     
     if(respons){
     db.collection('users').update({username:username},{$set:{ password: hash}} ,function (err, results) {
     if (err) throw err
     res.status(200);
     res.json(results);
    
 
    
        })
     }else{
       res.status(400);
     res.json('{Error : invalid data}');
     }
     
})
  })
})
  })
}
});


// save area code
router.post('/addareacode',function(req,res,next){
res.setHeader('Content-Type', 'application/json')
var task = req.body;

var code = req.body['code'];

var areaname = req.body['areaname'];
var location = req.body['location'];

 


if((!task.code) || (!task.areaname)|| (!task.location))
{

res.status(400)
res.json({
    "error":"bad data"}


)
}else{


MongoClient.connect(url, function (err, db) {
  if (err) throw err
db.collection('areacode').findOne({areaname: areaname}, function (err, user) {
            if(user) {
                res.send("areaname is already taken", 422)
            }else{

  db.collection('areacode').save({areacode: code, areaname: areaname , location : location} ,function (err, results) {
    if (err) throw err

    res.json(results);
    
  })
            }
})
  })

 }

});




// save employee
router.post('/addemployee',function(req,res,next){
res.setHeader('Content-Type', 'application/json')
var task = req.body;
var username = req.body['name'];
var password = req.body['password'];
var code = req.body['code'];
var address = req.body['address'];
var phone = req.body['phone'];
var areacode = req.body['areacode'];
 


if((!task.code) || (!task.name)||(!task.phone)|| (!task.password)|| (!task.areacode)||(!task.address))
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

  db.collection('users').save({username: username, password: hash , code : code,address:address,phone:phone,usertype:1,areacode:areacode} ,function (err, results) {
    if (err) throw err

    res.json(results);
    
  })
            }
})
  })
               })  
 }

});


// get areacode
router.get('/getareacode',function(req,res,next){
    // find everything 


MongoClient.connect(url, function (err, db) {
  if (err) throw err

  db.collection('areacode').find().toArray(function (err, result) {
    if (err) throw err

    res.json(result);
    
  })
})

});


// save client form
router.post('/addclient',function(req,res,next){
res.setHeader('Content-Type', 'application/json')
var task = req.body;

var clientcode = req.body['clientcode'];

var clientname = req.body['clientname'];

var phone = req.body['phone'];

var mobile = req.body['mobile'];

var areacode = req.body['areacode'];

var address = req.body['address'];

var location = req.body['location'];

var extraroadpoints = req.body['extraroadpoints'];

 


if((!task.clientcode) || (!task.areacode)|| (!task.location)||(!task.clientname) || (!task.phone)|| (!task.mobile)||(!task.address) || (!task.extraroadpoints))
{

res.status(400)
res.json({
    "error":"bad data"}
)
}else{


MongoClient.connect(url, function (err, db) {
  if (err) throw err
db.collection('users').findOne({username: clientname}, function (err, user) {
            if(user) {
                res.send("username is already taken", 422)
            }else{

  db.collection('users').save({clientcode: clientcode, areacode: areacode , location : location,clientname:clientname,address:address,phone:phone,mobile:mobile,extraroadpoints:extraroadpoints} ,function (err, results) {
    if (err) throw err

    res.json(results);
    
  })
            }
})
  })

 }

});

module.exports = router;