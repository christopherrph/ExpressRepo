let numofreq = 1;

const logrequest = (req, res, next) =>{
    console.log(`Request no. ${numofreq} - ${req.method}`);
    numofreq++;
    next();
}

module.exports = logrequest;