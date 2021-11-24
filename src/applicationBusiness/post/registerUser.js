const Queries = require("../../database/Queries");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWTKEY} = require('../../../config/config');

const registerUser = async ({
  connection,
  userName, 
  email, 
  password, 
  name, 
  lastName, 
  secondLastName, 
  age, 
  sex, 
  semester
}) => {
  if (!(userName && email && password && name && lastName && age && sex && semester)) {
    return {ok: false, user: null, message: 'Missing input data'};
  }
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const isValid = emailPattern.test(email);
  if (!isValid) return {ok: false, user: null, message: 'not an email'};

  const queries = new Queries({connection});
  const oldUser = await queries.getUserByEmail({email});
  if (oldUser) return {ok: false, user: oldUser, message: 'User already exist'};

  const encryptedPassword = await bcrypt.hash(password, 10);

  const token = jwt.sign({userName, email}, JWTKEY, {
    expiresIn: "30d"
  });
  await queries.createUser({age, email, lastName, name, password: encryptedPassword, secondLastName, semester, sex, token, userName});
  const newUser = await queries.getUserByEmail({email});
  return {ok: true, user: newUser, message: 'User created successfully'};
}


module.exports = registerUser;