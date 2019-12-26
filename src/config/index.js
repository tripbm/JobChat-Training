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
const origin_cors = process.env.origin_cors || 'http://localhost:3000';
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
const roleUser = ['superAdmin', 'admin', 'user'];
const roleMember = ['admin', 'member'];
const roleUserDefault = 'user';
const roleMemberDefault = 'member';
const typeGroupChat = ['private', 'public', 'group'];
const typeGroupChatDefault = 'private';
const gender = ['male', 'female', 'other'];
const genderDefault = 'male';
module.exports = {
  server,
  database,
  secretSession,
  saltRounds,
  LIMIT,
  SERVER_STATUS,
  redisServer,
  roleUser,
  roleUserDefault,
  roleMember,
  roleMemberDefault,
  typeGroupChat,
  typeGroupChatDefault,
  gender,
  genderDefault,
  origin_cors,
};
