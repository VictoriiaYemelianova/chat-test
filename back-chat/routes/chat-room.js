const models = require('../models/index');

module.exports = function(router) {
  router.post('/api/create', async (req, res, next) => {
    try {
      const room = await models.Participator.findAll()

      const roomModel = {
        roomName: req.body.roomName,
        creator: req.body.creatorId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const newRoom = await models.Rooms.create(roomModel);
      res.items = newRoom;

      next();
    } catch(err) {
      res.message = err.message;
      next();
    }
  })
}