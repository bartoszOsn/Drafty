const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');

const { sessionSecret } = require('./../secret');

const indexRoute = require('./routes/index');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const registerRoute = require('./routes/register');
const passwordRoute = require('./routes/password');
const apiRoute = require('./routes/API/index');

const app = express();
const port = process.env.PORT || 3000;

const expressSession = require('express-session')({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
});

// Config template engine.
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

// Hosts static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Parses request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);

// Uses authentication
app.use(passport.initialize());
app.use(passport.session());


// Sets up mongoose
const mongoose = require('mongoose');
const UserDetails = require('./models/userDetail');


mongoose.connect('mongodb://localhost/MyDatabase',
  { useNewUrlParser: true, useUnifiedTopology: true });


// Sets up passport
passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

// Sets routes
app.use('/', indexRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/register', registerRoute);
app.use('/password', passwordRoute);
app.use('/API', apiRoute);

// Starts listening
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});