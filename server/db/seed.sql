COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/grample/Desktop/repos/Atelier-Questions-Answers/server/db/dataset/questions.csv'
DELIMITER ','
CSV HEADER;

COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
FROM '/Users/grample/Desktop/repos/Atelier-Questions-Answers/server/db/dataset/answers.csv'
DELIMITER ','
CSV HEADER;

COPY photos(id, answer_id, url)
FROM '/Users/grample/Desktop/repos/Atelier-Questions-Answers/server/db/dataset/answers_photos.csv'
DELIMITER ','
CSV HEADER;