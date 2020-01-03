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
      throw new AppError(err.message, 404);
    }

    const newClass = new Class(classObj);

    await newClass.validate(); // just in case

    const user = await accessService.getUserById(userID);

    user.classes.push(newClass);

    await user.save();

    return newClass;
  }
}

module.exports = ClassService;
