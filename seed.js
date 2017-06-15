var app = require('./app');
var models = require('./models');

models.User.create({
  email: 'thanseeh@example.com',
  hashed_password: '$2a$10$aZB36UooZpL.fAgbQVN/j.pfZVVvkHxEnj7vfkVSqwBOBZbB/IAAK'
}, function() {
  models.OAuthClientsModel.create({
    clientId: 'thanseeh',
    clientSecret: 'admin123',
    redirectUri: '/oauth/redirect'
  }, function() {
    process.exit();
  });
});