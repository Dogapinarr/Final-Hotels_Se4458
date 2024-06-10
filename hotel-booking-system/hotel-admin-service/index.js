const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1288',
  database: 'hotel_booking_system',
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// Middleware for JWT verification
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

app.post('/v1/admin/add-room', verifyToken, (req, res) => {
  const room = req.body;
  const sql = 'INSERT INTO rooms SET ?';
  db.query(sql, room, (err, result) => {
    if (err) throw err;
    res.send('Room added...');
  });
});

app.put('/v1/admin/update-room/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  const newDetails = req.body;
  const sql = `UPDATE rooms SET ? WHERE id = ${id}`;
  db.query(sql, newDetails, (err, result) => {
    if (err) throw err;
    res.send('Room updated...');
  });
});

app.delete('/v1/admin/delete-room/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM rooms WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Room deleted...');
  });
});

// List rooms with pagination
app.get('/v1/admin/list-rooms', verifyToken, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const sql = 'SELECT * FROM rooms LIMIT ?, ?';
  db.query(sql, [offset, limit], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Hotel Admin Service running on port 3000');
});
