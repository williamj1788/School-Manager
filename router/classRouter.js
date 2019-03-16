const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Class = require('../model/Class');

router.post('/', (req,res,next) => {
    let newClass = new Class({
        name: req.body.classname,
        color: req.body.classcolor,
        user_id: req.session.user_id,
    });
    newClass.save().then(Class => {
        res.json(Class);
    });;
});

module.exports = router;