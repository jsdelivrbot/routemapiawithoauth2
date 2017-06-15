var express = require('express');

var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

var ObjectID = require('mongodb').ObjectID;

var urls = require('../config');
 
var url = urls.url; 




// complete task
router.get('/task',function(req,res,next){
    // find everything 


MongoClient.connect(url, function (err, db) {
  if (err) throw err

  db.collection('user').find().toArray(function (err, result) {
    if (err) throw err

    res.json(result);
    
  })
})

});


// single task
router.get('/task/:id',function(req,res,next){
    // find everything 


MongoClient.connect(url, function (err, db) {
  if (err) throw err

  db.collection('user').findOne({_id: ObjectID(req.params.id)} ,function (err, results) {
    if (err) throw err

    res.json(results);
    
  })
})

});



// save task
router.post('/task',function(req,res,next){
var task = req.body;
if(!task.title || (task.isDone + ''))
{

res.status(400)
res.json({
    "error":"bad data"}


)
}else{

   MongoClient.connect(url, function (err, db) {
  if (err) throw err

  db.collection('user').save(task ,function (err, results) {
    if (err) throw err

    res.json(results);
    
  })
})
}  
});

// delete task
router.delete('/task/:id',function(req,res,next){
    // find everything 


MongoClient.connect(url, function (err, db) {
  if (err) throw err

  db.collection('user').remove({_id: ObjectID(req.params.id)} ,function (err, results) {
    if (err) throw err

    res.json(results);
    
  })
})

});


// update task

router.put('/task/:id',function(req,res,next){

var task = req.body;
var updtask= {};

if(task.isDone){
    updtask.isDone = task.isDone; 
} 

if(task.title){
    updtask.title = task.title; 
} 

if(!updtask){
res.status(400)
res.json({
"error":"Bad data"
}
)
}else{

MongoClient.connect(url, function (err, db) {
  if (err) throw err

  db.collection('user').update({_id: ObjectID(req.params.id)},updtask,{} ,function (err, results) {
    if (err) throw err

    res.json(results);
    
  })
})

}

});

module.exports = router;