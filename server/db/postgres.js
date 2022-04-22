const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.POOL_USER,
  database: process.env.POOL_DB,
  password: process.env.POOL_PASSWORD,
  port: process.env.POOL_PORT,
});
pool.on('error', (err) => {
  console.log('pool error', err);
});
pool.connect();

// Questions List
var query = (id, cb) => {
  var getQuery = `SELECT * FROM questions WHERE product_id = ${id}`;
  pool.query(getQuery, ((err, res) => {
    if (err) {
      console.log(err);
    }
    cb(err, res);
  }));
}

// // Answers List
// // GET /qa/questions/:question_id/answers
// app.get(`/qa/questions/:${question_id}/answers`, (req, res) => {
//   const page = req.query.page || 1;
//   const count = req.query.count || 5;
//   const container = {
//     question: question_id,
//     page: page,
//     count: count,
//     results: [],
//   };
//   pool.query(``)
//     .then((data) => {
//       res.send(container);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

// // Add a Question
// // POST /qa/questions
// app.post('/qa/questions', (req, res) => {
//   pool.query(``)
//     .then((data) => {
//       res.status(201).send(data);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

// // Add an Answer
// // POST /qa/questions/:question_id/answers
// app.post(`/qa/questions/:${question_id}/answers`, (req, res) => {
//   pool.query(``)
//     .then((data) => {
//       res.status(201).send(data);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

// // Mark Question as Helpful
// // PUT /qa/questions/:question_id/helpful
// app.put(`/qa/questions/:${question_id}/helpful`, (req, res) => {
//   pool.query(``)
//     .then((data) => {
//       res.status(204).send(data);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

// // Report Question
// // PUT /qa/questions/:question_id/report
// app.put(`/qa/questions/:${question_id}/report`, (req, res) => {
//   pool.query(``)
//     .then((data) => {
//       res.status(204).send(data);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

// // Mark Answer as Helpful
// // PUT /qa/answers/:answer_id/helpful
// app.put(`/qa/answers/:${answer_id}/helpful`, (req, res) => {
//   pool.query(``)
//     .then((data) => {
//       res.status(204).send(data);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

// // Report Answer
// // PUT /qa/answers/:answer_id/report
// app.put(`/qa/answers/:${answer_id}/report`, (req, res) => {
//   pool.query(``)
//     .then((data) => {
//       res.status(204).send(data);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

module.exports = {
  query: query
}