const models = require('../models/index');

module.exports = function(router) {
  router.get('/api/message', async (req, res, next) => {
    try {
      const messageAll = await models.Message.findAll({
        include: [{
          model: models.User
        }]
      });

      if (messageAll.length === 0) {
        res.message = 'No message';
      } else { 
        const newArrayMessage = messageAll.map(el => {
          const newMessage = {
            id: el.id,
            message: el.message,
            userLogin: el.User.login,
            idUser: el.User.id,
            createAt: el.createdAt,
            updatedAt: el.updatedAt
          }

          return newMessage;

        });

        newArrayMessage.sort((a, b) => {
           return  new Date(a.createAt) - new Date(b.createAt);
        })

        res.items = newArrayMessage;
      }

      next();
    } catch (err) {
      res.message = err.message;
      next();
    }
  });

  router.put('/api/message/update', async (req, res, next) => {
    try {
      const currentMessage = {
        message: req.body.message,
        idUser: req.body.idUser,
        updatedAt: new Date()
      }

      await models.Message.update(
        currentMessage,
        {
          where: {
            id: req.body.id
          }
        }
      );

      const updatedMessage = await models.Message.findOne({
        where: {
          id: req.body.id
        }
      })

      res.items = updatedMessage;
      next();
    } catch (err) {
      res.message = err.message;
      next();
    }
  });

  router.delete('/api/message/:id', async (req, res, next) => {
    try {
      const deleteMessage = await models.Message.destroy({
        where: {
          id: req.params.id
        }
      });

      res.items = deleteMessage;
      next();
    } catch (err) {
      res.message = err.message;
      next();
    }
  })
}