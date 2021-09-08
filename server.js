const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  const math = Math.floor(Math.random() * db.length + 1);
  res.json(db.find(person => person.id == math));
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.find(person => person.id == req.params.id));
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const id = db.length + 1;
  const person = {id: id, author: author, text: text};

  if(author && text) {
    db.push(person);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const id = req.params.id;
  const person = db.find(person => person.id == req.params.id);
  const indexOf = db.indexOf(person);
  
  if(author && text) {
    db[indexOf] = {id: id, author: author, text: text};
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

app.delete('/testimonials/:id', (req, res) => {
  const person = db.find(person => person.id == req.params.id);
  const indexOf = db.indexOf(person);
  
  db.splice(indexOf, 1);
  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});