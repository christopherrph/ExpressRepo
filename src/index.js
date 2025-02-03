const express = require('express'); // Import Express
const app = express(); // Create Express
const port = 4000; // Port
const bearerToken = require("express-bearer-token"); // Import Bearer Token
const cookieParser = require('cookie-parser'); // Import Cookie Parser
const helmet = require('helmet'); // Import Helmet
const morgan = require('morgan'); // Import Morgan
const fs = require('fs'); // Import FS
const path = require('path'); // Import Path
const logger = require('./middleware/winston'); // Import Logger
const { Worker } = require('worker_threads'); // Import Worker Threads

//Middleware Import
const middlewarelog = require('./middleware/log'); // Import middleware log

//Cron Jobs Import
const scheduleCronJobs = require('./cron/cronManager'); // Import scheduleCronJobs

//Routes Import
const usersroutes = require('./routes/userRoutes'); // Import userRoutes
const userSQLroutes = require('./routes/userSQLRoutes'); // Import userSQLRoutes
const siswaRoutes = require('./routes/siswaRoutes'); // Import siswaRoutes
const pdfRoutes = require('./routes/pdfRoutes');



// Import Import
// ---------------------------------------------------------------------------------------


app.use(express.json()); // Body parser
app.use(bearerToken()); // Bearer Token
app.use(cookieParser()); // Cookie Parser
app.use(helmet()); // Helmet
app.use(express.static('public')); // Static Folder
const logStream = fs.createWriteStream(path.join(__dirname, 'applog.txt'), { flags: 'a' }); // Log Stream
app.use(morgan(':date :method :url :status :res[content-length] - :response-time ms', { stream: logStream })); // Morgan Logging to applog.txt
app.use(morgan('dev')); // Morgan console logging
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});




//Middleware
app.use(middlewarelog); 

//Cron Jobs
scheduleCronJobs.startCronJobs();


//Routes
app.use('/users', usersroutes);
app.use('/usersSQL', userSQLroutes);
app.use('/siswa', siswaRoutes);
app.use('/login', require('./routes/loginRoutes'));
app.use('/pdf', pdfRoutes);


const { findPrimesInRange } = require('./primeUtils'); // Import shared functions
app.post('/calculate-primes-MT', (req, res) => {
    const { start, end } = req.body;
  
    // Create a worker thread to calculate primes
    const worker = new Worker(path.join(__dirname, 'primeWorker.js'), {
      workerData: { start, end },
    });
  
    // Listen for messages from the worker
    worker.on('message', (message) => {
    res.json({ primes: message.primes });
      console.log(`Completed multi-threaded prime calculation from ${start} to ${end}`);
    });
  
    worker.on('error', (error) => {
      console.error('Worker error:', error);
      res.status(500).json({ error: 'Prime calculation failed' });
    });
  
    worker.on('exit', (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
      }
    });
  });
  
app.post('/calculate-primes-ST', (req, res) => {
const { start, end } = req.body;
const primes = findPrimesInRange(start, end);
res.json({ primes });
});


//Server
app.listen(port, () =>{
    console.log(`Server berhasil di running di port ${port}`)
})

