const models = require('../models/index');

module.exports = function (router) {
  router.put('/api/user-ban', async (req, res, next) => {
    try {
      await models.User.update(
        {
          ban: req.body.ban,
          reasonBan: req.body.reasonBan
        },
        {
          where: {
            id: req.body.id
          }
        }
      );

      const bannedUser = await models.User.findOne({
        where: {
          id: req.body.id
        }
      })

      res.items = bannedUser;
      next();
    } catch (err) {
      res.message = err.message;
      next();
    }
  })
}

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