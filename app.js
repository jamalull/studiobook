const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger    = require('morgan');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const { PrismaClient } = require('@prisma/client');
const userRoutes = require('./routes/userRoutes');
const studioRoutes = require('./routes/studioRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
require('./config/passport')(passport); 

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session for passport
app.use(session({
    secret: 'secretForSession',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// API
app.use('/users', userRoutes);
app.use('/studios', studioRoutes);
app.use('/transactions', transactionRoutes);
app.use('/reservations', reservationRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));