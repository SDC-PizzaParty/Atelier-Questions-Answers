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