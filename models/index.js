
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/gasterminal', {});

module.exports.oauth = require('./oauth');
module.exports.User = require('./user');
module.exports.OAuthClientsModel = require('./oauth_client');
module.exports.mongoose = mongoose;