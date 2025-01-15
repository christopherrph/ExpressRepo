let numofreq = 1;

const logrequest = (req, res, next) =>{
    console.log(`log request ${numofreq}`);
    numofreq++;
    next();
}

module.exports = logrequest;