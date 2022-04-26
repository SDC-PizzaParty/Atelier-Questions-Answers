COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/grample/Desktop/repos/Atelier-Questions-Answers/server/db/dataset/questions.csv'
DELIMITER ','
CSV HEADER;

UPDATE questions SET date_written = date_written / 1000;
ALTER TABLE questions ALTER COLUMN date_written TYPE timestamp without time zone using to_timestamp(date_written) AT TIME ZONE 'UTC';
ALTER TABLE questions ALTER COLUMN date_written SET DEFAULT NOW();

ALTER SEQUENCE questions_id_seq RESTART WITH 3518964;

COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
FROM '/Users/grample/Desktop/repos/Atelier-Questions-Answers/server/db/dataset/answers.csv'
DELIMITER ','
CSV HEADER;

UPDATE answers SET date_written = date_written / 1000;
ALTER TABLE answers ALTER COLUMN date_written TYPE timestamp without time zone using to_timestamp(date_written) AT TIME ZONE 'UTC';
ALTER TABLE answers ALTER COLUMN date_written SET DEFAULT NOW();

ALTER SEQUENCE answers_id_seq RESTART WITH 6879307;

COPY photos(id, answer_id, url)
FROM '/Users/grample/Desktop/repos/Atelier-Questions-Answers/server/db/dataset/answers_photos.csv'
DELIMITER ','
CSV HEADER;

ALTER SEQUENCE photos_id_seq RESTART WITH 2063760;

CREATE INDEX qindex1 ON questions(id);
CREATE INDEX qindex2 ON questions(product_id);
CREATE INDEX aindex1 ON answers(id);
CREATE INDEX aindex2 ON answers(questions_id);
CREATE INDEX pindex1 ON photos(id);
CREATE INDEX pindex2 ON photos(answer_id);

CREATE MATERIALIZED VIEW q1 AS SELECT json_build_object(
    'product_id', 65631,
    'results', (
      json_agg(
        json_build_object(
          'question_id', q.id,
          'question_body', q.body,
          'question_date', q.date_written,
          'asker_name', q.asker_name,
          'question_helpfulness', q.helpful,
          'reported', q.reported,
          'answers', (
            SELECT (
              coalesce(
                json_object_agg(
                  a.id, json_build_object(
                    'id', a.id,
                    'body', a.body,
                    'date', a.date_written,
                    'answerer_name', a.answerer_name,
                    'helpfulness', a.helpful,
                    'photos', (
                      SELECT (
                        coalesce(
                          json_agg(
                            json_build_object(
                              'id', p.id,
                              'url', p.url
                            )
                          ), '[]'
                        )
                      ) FROM photos p WHERE p.answer_id = a.id
                    )
                  )
                ), '{}'
              )
            ) FROM answers a WHERE a.question_id = q.id AND a.reported = false
          )
        )
      )
    )
  ) FROM questions q WHERE q.product_id = 65631 AND q.reported = false;

CREATE MATERIALIZED VIEW q2 AS SELECT json_build_object(
    'product_id', 65632,
    'results', (
      json_agg(
        json_build_object(
          'question_id', q.id,
          'question_body', q.body,
          'question_date', q.date_written,
          'asker_name', q.asker_name,
          'question_helpfulness', q.helpful,
          'reported', q.reported,
          'answers', (
            SELECT (
              coalesce(
                json_object_agg(
                  a.id, json_build_object(
                    'id', a.id,
                    'body', a.body,
                    'date', a.date_written,
                    'answerer_name', a.answerer_name,
                    'helpfulness', a.helpful,
                    'photos', (
                      SELECT (
                        coalesce(
                          json_agg(
                            json_build_object(
                              'id', p.id,
                              'url', p.url
                            )
                          ), '[]'
                        )
                      ) FROM photos p WHERE p.answer_id = a.id
                    )
                  )
                ), '{}'
              )
            ) FROM answers a WHERE a.question_id = q.id AND a.reported = false
          )
        )
      )
    )
  ) FROM questions q WHERE q.product_id = 65632 AND q.reported = false;

