const mysql = require('mysql2/promise');
require('dotenv').config();

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

// Test connection and log details
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('New connection established with ID:', connection.threadId);
    console.log('Connection details:', {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
})();

module.exports = pool;

