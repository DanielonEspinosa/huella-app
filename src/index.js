const {PORT} = require('../config/config');
const express = require('express');
const morgan = require('morgan');
const {testLog} = require('./middlewares');
const cors = require('cors');
const bodyParser = require('body-parser');

main();

async function main() {
  const app = express();
  app.all('*', testLog);
  app.set('port', PORT);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(cors());
  require("./routes/index")(app);
  
  app.listen(app.get('port'), (req, res) => {
    console.log(`🚀 server on port ${app.get('port')}`);
  });
}