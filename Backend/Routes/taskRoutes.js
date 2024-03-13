const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { validateTaskData, validate } = require('../Middlewares/validationMiddleware');
const loggingMiddleware = require('../Middlewares/loggingMiddleware');
const authMiddleware = require('../Middlewares/authMiddleware');

// Custom middleware to apply logging and authentication conditionally
const customMiddleware = (req, res, next) => {
  const referer = req.headers.referer;
  if (!referer || !referer.includes('/api-docs')) {
    loggingMiddleware(req, res, () => {
      authMiddleware(req, res, next);
    });
  } else {
    next();
  }
};

// Apply custom middleware
router.use(customMiddleware);

// Protected routes
router.get('/allTasks', taskController.getAllTasks);
router.get('/task/:id', taskController.getTaskById);
router.post('/new', validateTaskData, validate, taskController.createTask);
router.put('/updatetask/:id', validateTaskData, validate, taskController.updateTask);
router.delete('/delete/:id', taskController.deleteTask);
router.get('/user/:userId', taskController.getTasksByUser);

module.exports = router;
