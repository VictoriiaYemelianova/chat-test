const express         = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const route = require('./routes/rout');

const router = express.Router();

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

route(router);
app.use('/', router);


router.use(function(req, res, nex) {
  const result = {
    success: false,
    items: [],
    message: ''
  };

  if (res.items) {
    result.success = true;
    if (Array.isArray(res.items)) {
      result.items = res.items;
    } else {
      result.items.push(res.items);
    }
    
  } else {
    result.message = res.message;
  }

  res.send(result);
})

app.listen(3000, function(){
  console.log('Express server listening on port ' + 3000);
});