const router = require('express').Router();
const reader = require('../controllers/reader.controller');

// API
router.get('/api/reader/', reader.findAll);
router.post('/api/reader/', reader.create);

module.exports = router;
