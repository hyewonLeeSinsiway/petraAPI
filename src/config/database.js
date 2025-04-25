const mysql = require('mysql');
require('dotenv').config();
const util = require('util');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promisify the pool.query method for async/await support
pool.query = util.promisify(pool.query);

module.exports = pool;

