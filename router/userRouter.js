const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../model/User');

function CheckUsernames(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    User.findOne({username: req.body.username}, (err,user) => {
        if(err) throw err;
        if(!user){
            next();
        }else{
            res.status(400).json({error: "Username already taken"});
        };
    })
}

router.post('/login', (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    User.findOne({username: req.body.username, password: req.body.password}, (err, user) => {
        if(err) throw err;
        if(user){
            req.session.user_id = user._id;
            res.json(user);
        }else{
            res.status(404).json({error: "Username or Password is wrong"});
        }
    })
});


router.post('/signup', CheckUsernames,(req,res,next) => {
    var newUser = new User({
        username: req.body.username,
        password: req.body.password,
    });
    newUser.save().then(user => {
        req.session.user_id = user._id;
        res.json(user);
    });
    console.log('User Created');
});

module.exports = router;