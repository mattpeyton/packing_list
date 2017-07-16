//Hooking up dependencies
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');

//Hooking up my config and routes directories
const config = require('./config');
const router = require('./routes');

//Connecting mongoose to database location and name outlined in config/index.js
mongoose.connect(`mongodb://${config.db.host}/${config.db.dbName}`);

//Importing "lists" database model
require('./models/lists.model.js');

//Creating an instance of express
const app = express();

//Establishing path to public static files
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

//Telling the server that I will be sending some json around and it will need body-parser to make any sense of it
app.use(bodyParser.json());

//Telling the app to use routes defined in router, and to make requests to api/...
app.use('/api', router);


//Setting up future use of templating engine for list pages
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/public/views'));

//Get (read/view) individual list
app.get('/lists/:listId', function(req, res){
  res.sendFile("list.html", {root: path.join(__dirname, '../src/public/views')})
})

//Firing up the server
app.listen(config.port, function(){
  console.log(`${config.appName} is listening on port ${config.port}`);
});
