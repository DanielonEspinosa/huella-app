const Queries = require('../../database/Queries');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWTKEY} = require('../../../config/config');


const loginUser = async ({userName, email, password, connection}) => {
  if (!userName && !email) return {ok: false, user: null, message: 'Username or email needed'};
  if (!password) return {ok: false, user: null, message: 'password needed'};

  let isUserName;
  if (userName) isUserName = true;
  else isUserName = false;

  const queries = new Queries({connection});
  let user;
  if (isUserName) user = await queries.getUserByUserName({userName});
  else  {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailPattern.test(email);
    if (!isValid) return {ok: false, user: null, message: 'not an email'};
    user = await queries.getUserByEmail({email});
  }
  if (!user) return {ok: false, user: null, message: 'user doesnt exist'};
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return {ok: false, user: null, message: 'incorrect password'};
  const newToken = jwt.sign({userName: user.userName, email: user.email}, JWTKEY, {
    expiresIn: "30d"
  });

  const tokenSaved = await queries.saveTokenToUser({userid: user.id, token: newToken});
  if (!tokenSaved) return {ok: false, user: null, message: 'error trying to update session'};
  const userUpdated = await queries.getUserByEmail({email: user.email});
  return {ok: true, user: userUpdated, message: 'login successful'};
}


module.exports = loginUser;