var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connecting to the database
mongoose.connect('mongodb://test:ravi@ds161295.mlab.com:61295/todoravi');

// Create mongoDB schema - what mongoDB is going to expect
var todoSchema = new mongoose.Schema({
  item: String
});

// Create a model for mongoDB with the schema we created
var Todo = mongoose.model('Todo', todoSchema);

// var data = [{item: 'clean car'}, {item: 'go to the gym'}, {item: 'make dinner'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/todo', function(req, res){
    // Get data from mongoDB and pass it to the view
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    })
  });

  app.post('/todo', urlencodedParser, function(req, res){
    // Get data from the view and add it to monogoDB
    var newTodo = Todo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data);
    })
  });

  app.delete('/todo/:item', function(req, res){
    // Delete the requested item from mongoDB
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if (err) throw err;
      res.json(data);
    })
  });

};
