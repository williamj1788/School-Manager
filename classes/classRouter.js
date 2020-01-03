const express = require('express');
const router = express.Router();

const User = require('../users/userModel');
const {Task, Test} = require('./classModel');

const ClassService = require('./ClassService');

const classService = new ClassService();

router.post('/', async (req, res, next) => {
  try {
    const newClass = await classService.addClassToUser(
        req.body,
        req.session.user,
    );

    res.json(newClass);
  } catch (err) {
    next(err);
  }
});

router.post('/task', async (req, res, next) => {
  try {
    const {taskName, dueDate} = req.body;
    const newTask = new Task({
      name: taskName,
      due: dueDate,
    });
    await User.findByIdAndUpdate(
        req.session.user,
        {$push: {'classes.$[element].Tasks': newTask}},
        {arrayFilters: [{'element._id': req.query.id}]},
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
        {arrayFilters: [{'element._id': req.query.classID}]},
    );
    res.send();
  } catch (err) {
    next(err);
  }
});

router.post('/test', async (req, res, next) => {
  try {
    const {taskName, dueDate} = req.body;
    const newTest = new Test({
      name: taskName,
      due: dueDate,
    });
    await User.findByIdAndUpdate(
        req.session.user,
        {$push: {'classes.$[element].Tests': newTest}},
        {arrayFilters: [{'element._id': req.query.id}]},
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
        {arrayFilters: [{'element._id': req.query.classID}]},
    );
    res.send();
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.session.user, {
      $pull: {classes: {_id: req.params.id}},
    });
    res.send();
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.sendStatus(500);
});

module.exports = router;
