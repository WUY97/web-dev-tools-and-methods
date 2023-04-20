const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.static('./build'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

require('./routes')(app);

module.exports = app;