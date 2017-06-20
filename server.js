var express = require('express');

var bodyParser = require('body-parser');

var path = require('path');


// Oauth2
var http = require('http');

var passport = require('passport');

var util = require('util');
var expressValidator = require('express-validator')
var auth = require("./auth");
var oauth = require("./oauth");
var registration = require("./registration")

var index = require('./routes/index');
var tasks = require('./routes/task');

var app = express();

var port = 4000;

//view Engine

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

// set static folder
app.use(express.static(path.join(__dirname,'client')));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressValidator());
app.use(passport.initialize())


app.use('/api',passport.authenticate('accessToken', { session: false }),tasks);

app.use('/',index);


app.post('/oauth/token', oauth.token)

app.post('/users', registration.registerUser)

app.get('/restricted', passport.authenticate('accessToken', { session: false }), function (req, res) {
    res.send("Yay, you successfully accessed the restricted resource!")
})

if(app.path != '/api' && app.path != '/secret')
{
    app.get('**',function(req,res,next){
    res.render('index.html');
    });
}


app.listen(port, function(){
    console.log('server started at port:'+port);
});


