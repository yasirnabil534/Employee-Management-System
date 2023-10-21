const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        fname: String,
        lname: String,
        email: String,
        password: String,
        rawPassword: String, // It is kept cause it is hard to remember multiple random passwords
        age: Number,
        position: String,
        address: String,
        type: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;