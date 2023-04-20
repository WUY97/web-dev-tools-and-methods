const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, './public')));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

require('./routes')(app);

module.exports = app;
