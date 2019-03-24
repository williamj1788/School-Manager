const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Class = require('../model/Class');

router.post('/', (req,res,next) => {
    let id = mongoose.Types.ObjectId(req.session.user);
    let newClass = new Class({
        name: req.body.classname,
        color: req.body.classcolor,
        user_id: id,
    });
    newClass.save().then(Class => {
        let {user_id, ...newClass} = Class;
        res.json(newClass);
    });;
});

module.exports = router;