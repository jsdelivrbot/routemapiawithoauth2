var mongojs = require('mongojs')

var db = mongojs('gasterminal')

exports.db = function() {
    return db
}