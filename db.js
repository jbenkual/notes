var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Connected to database");
});

var Task = mongoose.model('task', { desc: String, dueDate: Date, createdAt: Date, completed: Boolean});

exports.create = function(data) {
  var task1 = new Task({ 
    desc: data.desc, 
    dueDate: data.date,
    createdAt: Date.now()
  });

  return task1;
};

exports.save = function(object, cb) {
  if(!object.hasOwnProperty('save')) {
    console.error("Error: Tried to save a non-mongoose object");
    return;
  }
  object.save(function (err, data) {
    if (err)  {
      console.error(err);
    }
    console.log("Data saved!");
    cb(data);
  });
};

exports.load = function(cb) {
  var data = Task.find({}, function(err, tasks) {
    cb(tasks);
  });
};

exports.remove = function(id) {
  console.log("Test");
  Task.findById(id).remove( function(err, status) {
    if(err) {
      console.error(err);
    }
  });
};

exports.update = function(id, key, value, cb) {

};

