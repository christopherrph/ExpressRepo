const express = require('express');
const siswaController = require('../controller/siswaController');
const auth = require('../config/jwt');

const router = express.Router();

// Define routes
router.get('/', auth.verifyToken, siswaController.getAllSiswa);
router.post('/', siswaController.bulkCreateSiswa);
router.delete('/', siswaController.deleteAllSiswa);
router.get('/getbyid/:id', siswaController.getSiswaById);
router.get('/daerah', siswaController.getSiswaByDaerah);
router.post('/feedsiswa', siswaController.feedSiswa);
router.post('/unfeedsiswa', siswaController.unfeedSiswa);

module.exports = router;