const Joi = require('@hapi/joi');
const AppError = require('./AppError');
const User = require('../users/userModel');
const bcrypt = require('bcrypt');
/**
 * provides authentication or authorization methods
 */
class AccessService {
  /**
   * creates and adds a user to the database with the given credentials
   * @param {string} email a valid email
   * @param {string} password must have 6 or more characters
   */
  async signUp(email, password) {
    try {
      Joi.assert(email, Joi.string().email().required(), 'Email:');
      Joi.assert(password, Joi.string().min(6).required(), 'Password:');
    } catch (err) {
      throw new AppError(err.message, 400);
    }

    const user = await User.findOne({email});

    if (user) {
      throw new AppError('email is already taken', 409);
    }

    const hash = await bcrypt.hash(password, 10);

    /** @todo add password hashing */
    return (await User.create({email, password: hash})).toJSON();
  }
  /**
   * Gets user from database with the given credentials.
   * Will throw if no user is found.
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    try {
      Joi.assert(email, Joi.string().required(), 'Email:');
      Joi.assert(password, Joi.string().required(), 'Password:');
    } catch (err) {
      throw new AppError(err.message, 400);
    }

    const user = await User.findOne({email}, '+password');

    if (!user) {
      throw new AppError('email or password is incorrect', 404);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('email or password is incorrect', 404);
    }

    const userJson = user.toJSON();

    delete userJson.password;

    return userJson;
  }

  /**
   * Gets the user from the database. Will throw if user is not found
   * @param {string} id id of user to be fetch from database
   *
   */
  async getAuthUser(id) {
    const user = await User.findById(id, '-_id');
    return user.toJSON();
  }
}

module.exports = AccessService;
