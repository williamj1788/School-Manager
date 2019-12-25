const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const userRouter = require('./users/userRouter');
const classRouter = require('./classes/classRouter');

const {dbUrl, sessionSecret} = require('./config');

const app = express();

mongoose
    .connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('connected to database'))
    .catch(console.log);

app.use(morgan('dev'));
app.use(express.json());

app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({mongooseConnection: mongoose.connection}),
      cookie: {
        maxAge: 600000000,
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none',
      },
    }),
);

app.use('/api/user', userRouter);
app.use('/api/class', classRouter);

app.use(express.static(path.join(__dirname, 'build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

module.exports = app;
