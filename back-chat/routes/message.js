const models = require('../models/index');
const fs = require('fs')

module.exports = function (router, io, formidable) {
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
            updatedAt: el.updatedAt,
            path: el.path
          }
          return newMessage;

        });

        newArrayMessage.sort((a, b) => {
          return new Date(a.createAt) - new Date(b.createAt);
        })

        res.items = newArrayMessage;
      }

      next();
    } catch (err) {
      res.message = err.message;
      next();
    }
  });

  router.post('/api/upload-img', async (req, res, next) => {
    try {
      const form = formidable({ multiples: true });
      form.parse(req, (err, fields, files) => {
        var oldpath = files.image.path;
        var newpath = `back-chat/img/${files.image.name}`;

        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          res.send({data: newpath});
        });
      })
    } catch (err) {
      res.message = err.message;
      next();
    }
  });

  router.get('/api/get-img/:id', async (req, res, next) => {
    try {
      const imgPath = await models.Message.findOne({
        where: {
          id: req.params.id
        }
      });

      fs.readFile(imgPath.path, (err, data) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(data);
      });
    } catch (err) {
      res.message = err.message;
      next();
    }
  })
}