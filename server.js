const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const userRouter = require('./users/userRouter');
const classRouter = require('./classes/classRouter');

const {dbUrl, sessionSecret, env, port} = require('./config');

const app = express();

mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log('connected to database'))
    .catch(console.log);

if (env === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({mongooseConnection: mongoose.connection}),
      cookie: {
        maxAge: 600000000,
        sameSite: env === 'production' ? 'strict' : 'none',
      },
    }),
);

app.use('/api/user', userRouter);
app.use('/api/class', classRouter);

app.use(express.static(path.join(__dirname, 'build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

module.exports = app;
