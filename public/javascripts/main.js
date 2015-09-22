function newTask() {
  var task = {};
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  task.desc = "Do homework";
  task.date = tomorrow;

  $.post("./task", task, function(data, status){
    createTaskEl(data);
  });
}

function processDate(date) {
  var output = "";
  var due = new Date(date);
  var now = new Date();
  var diff = new Date(due.getTime()-now.getTime());
  if(diff.getUTCFullYear() - 1970 > 0) {
    output += diff.getUTCFullYear() - 1970 + " years";
  }
  if(diff.getUTCMonth() > 0) {
    output += " " + diff.getUTCMonth() + " months";
  }
  if(diff.getUTCDate()-1 > 0) {
    output += " " + (diff.getUTCDate() -1) + " days";
  }
  if(diff.getUTCHours() > 0) {
    output += " " + diff.getUTCHours() + " hours";
  }
  if( diff.getUTCDate()-1 <= 0) {
    output += " " + diff.getUTCMinutes() + " minutes";
  }
  // if( diff.getUTCHours() <= 0) {
  //   output += " " + diff.getUTCSeconds() + " seconds";
  // }
  
  return output;
}

function createTaskEl(data) {
  var row = $("<div>");
  row.addClass("item");

  var x = $("<i>");
  x.addClass("fa");
  x.addClass("fa-times-circle-o");
  x.addClass("remove");
  x.attr("id", data._id);
  x.click(deleteClick);
    
  var desc = $("<span>");
  desc.text(data.desc);
  desc.addClass("desc");
  
  var date = $("<span>");
  date.addClass("date");
  date.text(processDate(data.dueDate));
  
  var check = $("<input>");
  check.attr("type", "checkbox");
  check.addClass("check");
  
  row.append(x, desc, date, check);

  $('.container').append(row);
}

function getTasks() {
  $.get("./task", function(data, status) {
    //console.log("DATA: " + data);
    var arr = data;
    //console.log(arr);
    for(var i of arr) {
      createTaskEl(i);
    }
  });
}

function deleteClick(e) {
  deleteTask(e.target.id);
}

function deleteTask(id) {
  $.ajax({
    url: '/task',
    type: 'DELETE',
    data: {id: id},
    success: function(result) {
      $('#' + id).parent().remove();
    }
  });
}

function updateTask() {

}


getTasks();
console.log("main.js loaded!");