const router = require('express').Router();
const mongoose = require('mongoose');


router.get('/lists', function(req, res, next){
  mongoose.model('Lists').find({}, function(err, lists) {
    if(err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.json(lists);
  });
});


router.get('/lists/:listId', function(req, res, next) {
  const {listId} = req.params;

  const list = LISTS.find(entry => entry.id === listId);
  if(!list) {
    return res.status(404).end(`Could not find list '${listId}'`);
  }

  res.json(list);
});

router.post('/lists', function(req, res, next) {
  const List = mongoose.model("Lists");
  const listData = {
    title: req.body.title,
  };

  List.create(listData, function(err, newList){
    if(err) {
      console.log(err);
      return res.status(500).json(err);
    }
    res.json(newList)
  })
});

router.put('/lists/:listId', function(req, res, next) {
  const {listId} = req.params;
  const list = LISTS.find(entry => entry.id === listId);
  if(!list) {
    return res.status(404).end(`Could not find list '${listId}'`);
  }
  list.title = req.body.title;
  res.json(file);
});

router.delete('/lists/:listId', function(req, res, next) {
  res.end(`Delete list '${req.params.listId}'`);
});

router.get('/lists/:listId', function(req, res, next) {
  res.end(`Reading file '${req.params.listId}'`);
});

module.exports = router;
