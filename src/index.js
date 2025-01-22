const express = require('express'); // Import Express
const app = express(); // Create Express
const port = 4000; // Port
const bearerToken = require("express-bearer-token"); // Import Bearer Token
const cookieParser = require('cookie-parser'); // Import Cookie Parser
const helmet = require('helmet'); // Import Helmet
const morgan = require('morgan'); // Import Morgan
const fs = require('fs'); // Import FS
const path = require('path'); // Import Path

//Middleware Import
const middlewarelog = require('./middleware/log'); // Import middleware log

//Cron Jobs Import
const scheduleCronJobs = require('./cron/cronManager'); // Import scheduleCronJobs

//Routes Import
const usersroutes = require('./routes/userRoutes'); // Import userRoutes
const userSQLroutes = require('./routes/userSQLRoutes'); // Import userSQLRoutes
const siswaRoutes = require('./routes/siswaRoutes'); // Import siswaRoutes



// Import Import
// ---------------------------------------------------------------------------------------


app.use(express.json()); // Body parser
app.use(bearerToken()); // Bearer Token
app.use(cookieParser()); // Cookie Parser
app.use(helmet()); // Helmet
app.use(express.static('public')); // Static Folder
const logStream = fs.createWriteStream(path.join(__dirname, 'applog.txt'), { flags: 'a' }); // Log Stream
app.use(morgan(':date :method :url :status :res[content-length] - :response-time ms', { stream: logStream })); // Morgan Logging
app.use(morgan('dev')); // Morgan console logging




//Middleware
app.use(middlewarelog); 

//Cron Jobs
scheduleCronJobs.startCronJobs();


//Routes
app.use('/users', usersroutes);
app.use('/usersSQL', userSQLroutes);
app.use('/siswa', siswaRoutes);
app.use('/login', require('./routes/loginRoutes'));

//Server
app.listen(port, () =>{
    console.log(`Server berhasil di running di port ${port}`)
})