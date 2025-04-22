const JDBC = require('jdbc');
const jinst = require('jdbc/lib/jinst');

if (!jinst.isJvmCreated()) {
  jinst.addOption("-Xrs");
  jinst.setupClasspath(['./soha-mysql-connector-java-5.1.7-bin.jar']);
}

const config = {
  url: 'jdbc:mysql://192.168.227.16:6700/(auth = (user_name = dgadmin))?characterEncoding=UTF-8',
  drivername: 'net.sf.log4jdbc.sql.jdbcapi.DriverSpy',
  minpoolsize: 1,
  maxpoolsize: 100,
  properties: {
    user: '(service = (svc = MASTER) (auth_type = 1))',
    password: 'petra@one1'
  }
};

async function testConnection() {
  try {
    const soha = new JDBC(config);
    await soha.initialize();
    console.log('연결 성공!');
    
    const conn = await soha.getConnection();
    console.log('Connection object:', conn);
    
    await conn.close();
    await soha.shutdown();
  } catch (err) {
    console.error('연결 실패:', err);
  }
}

testConnection();
