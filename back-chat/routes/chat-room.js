const models = require('../models/index');

module.exports = function(router) {
  router.get('/api/chats/:id', async (req, res, next) => {
    try {
      const chats = await models.Participator.findAll({
        include: {
          model: models.User,
          model: models.Rooms
        },
        where: {
          participator: req.params.id
        }
      });

      const respRooms = chats.map(el => {
        const modelRoom = {
          roomId: el.idRoom,
          roomName: el.Room.roomName,
        };

        return modelRoom;
      });

      res.items = respRooms;
      next();
    } catch(err) {
      console.log(err)
      res.message = err.message;
      next();
    }
  })

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