require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  const connectionConfig = {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  };
  
  console.log('연결 시도 중...', connectionConfig);
  const connection = await mysql.createConnection(connectionConfig);

  try {
    await connection.connect();
    console.log('데이터베이스 연결 성공!');
    console.log('연결 정보:', {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME
    });
  } catch (error) {
    console.error('데이터베이스 연결 실패:', error.message);
  } finally {
    await connection.end();
  }
}

testConnection();
