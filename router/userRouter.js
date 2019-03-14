const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../model/User');

router.post('/', (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    var newUser = new User({
        username: req.body.username,
        password: req.body.password,
    });
    newUser.save().then(user => res.json(user));
    console.log('User Created');
});

module.exports = router;