const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 4000;

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./backend/routes')(app);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));