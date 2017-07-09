const router = require('express').Router();
const mongoose = require('mongoose');


router.get('/lists', function(req, res, next){
  mongoose.model('Lists').find({deleted: {$ne: true}}, function(err, lists) {
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
  const List = mongoose.model("Lists");
  const listId = req.params.listId;

  List.findById(listId, function(err, list){
    if(err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (!list){
      return res.status(404).json({text: "file not found"});
    }

    list.title = req.body.title;
    list.save(function(err, savedList){
      res.json(savedList);
    });
  })
});

router.delete('/lists/:listId', function(req, res, next) {
  const List = mongoose.model('Lists');
  const listId = req.params.listId;

  List.findById(listId, function(err, list){
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (!list) {
      return res.status(404).json({message: "List not found, ya dummy"});
    }
    list.deleted = true;

    list.save(function(err, deletedList){
      res.json(deletedList);
    })
  })
});

router.get('/lists/:listId', function(req, res, next) {
  res.end(`Reading file '${req.params.listId}'`);
});

module.exports = router;
