var express = require('express');
var router = express.Router();
var db = require("../db.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  
  var notes = db.load();

  res.send(notes);
});


router.post('/', function(req, res, next) {

  db.save(req.body);
  res.send(200);
});

module.exports = router;
