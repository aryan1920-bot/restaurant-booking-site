const express = require('express');
const router = express.Router();
const inventoriesController = require('../controllers/inventoriescontroller');

// POST route to create inventory entry
router.post('/createEntry', inventoriesController.createInventoryEntry);

module.exports = router;
