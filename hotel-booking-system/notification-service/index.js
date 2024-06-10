const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const amqp = require('amqplib/callback_api');

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

app.post('/v1/book/book-room', (req, res) => {
  const { roomId, userId, startDate, endDate, totalPrice } = req.body;
  const reservation = { room_id: roomId, user_id: userId, start_date: startDate, end_date: endDate, total_price: totalPrice };

  const sql = 'INSERT INTO reservations SET ?';
  db.query(sql, reservation, (err, result) => {
    if (err) throw err;

    const updateCapacitySql = 'UPDATE rooms SET capacity = capacity - 1 WHERE id = ?';
    db.query(updateCapacitySql, [roomId], (err, result) => {
      if (err) throw err;

      amqp.connect('amqp://rabbitmq', (error0, connection) => {
        if (error0) throw error0;
        connection.createChannel((error1, channel) => {
          if (error1) throw error1;
          const queue = 'reservations';
          const msg = JSON.stringify(reservation); // Use the reservation object here
          channel.assertQueue(queue, { durable: false });
          channel.sendToQueue(queue, Buffer.from(msg));
          console.log("Sent reservation to queue: %s", msg);

          setTimeout(() => {
            channel.close();
            connection.close();
          }, 500);
        });
      });

      res.send('Room booked successfully...');
    });
  });
});

app.listen(3002, () => {
  console.log('Book Hotel Service running on port 3002');
});
