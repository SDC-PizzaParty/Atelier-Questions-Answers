CREATE DATABASE test;

USE test;

CREATE TABLE table1 (
  id INT AUTO_INCREMENT,
  test varchar(255) NOT NULL,
);

CREATE TABLE lookup (
  id INT AUTO_INCREMENT,
  question_id varchar(255),
  answer_id varchar(255),
);

CREATE TABLE questions (
  id INT AUTO_INCREMENT,
  product_id varchar(255),
  name varchar(255),
  body varchar(255),
  email varchar(255),
  date varchar(255),
  question_helpfulness INT,
  reported boolean,
);

CREATE TABLE answers (
  id INT AUTO_INCREMENT,
  name varchar(255),
  body varchar(255),
  email varchar(255),
  date varchar(255),
  answer_helpfulness INT,
  reported boolean,
  photos_id INT,
);

CREATE TABLE photos (
  id INT AUTO_INCREMENT,
  url varchar(255),
);