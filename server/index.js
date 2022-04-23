require('dotenv').config();
const express = require('express');
const axios = require('axios');
const db = require('./db/postgres.js')

const app = express();
app.use(express.json());

// photo handler
var getPhotos = (answer_id) => {
  db.query(`SELECT * FROM photos WHERE answer_id = ${answer_id}`, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    // console.log(result.rows)
    for (let i = 0; i < result.rows.length; i++) {
      var photoWrapper = {};
      photoWrapper.id = result.rows[i].id;
      photoWrapper.url = result.rows[i].url;
      result.rows[i] = photoWrapper;
    }
    console.log(photoWrapper);
    return photoWrapper;
  });
}

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
  db.query(`SELECT * FROM questions WHERE product_id = ${req.query.product_id}`, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    for (let i = 0; i < result.rows.length; i++) {
      var questionWrapper = {};
      questionWrapper.question_id = result.rows[i].id;
      questionWrapper.question_body = result.rows[i].body;
      questionWrapper.question_date = result.rows[i].date_written;
      questionWrapper.asker_name = result.rows[i].asker_name;
      questionWrapper.question_helpfulness = result.rows[i].helpful;
      questionWrapper.reported = result.rows[i].reported;
      questionWrapper.answers = {};
      result.rows[i] = questionWrapper;
    }
    container.results = result.rows;
    res.send(container);
  })
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
  db.query(`SELECT * FROM answers WHERE question_id = ${req.params.question_id}`, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    // console.log(result.rows)
    for (let i = 0; i < result.rows.length; i++) {
      var answerWrapper = {};
      answerWrapper.answer_id = result.rows[i].id;
      answerWrapper.body = result.rows[i].body;
      answerWrapper.date = result.rows[i].date_written;
      answerWrapper.answerer_name = result.rows[i].answerer_name;
      answerWrapper.helpfulness = result.rows[i].helpful;
      answerWrapper.photos = getPhotos(result.rows[i].id);
      result.rows[i] = answerWrapper;
    }
    container.results = result.rows;
    res.send(container);
  })
});

// Add a Question
// POST /qa/questions
app.post('/qa/questions', (req, res) => {
  if (req.query.email.includes('.com') || req.query.email.includes('.net') || req.query.email.includes('.org') || req.query.email.includes('.edu') || req.query.email.includes('.gov') || req.query.email.includes('.mil') || req.query.email.includes('.k12')) {
    let body = req.query.body;
    let name = req.query.name;
    let email = req.query.email;
    let product_id = req.query.product_id;
    db.query(`INSERT INTO questions (body, asker_name, asker_email, product_id, reported, helpful) VALUES (${body}, ${name}, ${email}, ${product_id}, false, 0)`, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(201).send(result);
    })
  } else {
    res.send('error: invalid email entered');
    return;
  }
});

// Add an Answer
// POST /qa/questions/:question_id/answers
app.post(`/qa/questions/:question_id/answers`, (req, res) => {
  if (req.query.email.includes('.com') || req.query.email.includes('.net') || req.query.email.includes('.org') || req.query.email.includes('.edu') || req.query.email.includes('.gov') || req.query.email.includes('.mil') || req.query.email.includes('.k12')) {
    let body = req.query.body;
    let name = req.query.name;
    let email = req.query.email;
    let photos = req.query.photos;
    let question_id = req.params.question_id;
    db.query(`
      INSERT INTO answers(
        body, answerer_name, answerer_email, question_id, reported, helpful
      ) VALUES (
        ${body}, ${name}, ${email}, ${question_id}, false, 0
      )
    `, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (photos !== []) {
        for (let i = 0; i < photos.length; i++) {
          db.query(`
          INSERT INTO photos(
            answer_id, url
          )
          VALUES(
            answer_id, ${req.query.photos}
          )`)
        }
      }
      res.status(201).send(result);
    })
  } else {
    res.send('error: invalid email entered');
    return;
  }
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
