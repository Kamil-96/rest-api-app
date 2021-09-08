const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const math = Math.floor(Math.random() * db.testimonials.length + 1);
  res.json(db.testimonials.find(person => person.id == math));
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.find(person => person.id == req.params.id));
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  const id = db.testimonials.length + 1;
  const person = {id: id, author: author, text: text};

  if(author && text) {
    db.testimonials.push(person);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const id = req.params.id;
  const person = db.testimonials.find(person => person.id == req.params.id);
  const indexOf = db.testimonials.indexOf(person);
  const convertedId = parseInt(id);
  
  if(author && text) {
    db.testimonials[indexOf] = {id: convertedId, author: author, text: text};
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

router.route('/testimonials/:id').delete((req, res) => {
  const person = db.testimonials.find(person => person.id == req.params.id);
  const indexOf = db.testimonials.indexOf(person);
  
  db.testimonials.splice(indexOf, 1);
  res.json({ message: 'OK' });
});

module.exports = router;