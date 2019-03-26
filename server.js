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
const url = 'mongodb+srv://quez:quez123@project-cluster-8qd4n.mongodb.net/SchoolManager?retryWrites=true';

function SetHeaders(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}

mongoose.connect(url, {useNewUrlParser: true})
    .then(() => console.log('connected to database'))
    .catch(err => console.log(err));

app.use(upload.none());
app.use(session({
    secret: 'key board cat',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
        maxAge: 600000000
    }
}));

app.use(SetHeaders);

app.use('/api/user', userRouter);
app.use('/api/class', classRouter);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {console.log(`Server running on port ${PORT}...`)});