require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const keyRoutes = require('./routes/keyRoutes');

app.use(express.json());

// API 라우트
app.use('/api/v1/keys', keyRoutes);

// React 정적 파일 제공
app.use(express.static(path.join(__dirname, '../react-client/build')));

// React 애플리케이션의 모든 경로 처리
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../react-client/build', 'index.html'));
});

// 기본 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
