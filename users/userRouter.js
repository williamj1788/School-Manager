const express = require('express');
const router = express.Router();
const AccessService = require('../shared/AccessService');

const accessService = new AccessService();

router.post('/login', express.json(), async (req, res, next) => {
  try {
    const {email, password} = req.body;

    const user = await accessService.login(email, password);

    req.session.user = user._id;

    delete user._id;

    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/signup', express.json(), async (req, res, next) => {
  try {
    const {email, password} = req.body;

    const user = await accessService.signUp(email, password);

    req.session.user = user._id;

    delete user.password;
    delete user._id;

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/signout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.send();
  });
});

router.get('/', async (req, res, next) => {
  try {
    if (!req.session.user) {
      return res.sendStatus(401);
    }
    const user = await accessService.getUserById(req.session.user, '-_id');

    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  /** @todo check type of error and crash if not an AppError */
  res.status(err.code || 500).json({error: err.message});
});

module.exports = router;
