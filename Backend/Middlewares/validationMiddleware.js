const { body, validationResult } = require('express-validator');

const validateTaskData = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional().isString(),
  body('completed').optional().isBoolean(),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateTaskData, validate };
