const {DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USER} = require('../../config/config');
const mysql = require('mysql');
const myConnection = require('express-myconnection')
    
const dbOptions = {
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  port: 3306,
};

const connection = myConnection(mysql, dbOptions, 'single');

module.exports = connection;