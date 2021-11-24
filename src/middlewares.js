const jwt = require('jsonwebtoken');
const {JWTKEY} = require('../config/config');

function testLog(req, res, next) {
  console.log('Paso por el middleware de testeo _=+-');
  next();
}

function authentication(req, res, next) {
  const {token} = req.body; 
  if (!token) return res.json({OK: false, status: 400, message: 'auth token required'});
  try {
    jwt.verify(token, JWTKEY);
  } catch (error) {
    return res.json({OK: false, status: 400, message: 'invalid token'});
  }

  next();
}

module.exports = {
  testLog,
  authentication
}