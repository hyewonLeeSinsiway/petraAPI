const mysql = require('mysql');
require('dotenv').config({path: './.env'});
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

// Log connection details when a connection is established
pool.on('connection', (connection) => {
  console.log('New connection established with ID:', connection.threadId);
  console.log('Connection details:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });
});

// Promisify the pool.query method for async/await support
pool.query = util.promisify(pool.query);

module.exports = pool;

