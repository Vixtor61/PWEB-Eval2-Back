const express = require('express');
const router = express.Router();
// configurar router
const {
    adjust,reboot
} = require('../controllers/reactorController');


router.post('/adjust', adjust)
router.post('/reboot', reboot)


module.exports = router;