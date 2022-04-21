CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  product_id INT,
  body varchar(255),
  date_written varchar(255),
  asker_name varchar(255),
  asker_email varchar(255),
  reported boolean,
  helpful INT
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INT,
  body varchar(255),
  date_written varchar(255),
  answerer_name varchar(255),
  answerer_email varchar(255),
  reported boolean,
  helpful INT
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  answer_id INT,
  url varchar(255)
);