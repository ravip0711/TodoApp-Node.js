var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

// Set up template engine
app.set('view engine', 'ejs');

// Middleware for static files
app.use(express.static('./public'));

// Fires controllers
todoController(app);

// Listen to port
app.listen(3000);
console.log('You are listening to port 3000...');
