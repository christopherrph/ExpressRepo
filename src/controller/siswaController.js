const db = require('../config/database'); // Assuming you have a db configuration file
const transporter = require('../config/nodemailer'); // Assuming you have a nodemailer configuration file


const timerUnfeedAllSiswa = (req, res) => {
    const query = 'UPDATE siswa SET isUdaMakan = ?, modified_date = ?';
    const values = [false, new Date()];
    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        console.log('All siswa unfeed successfully');
        res.status(200).json({ message: 'All siswa unfeed successfully', affectedRows: results.affectedRows });
    });
}


const getAllSiswa = (req, res) => {
    const query = 'SELECT * FROM siswa';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const currentDate = new Date();
        const siswaWithAge = results.map(siswa => {
            const birthDate = new Date(siswa.tanggal_lahir);
            let age = currentDate.getFullYear() - birthDate.getFullYear();
            const monthDifference = currentDate.getMonth() - birthDate.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
                age--;
            }
            return { ...siswa, umur: age };
        });
        res.status(200).json(siswaWithAge);
    });
};

const getSiswaByDaerah = (req, res) => {
    const query = 'SELECT * FROM siswa';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const siswaByDaerah = results.reduce((acc, siswa) => {
            if (!acc[siswa.daerah]) {
                acc[siswa.daerah] = [];
            }
            acc[siswa.daerah].push(siswa);
            return acc;
        }, {});
        res.status(200).json(siswaByDaerah);
    });
};

const getSiswaById = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM siswa WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Siswa not found' });
        }
        res.status(200).json(results[0]);
    });
};

const bulkCreateSiswa = (req, res) => {
    const siswaData = req.body; // Assuming the data is sent in the request body as an array of objects
    const query = 'INSERT INTO siswa (nama, tanggal_lahir, daerah, sekolah, modified_date) VALUES ?';
    const values = siswaData.map(siswa => [
        siswa.nama,
        new Date(siswa.tanggal_lahir).toISOString().split('T')[0], // Format the date to YYYY-MM-DD
        siswa.daerah,
        siswa.sekolah,
        new Date() // Current datetime for modified_date
    ]);

    db.beginTransaction(err => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        db.query(query, [values], (err, results) => {
            if (err) {
                return db.rollback(() => {
                    res.status(500).json({ error: err.message });
                });
            }
            transporter.transporternm.sendMail({
                from: transporter.mailOptions.from,
                to: 'recipient@example.com',
                subject: 'Siswa Data Creation Notification',
                text: `${siswaData.length} siswa data created successfully.`
            }, (err, info) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(500).json({ error: "Err Email " + err.message });
                    });
                }
                console.log('Email sent');

                db.commit(err => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).json({ error: err.message });
                        });
                    }
                    res.status(201).json({ message: 'Siswa data created successfully', affectedRows: results.affectedRows });
                });
            });
        });
    });
};

const feedSiswa = (req, res) => {
    const { daerah } = req.body;
    const checkQuery = 'SELECT COUNT(*) AS count FROM siswa WHERE daerah = ?';
    db.query(checkQuery, [daerah], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results[0].count === 0) {
            return res.status(404).json({ message: 'Daerah not found' });
        }
        const query = 'UPDATE siswa SET isUdaMakan = ?, modified_date = ? WHERE daerah = ?';
        const values = [true, new Date(), daerah];
        db.query(query, values, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Siswa data updated successfully', affectedRows: results.affectedRows });
        });
    });
};

const unfeedSiswa = (req, res) => {
    const { daerah } = req.body;
    const checkQuery = 'SELECT COUNT(*) AS count FROM siswa WHERE daerah = ?';
    db.query(checkQuery, [daerah], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results[0].count === 0) {
            return res.status(404).json({ message: 'Daerah not found' });
        }
        const query = 'UPDATE siswa SET isUdaMakan = ?, modified_date = ? WHERE daerah = ?';
        const values = [false, new Date(), daerah];
        db.query(query, values, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Siswa data updated successfully', affectedRows: results.affectedRows });
        });
    });
};

const deleteAllSiswa = (req, res) => {
    const query = 'DELETE FROM siswa';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'All siswa data deleted successfully', affectedRows: results.affectedRows });
    });
};

module.exports = { getAllSiswa, bulkCreateSiswa, 
    deleteAllSiswa, getSiswaById, getSiswaByDaerah,
    feedSiswa, unfeedSiswa, timerUnfeedAllSiswa };