require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const multer = require('multer');
const upload = multer();
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const userRouter = require('./router/userRouter');
const classRouter = require('./router/classRouter');

const app = express();

function allowCrossDomain(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true})
    .then(() => console.log('connected to database'))
    .catch(console.log);

app.use(upload.none());
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
        maxAge: 600000000
    }
}));

app.use(allowCrossDomain);

app.use('/api/user', userRouter);
app.use('/api/class', classRouter);

app.use(express.static(path.join(__dirname, 'build')));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {console.log(`Server running on port ${PORT}...`)});