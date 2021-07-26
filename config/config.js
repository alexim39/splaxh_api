require('dotenv').config();

// SERVER
const SERVER_HOSTNAME = 'localhost';
const SERVER_PORT = process.env.PORT || 4201;
const DB = process.env.DB;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

// TOKEN
const TOKEN = process.env.TOKEN;

// EMAIL
const EMAIL_PASS = process.env.EMAIL_PASS;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  database: DB,
  username: DB_USER,
  password: DB_PASS,
  token: TOKEN,
  email_pass: EMAIL_PASS
};

module.exports = { server: SERVER };
