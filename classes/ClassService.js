const Joi = require('@hapi/joi');
const AppError = require('../shared/AppError');
const {Class} = require('./classModel');
const AccessService = require('../shared/AccessService');

const accessService = new AccessService();

/**
 * provides methods for working with class Model
 */
class ClassService {
  /**
   * validates and saves a class to the database.
   * Will throw if validation or saving fails
   * @param {{
   * _id: string,
   * name: string,
   * teacher: string,
   * color: string}
   * } classObj
   * @param {string} userID
   */
  async addClassToUser(classObj, userID) {
    try {
      Joi.assert(userID, Joi.required());
      Joi.assert(classObj, Joi.required());
      Joi.assert(classObj._id, Joi.string().required(), '_id:');
      Joi.assert(classObj.name, Joi.string().required(), 'name: ');
      Joi.assert(classObj.teacher, Joi.string().required(), 'teacher: ');
      Joi.assert(classObj.color, Joi.string().required(), 'color: ');
    } catch (err) {
      throw new AppError(err.message, 400);
    }

    const newClass = new Class(classObj);

    await newClass.validate(); // just in case

    const user = await accessService.getUserById(userID);

    user.classes.push(newClass);

    await user.save();

    return newClass;
  }
  /**
   * searchs the user's classes and delete the class with the matching
   * classID. Will throw if class or user is not found.
   * @param {string} classID id of the class to delete
   * @param {string} userID will search for the class in the given users
   * classes array
   */
  async deleteClassById(classID, userID) {
    try {
      Joi.assert(classID, Joi.string().required(), 'classID: ');
      Joi.assert(userID, Joi.string().required(), 'userID: ');
    } catch (err) {
      throw new AppError(err.message, 400);
    }

    const user = await accessService.getUserById(userID);

    const classObj = user.classes.id(classID);

    if (!classObj) {
      throw new AppError('class not found', 404);
    }

    classObj.remove();

    await user.save();
  }
}

module.exports = ClassService;
