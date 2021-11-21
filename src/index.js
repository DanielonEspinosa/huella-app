const {PORT} = require('../config/config');
const express = require('express');
const morgan = require('morgan');

const app = express();
app.set('port', PORT);
app.use(morgan('dev'));
app.use('/', require('./routes/index'));

app.listen(app.get('port'), (req, res) => {
    console.log(`🚀 server on port ${app.get('port')}`);
});