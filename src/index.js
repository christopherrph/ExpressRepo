const express = require('express'); // Import Express
const app = express(); // Create Express
const port = 4000; // Port

//Middleware Import
const middlewarelog = require('./middleware/log'); // Import middleware log

//Routes Import
const usersroutes = require('./routes/userRoutes'); // Import userRoutes
const userSQLroutes = require('./routes/userSQLRoutes'); // Import userSQLRoutes
const siswaRoutes = require('./routes/siswaRoutes'); // Import siswaRoutes


app.use(express.json()); // Body parser

//Middleware
app.use(middlewarelog); 

//Routes
app.use('/users', usersroutes);
app.use('/usersSQL', userSQLroutes);
app.use('/siswa', siswaRoutes);

//Server
app.listen(port, () =>{
    console.log(`Server berhasil di running di port ${port}`)
})