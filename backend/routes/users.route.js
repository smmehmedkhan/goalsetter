const express = require('express');
const {
  registerUser,
  loginUser,
  displayUser,
} = require('../controllers/user.controller.js');
const { protect } = require('../middlewares/authorization.js');

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, displayUser);

module.exports = router;
