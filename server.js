const express = require('express');
const session = require('express-session');
const multer = require('multer');
const upload = multer();
const mongoose = require('mongoose');

const app = express();
const url = 'mongodb+srv://quez:quez123@project-cluster-8qd4n.mongodb.net/SchoolManager?retryWrites=true';
mongoose.connect(url, {useNewUrlParser: true})
    .then(() => console.log('connected to database'))
    .catch(err => console.log(err));

app.use(upload.none());
app.use(session({secret: 'key board cat'}));



const PORT = 8080;

app.listen(PORT, () => {console.log(`Server running on port ${PORT}...`)});