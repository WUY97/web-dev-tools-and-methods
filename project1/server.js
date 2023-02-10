'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.static('./public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

require('./app/routes/routes')(app);

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});