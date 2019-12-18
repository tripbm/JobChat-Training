const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const LIMIT = 10;
const server = {
  evironment: process.env.evironment,
  port: process.env.port_server || 4000,
};
const redisServer = {
  host: process.env.host_redis,
  port: process.env.port_redis,
  ttl: process.env.ttl,
};
const database = {
  uri: process.env.mongoose_url,
  database_name: process.env.database_name,
};
const secretSession = process.env.secret || 'secret';
const saltRounds = 10;
const SERVER_STATUS = {
  createSuccess: 1,
  createFalse: 0,
  userExists: 2,
};
module.exports = {
  server,
  database,
  secretSession,
  saltRounds,
  LIMIT,
  SERVER_STATUS,
  redisServer,
};
