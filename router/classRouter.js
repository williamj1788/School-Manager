const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../model/User');
const Class = require('../model/Class');
const Task = require('../model/Task');
const Test = require('../model/Test');


router.post('/', async (req, res, next) => {
    try {
        const { classname, classcolor } = req.body;
        let newClass = new Class({
            name: classname,
            color: classcolor,
        });
        await User.findByIdAndUpdate( req.session.user, {$push: {classes: newClass}});
        res.json(newClass);
    } catch(err) {
        next(err);
    }
    
});

router.post('/task', async (req, res, next) => {
    try {
        const { taskName, dueDate } = req.body;
        let newTask = new Task({
            name: taskName,
            due: dueDate,
        });
        await User.findByIdAndUpdate(
            req.session.user,
            {$push: {'classes.$[element].Tasks': newTask}},
            {arrayFilters: [{'element._id': req.query.id}]}
        );
        res.json(newTask);
    } catch (err) {
        next(err);
    }
    
});

router.delete('/task', async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(
            req.session.user,
            {$pull: {'classes.$[element].Tasks': {_id: req.query.taskID}}},
            {arrayFilters: [{'element._id': req.query.classID}]}
        )
        res.send();
    } catch (err) {
        next(err);
    }
});

router.post('/test', async (req, res, next) => {
    try {
        const { taskName, dueDate } = req.body;
        let newTest = new Test({
            name: taskName,
            due: dueDate,
        });
        await User.findByIdAndUpdate(
            req.session.user,
            {$push: {'classes.$[element].Tests': newTest}},
            {arrayFilters: [{'element._id': req.query.id}]}
        );
        res.json(newTest);
    } catch (err) {
        next(err);
    }
});

router.delete('/test', async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(
            req.session.user,
            {$pull: {'classes.$[element].Tests': {_id: req.query.testID}}},
            {arrayFilters: [{'element._id': req.query.classID}]}
        )
        res.send();
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.session.user, {$pull: {classes: {_id: req.params.id}}});
        res.send();
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    res.sendStatus(500);
})

module.exports = router;