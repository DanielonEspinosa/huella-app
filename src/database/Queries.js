const util = require('util');

class Queries {
  constructor({connection = undefined}){
    this.connection = connection;
    if (!this.connection) throw new Error('Connection missing');
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  async getAllUsers() { 
    const res = await this.query('select * from Users');
    console.log('res ====== ', res);
    return res;
  }

}

module.exports = Queries;