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
      if (req.body.roomName.includes('admin')) {
        const operator = await models.User.findOne({
          include: {
            model: models.Role,
            where: {
              role: 'operator'
            }
          }
        });

        const findRoomResp = await findRoom(req.body.roomName);

        if (!findRoomResp) {
          const createNewRoom = await createRoom(req.body.roomName, req.body.creatorId);
          const arrayUsers = [createNewRoom.creator, operator.id];
          const participatorsArray = await createParticipator(createNewRoom.id, arrayUsers);

          res.items = createNewRoom;
        } else {
          const findChatParticipatorsResp = await findChatParticipators(findRoomResp.id);
          res.items = findChatParticipatorsResp.Room;
        }
      } else {
        const findRoomResp = await findRoom(req.body.roomName);

        if (!findRoomResp) {
          const createNewRoom = await createRoom(req.body.roomName, req.body.creatorId);
          const arrayUsers = req.body.participator;
          const participatorsArray = await createParticipator(createNewRoom.id, arrayUsers);
          res.items = createNewRoom;
        } else {
          const findChatParticipatorsResp = await findChatParticipators(findRoomResp.id);
          res.items = findChatParticipatorsResp.Room;
        }
      };

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

  function createRoom(roomName, creatorId) {
    const modelRoom = {
      roomName: roomName,
      creator: creatorId,         
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return models.Rooms.create(modelRoom);
  }

  async function createParticipator(roomId, array) {
    const arrayParticipator = await Promise.all(array.map(async (el)  => {
      const modelParticip = {
        idRoom: roomId,
        participator: el,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const createdParticipator = await models.Participator.create(modelParticip);
      return createdParticipator;
    }));
    return arrayParticipator;
  }
}