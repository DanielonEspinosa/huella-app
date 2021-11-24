const express = require('express');
const getAllUsers = require('../applicationBusiness/gets/getAllUsers');

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({status: 'OK', code: 200, message: "todo good"});
});

router.get('/Users', async (req, res) => {
  let users;
  req.getConnection(async (error, connection) => {
    if (error) {
      console.log('Error in /Users => ', error);
      return res.json({ok: 'false', users});
    }
    users = await getAllUsers({connection});
    return res.json({ok: 'true', users});
  });
});

module.exports = router;