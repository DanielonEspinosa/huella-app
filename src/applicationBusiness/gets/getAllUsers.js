const Queries = require('../../database/Queries');

const getAllUsers = async ({connection}) => {
  if (!connection) throw new Error('database connection missing in getAllUsers');
  const queries = new Queries({connection});
  const users = await queries.getAllUsers();
  return users;
}

module.exports = getAllUsers;