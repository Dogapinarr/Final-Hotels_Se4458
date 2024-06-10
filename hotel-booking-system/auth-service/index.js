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
  database: 'hotel_booking_system'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

app.post('/v1/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  console.log('Request Body:', req.body); // Hata ayıklama için

  if (!name || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  const user = { name, email, password };

  const sql = 'INSERT INTO users SET ?';
  db.query(sql, user, (err, result) => {
    if (err) throw err;
    res.send('User registered...');
  });
});

app.post('/v1/auth/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) throw err;
    if (results.length === 0) return res.status(404).send('User not found');

    const user = results[0];
    if (password !== user.password) {
      return res.status(401).send('Invalid password');
    }

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: 86400 });
    res.json({ auth: true, token });
  });
});

app.listen(3005, () => {
  console.log('Auth Service running on port 3005');
});
