const util = require('util');
const User = require('../entities/User');

class Queries {
  constructor({connection = undefined}){
    this.connection = connection;
    if (!this.connection) throw new Error('Connection missing');
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  async getAllUsers() { 
    const res = await this.query('select * from Users');
    return res;
  }

  async getUserByEmail({email}) {
    if (!email) throw new Error('email is needed for getUserByEmail');
    let [user] = await this.query(`select * from Users where userEmail = '${email}'`);
    if (!user) return null;
    user = new User({userInfo: user});
    return user;
  }

  async getUserByUserName({userName}) {
    if (!userName) throw new Error('userName is needed for getUserByEmail');
    let [user] = await this.query(`select * from Users where userUserName = '${userName}'`);
    if (!user) return null;
    user = new User({userInfo: user});
    return user;
  }

  async createUser({userName, email, password, name, lastName, secondLastName, age, sex, semester, token}) {
    if (!(userName && email && password && name && lastName && age && sex && semester && token)) throw new Error('Data missing in createUser');
    let query = 'insert into users ';
    if (secondLastName) query += `(userName, userLastName, userSecondLastName, userAge, userSex, userSemester, userEmail, userUserName, userPassword, token) values ('${name}', '${lastName}', '${secondLastName}', ${age}, '${sex}', ${semester}, '${email}', '${userName}', '${password}', '${token}')`;
    else query += `(userName, userLastName, userAge, userSex, userSemester, userEmail, userUserName, userPassword, token) values ('${name}', '${lastName}', ${age}, '${sex}', ${semester}, '${email}', '${userName}', '${password}', '${token}')`;
    const user = await this.query(query);
    return user;
  }

  async saveTokenToUser({userid, token}) {
    if (!userid || !token) throw new Error('Data missing in saveTokenToUser');
    const response = await this.query(`update Users set token = '${token}' where userId = ${userid};`);
    if (response) return true;
    return false;
  }

}

module.exports = Queries;