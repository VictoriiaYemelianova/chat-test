const models = require('../models/index');
let jwt = require('jsonwebtoken');
let config = require('../config');
let middleware = require('../middleware');

module.exports = function (router) {
  router.post('/login', async (req, res, next) => {
    try {
      const user = await models.User.findOne({
        where: {
          email: req.body.email
        }
      });

      if (!user) {
        res.message = 'Такого пользователя не существует.';
      } else {
        if (user.password === req.body.password) {
          let token = jwt.sign({
            email: user.email
          },
            config.secret,
            { expiresIn: '24h' }
          );

          let currentUser = {
            user: user,
            token: token
          }

          res.items = currentUser;
        } else {
          res.message = 'Неверный пароль.'
        };
      }

      next();
    } catch (err) {
      res.message = err.message;
      next();
    }
  });

  router.post('/register', async (req, res, next) => {
    try {
      const user = await models.User.findOne({
        where: {
          email: req.body.email
        }
      });

      if (!user) {
        const role = await models.Role.findOne({
          where: {
            role: req.body.role
          }
        });

        const userModel = {
          email: req.body.email,
          login: req.body.login,
          password: req.body.password,
          createdAt: new Date(),
          updatedAt: new Date(),
          role: role.id
        };

        const newUser = await models.User.create(userModel);

        if (newUser) {
          let token = jwt.sign({
            email: newUser.email
          },
          config.secret,
          { expiresIn: '24h' } // expires in 24 hours
          );

          newUser.role = role.role;
          
          let currentUser = {
            user: newUser,
            token: token
          }
          res.items = currentUser;
        }

        next();
      } else {
        res.message = 'Пользователь с таким именем уже существует.';
        next();
      }
    } catch (err) {
      res.message = err.message;
      next();
    }
  });

  router.post('/create-role', async (req, res, next) => { //для админа
    try {
      const role = await models.Role.findOne({
        where: {
          role: req.body.role
        }
      });

      if (!role) {
        const roleModel = {
          role: req.body.role,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const newRole = await models.Role.create(roleModel);
        res.items = newRole;
        next();
      }
    } catch(err) {
      res.message = err.message;
      next();
    }
  })

  router.delete('/user-delete/:id', async (req, res, next) => {
    try {
      const deleteUser = await models.User.destroy({
        where: {
          id: req.params.id
        }
      });

      res.items = deleteUser;
      next();
    } catch (err) {
      res.message = err.message;
      next();
    }
  })

  router.get('/users', async (req, res, next) => {
    try {
      const users = await models.User.findAll({
        include: {
          model: models.Role,
          where: {
            role: 'user'
          }
        }
      });
      
      userArr = users.map(el => {
        const usersRes = {
          id: el.id,
          email: el.email,
          login: el.login,
          password: el.password,
          role: el.Role.role
        };

        return usersRes;
      });

      res.items = userArr;
      next();
    } catch(err) {
      res.message = err.message;
      next();
    }
  })

  router.use('/api', middleware);
}