const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect('mongodb://localhost:6666/Tugas', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
