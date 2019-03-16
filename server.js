const express = require('express');
const session = require('express-session');
const multer = require('multer');
const upload = multer();
const mongoose = require('mongoose');

const userRouter = require('./router/userRouter');
const classRouter = require('./router/classRouter');

const app = express();
const url = 'mongodb+srv://quez:quez123@project-cluster-8qd4n.mongodb.net/SchoolManager?retryWrites=true';

function SetHeaders(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
}

mongoose.connect(url, {useNewUrlParser: true})
    .then(() => console.log('connected to database'))
    .catch(err => console.log(err));

app.use(upload.none());
app.use(session({secret: 'key board cat'}));

router.use(SetHeaders);

app.use('/api/user', userRouter);
app.use('/api/customer', classRouter);


const PORT = 8080;

app.listen(PORT, () => {console.log(`Server running on port ${PORT}...`)});