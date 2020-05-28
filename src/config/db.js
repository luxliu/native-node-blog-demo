const env = process.env.NODE_ENV;

let MYSQL_CONF;

if (env === 'dev') {
  MYSQL_CONF = {
    host: '127.0.0.1',
    user: 'root',
    password: 'lux3521264',
    port: '3306',
    database: 'myblog',
  };
}

if (env === 'production') {
  MYSQL_CONF = {
    host: '127.0.0.1',
    user: 'root',
    password: 'lux3521264',
    port: '3306',
    database: 'myblog',
  };
}

module.exports = {
  MYSQL_CONF,
};
