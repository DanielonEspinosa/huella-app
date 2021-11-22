const dotenv = require('dotenv');

let port = process.env.PORT;

dotenv.config();

if (!port) port = process.env.PORT || 4000

module.exports = {
  PORT: port,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
};