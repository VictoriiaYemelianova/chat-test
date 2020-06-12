const user = require('./user');
const message = require('./message');

module.exports = function(router, formidable, sharp) {
  user(router);
  message(router, formidable, sharp);
}