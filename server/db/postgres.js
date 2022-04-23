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
var query = (query, cb) => {
  pool.query(query, ((err, res) => {
    if (err) {
      console.log(err);
    }
    cb(err, res);
  }));
}

module.exports = {
  query: query
}