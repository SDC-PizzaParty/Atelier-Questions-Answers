/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const axios = require('axios');

// Server URL
const QA_URL = `${process.env.URL}:${process.env.QA_PORT}`;

const app = express();

app.use('/qa', (req, res) => {
  axios(QA_URL, {
    method: req.method,
    data: req.body,
  })
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(process.env.PORT);
console.log('[Router]: Server listening on:', process.env.PORT);
