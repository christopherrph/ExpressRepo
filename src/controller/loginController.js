const auth = require('../config/jwt');

const loginUser = (req, res) => {
    console.log(req.body);
    const userData = req.body; // Assuming the data is sent in the request body as an array of objects
    if(!userData.email || !userData.password) {
        return res.status(400).json({ message: 'email or password cannot be empty' });
    }

    if(userData.email == 'admin@example.com' && userData.password == 'admin123'){
        const token = auth.generateToken(userData);
        res.cookie('tokenz', token, { httpOnly: true, secure: true, sameSite: 'Strict' }); // Set the token in a cookie
        return res.status(200).json({ message: 'login success', token });
    }else{
        return res.status(401).json({ message: 'invalid email or password' });
    }
}

module.exports = { loginUser };