CREATE MATERIALIZED VIEW q3 AS SELECT json_build_object(
    'product_id', 65633,
    'results', (
      json_agg(
        json_build_object(
          'question_id', q.id,
          'question_body', q.body,
          'question_date', q.date_written,
          'asker_name', q.asker_name,
          'question_helpfulness', q.helpful,
          'reported', q.reported,
          'answers', (
            SELECT (
              coalesce(
                json_object_agg(
                  a.id, json_build_object(
                    'id', a.id,
                    'body', a.body,
                    'date', a.date_written,
                    'answerer_name', a.answerer_name,
                    'helpfulness', a.helpful,
                    'photos', (
                      SELECT (
                        coalesce(
                          json_agg(
                            json_build_object(
                              'id', p.id,
                              'url', p.url
                            )
                          ), '[]'
                        )
                      ) FROM photos p WHERE p.answer_id = a.id
                    )
                  )
                ), '{}'
              )
            ) FROM answers a WHERE a.question_id = q.id AND a.reported = false
          )
        )
      )
    )
  ) FROM questions q WHERE q.product_id = 65633 AND q.reported = false;

CREATE MATERIALIZED VIEW q4 AS SELECT json_build_object(
    'product_id', 65637,
    'results', (
      json_agg(
        json_build_object(
          'question_id', q.id,
          'question_body', q.body,
          'question_date', q.date_written,
          'asker_name', q.asker_name,
          'question_helpfulness', q.helpful,
          'reported', q.reported,
          'answers', (
            SELECT (
              coalesce(
                json_object_agg(
                  a.id, json_build_object(
                    'id', a.id,
                    'body', a.body,
                    'date', a.date_written,
                    'answerer_name', a.answerer_name,
                    'helpfulness', a.helpful,
                    'photos', (
                      SELECT (
                        coalesce(
                          json_agg(
                            json_build_object(
                              'id', p.id,
                              'url', p.url
                            )
                          ), '[]'
                        )
                      ) FROM photos p WHERE p.answer_id = a.id
                    )
                  )
                ), '{}'
              )
            ) FROM answers a WHERE a.question_id = q.id AND a.reported = false
          )
        )
      )
    )
  ) FROM questions q WHERE q.product_id = 65637 AND q.reported = false;

CREATE MATERIALIZED VIEW q5 AS SELECT json_build_object(
    'product_id', 65638,
    'results', (
      json_agg(
        json_build_object(
          'question_id', q.id,
          'question_body', q.body,
          'question_date', q.date_written,
          'asker_name', q.asker_name,
          'question_helpfulness', q.helpful,
          'reported', q.reported,
          'answers', (
            SELECT (
              coalesce(
                json_object_agg(
                  a.id, json_build_object(
                    'id', a.id,
                    'body', a.body,
                    'date', a.date_written,
                    'answerer_name', a.answerer_name,
                    'helpfulness', a.helpful,
                    'photos', (
                      SELECT (
                        coalesce(
                          json_agg(
                            json_build_object(
                              'id', p.id,
                              'url', p.url
                            )
                          ), '[]'
                        )
                      ) FROM photos p WHERE p.answer_id = a.id
                    )
                  )
                ), '{}'
              )
            ) FROM answers a WHERE a.question_id = q.id AND a.reported = false
          )
        )
      )
    )
  ) FROM questions q WHERE q.product_id = 65638 AND q.reported = false;

CREATE MATERIALIZED VIEW q6 AS SELECT json_build_object(
    'product_id', 65560,
    'results', (
      json_agg(
        json_build_object(
          'question_id', q.id,
          'question_body', q.body,
          'question_date', q.date_written,
          'asker_name', q.asker_name,
          'question_helpfulness', q.helpful,
          'reported', q.reported,
          'answers', (
            SELECT (
              coalesce(
                json_object_agg(
                  a.id, json_build_object(
                    'id', a.id,
                    'body', a.body,
                    'date', a.date_written,
                    'answerer_name', a.answerer_name,
                    'helpfulness', a.helpful,
                    'photos', (
                      SELECT (
                        coalesce(
                          json_agg(
                            json_build_object(
                              'id', p.id,
                              'url', p.url
                            )
                          ), '[]'
                        )
                      ) FROM photos p WHERE p.answer_id = a.id
                    )
                  )
                ), '{}'
              )
            ) FROM answers a WHERE a.question_id = q.id AND a.reported = false
          )
        )
      )
    )
  ) FROM questions q WHERE q.product_id = 65560 AND q.reported = false;