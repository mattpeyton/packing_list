//Loading router tool from express
const router = require('express').Router();

//I'm going to need mongoose in this file.
const mongoose = require('mongoose');

//GET lists request.
router.get('/lists', function(req, res, next){
  //calling find method on mongoose "Lists" model to
  //find all documents that are not deleted
  mongoose.model('Lists').find({deleted: {$ne: true}}, function(err, lists) {
    if(err) {
      console.log(err);
      res.status(500).json(err);
    }
    //send the those documents in json format
    res.json(lists);
  });
});

//GET individual list
router.get('/lists/:listId', function(req, res, next) {
  res.sendFile("list.html", {root: path.join(__dirname, './src/public/views')});
});

//POST request - add a new list document
router.post('/lists', function(req, res, next) {
  //We'll be using that "Lists" model, of course
  const List = mongoose.model("Lists");
  //Creating a new variable and assinging the title of the request's body to it
  const listData = {
    title: req.body.title,
    cardColor: req.body.cardColor
  };

  //creating a document in the List model
  List.create(listData, function(err, newList){
    if(err) {
      console.log(err);
      return res.status(500).json(err);
    }
    //sending that new list document in json
    res.json(newList)
  })
});

//PUT request
router.put('/lists/:listId', function(req, res, next) {
  //declaring variable for the List model
  const List = mongoose.model("Lists");
  //declaring variable for listId route parameter within the request
  const listId = req.params.listId;

  //Find the document with the matching listId as the request
  List.findById(listId, function(err, list){
    if(err) {
      console.log(err);
      return res.status(500).json(err);
    }
    //let me know if there's a problem finding that id...
    if (!list){
      return res.status(404).json({text: "file not found"});
    }
    //the title of the original list is now changed to the title of of the request
    list.title = req.body.title;
    list.cardColor = req.body.cardColor;

    //save that update to the database and send it back to me in json
    list.save(function(err, savedList){
      res.json(savedList);
    });
  })
});

//DELETE request
router.delete('/lists/:listId', function(req, res, next) {
  //declaring variable for the List model
  const List = mongoose.model('Lists');
  //declaring variable for listId route parameter within the request
  const listId = req.params.listId;

  //Find the document with the matching listId as the request
  List.findById(listId, function(err, list){
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    //let me know if you can't find that list
    if (!list) {
      return res.status(404).json({message: "List not found."});
    }
    //update the deleted property to true
    list.deleted = true;

    //save the updated list document and send it to me in json
    list.save(function(err, deletedList){
      res.json(deletedList);
    })
  })
});

//export all the code here so I can use it elsewhere...like in server.js
module.exports = router;
