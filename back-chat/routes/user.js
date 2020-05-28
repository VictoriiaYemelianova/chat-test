const User = require('../models/user');
// let jwt = require('jsonwebtoken');

module.exports = function(router) {
  router.post('/api/login', async (req, res, next) => {
    try {
      const user = await models.User.findOne({
        where: {
          email: req.body.email
        }
      });

      if(!user) {
        res.message = 'Такого пользователя не существует.';
      }

      next();
    } catch (err) {
      res.message = err.message;
      next();
    }
  });

  router.post('/api/register', async (req, res, next) => {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      });

      if(!user) {
        const userModel = {
          email: req.body.email,
          login: req.body.login,
          password: req.body.password,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const newUser = await models.User.create(userModel);

        if(newUser) {
          let currentUser = {
            user: newUser
          }

          res.items = currentUser;
        } else {
          res.message = 'Пользователь с таким именем уже существует.';
        }

        next();
      }
    } catch (err) {
      res.message = err.message;
      next();
    }
  })
}