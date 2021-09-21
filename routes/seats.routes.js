const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.find(seat => seat.id == req.params.id));
});

router.route('/seats').post((req, res) => {
  const {day, seat, client, email} = req.body;
  const id = db.seats.length + 1;
  const convertedDay = parseInt(day);
  const convertedSeat = parseInt(seat);
  const item = {id: id, day: convertedDay, seat: convertedSeat, client: client, email: email};

  if(day && seat && client && email) {
    const checkSeat = db.concerts.filter(item => item.day === convertedDay && item.seat === convertedSeat);
    
    if(checkSeat.length) {
      res.status(404).json({ message: "The slot is already taken..." });
    } else {
      db.seats.push(item);
      res.json({ message: 'OK' });
      req.io.emit('seatsUpdated', db.seats);
    }
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

router.route('/seats/:id').delete((req, res) => {
  const seat = db.seats.find(seat => seat.id == req.params.id);
  const index = db.seats.indexOf(seat);

  db.seats.splice(index, 1);
  res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
  const {day, seat, client, email} = req.body;
  const id = req.params.id;
  const item = db.seats.find(seat => seat.id == req.params.id);
  const index = db.seats.indexOf(item);
  const convertedDay = parseInt(day);
  const convertedSeat = parseInt(seat);
  const convertedId = parseInt(id);

  if(day && seat && client && email) {
    db.seats[index] = {id: convertedId, day: convertedDay, seat: convertedSeat, client: client, email: email};
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

module.exports = router;