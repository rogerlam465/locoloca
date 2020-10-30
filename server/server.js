const express = require('express');
const morgan = require('morgan');

const PORT = 7000;

let app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(require('./routes'));

const server = app.listen(PORT, function () {
  console.info('🌍 Listening on port ' + server.address().port);
});