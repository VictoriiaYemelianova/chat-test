const user = require('./user');
const message = require('./message');

module.exports = function(router, io, formidable) {
  user(router);
  message(router, io, formidable);
}