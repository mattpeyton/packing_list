//loading mongoose tool
const mongoose = require('mongoose');

//Creating schema for lists
const ListsSchema = new mongoose.Schema({
  title: String,
  id: Number,
  cardColor: String,
  created_at: {type: Date, default: Date.now},
  deleted: {type: Boolean, default: false}
});

//telling mongoose that the List schema is a model
const Lists = mongoose.model('Lists', ListsSchema);
module.exports = Lists;

//test to see if the database is empty
Lists.count({}, function(err, count){
  if(err) {
    throw err;
  }
  //if it's got documents just stop.
  if (count > 0) return;

//otherwise (if the database is empty) let's go ahead and add some seed data.
  const lists = require('./lists.seed.json');
  Lists.create(lists, function(err, newLists) {
    if (err) {
      throw err;
    }
    console.log("DB Seeded")
  });
});
