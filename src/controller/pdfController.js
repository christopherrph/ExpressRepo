const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../mediaupload/'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage }).single('pdf');

const uploadPdf = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.error('Upload error:', err); // Log the error for debugging
            return res.status(500).json({ error: `Failed to upload PDF - ${err.message}` });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        res.status(201).json({
            message: 'PDF uploaded successfully',
            filename: req.file.filename,
            size: req.file.size,
            mimetype: req.file.mimetype
        });
    });
};

const getPdf = (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../mediaupload/', filename);

    // Sanitize filename to prevent directory traversal
    if (filename.includes('..') || filename.includes('/')) {
        return res.status(400).json({ error: 'Invalid filename' });
    }

    fs.access(filepath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('File not found:', filepath); // Log the error for debugging
            return res.status(404).json({ error: 'PDF not found' });
        }

        res.sendFile(filepath);
    });
};

const splitPdf = async (req, res) => {
    const { filename, pages } = req.body;

    if (!filename || !pages || !Array.isArray(pages)) {
        return res.status(400).json({ error: 'Invalid input: filename and pages are required' });
    }

    const filepath = path.join(__dirname, '../mediaupload/', filename);

    try {
        const existingPdfBytes = fs.readFileSync(filepath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const totalPages = pdfDoc.getPageCount();

        // Validate all page ranges
        for (const page of pages) {
            if (!page.page_numbers || typeof page.page_numbers !== 'string') {
                return res.status(400).json({ error: 'Invalid page range format' });
            }

            const [start, end] = page.page_numbers.split('-').map(Number);
            if (start < 1 || end > totalPages || start > end) {
                return res.status(400).json({ error: `Invalid page range: ${page.page_numbers}` });
            }
        }

        // Process each page range concurrently
        await Promise.all(pages.map(async (page) => {
            const [start, end] = page.page_numbers.split('-').map(Number);
            const newPdfDoc = await PDFDocument.create();
            const copiedPages = await newPdfDoc.copyPages(pdfDoc, Array.from({ length: end - start + 1 }, (_, i) => start - 1 + i));
            copiedPages.forEach((copiedPage) => newPdfDoc.addPage(copiedPage));

            const newPdfBytes = await newPdfDoc.save();
            const newFilename = `${Date.now()}-${page.content.replace(/\s+/g, '_')}.pdf`;
            fs.writeFileSync(path.join(__dirname, '../mediaupload/', newFilename), newPdfBytes);
        }));

        res.status(200).json({ message: 'PDF split successfully' });
    } catch (err) {
        console.error('Error splitting PDF:', err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to split PDF' });
    }
};

const deleteAllFiles = async (req, res) => {
    const directory = path.join(__dirname, '../mediaupload/');
    const errors = [];

    try {
        const files = await fs.promises.readdir(directory);

        if (files.length === 0) {
            return res.status(200).json({ message: 'No files to delete' });
        }

        await Promise.all(files.map(async (file) => {
            const filePath = path.join(directory, file);

            try {
                const stats = await fs.promises.stat(filePath);
                if (stats.isFile()) {
                    await fs.promises.unlink(filePath);
                }
            } catch (err) {
                errors.push(`Failed to delete ${file}: ${err.message}`);
            }
        }));

        if (errors.length > 0) {
            console.error('Errors during deletion:', errors); // Log the errors for debugging
            return res.status(500).json({ errors });
        }

        res.status(200).json({ message: 'All files deleted successfully' });
    } catch (err) {
        console.error('Error reading directory:', err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to read directory: ' + err.message });
    }
};

module.exports = {
    uploadPdf,
    getPdf,
    splitPdf,
    deleteAllFiles
};