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
}