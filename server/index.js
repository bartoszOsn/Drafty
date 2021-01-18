const express = require('express');
const path = require('path');

const indexRoute = require('./routes/index');

const app = express();
const port = 3000;

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/static', express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));

app.use('/', indexRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});