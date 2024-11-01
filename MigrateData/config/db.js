const mongoose = require('mongoose')
require('dotenv').config()

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const uri = 'mongodb+srv://21522361:WrMNPZZJcWeLn1Iw@scores.dmdl7.mongodb.net/?retryWrites=true&w=majority&appName=scores'

const connectDB = async () => {
    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.log('MongoDB connection FAIL', error)
        process.exit(1)
    }
}

module.exports = connectDB