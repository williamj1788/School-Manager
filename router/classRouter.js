const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../model/User');
const Class = require('../model/Class');
const Task = require('../model/Task');


router.post('/', (req,res,next) => {
    let newClass = new Class({
        name: req.body.classname,
        color: req.body.classcolor,
    });
    User.findByIdAndUpdate( req.session.user, {$push: {classes: newClass}})
    .exec((err, user) => {
        if(err) throw err;
        res.json(newClass);
    });
});

router.post('/task', (req, res, next) => {
    let newTask = new Task({
        name: req.body.taskName,
        due: req.body.dueDate,
    });
    console.log(req.query.id);
    User.updateOne({_id: req.session.user}, {$push: {'classes.$[element].Tasks': newTask}}, {arrayFilters: [{'element._id': req.query.id}]})
    .exec((err,raw) => {
        if(err) throw err;
    });;
    res.json(newTask);
});

module.exports = router;