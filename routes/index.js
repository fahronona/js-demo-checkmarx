var express = require('express');
var router = express.Router();
const controller = require('../app/controller');

router.post("/add-count",controller.addCount);
router.get("/read-count",controller.readCount);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
