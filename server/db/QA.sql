DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS photos;

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  body varchar(255),
  date_written BIGINT,
  asker_name varchar(255),
  asker_email varchar(255),
  reported boolean,
  helpful INT
);

CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  question_id INT NOT NULL,
  FOREIGN KEY (question_id) REFERENCES questions(id),
  body varchar(255),
  date_written BIGINT,
  answerer_name varchar(255),
  answerer_email varchar(255),
  reported boolean,
  helpful INT
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  answer_id INT NOT NULL,
  FOREIGN KEY (answer_id) REFERENCES answers(id),
  url varchar(255)
);