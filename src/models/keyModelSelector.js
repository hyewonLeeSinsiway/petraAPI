const useDummyDb = process.env.USE_DUMMY_DB === 'true';

module.exports = useDummyDb
  ? require('./keyModelDummy') // 더미 데이터 모델
  : require('./keyModel'); // 실제 데이터베이스 모델