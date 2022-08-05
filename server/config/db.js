// ON THIS FILE WE CONNECT TO DATABASE

const mongoose = require('mongoose')

// asyn function because mongoose functions return promises!
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  // logs: MongoDB Connected (host) - .cyan.underline.bold is from the colors package to color message
  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)

};

module.exports = connectDB;