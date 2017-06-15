var express = require('express');

var bodyParser = require('body-parser');

var path = require('path');

var index = require('./routes/index');
var tasks = require('./routes/task');
var users = require('./routes/users');
var sessions = require('./routes/session');

// Oauth2
var models = require('./models');
var middleware = require('./middleware');
var oauthserver = require('node-oauth2-server');
var User = models.User;

var app = express();


var port = 5000;


// oauth
app.oauth = oauthserver({
  model: models.oauth,
  grants: ['password', 'authorization_code', 'refresh_token'],
  debug: true
});

//view Engine

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

// set static folder
app.use(express.static(path.join(__dirname,'client')));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/api',tasks);


app.use('/',index);



// Oauth2
app.all('/oauth/token', app.oauth.grant());
app.get('/oauth/authorise', function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/session?redirect=' + req.path + '&client_id=' +
      req.query.client_id + '&redirect_uri=' + req.query.redirect_uri);
  }

  res.render('authorise', {
    client_id: req.query.client_id,
    redirect_uri: req.query.redirect_uri
  });
});

// Handle authorise
app.post('/oauth/authorise', function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/session?redirect=' + req.path + 'client_id=' +
      req.query.client_id +'&redirect_uri=' + req.query.redirect_uri);
  }

  next();
}, app.oauth.authCodeGrant(function(req, next) {
  // The first param should to indicate an error
  // The second param should a bool to indicate if the user did authorise the app
  // The third param should for the user/uid (only used for passing to saveAuthCode)
  next(null, req.body.allow === 'yes', req.session.userId, null);
}));

app.get('/secret', middleware.requiresUser, function(req, res) {
  res.send('Secret area');
});

app.use(app.oauth.errorHandler());

app.post('/v1/users', users.create);
app.get('/account', middleware.requiresUser, users.show);
app.post('/session', sessions.create);
app.get('/session', sessions.show);

if(app.path != '/api' && app.path != '/secret')
{
    app.get('**',function(req,res,next){
    res.render('index.html');
    });
}


app.listen(port, function(){
    console.log('server started at port:'+port);
});
