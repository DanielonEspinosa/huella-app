const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({status: 'OK', code: 200, message: "todo good"});
});

module.exports = router;