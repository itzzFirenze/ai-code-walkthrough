const express = require('express');
const router = express.Router();
const { testBackend } = require('../controllers/testController');

router.post('/', testBackend);

module.exports = router