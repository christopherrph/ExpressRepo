const express = require('express');
const router = express.Router();
const pdfController = require('../controller/pdfController');

// Define routes
router.post('/upload', pdfController.uploadPdf);
router.get('/:filename', pdfController.getPdf);
router.post('/split', pdfController.splitPdf);
router.delete('/delete-all', pdfController.deleteAllFiles);

module.exports = router;