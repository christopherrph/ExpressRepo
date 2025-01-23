const express = require('express');
const router = express.Router();
const siswaController = require('../controller/siswaController');
const auth = require('../config/jwt');
const roleAuthorize = require('../middleware/roleauthorize');
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: path.join(__dirname, '../mediaupload/') });


// Define routes
router.get('/', auth.verifyToken, roleAuthorize(['read']), siswaController.getAllSiswa);
router.post('/', siswaController.bulkCreateSiswa);
router.delete('/', siswaController.deleteAllSiswa);
router.get('/getbyid/:id', siswaController.getSiswaById);
router.get('/daerah', siswaController.getSiswaByDaerah);
router.post('/feedsiswa', siswaController.feedSiswa);
router.post('/unfeedsiswa', siswaController.unfeedSiswa);



router.post('/createsiswa', upload.single('foto'), siswaController.createSiswa);

module.exports = router;