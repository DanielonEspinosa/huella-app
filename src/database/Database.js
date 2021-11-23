const mysql = require('mysql');
const {DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USER} = require('../../config/config');
class DataBase {

  constructor() {
    this.connection = undefined;
    this.setUpConnection();
    if (!this.connection) throw new Error('connection needs to be setted up');

  }

  setUpConnection() {
    this.connection = mysql.createConnection({
      host: DATABASE_HOST,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME
    });          
  }

  async Connect() {
    try {
      await this.connection.connect(); 
    } catch (error) {
      console.log('An error ocurred trying to connect to the database => ', error);
    }
  }

  getConnection() {
    return this.connection;
  }


  async CloseConnection() {
    await this.connection.end();
  }
}

module.exports = DataBase;