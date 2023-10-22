const jwt = require('jsonwebtoken');

const generateToken = (params, time) => {
    const token = jwt.sign(params, process.env.JWT_SECRET, { expiresIn: time});
    return token;
};

const decriptToken = (token) => {
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        return id;
    } catch (err) {
        return err;
    }
}

module.exports = {
    generateToken,
    decriptToken,
};