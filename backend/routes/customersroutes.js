const express = require('express'); 
const { registerUser, loginUser } = require('../controllers/customerscontroller');
const router = express.Router();
const verifyToken = require('../middleware/authmiddleware'); // Uncomment this line
// const { protectedRouteHandler } = require('../controllers/protectedController');

// router.get('/protected-route', verifyToken, protectedRouteHandler);

router.post('/signup', registerUser);
router.post('/signin', loginUser);

module.exports = router;
