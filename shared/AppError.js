/**
 * represents an application error that can be caused
 * by a predicted error from the application. Used to show a difference
 * between operational errors and programmer errors.
 * @extends Error
 */
class AppError extends Error {
  /**
   *
   * @param {string} msg the error message
   * @param {number} code represents a http status code
   */
  constructor(msg, code) {
    super(msg);
    this.code = code;
    this.name = 'ApplicationError';
  }
}

module.exports = AppError;
