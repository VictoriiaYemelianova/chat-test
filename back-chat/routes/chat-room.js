const models = require('../models/index');

module.exports = function(router) {
  router.get('/api/chats/:id', async (req, res, next) => {
    try {
      const chats = await models.Participator.findAll({
        include: {
          model: models.Rooms
        },
        where: {
          participator: req.params.id
        }
      });

      const respRooms = chats.map(el => {
        return el.Room;
      })

      res.items = respRooms;
      next();
    } catch(err) {
      console.log(err)
      res.message = err.message;
      next();
    }
  })

  router.post('/api/create-room', async (req, res, next) => {
    try {
      const modelRoom = {
        roomName: req.body.roomName,
        creator: req.body.creator,         
        createdAt: new Date(),
        updatedAt: new Date()
      }
      createNewRoom = await models.Rooms.create(modelRoom);
      
      res.items = createNewRoom;
      next();
    } catch(err) {
      res.message = err.message;
      next();
    }
  })

  router.post('/api/add-participators', async (req, res, next) => {
    try {
      const participatorModel = {
        idRoom: req.body.idRoom,
        participator: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const createPatricipator = await Promise.all(req.body.participators.map(el => {
        participatorModel.participator = el;
        let createdPatricipator = models.Participator.create(participatorModel);
        return createdPatricipator;
      }));

      res.items = createPatricipator;
      next();
    } catch(err) {
      res.message = err.message;
      next();
    }
  })

  function findRoom(roomName) {
    return models.Rooms.findOne({
      where: {
        roomName: roomName
      }
    });
  }

  function findChatParticipators(roomId) {
    return models.Participator.findAll({
      where: {
        idRoom: roomId
      }
    });
  }
}