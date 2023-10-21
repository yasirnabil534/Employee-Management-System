const { validationResult } = require('express-validator');
const User = require('../Models/User');
const { hashPassword } = require('../common/managePass');

// * Function to create an user
const createUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ message: errors })
        } else {
            const password = await hashPassword(req?.body?.password);
            const userObj = {
                fname: req?.body?.fname,
                lname: req?.body?.lname,
                age: req?.body?.age,
                email: req?.body?.email,
                password,
                rawPassword: req?.body?.password,
                type: req?.body?.type,
                position: req?.body?.position,
            };
            const user = await new User(userObj);
            await user.save();
            const newUser = await User.find({ email: req.body?.email });
            if (newUser) {
                res.status(201).json({ message: 'User created successfully', user: newUser });
            } else {
                res.status(503).json({ message: 'User cannot be created' });
            }
        }
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// * Function to find users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (users) {
            res.status(200).json({ users });
        } else {
            res.status(400).json({ message: 'Users cannot be found.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = {
    createUser,
    getUsers,
}