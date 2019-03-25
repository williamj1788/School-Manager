const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../model/User');
const Class = require('../model/Class');
const Task = require('../model/Task');
const Test = require('../model/Test');


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
    User.updateOne({_id: req.session.user}, {$push: {'classes.$[element].Tasks': newTask}}, {arrayFilters: [{'element._id': req.query.id}]})
    .exec((err,raw) => {
        if(err) throw err;
    });;
    res.json(newTask);
});

router.delete('/task', (req, res, next) => {
    User.updateOne({_id: req.session.user}, {$pull: {'classes.$[element].Tasks': {_id: req.query.taskID}}}, {arrayFilters: [{'element._id': req.query.classID}]})
    .exec((err,raw) => {
        if(err) throw err;
    });
    res.send();
});

router.post('/test', (req, res, next) => {
    let newTest = new Test({
        name: req.body.taskName,
        due: req.body.dueDate,
    });
    User.updateOne({_id: req.session.user}, {$push: {'classes.$[element].Tests': newTest}}, {arrayFilters: [{'element._id': req.query.id}]})
    .exec((err,raw) => {
        if(err) throw err;
    });;
    res.json(newTest);
});

router.delete('/test', (req, res, next) => {
    User.updateOne({_id: req.session.user}, {$pull: {'classes.$[element].Tests': {_id: req.query.testID}}}, {arrayFilters: [{'element._id': req.query.classID}]})
    .exec((err,raw) => {
        if(err) throw err;
    });
    res.send();
});

module.exports = router;