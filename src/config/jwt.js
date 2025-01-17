const jwt = require('jsonwebtoken');

const secretKey = 'konz'; // Replace with your own secret key
const expiresIn = '1h'; // Token expiration time

// Function to generate a JWT token
function generateToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn });
}

// Middleware to verify a JWT token
function verifyToken(req, res, next) {
    const token = req.token;
    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: 'Failed to authenticate token.' });
        }
        console.log("Decoded Token: " + JSON.stringify(decoded));
        next();
    });
}

module.exports = {
    generateToken,
    verifyToken
};