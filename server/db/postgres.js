const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  database: process.env.POOL_DB,
  password: process.env.POOL_PASSWORD,
  user: process.env.POOL_USER,
  host: process.env.POOL_HOST,
  port: process.env.POOL_PORT,
});
pool.on('error', (err) => {
  console.log('pool error', err);
});
pool.connect();

// Questions List
var query = (query, cb) => {
  pool.query(query, (err, res) => {
    if (err) {
      cb(err, res);
    }
    cb(null, res);
  });
}

module.exports = {
  query: query
}