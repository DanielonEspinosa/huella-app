const express = require('express');
const registerUser = require('../applicationBusiness/post/registerUser');
const loginUser = require('../applicationBusiness/post/loginUser');
const {authentication} = require('../middlewares');

const router = express.Router();

router.post('/test', (req, res) => {
  const {a, b} = req.body;
  console.log('postTest good ====', a, b);
  return res.json({status: 'OK', code: 200, message: "todo good desde post"});
});

router.post('/login', authentication, async (req, res) => {
  const {userName, email, password} = req.body;
  try {
    req.getConnection(async (error, connection) => {
      if (error) {
        console.log('Error geting database connection in /login => ', error);
        return res.json({OK: false, status: 500, message: 'Database connection error'});
      }
      const response = await loginUser({userName, email, password, connection});
      if (!response.ok) {
        return res.json({OK: false, status: 400, message: response.message, user: response.user});
      }
      return res.json({OK: true, status: 200, message: response.message, user: response.user}); 
    });
  } catch (err) {
    console.log('Error in /login => ', err);
    return res.json({OK: false, status: 500, message: 'Error', user: null}); 
  }
});

router.post('/register', async (req, res) => {
  const {userName, email, password, name, lastName, secondLastName, age, sex, semester} = req.body;
  try {
    req.getConnection(async (error, connection) => {
      if (error) {
        console.log('Error geting database connection in /register => ', error);
        return res.json({OK: false, status: 500, message: 'Database connection error'});
      }
      const response = await registerUser({userName, email, password, name, lastName, secondLastName, age, sex, semester, connection});
      if (!response.ok) {
        return res.json({OK: false, status: 400, message: response.message, user: response.user});
      }
      return res.json({OK: true, status: 200, message: response.message, user: response.user}); 
    });
  } catch (err) {
    console.log('Error in /register => ', err);
    return res.json({OK: false, status: 500, message: 'Error', user: null}); 
  }
});

module.exports = router;