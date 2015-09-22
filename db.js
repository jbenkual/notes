var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Connected to database");
});

var Task = mongoose.model('task', { name: String, dueDate: Date, createdAt: Date});

// var tomorrow = new Date();
// tomorrow.setDate(tomorrow.getDate() + 1);

exports.create = function(data) {
  var task1 = new Task({ 
    desc: data.desc, 
    dueDate: data.date,
    createdAt: Date.now()
  });

  return task1;
};



exports.save = function(object) {
  if(!object.hasKey('save')) {
    console.error("Tried to save a non-mongoose object");
    return;
  }
  object.save(function (err) {
    if (err)  {
      console.error(err);
    }
    console.log("Data saved!");
  });
};

exports.load = function() {
  var data = db.tasks.find();
  console.log(data);
};

