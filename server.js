const express = require('express');
const db = require('./pool');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(express.json())
// Buat catatan baru
app.post('/notes', (req, res) => {
  const { title, datetime, note } = req.body;
  const query = 'INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)';
  db.query(query, [title, datetime, note], (err, result) => {
    if (err) throw err;
    res.status(201).send({ message: 'Note created', id: result.insertId });
  });
});

// Tampilkan semua catatan
app.get('/notes', (req, res) => {
  db.query('SELECT * FROM notes', (err, results) => {
    if (err) throw err;
    res.status(200).json(results);
  });
});

// Tampilkan catatan berdasarkan ID
app.get('/notes/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM notes WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).send({ message: 'Note not found' });
    } else {
      res.status(200).json(result[0]);
    }
  });
});

// Update catatan berdasarkan ID
app.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  const { title, datetime, note } = req.body;
  const query = 'UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?';
  db.query(query, [title, datetime, note, id], (err, result) => {
    if (err) throw err;
    res.status(200).send({ message: 'Note updated' });
  });
});

// Hapus catatan berdasarkan ID
app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM notes WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.status(200).send({ message: 'Note deleted' });
  });
});

// Server start
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
