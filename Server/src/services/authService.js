const { validationResult } = require('express-validator');

// * Function to log in
const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ message: errors })
        } else {
            const { email, password } = req.body;
            // & Do something later based on user model
        }
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = {
    login,
}