const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.find(concert => concert.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
  const {performer, genre, price, day, image} = req.body;
  const id = db.concerts.length + 1;
  const convertedPrice = parseInt(price);
  const convertedDay = parseInt(day);
  const concert = {id: id, performer: performer, genre: genre, price: convertedPrice, day: convertedDay, image: image};

  if(performer && genre && price && day && image) {
    db.concerts.push(concert);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

router.route('/concerts/:id').delete((req, res) => {
  const concert = db.concerts.find(concert => concert.id == req.params.id);
  const index = db.concerts.indexOf(concert);

  db.concerts.splice(index, 1);
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  const {performer, genre, price, day, image} = req.body;
  const id = req.params.id;
  const concert = db.concerts.find(concert => concert.id == req.params.id);
  const index = db.concerts.indexOf(concert);
  const convertedPrice = parseInt(price);
  const convertedDay = parseInt(day);
  const convertedId = parseInt(id);

  if(performer && genre && price && day && image) {
    db.concerts[index] = {id: convertedId, performer: performer, genre: genre, price: convertedPrice, day: convertedDay, image: image};
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

module.exports = router;