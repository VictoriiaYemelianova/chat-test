const user = require('./user');
const message = require('./message');

module.exports = function(router) {
  user(router);
  message(router);
}