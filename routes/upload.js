var express = require('express');

var router = express.Router();

var multer  = require('multer');

var path = require('path');

var mime = require('mime');

// var upload = multer({ dest: __dirname+'/../public/uploads/' });



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/..//public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.'+ mime.extension(file.mimetype))
  }
})

var upload = multer({ storage: storage });

const fs = require('fs-extra');

var MongoClient = require('mongodb').MongoClient;

var ObjectID = require('mongodb').ObjectID;

var urls = require('../config');

var url = urls.url; 

router.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
 
  var widgetId = req.body.widgetId;
  var width = req.body.width;
  var userid = req.body.userid;
  var avatar = req.file;
  var lastsavedname = req.lastsavedname;

  var originalname = avatar.originalname;
  var filename = avatar.filename;
  var path = avatar.path;
  var destination = avatar.destination;
  var size = avatar.size;

  // remove file
fs.remove('/files/'+lastsavedname, err => {
  if (err) return console.error(err)

  console.log('success!')
})

MongoClient.connect(url, function (err, db) {
  if (err) throw err

  db.collection('users').update({_id: ObjectID(userid)},{$set:{profile:filename}} ,function (err, results) {
    if (err) throw err

    res.json(results);
    
  })
})
  

})


router.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

router.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
})




module.exports = router;