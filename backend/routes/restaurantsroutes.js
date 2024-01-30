const express = require('express');
const router = express.Router();
const restaurantscontroller = require('../controllers/restaurantscontroller');
const {verifyToken} = require('../middleware/authmiddleware');


router.get('/select', restaurantscontroller.selectAll);
router.post('/insert',verifyToken,restaurantscontroller.insert);
router.get('/byId/:id', restaurantscontroller.byId)
module.exports = router;
