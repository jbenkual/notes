var express = require('express');
var router = express.Router();
var db = require("../db.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("loading!");
  db.load(function (data) {
    res.send(data);
  });
});

router.delete("/", function(req, res, next) {
  var id = req.body.id;
  db.remove(id);
});


router.post('/', function(req, res, next) {
  var desc = req.body.desc;
  var date = req.body.date;
  if(desc === undefined || date === undefined) {
    res.send(200);
    return;
  }
  var task = db.create({desc: desc, date: date});
  db.save(task, function(data) {
    res.send(data);
  });
  
});

module.exports = router;
