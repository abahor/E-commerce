const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/myDatabase");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('DB Error', err);
    process.exit(1);
  }
};

module.exports = connectDb;
