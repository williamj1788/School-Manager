const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../model/User');

function CheckUsernames(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    User.findOne({username: req.body.username}, (err,user) => {
        if(err) throw err;
        if(!user){
            next();
        }else{
            res.status(400).json({error: "Username already taken"});
        };
    })
}

function SetHeaders(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
}

router.use(SetHeaders);
router.post('/login',(req,res,next) => {
    User.findOne({username: req.body.username, password: req.body.password}, (err, user) => {
        if(err) throw err;
        if(user){
            req.session.user = user._id;
            req.session.save();
            console.log(req.session.user);
            res.json(user);
        }else{
            res.status(404).send();
        }
    })
});


router.post('/signup', CheckUsernames,(req,res,next) => {
    var newUser = new User({
        username: req.body.username,
        password: req.body.password,
    });
    newUser.save().then(user => {
        req.session.user = user._id;
        res.json(user);
    });
    console.log('User Created');
});

router.get('/signout',(req,res,next) => {
    req.session.user = null;
    req.session.save();
    console.log(req.sessionID);
    console.log('User sign out');
    res.send('asdf');
});

router.get('/',(req,res,next) => {
    console.log(req.sessionID);
    if(req.session.user){
        User.findById(req.session.user, (err,user) => {
            if(err) throw err;
            if(user){
                res.json(user);
            }else{
                res.status(404).send();
            }
        })
    }else{
        res.status(404).json({error: 'Could not find user'});
    }
});

module.exports = router;