const mongoose = require('mongoose');

const ListsSchema = new mongoose.Schema({
  title: String,
  id: Number,
  created_at: {type: Date, default: Date.now}
});

const Lists = mongoose.model('Lists', ListsSchema);
module.exports = Lists;

Lists.count({}, function(err, count){
  if(err) {
    throw err;
  }
  if (count > 0) return;

  const lists = require('./lists.seed.json');
  Lists.create(lists, function(err, newLists) {
    if (err) {
      throw err;
    }
    console.log("DB Seeded")
  });
});
