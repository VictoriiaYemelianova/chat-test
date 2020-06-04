const models = require('./models/index');
// const multer = require('multer');
// const upload = multer({dest: 'uploads/'});

module.exports = function (io, upload) {
  io.on('connection', socket => {
    // socket.on('disconnect', () => {
    //   console.log('user disconnected');
    // })
    socket.on('onlineUser', (data) => {
      let usersArray = [];
      socket.user = data;
      for(var a in io.sockets.connected){
        usersArray.push(io.sockets.connected[a].user);
      }
      io.emit("resUserOnline", usersArray)
    })

    socket.on('addMessage', async req => {
      console.log(req.message.path)
      try {
        const currentMessage = {
          message: req.message,
          idUser: req.idUser,
          createdAt: new Date(),
          updatedAt: new Date()
        }

        const newMessageUser = await models.Message.create(currentMessage);
        const user = await models.User.findOne({
          where: { id: req.idUser}
        });
        const newMessage = {
          id: newMessageUser.id,
          message: newMessageUser.message,
          userLogin: user.login,
          idUser: user.id,
          createAt: newMessageUser.createdAt,
          updatedAt: newMessageUser.updatedAt
        }

        const response = modelResponse(newMessage);
        io.emit("recieveMessage", response);
      } catch (err) {
        const response = modelResponse(err.message);
        io.emit("recieveMessage", response);
      }

    })

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
  });


  function modelResponse(arr) {
    const result = {
      success: true,
      items: [],
      message: ''
    };

    if (typeof arr === "object") {
      result.items.push(arr);
    } else {
      result.message = res.message;
    }
    return result;
  }
}