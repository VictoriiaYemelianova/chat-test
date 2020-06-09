const models = require('./models/index');
let usersArray = [];

module.exports = function (io) {
  io.on('connection', socket => {
    console.log("connection")

    socket.on('onlineUser', (data) => {
      socket.user = data;
      for (var a in io.sockets.connected) {
        if(io.sockets.connected[a].user !== undefined ) {
          usersArray.push(io.sockets.connected[a].user);
        }
      }

      io.emit("resUserOnline", usersArray)
    })

    socket.on('addMessage', async req => {
      try {
        const currentMessage = {
          message: '',
          idUser: req.idUser,
          createdAt: new Date(),
          updatedAt: new Date(),
          path: ''
        }

        if (req.imgPath) {
          currentMessage.path = req.imgPath;
        } else {
          currentMessage.message = req.message;
        }

        const newMessageUser = await models.Message.create(currentMessage);
        const user = await models.User.findOne({
          where: { id: req.idUser }
        });
        
        const newMessage = {
          id: newMessageUser.id,
          message: newMessageUser.message,
          userLogin: user.login,
          idUser: user.id,
          createAt: newMessageUser.createdAt,
          updatedAt: newMessageUser.updatedAt,
          path: newMessageUser.path
        }

        const response = modelResponse(newMessage);
        io.emit("recieveMessage", response);
      } catch (err) {
        const response = modelResponse(err.message);
        io.emit("recieveMessage", response);
      }
    });

    socket.on('updateMessage', async req => {
      try {
        const currentMessage = {
          message: req.message,
          idUser: req.idUser,
          updatedAt: new Date()
        };

        await models.Message.update(
          currentMessage,
          {
            where: {
              id: req.id
            }
          }
        );

        const updatedMessage = await models.Message.findOne({
          where: {
            id: req.id
          }
        });

        const response = modelResponse(updatedMessage);
        io.emit("recieveMessage", response);

      } catch (err) {
        const response = modelResponse(err.message);
        io.emit("recieveMessage", response);
      }
    });

    socket.on('deleteMessage', async req => {
      try {
        const deleteMessage = await models.Message.destroy({
          where: {
            id: req.params.id
          }
        });

        const response = modelResponse();
        io.emit("recieveMessage", response);
      } catch (err) {
        const response = modelResponse(err.message);
        io.emit("recieveMessage", response);
      }
    })

    socket.on('disconnect', () => {
      console.log('disconnect')
    })
  });


  function modelResponse(res) {
    const result = {
      success: true,
      items: [],
      message: ''
    };

    if (typeof res === "object") {
      result.items.push(res);
    } else {
      result.message = res.message;
    }
    return result;
  }
}