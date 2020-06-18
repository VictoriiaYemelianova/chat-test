const models = require('../models/index');
const fs = require('fs')

module.exports = function (router, formidable, sharp) {
  router.get('/api/message/:id', async (req, res, next) => {
    try {
      const messageAll = await models.Message.findAll({
        include: {
          model: models.User
        },
        where: {
          roomId: req.params.id
        }
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
        let oldpath = files.image.path;
        let newpath = `back-chat/img/${files.image.name}`;

        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          sharp(newpath).resize(200, 200).toFile(`${newpath}(2)`, (err, resizeImg) => {
            if (err) throw err;
            console.log(resizeImg)
            res.send({data: newpath});            
          });
        });
      })
    } catch (err) {
      res.message = err.message;
      next();
    }
  });

  router.get('/api/get-img/:id/:size', async (req, res, next) => {
    try {
      const imgPath = await models.Message.findOne({
        where: {
          id: req.params.id
        }
      });

      if (req.params.size < '600') {
          fs.readFile(`${imgPath.path}(2)`, (err, data) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(data);
          })
      } else {
        fs.readFile(imgPath.path, (err, data) => {
          if (err) throw err;
          res.writeHead(200, { 'Content-Type': 'image/jpeg' });
          res.end(data);
        });
      };
    } catch (err) {
      res.message = err.message;
      next();
    }
  })
}