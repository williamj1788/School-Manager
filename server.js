const express = require('express');
const session = require('express-session');
const multer = require('multer');
const upload = multer();
const mongoose = require('mongoose');

const app = express();

app.use(upload.none());
app.use(session({secret: 'key board cat'}));

const PORT = 8080;

app.listen(PORT, () => {console.log(`Server running on port ${PORT}...`)});