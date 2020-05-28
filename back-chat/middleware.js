const jwt = require('jsonwebtoken');
const config = require('./config.js');
const result = {
  success: false,
  items: [],
  message: ''
};

module.exports = (req, res, next) => {
  try {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    if(token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
          res.message = 'Token is not valid';
          next();
        } else {
          req.decoded = decoded;
          next();
        }
      })
    } else {
      result.message = 'Auth token is not supplied';
      res.send(result)
    }

  } catch(err) {
    result.message = err.message;
    res.send(result)
  }
}