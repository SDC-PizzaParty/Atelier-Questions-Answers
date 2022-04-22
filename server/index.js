require('dotenv').config();
const express = require('express');
const axios = require('axios');
const db = require('./db/postgres.js')

// Server URL
const QA_URL = `${process.env.URL}:${process.env.PORT}`;

const app = express();
app.use(express.json());

// // test
// app.get('/test', (req, res) => {
//   res.send('test success!');
// })

// Questions List
app.get('/qa/questions', (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  const container = {
    product_id: req.query.product_id,
    results: [],
  };
  db.query(req.query.product_id, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    container.results = result.rows[0];
    res.send(container);
  })
});


app.listen(process.env.PORT, () => {
  console.log('QA server listening on:', process.env.PORT);
});
