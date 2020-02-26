var express = require('express');
var router = express.Router();


router.post('/login', function(req, res, next) {
  //直接可以从req。body拿出数据(因为有expres。json)
  const { username, password} = req.body
  res.json({
      errno: 0,
      data: {
          username,
        password
      }
  });
});

module.exports = router;