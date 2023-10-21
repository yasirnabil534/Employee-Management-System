const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5100;

// * MongoDB connection function
const connsctDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
        console.log('Connected to server');
    } catch (err) {
        console.log(`MongoDB error for error ${err}`);
        throw err;
    }
};

app.use(bodyParser.json());

// ? API to check connection to servers
app.get('/', (req, res) => {
    try {
        res.status(200).json({ mesage: 'Connections are established' });
    } catch (err) {
        res.status(500).json({ mesage: 'Connections are not established' });
    }
});

// * Server listening port functionality
app.listen(port, async () => {
    try {
        await connectDB();
        console.log(`Server is listening on port ${port}`);
    } catch (err) {
        console.log('Server cannot be connected because of the error:');
        console.log(err);
    }
});