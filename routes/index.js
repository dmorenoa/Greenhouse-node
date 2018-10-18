var express = require('express');
var router = express.Router();

var com = require('../com')

router.get('/', function(req, res){
  res.send('ok');
})

router.post('/requests', function(req, res){
  com.send(req.body.requests);
  res.send({
    message : "waiting for socket"
  })
})

module.exports = router;