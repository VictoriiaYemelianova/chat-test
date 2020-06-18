const user = require('./user');
const message = require('./message');
const chatRoom = require('./chat-room');

module.exports = function(router, formidable, sharp) {
  user(router);
  message(router, formidable, sharp);
  chatRoom(router);
}