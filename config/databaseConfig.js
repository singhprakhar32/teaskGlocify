const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL||'mongodb://0.0.0.0:27017/my_database';

const databaseConnection = ()=>{
    mongoose
    .connect(MONGODB_URL)
    .then((conn)=>console.log(`Connected to DB: ${conn.connection.host}`))
    .catch((err)=>console.log(`Error connecting to DB: ${err.message}`))
}
module.exports = databaseConnection;