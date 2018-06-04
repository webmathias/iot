const express = require('express');
const router = express.Router();
const sensorApi = require('./sensors');
const sliceApi = require('./slice');
const mapApi = require('./map');
// url: /api/*
router.use('/sensor', sensorApi);
router.use('/slice', sliceApi);
router.use('/map', mapApi);

module.exports = router;