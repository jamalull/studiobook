const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger    = require('morgan');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
// const { PrismaClient } = require('@prisma/client');
// const userRoutes = require('./routes/userRoutes');
const frontSiteRoutes = require('./routes/frontSiteRoutes');
const authRoutes = require('./routes/authRoutes');
const studioRoutes = require('./routes/studioRoutes');
// const reservationRoutes = require('./routes/reservationRoutes');
// const transactionRoutes = require('./routes/transactionRoutes');
require('./config/passport')(passport); 

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session for passport
app.use(session({
    secret: 'secretForSession',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } //Expired in 1 day. (24h, 60m, 60s, 1000ms)
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// API
app.use('/', frontSiteRoutes);
app.use('/auth', authRoutes);
app.use('/dashboard/studios', studioRoutes);
// app.use('/transactions', transactionRoutes);
// app.use('/dashboard/reservations', reservationRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));