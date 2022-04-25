require('dotenv').config();
const express = require('express');
const axios = require('axios');
const db = require('./db/postgres.js');

const app = express();
app.use(express.json());
// }

// test
app.get('/test', (req, res) => {
  res.send('test success!');
})

// Questions List
app.get('/qa/questions', (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  const container = {
    product_id: req.query.product_id,
    results: []
  };
  db.query(`SELECT json_agg(
    json_build_object(
      'question_id', q.id,
      'question_body', q.body,
      'question_date', q.date_written,
      'asker_name', q.asker_name,
      'question_helpfulness', q.helpful,
      'reported', q.reported,
      'answers', (
        SELECT json_object_agg(a.id, json_build_object(
            'id', a.id,
            'body', a.body,
            'date', a.date_written,
            'answerer_name', a.answerer_name,
            'helpfulness', a.helpful,
            'photos', (
              SELECT (
                json_agg(
                  json_build_object(
                    'id', p.id,
                    'url', p.url
                  )
                )
              ) FROM photos p WHERE p.answer_id = a.id
            )
          )
        ) FROM answers a WHERE a.question_id = q.id
      )
    )
  ) FROM questions q WHERE q.product_id = ${req.query.product_id}`, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    // console.log(result)
    container.results = result.rows[0].json_agg;
    res.send(container);
  });
});

// Answers List
// GET /qa/questions/:question_id/answers
app.get(`/qa/questions/:question_id/answers`, (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  const container = {
    question: req.params.question_id,
    page: page,
    count: count,
    results: [],
  };
  db.query(`SELECT json_agg(json_build_object(
        'answer_id', a.id,
        'body', a.body,
        'date', a.date_written,
        'answerer_name', a.answerer_name,
        'helpfulness', a.helpful,
        'photos', (
          SELECT (
            json_agg(
              json_build_object(
                'id', p.id,
                'url', p.url
              )
            )
          ) FROM photos p WHERE p.answer_id = a.id)
  )) FROM answers a WHERE a.question_id = ${req.params.question_id}`, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    container.results = result.rows[0].json_agg;
    res.send(container);
  });
});

// Add a Question
// POST /qa/questions
app.post('/qa/questions', (req, res) => {
  let body = req.body.body;
  let name = req.body.name;
  let email = req.body.email;
  let product_id = req.body.product_id;
  db.query(`INSERT INTO questions (body, asker_name, asker_email, product_id, reported, helpful) VALUES ('${body}', '${name}', '${email}', '${product_id}', false, 0)`, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send(err);
    }
    res.status(201).send(result);
  })
});

// Add an Answer
// POST /qa/questions/:question_id/answers
app.post(`/qa/questions/:question_id/answers`, (req, res) => {
  let body = req.body.body;
  let name = req.body.name;
  let email = req.body.email;
  let question_id = req.params.question_id;
  console.log(body, name, email, question_id)
  db.query(`INSERT INTO answers (body, answerer_name, answerer_email, question_id, reported, helpful) VALUES ('${body}', '${name}', '${email}', '${question_id}', false, 0) RETURNING id`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    // console.log(req.body.photos)
    if (req.body.photos) {
      // console.log(result.rows[0].id)
      // console.log(req.body.photos)
      for (let i = 0; i < req.body.photos.length; i++) {
        // console.log('ya')
        db.query(`INSERT INTO photos (answer_id, url) VALUES (${result.rows[0].id}, '${req.body.photos[i]}')`, (err, result2) => {
          if (err) {
            console.log(err);
            return;
          }
          if (i === req.body.photos.length - 1) {
            res.status(201).send('answer posted with photos');
          }
        });
      }
    } else {
      res.status(201).send('answer posted with no photos');
    }
  })
});

// Mark Question as Helpful
// PUT /qa/questions/:question_id/helpful
app.put(`/qa/questions/:question_id/helpful`, (req, res) => {
  let question_id = req.params.question_id;
  db.query(`UPDATE questions SET helpful = helpful + 1 WHERE id = ${question_id}`, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).send(result);
  })
});

// Report Question
// PUT /qa/questions/:question_id/report
app.put(`/qa/questions/:question_id/report`, (req, res) => {
  let question_id = req.params.question_id;
  db.query(`UPDATE questions SET reported = true WHERE id = ${question_id}`, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).send(result);
  })
});

// Mark Answer as Helpful
// PUT /qa/answers/:answer_id/helpful
app.put(`/qa/answers/:answer_id/helpful`, (req, res) => {
  let answer_id = req.params.answer_id;
  db.query(`UPDATE answers SET helpful = helpful + 1 WHERE id = ${answer_id}`, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).send(result);
  })
});

// Report Answer
// PUT /qa/answers/:answer_id/report
app.put(`/qa/answers/:answer_id/report`, (req, res) => {
  let answer_id = req.params.answer_id;
  db.query(`UPDATE answers SET reported = true WHERE id = ${answer_id}`, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).send(result);
  })
});

app.listen(process.env.PORT, () => {
  console.log('QA server listening on:', process.env.PORT);
});
