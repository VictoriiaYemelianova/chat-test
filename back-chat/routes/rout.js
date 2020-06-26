const user = require('./user');
const message = require('./message');
const chatRoom = require('./chat-room');
const admin = require('./admin');

module.exports = function(router, formidable, sharp) {
  user(router);
  message(router, formidable, sharp);
  chatRoom(router);
  admin(router);
}