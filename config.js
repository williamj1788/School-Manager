require('dotenv').config();
const env = process.env.NODE_ENV || 'development';

module.exports = {
  dbUrl:
    env === 'production' ? process.env.PRODUCTION_DB_URL :
    env === 'testing' ? process.env.TEST_DB_URL :
    env === 'ci' ? process.env.CI_DB_URL :
    process.env.DEV_DB_URL,
  sessionSecret: process.env.SESSION_SECRET,
  port: env === 'testing' ? 2000 : 8080,
  env,
};
