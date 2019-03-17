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

router.post('/login',(req,res,next) => {
    User.findOne({username: req.body.username, password: req.body.password}, (err, user) => {
        if(err) throw err;
        if(user){
            req.session.user = user._id;
            req.session.save();
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
});

router.get('/signout',(req,res,next) => {
    req.session.user = null;
    req.session.save();
    res.send('asdf');
});

router.get('/',(req,res,next) => {
    if(req.session.user){
        let id = mongoose.Types.ObjectId(req.session.user);
        User.aggregate([
            {
                $match:{
                    _id: id
                }
            }, 
            {
                $lookup:{
                    from: 'classes',
                    localField: '_id',
                    foreignField: "user_id",
                    as: 'classes',

                }
            },
            {
                $project:{
                    _id: 0,
                    password: 0,
                    __v: 0,
                    'classes._id':0,
                    'classes.user_id': 0,
                    'classes.__v': 0,

                }
            }
        ],(err, content) => res.json(content[0]));
    }else{
        res.status(404).json({error: 'Could not find user'});
    }
});

module.exports = router;