const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Class = require('../model/Class');

router.post('/', (req,res,next) => {
    console.log(`Before: ${req.session.user}`);
    let id = mongoose.Types.ObjectId(req.session.user);
    console.log(`After: ${id}`);
    let newClass = new Class({
        name: req.body.classname,
        color: req.body.classcolor,
        user_id: id,
    });
    newClass.save().then(Class => {
        res.json(Class);
    });;
});

module.exports = router;