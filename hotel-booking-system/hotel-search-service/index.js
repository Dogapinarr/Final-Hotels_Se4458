const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const redis = require('redis');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1288',
  database: 'hotel_booking_system'
});

const cache = redis.createClient({
  host: 'redis',
  port: 6379
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

app.get('/v1/search/search-hotels', (req, res) => {
  const { location, startDate, endDate, people, userId, page, limit } = req.query;
  const cacheKey = `${location}-${startDate}-${endDate}-${people}-${page}-${limit}`;
  
  const pageInt = parseInt(page) || 1;
  const limitInt = parseInt(limit) || 10;
  const offset = (pageInt - 1) * limitInt;

  cache.get(cacheKey, (err, data) => {
    if (err) throw err;
    if (data) {
      const result = JSON.parse(data);
      if (userId) {
        result.forEach(hotel => {
          hotel.price = hotel.price * 0.9; // 10% discount for logged in users
        });
      }
      return res.json(result);
    } else {
      const sql = `SELECT * FROM rooms WHERE location = ? AND available_from <= ? AND available_to >= ? AND capacity >= ? LIMIT ?, ?`;
      db.query(sql, [location, startDate, endDate, people, offset, limitInt], (err, results) => {
        if (err) throw err;
        if (userId) {
          results.forEach(hotel => {
            hotel.price = hotel.price * 0.9; // 10% discount for logged in users
          });
        }
        cache.setex(cacheKey, 3600, JSON.stringify(results));
        res.json(results);
      });
    }
  });
});

app.listen(3001, () => {
  console.log('Hotel Search Service running on port 3001');
});
