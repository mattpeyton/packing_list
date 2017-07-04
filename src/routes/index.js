const router = require('express').Router();

const LISTS = [
  {id: '1', title: 'Orlando', description: 'vacation 2017'},
  {id: '2', title: 'Doctor', description: 'ouch, shots'},
  {id: '3', title: "Grandma's", description: 'cookies?'},
  {id: '4', title: 'Dog Show', description: 'biscuit'},
  {id: '5', title: 'Swim Gear', description: 'to swim with'}
];

router.get('/lists', function(req, res, next){
  res.json(LISTS);
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
  const newId = '' + LISTS.length;
  const data = req.body;
  data.id = newId;

  LISTS.push(data);
  res.status(201).json(data);
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
