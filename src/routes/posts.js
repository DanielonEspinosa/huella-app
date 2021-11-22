const express = require('express');

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({status: 'OK', code: 200, message: "todo good desde post"});
});

module.exports = router;