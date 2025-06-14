const { validationResult } = require('express-validator');

/**
 * Middleware to handle validation errors and render a view with messages.
 * @param {string} viewName - the name of the view to render on error
 */
function validationErrorHandler(viewName) {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const mappedErrors = {};
      errors.array().forEach(err => {
        mappedErrors[err.param] = err.msg;
      });

      return res.render(viewName, {
        errors: mappedErrors,
        oldInput: req.body
      });
    }
    next(); // no validation errors
  };
}

module.exports = validationErrorHandler;
